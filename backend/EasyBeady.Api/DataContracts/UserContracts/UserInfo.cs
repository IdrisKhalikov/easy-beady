using System.Runtime.Serialization;

namespace EasyBeady.Api.DataContracts.UserContracts;

[DataContract(Name = "userInfo", Namespace = "")]
public class UserInfo
{
    [DataMember(Name = "username")]
    public string Username { get; set; }

    [DataMember(Name = "avatarUrl")]
    public string AvatarUrl { get; set; }
}