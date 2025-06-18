using System.Text.Json;
using System.Text.Json.Serialization;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace EasyBeady.Api.Utils;

public class ColorJsonConverter : JsonConverter<Rgba32>
{
    public override Rgba32 Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value = (uint)reader.GetInt32();
        return new Rgba32((byte)(value >> 16), (byte)(value >> 8), (byte)value);
    }

    public override void Write(Utf8JsonWriter writer, Rgba32 value, JsonSerializerOptions options)
    {
        var convertedValue = value.R << 16 | value.G << 8 | value.B;
        writer.WriteNumberValue(convertedValue);
    }
}