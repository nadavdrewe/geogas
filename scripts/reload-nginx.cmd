@echo off
setlocal
set "NGINX_ROOT=C:\Users\Administrator\AppData\Local\Microsoft\WinGet\Packages\nginxinc.nginx_Microsoft.Winget.Source_8wekyb3d8bbwe\nginx-1.29.8"
"%NGINX_ROOT%\nginx.exe" -p "%NGINX_ROOT%\\" -c conf\nginx.conf -s reload
