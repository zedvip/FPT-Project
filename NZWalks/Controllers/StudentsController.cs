using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NZWalks.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        // GET: https://localhost:portnumber/api/students
        [HttpGet]
        public IActionResult GetALLStudents()
        {
            string[] studentNames = new string[] { " Vu", "Duy", "Duong" };
            return Ok(studentNames);
        }
    }
}