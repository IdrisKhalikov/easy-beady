using System.Drawing;
using SixLabors.ImageSharp.PixelFormats;

namespace EasyBeady.Api.Helpers;

public static class SchemaConverter
{
    public static byte[] ToBinary(Rgba32[] schema)
    {
        var resultStream = new MemoryStream();
        for(var i = 0; i < schema.Length; i++)
            WriteColor(resultStream, schema[i]);

        return resultStream.ToArray();
    }

    public static Rgba32[] FromBinary(byte[] data)
    {
        var stream = new MemoryStream(data);
        var schema = new Rgba32[data.Length / 3];
        for (var i = 0; i < schema.Length; i++)
            schema[i] = ReadColor(stream);

        return schema;
    }

    private static void WriteColor(MemoryStream stream, Rgba32 color)
    {
        stream.WriteByte(color.B);
        stream.WriteByte(color.G);
        stream.WriteByte(color.R);
    }

    private static Rgba32 ReadColor(MemoryStream stream)
    {
        var (b,g,r) = (stream.ReadByte(), stream.ReadByte(), stream.ReadByte());
        return new Rgba32(r,g,b);
    }
}