Add-Type -AssemblyName System.Drawing
$src = "C:\Users\My Laptop\.gemini\antigravity\brain\483c9a84-d0b4-40db-b258-c2724737c9cb\.user_uploaded\media_1793376661876_67113c11.png"
$bmp = [System.Drawing.Bitmap]::FromFile($src)
# Let's sample pixels down column 50 between y=50 and y=250
for ($y = 60; $y -lt 240; $y += 5) {
    $c = $bmp.GetPixel(50, $y)
    Write-Output "y=$($y): R=$($c.R), G=$($c.G), B=$($c.B)"
}
$bmp.Dispose()
