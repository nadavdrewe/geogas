@echo off
setlocal EnableExtensions

set "ROOT=%~dp0.."
pushd "%ROOT%" >nul
if errorlevel 1 exit /b 1

call scripts\deploy.cmd
set "STATUS=%ERRORLEVEL%"

popd >nul
exit /b %STATUS%
