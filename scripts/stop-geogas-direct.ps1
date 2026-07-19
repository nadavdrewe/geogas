$ErrorActionPreference = "Stop"

$root = "C:\Deployment\geogas"
$listeners = @(Get-NetTCPConnection -State Listen -LocalPort 15023 -ErrorAction SilentlyContinue)

if ($listeners.Count -eq 0) {
  exit 0
}

foreach ($listener in $listeners) {
  $process = Get-CimInstance Win32_Process -Filter "ProcessId = $($listener.OwningProcess)"
  if ($null -eq $process) {
    throw "Could not identify the process listening on port 15023."
  }

  $isDirectRunner =
    $process.CommandLine -like "*$root\node_modules\next\dist\bin\next*" -and
    $process.CommandLine -like "*start -p 15023*"
  $isPm2Runner = $process.CommandLine -like "*ProcessContainerFork.js*start -p 15023*"

  if ($isDirectRunner) {
    Stop-Process -Id $process.ProcessId -Force
    continue
  }

  if (-not $isPm2Runner) {
    throw "The listener on port 15023 is not a recognised Geo Gas Next.js process."
  }

  $daemon = Get-CimInstance Win32_Process -Filter "ProcessId = $($process.ParentProcessId)"
  if ($null -eq $daemon -or $daemon.CommandLine -notlike "*pm2*Daemon.js*") {
    throw "The PM2 listener does not have the expected daemon parent."
  }

  $daemonChildren = @(Get-CimInstance Win32_Process |
    Where-Object { $_.ParentProcessId -eq $daemon.ProcessId })
  if ($daemonChildren.Count -ne 1 -or $daemonChildren[0].ProcessId -ne $process.ProcessId) {
    throw "PM2 has other child processes; refusing to stop the daemon."
  }

  Stop-Process -Id $process.ProcessId -Force
  Stop-Process -Id $daemon.ProcessId -Force
}

for ($i = 0; $i -lt 20; $i++) {
  if (-not (Get-NetTCPConnection -State Listen -LocalPort 15023 -ErrorAction SilentlyContinue)) {
    exit 0
  }
  Start-Sleep -Seconds 1
}

throw "The Geo Gas listener did not stop within 20 seconds."
