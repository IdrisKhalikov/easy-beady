using System.Runtime.InteropServices;
using EasyBeady.Api.DataContracts.SchemaContracts;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Bmp;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.PixelFormats;

namespace EasyBeady.Api.Helpers;

public static class SchemaToImageConverter
{
    public static MemoryStream MakeImage(Rgba32[] colors, int originalWidth, int originalHeight, SchemaType type)
    {
        var defaultColor = Color.White.ToPixel<Rgba32>();

        const int height = 200;
        Rgba32[,] newColors;
        if (type == SchemaType.Square)
        {
            newColors = new Rgba32[originalHeight, originalWidth];
            for(var x = 0 ; x < originalWidth ; x++)
                for (var y = 0 ; y < originalHeight ; y++)
                    newColors[y, x] = colors[x + y * originalWidth];
        }
        else
        {
            var initX = originalWidth;
            var initY = originalHeight;

            originalWidth = originalWidth * 2 + 1;
            originalHeight *= 2;

            newColors = new Rgba32[originalHeight, originalWidth];

            for (var x = 0; x < originalWidth; x++)
            {
                for (var y = 0; y < originalHeight; y++)
                {
                    var colorY = y / 2;
                    if (colorY % 2 == 0)
                    {
                        newColors[y, x] = x / 2 < initX
                            ? colors[x / 2 + colorY * initX]
                            : defaultColor;
                    }
                    else
                    {
                        newColors[y, x] = x - 1 >= 0
                            ? colors[(x - 1) / 2 + colorY * initX]
                            : defaultColor;
                    }
                }
            }
        }

        var ratio = (double)originalHeight / height;
        var width = (int)(originalWidth / ratio);

        var resized = new Rgba32[height * width];

        for (int y = 0; y < height; y++)
        {
            var srcY = (int)(y * ratio);
            srcY = Math.Min(srcY, originalHeight - 1);

            for (var x = 0; x < width; x++)
            { 
                var srcX = (int)(x * ratio);
                srcX = Math.Min(srcX, originalWidth - 1);
                resized[y * width + x] = newColors[srcY, srcX];
            }
        }

        var bitmap = Image.LoadPixelData<Rgba32>(resized, width, height);

        var memoryStream = new MemoryStream();
        bitmap.Save(memoryStream, new PngEncoder());
        return memoryStream;
    }
}