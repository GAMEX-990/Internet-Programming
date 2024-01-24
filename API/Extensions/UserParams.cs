using System;

namespace API.Extensions;

public class UserParams
{
  public int MinAge { get; set; } = 18;
  public int MaxAge { get; set; } = 80;
  private const int MaxPageSize = 50; //ป้องกัน user กำหนด pagesize เยอะเกินไป เช่น ล้านล้าน
  public string CurrentUserName { get; set; }
  public string Gender { get; set; }
  public int PageNumber { get; set; } = 1;
  private int _pageSize = 10;
  public string OrderBy { get; set; } = "lastActive";
  public int PageSize
  {
    get => _pageSize;
    set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
  }
}
