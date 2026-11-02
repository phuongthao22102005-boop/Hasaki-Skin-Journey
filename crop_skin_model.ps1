Add-Type -AssemblyName System.Drawing
$src = "D:\HASAKI APP\public\images\danhgia_screen_1.png"
$bmp = [System.Drawing.Bitmap]::FromFile($src)
$rect = New-Object System.Drawing.Rectangle(28, 115, 358, 340)
$cropped = $bmp.Clone($rect, $bmp.PixelFormat)
$cropped.Save("D:\HASAKI APP\public\images\skin_model.png", [System.Drawing.Imaging.ImageFormat]::Png)
$cropped.Dispose()
$bmp.Dispose()
Write-Output "Cropped skin_model.png successfully"
