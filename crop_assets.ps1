Add-Type -AssemblyName System.Drawing

$srcPath = "D:\HASAKI APP\public\images\screen3.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

function Crop-Image($x, $y, $w, $h, $destName) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    $destPath = "D:\HASAKI APP\public\images\$destName"
    $cropped.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Output "Saved: $destName ($w x $h)"
}

# Store banner is roughly around y=555, h=105, x=20, w=374
Crop-Image 20 550 374 110 "store_banner.png"

# Promo 1 thumbnail around y=700, x=26, w=118, h=48
Crop-Image 26 702 120 48 "promo1.png"

# Promo 2 thumbnail around y=767, x=26, w=118, h=48
Crop-Image 26 767 120 48 "promo2.png"

# AI Bot icon around x=340, y=788, w=64, h=64
Crop-Image 340 788 64 64 "ai_bot.png"

$bmp.Dispose()
Write-Output "Cropping complete!"
