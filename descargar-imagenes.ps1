# Descarga las fotos de la web antigua (Wix) a assets\img\, redimensionadas a 2000 px como máximo.
# Uso (Windows): clic derecho en este archivo > "Ejecutar con PowerShell"
$ErrorActionPreference = "Continue"
Set-Location $PSScriptRoot
New-Item -ItemType Directory -Force -Path "assets\img" | Out-Null
Get-Content "imagenes.txt" | Where-Object { $_ -and -not $_.StartsWith("#") } | ForEach-Object {
  $p = $_ -split "\s+"; $nombre = $p[0]; $id = $p[1]
  $destino = Join-Path "assets\img" $nombre
  try {
    Invoke-WebRequest -UseBasicParsing -Uri "https://static.wixstatic.com/media/$id/v1/fit/w_2000,h_2000,q_85/$nombre" -OutFile $destino
    Write-Host "OK  $nombre"
  } catch {
    try { Invoke-WebRequest -UseBasicParsing -Uri "https://static.wixstatic.com/media/$id" -OutFile $destino; Write-Host "OK  $nombre (original)" }
    catch { Write-Host "ERROR  $nombre" }
  }
}
Write-Host "Listo."
Read-Host "Pulsa Enter para cerrar"
