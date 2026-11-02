Add-Type -AssemblyName System.Drawing
$src = "C:\Users\My Laptop\.gemini\antigravity\brain\483c9a84-d0b4-40db-b258-c2724737c9cb\.user_uploaded\media_1793376661876_67113c11.png"
$bmp = [System.Drawing.Bitmap]::FromFile($src)
# Let's inspect the banner coordinates:
# Banner is roughly x=20, y=74, w=374, h=140
$rect = New-Object System.Drawing.Rectangle(19, 76, 375, 138)
$cropped = $bmp.Clone($rect, $bmp.PixelFormat)
$cropped.Save("d:\HASAKI APP\public\images\clinic_routine_banner.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$cropped.Dispose()
Write-Output "Banner cropped successfully!"
