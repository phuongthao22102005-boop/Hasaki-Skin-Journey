Add-Type -AssemblyName System.Drawing

# 1. Crop Torriden product image from danhgia_flow_2.png
$src2 = "D:\HASAKI APP\public\images\danhgia_flow_2.png"
$bmp2 = [System.Drawing.Bitmap]::FromFile($src2)
# Torriden is around x=30, y=250, w=80, h=80
$rect2 = New-Object System.Drawing.Rectangle(30, 252, 78, 78)
$crop2 = $bmp2.Clone($rect2, $bmp2.PixelFormat)
$crop2.Save("D:\HASAKI APP\public\images\prod_torriden.png", [System.Drawing.Imaging.ImageFormat]::Png)
$crop2.Dispose()

# Klairs is around x=30, y=375, w=80, h=80
$rect3 = New-Object System.Drawing.Rectangle(30, 375, 78, 78)
$crop3 = $bmp2.Clone($rect3, $bmp2.PixelFormat)
$crop3.Save("D:\HASAKI APP\public\images\prod_klairs.png", [System.Drawing.Imaging.ImageFormat]::Png)
$crop3.Dispose()
$bmp2.Dispose()

# 2. Crop face portrait from danhgia_flow_4.png
$src4 = "D:\HASAKI APP\public\images\danhgia_flow_4.png"
$bmp4 = [System.Drawing.Bitmap]::FromFile($src4)
# Face is at top, approx y=0 to y=350, full width 414
$rect4 = New-Object System.Drawing.Rectangle(0, 0, 414, 350)
$crop4 = $bmp4.Clone($rect4, $bmp4.PixelFormat)
$crop4.Save("D:\HASAKI APP\public\images\scanned_face.png", [System.Drawing.Imaging.ImageFormat]::Png)
$crop4.Dispose()
$bmp4.Dispose()

Write-Output "Cropped flow assets successfully!"
