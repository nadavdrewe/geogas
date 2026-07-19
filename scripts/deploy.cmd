@echo off
setlocal EnableExtensions EnableDelayedExpansion

set "ROOT=C:\Deployment\geogas"
set "LIVE_DIR=%ROOT%\.next-prod"
set "BUILD_NAME=.next-build-live-%RANDOM%%RANDOM%"
set "BUILD_DIR=%ROOT%\%BUILD_NAME%"
set "BACKUP_DIR=%ROOT%\.next-prev"
set "STOP_SCRIPT=%ROOT%\scripts\stop-geogas-direct.ps1"
set "START_SCRIPT=%ROOT%\scripts\start-geogas-direct.ps1"
set "HEALTH_URL=http://127.0.0.1:15023/"

echo [deploy] Building application into %BUILD_NAME%
set "NEXT_DIST_DIR=%BUILD_NAME%"
call npm run build
set "NEXT_DIST_DIR="
if errorlevel 1 goto :build_failed

if not exist "%BUILD_DIR%" (
  echo [deploy] Build output missing: %BUILD_DIR%
  exit /b 1
)

call :validate_build "%BUILD_DIR%"
if errorlevel 1 goto :build_failed

echo [deploy] Stopping the active Geo Gas runner
call :stop_geogas
if errorlevel 1 goto :stop_failed

if exist "%BACKUP_DIR%" (
  echo [deploy] Removing previous backup
  rmdir /s /q "%BACKUP_DIR%"
  if exist "%BACKUP_DIR%" goto :backup_remove_failed
)

if exist "%LIVE_DIR%" (
  echo [deploy] Backing up current live build
  move "%LIVE_DIR%" "%BACKUP_DIR%" >nul
  if errorlevel 1 goto :backup_failed
)

echo [deploy] Promoting new build to live
move "%BUILD_DIR%" "%LIVE_DIR%" >nul
if errorlevel 1 goto :promote_failed

echo [deploy] Starting the Geo Gas runner
call :start_geogas
if errorlevel 1 goto :start_failed

echo [deploy] Waiting for health check
powershell -NoProfile -Command ^
  "$ProgressPreference='SilentlyContinue';" ^
  "$ok=$false;" ^
  "for($i=0;$i -lt 20;$i++){" ^
  "  try {" ^
  "    $res=Invoke-WebRequest -Uri '%HEALTH_URL%' -UseBasicParsing -TimeoutSec 10;" ^
  "    if($res.StatusCode -ge 200 -and $res.StatusCode -lt 500){$ok=$true; break}" ^
  "  } catch {}" ^
  "  Start-Sleep -Seconds 2" ^
  "}" ^
  "if(-not $ok){exit 1}"
if errorlevel 1 goto :health_failed

echo [deploy] Deployment succeeded
exit /b 0

:build_failed
echo [deploy] Build failed
exit /b 1

:stop_failed
echo [deploy] Failed to stop the active Geo Gas runner
exit /b 1

:backup_remove_failed
echo [deploy] Failed to remove previous backup
call :start_geogas >nul 2>nul
exit /b 1

:backup_failed
echo [deploy] Failed to back up live build
call :start_geogas >nul 2>nul
exit /b 1

:promote_failed
echo [deploy] Failed to promote new build
if exist "%BACKUP_DIR%" move "%BACKUP_DIR%" "%LIVE_DIR%" >nul
call :start_geogas >nul 2>nul
exit /b 1

:start_failed
echo [deploy] Failed to start PM2 app, rolling back
call :rollback
exit /b 1

:health_failed
echo [deploy] Health check failed, rolling back
call :rollback
exit /b 1

:rollback
call :stop_geogas >nul 2>nul
if exist "%LIVE_DIR%" rmdir /s /q "%LIVE_DIR%"
if exist "%BACKUP_DIR%" move "%BACKUP_DIR%" "%LIVE_DIR%" >nul
call :start_geogas >nul 2>nul
goto :eof

:stop_geogas
powershell -NoProfile -ExecutionPolicy Bypass -File "%STOP_SCRIPT%"
exit /b %ERRORLEVEL%

:start_geogas
powershell -NoProfile -ExecutionPolicy Bypass -File "%START_SCRIPT%"
exit /b %ERRORLEVEL%

:validate_build
set "CHECK_DIR=%~1"
set "MISSING="
if not exist "%CHECK_DIR%\BUILD_ID" set "MISSING=!MISSING! BUILD_ID"
if not exist "%CHECK_DIR%\app-build-manifest.json" set "MISSING=!MISSING! app-build-manifest.json"
if not exist "%CHECK_DIR%\build-manifest.json" set "MISSING=!MISSING! build-manifest.json"
if not exist "%CHECK_DIR%\server" set "MISSING=!MISSING! server"
if not exist "%CHECK_DIR%\static" set "MISSING=!MISSING! static"
if not "!MISSING!"=="" (
  echo [deploy] Incomplete build output in %CHECK_DIR%. Missing:!MISSING!
  exit /b 1
)
exit /b 0
