Add-Type -AssemblyName System.Drawing

# 1. Trần Thùy Anh from H5
$src5 = "C:\Users\My Laptop\.gemini\antigravity\brain\483c9a84-d0b4-40db-b258-c2724737c9cb\.user_uploaded\media_1793387099890_372a25aa.png"
$bmp5 = [System.Drawing.Bitmap]::FromFile($src5)
# Crop avatar box: around x=30, y=148, w=80, h=75
$rect1 = New-Object System.Drawing.Rectangle(28, 145, 82, 78)
$cropped1 = $bmp5.Clone($rect1, $bmp5.PixelFormat)
$cropped1.Save("d:\HASAKI APP\public\images\consultant_thuy_anh.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp5.Dispose()
$cropped1.Dispose()

# 2. Nguyễn Ngọc Ánh from H4
$src4 = "C:\Users\My Laptop\.gemini\antigravity\brain\483c9a84-d0b4-40db-b258-c2724737c9cb\.user_uploaded\media_1793386978274_1c325dc7.png"
$bmp4 = [System.Drawing.Bitmap]::FromFile($src4)
# Crop avatar box: around x=30, y=510, w=80, h=75
$rect2 = New-Object System.Drawing.Rectangle(28, 510, 82, 78)
$cropped2 = $bmp4.Clone($rect2, $bmp4.PixelFormat)
$cropped2.Save("d:\HASAKI APP\public\images\consultant_ngoc_anh.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp4.Dispose()
$cropped2.Dispose()

Write-Output "Consultants cropped successfully!"
