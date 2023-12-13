﻿using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
#nullable disable
public class ErrorController : BaseApiController
{
    private readonly DataContext dataContext;

    public ErrorController(DataContext dataContext)
    {
        this.dataContext = dataContext;
    }
    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> GetSecret()
    {
        return "xxx";
    }
    [HttpGet("not-found")]
    public ActionResult<AppUser> GetNotFound()
    {
        var user = dataContext.Users.Find(-1);
        if (user is null) return NotFound();
        return user;
    }
    [HttpGet("server-error")]
    public ActionResult<string> GetServerError()
    {
          try
        {
            var user = dataContext.Users.Find(-1);
            var stringUser = user.ToString();
            return stringUser;
        }
        catch (Exception e)
        {
            return StatusCode(500,e.ToString);
        }
    }
    [HttpGet("bad-request")]
    public ActionResult<string> GetBadRequest()
    {
        return BadRequest("illegal request");
    }
}