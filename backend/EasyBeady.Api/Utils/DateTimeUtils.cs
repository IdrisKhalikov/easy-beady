using System.Globalization;

namespace EasyBeady.Api.Utils;

public static class DateTimeUtils
{
    public static string ToSortableDateString(this DateTimeOffset dt) => dt.ToString("s", CultureInfo.InvariantCulture);
    public static string ToSortableDateString(this DateTime dt) => dt.ToString("s", CultureInfo.InvariantCulture);

    public static DateTimeOffset FromSortableDateTimeOffset(this string dt) => DateTimeOffset.ParseExact(dt, "s", CultureInfo.InvariantCulture);
    public static DateTime FromSortableDateTime(this string dt) => DateTime.ParseExact(dt, "s", CultureInfo.InvariantCulture);
}