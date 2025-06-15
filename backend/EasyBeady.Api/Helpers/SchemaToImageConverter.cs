using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
using EasyBeady.Api.DataContracts.SchemaContracts;

namespace EasyBeady.Api.Helpers;

public static class SchemaToImageConverter
{
    public static MemoryStream MakeImage(Color[] colors, int originalWidth, int originalHeight, SchemaType type)
    {
        var defaultColor = Color.White.ToArgb();

        const int height = 200;
        int[,] newColors;
        if (type == SchemaType.Square)
        {
            newColors = new int[originalHeight, originalWidth];
            for(var x = 0 ; x < originalWidth ; x++)
                for (var y = 0 ; y < originalHeight ; y++)
                    newColors[y, x] = colors[x + y * originalWidth].ToArgb();
        }
        else
        {
            var initX = originalWidth;
            var initY = originalHeight;

            originalWidth = originalWidth * 2 + 1;
            originalHeight *= 2;

            newColors = new int[originalHeight, originalWidth];

            for (var x = 0; x < originalWidth; x++)
            {
                for (var y = 0; y < originalHeight; y++)
                {
                    var colorY = y / 2;
                    if (colorY % 2 == 0)
                    {
                        newColors[y, x] = x / 2 < initX
                            ? colors[x / 2 + colorY * initX].ToArgb()
                            : defaultColor;
                    }
                    else
                    {
                        newColors[y, x] = x - 1 >= 0
                            ? colors[(x - 1) / 2 + colorY * initX].ToArgb()
                            : defaultColor;
                    }
                }
            }
        }

        var ratio = (double)originalHeight / height;
        var width = (int)(originalWidth / ratio);

        int[,] resized = new int[height, width];

        for (int y = 0; y < height; y++)
        {
            var srcY = (int)(y * ratio);
            srcY = Math.Min(srcY, originalHeight - 1);

            for (var x = 0; x < width; x++)
            { 
                var srcX = (int)(x * ratio);
                srcX = Math.Min(srcX, originalWidth - 1);
                resized[y, x] = newColors[srcY, srcX];
            }
        }
            
        var rgbValues = resized.Cast<int>().ToArray();

        var bitmap = new Bitmap(width, height, PixelFormat.Format24bppRgb);
        var bitmapData = bitmap.LockBits(
            new Rectangle(0, 0, width, height),
            ImageLockMode.WriteOnly,
            PixelFormat.Format32bppArgb
        );

        Marshal.Copy(rgbValues, 0, bitmapData.Scan0, rgbValues.Length);
        bitmap.UnlockBits(bitmapData);

        var memoryStream = new MemoryStream();
        bitmap.Save(memoryStream, ImageFormat.Png);
        
        return memoryStream;
    }
}