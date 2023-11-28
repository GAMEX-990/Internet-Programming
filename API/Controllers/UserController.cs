using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

// [ApiController]
// [Route("api/[controller]")] // [controller] = Users, (UsersController - Controller = User), ~route = /api/users
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
        [HttpGet]
    public ActionResult< IEnumerable<AppUser> > GetUsers()
    {
        return _dataContext.Users.ToList();
    }

    [HttpGet("{id}")] //endpoint: /api/users/25         ,when id = 25
    public ActionResult<AppUser?> GetUser(int id)
    {
        return _dataContext.Users.Find(id);
    }
}
