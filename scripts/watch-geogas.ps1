$ErrorActionPreference = "Continue"

$root = "C:\Deployment\geogas"
$startScript = Join-Path $root "scripts\start-geogas-direct.ps1"
$logDir = Join-Path $root "logs"
$watchLog = Join-Path $logDir "watch-geogas.log"

New-Item -ItemType Directory -Path $logDir -Force | Out-Null

while ($true) {
  $stamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
  try {
    $res = Invoke-WebRequest -Uri "http://127.0.0.1:15023/" -UseBasicParsing -TimeoutSec 15
    if ($res.StatusCode -lt 200 -or $res.StatusCode -ge 500) {
      Add-Content -Path $watchLog -Value "$stamp unhealthy status $($res.StatusCode); starting"
      powershell.exe -NoProfile -ExecutionPolicy Bypass -File $startScript
    }
  } catch {
    Add-Content -Path $watchLog -Value "$stamp health check failed: $($_.Exception.Message); starting"
    powershell.exe -NoProfile -ExecutionPolicy Bypass -File $startScript
  }

  Start-Sleep -Seconds 60
}
