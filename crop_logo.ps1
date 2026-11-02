Add-Type -AssemblyName System.Drawing

$src2Path = "D:\HASAKI APP\public\images\screen2.png"
$bmp2 = [System.Drawing.Bitmap]::FromFile($src2Path)

function Crop-Image2($x, $y, $w, $h, $destName) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $bmp2.Clone($rect, $bmp2.PixelFormat)
    $destPath = "D:\HASAKI APP\public\images\$destName"
    $cropped.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Output "Saved: $destName ($w x $h)"
}

# Logo in screen 2 is centered: (414 - 84)/2 = 165, y is ~105
Crop-Image2 165 105 84 84 "hasaki_logo.png"

$bmp2.Dispose()
Write-Output "Logo cropped successfully!"
