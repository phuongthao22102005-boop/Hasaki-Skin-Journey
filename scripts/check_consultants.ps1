Add-Type -AssemblyName System.Drawing
$bmp1 = [System.Drawing.Bitmap]::FromFile("d:\HASAKI APP\public\images\consultant_thuy_anh.png")
Write-Output "Thuy Anh: $($bmp1.Width)x$($bmp1.Height)"
$bmp1.Dispose()

$bmp2 = [System.Drawing.Bitmap]::FromFile("d:\HASAKI APP\public\images\consultant_ngoc_anh.png")
Write-Output "Ngoc Anh: $($bmp2.Width)x$($bmp2.Height)"
$bmp2.Dispose()
