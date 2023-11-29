using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

// [ApiController]
// [Route("api/[controller]")] // [controller] = Users, (UsersController - Controller = User), ~route = /api/users
[Authorize]
public class UsersController : BaseApiController
{
    private readonly DataContext _dataContext;
    //snipper: ctor
    //inject DataContext
    public UsersController(DataContext dataContext)
    {
        //putting cursor inside dataContext (ctor parameter) `ctrl+.` then select `create and assign feild`
        _dataContext = dataContext;
    }

    public DataContext DataContext => _dataContext;
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        return await _dataContext.Users.ToListAsync();
    }
    [Authorize]
    [HttpGet("{id}")] //endpoint: /api/users/25         ,when id = 25
    public ActionResult<AppUser?> GetUser(int id)
    {
        return _dataContext.Users.Find(id);
    }
}
