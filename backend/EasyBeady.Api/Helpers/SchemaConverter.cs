using System.Drawing;

namespace EasyBeady.Api.Helpers;

public static class SchemaConverter
{
    public static byte[] ToBinary(Color[] schema)
    {
        var resultStream = new MemoryStream();
        for(var i = 0; i < schema.Length; i++)
            WriteColor(resultStream, schema[i]);

        return resultStream.ToArray();
    }

    public static Color[] FromBinary(byte[] data)
    {
        var stream = new MemoryStream(data);
        var schema = new Color[data.Length / 3];
        for (var i = 0; i < schema.Length; i++)
            schema[i] = ReadColor(stream);

        return schema;
    }

    private static void WriteColor(MemoryStream stream, Color color)
    {
        var colorValue = color.ToArgb();
        stream.WriteByte((byte)(colorValue >> 16));
        stream.WriteByte((byte)(colorValue >> 8));
        stream.WriteByte((byte)colorValue);
    }

    private static Color ReadColor(MemoryStream stream)
    {
        var colorValue =  stream.ReadByte() << 16
                          | stream.ReadByte() << 8
                          | stream.ReadByte();
        return Color.FromArgb(colorValue);
    }
}