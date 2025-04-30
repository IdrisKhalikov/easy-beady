namespace EasyBeady.Api.Services.Helpers;

public static class SchemaConverter
{
    public static byte[] ToBinary(int[][] schema)
    {
        var resultStream = new MemoryStream();
        WriteInt(resultStream, schema.Length);
        for(var i = 0; i < schema.Length; i++)
        {
            var arr = schema[i];
            WriteInt(resultStream, arr.Length);
            for(var j = 0; j < arr.Length; j++)
                WriteRgb(resultStream, arr[j]);
        }

        return resultStream.ToArray();
    }

    public static int[][] FromBinary(byte[] data)
    {
        var stream = new MemoryStream(data);
        var height = ReadInt(stream);
        var schema = new int[height][];
        for (var i = 0; i < height; i++)
        {
            var arr = new int[ReadInt(stream)];
            for (var j = 0; j < arr.Length; j++)
                arr[j] = ReadRgb(stream);
            schema[i] = arr;
        }

        return schema;
    }

    private static void WriteInt(MemoryStream stream, int value)
    {
        stream.WriteByte((byte)(value >> 24));
        stream.WriteByte((byte)(value >> 16));
        stream.WriteByte((byte)(value >> 8));
        stream.WriteByte((byte)value);
    }

    private static void WriteRgb(MemoryStream stream, int color)
    {
        stream.WriteByte((byte)(color >> 16));
        stream.WriteByte((byte)(color >> 8));
        stream.WriteByte((byte)color);
    }

    private static int ReadInt(MemoryStream stream)
    {
        return stream.ReadByte() << 24
               | stream.ReadByte() << 16
               | stream.ReadByte() << 8
               | stream.ReadByte();
    }

    private static int ReadRgb(MemoryStream stream)
    {
        return stream.ReadByte() << 16
                | stream.ReadByte() << 8
                | stream.ReadByte();
    }
}