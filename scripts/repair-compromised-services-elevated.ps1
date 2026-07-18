$ErrorActionPreference = "Stop"

$principal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
  throw "Run this script from an elevated PowerShell window."
}

$stamp = Get-Date -Format yyyyMMdd-HHmmss
$miningPath = "C:\Users\Administrator\AppData\Local\MiningApp"
$programDataBackup = "C:\ProgramData\MiningBackup"
$publicBackup = "C:\Users\Public\Libraries\.netsvcs"
$hostsPath = "$env:SystemRoot\System32\drivers\etc\hosts"
$blockedHosts = @(
  "dl.evoqiyuan58.xyz",
  "cdn.pcdnv.xyz",
  "auto.c3pool.org",
  "gulf.moneroocean.stream",
  "pool.supportxmr.com",
  "xmr-eu1.nanopool.org",
  "xmr-eu2.nanopool.org"
)

function Invoke-Step {
  param(
    [Parameter(Mandatory = $true)][string]$Message,
    [Parameter(Mandatory = $true)][scriptblock]$Action
  )

  Write-Host "[repair] $Message"
  try {
    & $Action | Out-Host
  } catch {
    Write-Warning "[repair] Failed: $Message - $($_.Exception.Message)"
  }
}

function Quarantine-Path {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][string]$Destination
  )

  if (Test-Path -LiteralPath $Path) {
    Move-Item -LiteralPath $Path -Destination $Destination -Force
    Write-Host "[repair] Quarantined $Path to $Destination"
  }
}

$quarantine = Get-ChildItem "C:\Users\Administrator\AppData\Local" -Directory -Filter "MiningApp.quarantine-*" -ErrorAction SilentlyContinue |
  Sort-Object LastWriteTime -Descending |
  Select-Object -First 1

Invoke-Step "Stopping malicious WindowsNetworkService if present" {
  sc.exe stop WindowsNetworkService
}

Invoke-Step "Disabling malicious WindowsNetworkService" {
  sc.exe config WindowsNetworkService start= disabled
}

Invoke-Step "Deleting malicious WindowsNetworkService" {
  sc.exe delete WindowsNetworkService
}

Invoke-Step "Removing malicious EventLog dependency" {
  reg.exe delete "HKLM\SYSTEM\CurrentControlSet\Services\EventLog" /v DependOnService /f
}

Invoke-Step "Removing HKCU miner Run key" {
  reg.exe delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v WindowsNetworkService /f
}

Invoke-Step "Removing HKLM miner Run keys" {
  reg.exe delete "HKLM\Software\Microsoft\Windows\CurrentVersion\Run" /v WindowsNetworkService /f
  reg.exe delete "HKLM\Software\Microsoft\Windows\CurrentVersion\Run" /v WindowsNetworkHelper /f
}

Invoke-Step "Deleting miner scheduled task" {
  schtasks.exe /delete /tn WindowsNetworkHelper_user /f
}

if (Test-Path $miningPath) {
  Quarantine-Path -Path $miningPath -Destination "C:\Users\Administrator\AppData\Local\MiningApp.quarantine-manual-$stamp"
}

Quarantine-Path -Path $programDataBackup -Destination "C:\ProgramData\MiningBackup.quarantine-$stamp"
Quarantine-Path -Path $publicBackup -Destination "C:\Users\Public\Libraries\.netsvcs.quarantine-$stamp"

Invoke-Step "Adding hosts-file blocks for known miner command and pool hosts" {
  $hosts = if (Test-Path $hostsPath) { Get-Content -LiteralPath $hostsPath -Raw } else { "" }
  $lines = foreach ($hostName in $blockedHosts) {
    if ($hosts -notmatch "(?im)^\s*127\.0\.0\.1\s+$([regex]::Escape($hostName))(\s|$)") {
      "127.0.0.1 $hostName"
    }
  }
  if ($lines) {
    Add-Content -LiteralPath $hostsPath -Value ("`r`n# Added by geogas incident repair $stamp`r`n" + ($lines -join "`r`n"))
  }
}

Invoke-Step "Starting Windows Event Log" {
  sc.exe start EventLog
}

if ($quarantine) {
  Write-Host "[repair] Existing quarantine: $($quarantine.FullName)"
  Write-Host "[repair] Inspect it before deleting permanently."
}

Write-Host "[repair] Current service state"
Get-Service EventLog -ErrorAction SilentlyContinue | Format-Table Name,Status,StartType -AutoSize
sc.exe query WindowsNetworkService | Out-Host
reg.exe query "HKLM\SYSTEM\CurrentControlSet\Services\EventLog" /v DependOnService | Out-Host
reg.exe query "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" | Out-Host
reg.exe query "HKLM\Software\Microsoft\Windows\CurrentVersion\Run" | Out-Host
