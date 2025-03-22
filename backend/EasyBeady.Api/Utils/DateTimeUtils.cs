namespace EasyBeady.Api.Utils;

public static class DateTimeUtils
{
    public static string ToSortableDateString(this DateTimeOffset dt) => dt.ToString("s");
}