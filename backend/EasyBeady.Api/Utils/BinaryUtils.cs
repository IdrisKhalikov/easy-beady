using System.Collections;
using System.IO.Compression;

namespace EasyBeady.Api.Utils;

public static class BinaryUtils
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

    public static byte[] ConvertBoolArrayToBinary(bool[] arr)
    {
        var result = new byte[arr.Length / 8 + (arr.Length % 8 != 0 ? 1 : 0)];
        new BitArray(arr).CopyTo(result, 0);
        return result;
    }

    public static bool[] ConvertBinaryToBoolArray(byte[] arr, int length)
    {
        var result = new bool[arr.Length * 8];
        new BitArray(arr).CopyTo(result, 0);
        return result[..length];
    }
}