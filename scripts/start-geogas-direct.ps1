$ErrorActionPreference = "Stop"

$root = "C:\Deployment\geogas"
$node = "C:\ProgramData\nvm\v20.20.2\node.exe"
$next = Join-Path $root "node_modules\next\dist\bin\next"
$logDir = Join-Path $root "logs"
$outLog = Join-Path $logDir "direct-next-out.log"
$errLog = Join-Path $logDir "direct-next-error.log"

New-Item -ItemType Directory -Path $logDir -Force | Out-Null

$listener = Get-NetTCPConnection -State Listen -LocalPort 15023 -ErrorAction SilentlyContinue |
  Where-Object { $_.LocalAddress -eq "127.0.0.1" -or $_.LocalAddress -eq "0.0.0.0" }

if ($listener) {
  exit 0
}

$cmd = "/c set NODE_ENV=production&& set PORT=15023&& set HOSTNAME=127.0.0.1&& cd /d $root&& `"$node`" `"$next`" start -p 15023 -H 127.0.0.1"
Start-Process -FilePath "cmd.exe" -ArgumentList $cmd -WorkingDirectory $root -WindowStyle Hidden -RedirectStandardOutput $outLog -RedirectStandardError $errLog | Out-Null
