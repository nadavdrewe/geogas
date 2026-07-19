@echo off
setlocal
set "NGINX_ROOT=C:\Users\Administrator\AppData\Local\Microsoft\WinGet\Packages\nginxinc.nginx_Microsoft.Winget.Source_8wekyb3d8bbwe\nginx-1.29.8"
tasklist /FI "IMAGENAME eq nginx.exe" | find /I "nginx.exe" >NUL
if %ERRORLEVEL%==0 (
  exit /b 0
) else (
  "%NGINX_ROOT%\nginx.exe" -p "%NGINX_ROOT%\\" -c conf\nginx.conf
)
