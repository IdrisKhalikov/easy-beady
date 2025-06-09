using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;
using EasyBeady.Api.DataContracts.SchemaContracts;

namespace EasyBeady.Api.Services.Images;

public static class ConverterToImage
{
    public static void MakeImage(int[,] colors, int id, SchemaType type)
    {
        const int height = 200;
        int[,] newColors;
        if (type == SchemaType.Square)
        {
            newColors = colors;
        }
        else {
            newColors = new int[colors.GetLength(0) * 2, colors.GetLength(1) * 2 + 1];

            for (var x = 0; x < newColors.GetLength(0); x++)
            {
                for (var y = 0; y < newColors.GetLength(1); y++)
                {
                    var colorX = x / 2;
                    if (colorX % 2 == 0)
                    {
                        if (y / 2 < colors.GetLength(1))
                            newColors[x, y] = colors[colorX, y / 2];
                    }
                    else
                    {
                        if (y - 1 >= 0)
                            newColors[x, y] = colors[colorX, (y - 1) / 2];
                    }
                }
            }
        }
        
        int originalHeight = newColors.GetLength(0);
        int originalWidth = newColors.GetLength(1);
    
        double ratioY = (double)originalHeight / height;
        double ratioX = (double)originalWidth / (originalWidth * height / originalHeight);
        int width = (int)(originalWidth / ratioY);

        int[,] resized = new int[height, width];

        for (int y = 0; y < height; y++)
        {
            int srcY = (int)(y * ratioY);
            srcY = Math.Min(srcY, originalHeight - 1);
                    
            for (int x = 0; x < width; x++)
            { 
                int srcX = (int)(x * ratioX);
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

        bitmap.Save( id + ".png", ImageFormat.Png);
    }
}