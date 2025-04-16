using System.IO.Compression;

namespace EasyBeady.Api.Utils;

public static class CompressionUtils
{
    public static byte[] Compress(byte[] data)
    {
        using var resultStream = new MemoryStream();
        using var compressionStream = new GZipStream(resultStream, CompressionLevel.Optimal);
        compressionStream.Write(data, 0, data.Length);
        compressionStream.Close();
        return resultStream.ToArray();
    }

    public static byte[] Decompress(byte[] data)
    {
        using var inputStream = new MemoryStream(data);
        using var decompressionStream = new GZipStream(inputStream, CompressionMode.Decompress);
        using var resultStream = new MemoryStream();
        decompressionStream.CopyTo(resultStream);
        return resultStream.ToArray();
    }
}