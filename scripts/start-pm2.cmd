@echo off
setlocal
set "PM2_HOME=C:\Users\Administrator\.pm2"
"C:\ProgramData\nvm\v20.20.2\pm2.cmd" jlist | find /I "\"name\":\"geogas\"" >NUL
if %ERRORLEVEL%==0 (
  exit /b 0
)
"C:\ProgramData\nvm\v20.20.2\pm2.cmd" resurrect
