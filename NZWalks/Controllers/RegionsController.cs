using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NZWalks.API.Data;
using NZWalks.Models.Domain;
using NZWalks.Models.DTO;

namespace NZWalks.Controllers
{
    //https://localhost:1234/api
    [Route("api/[controller]")]
    [ApiController]
    public class RegionsController : ControllerBase
    {
        private readonly NZWalksDbContext dbContext;
        public RegionsController(NZWalksDbContext dbContext)
        {
            this.dbContext = dbContext;
        }





        // GET ALL REGIONS
        // GET: https://localhost:portnumber/api/regions
        [HttpGet]
        public IActionResult GetALL()
        {
            //Get Data From Database - Domain models
            var regionsDomain = dbContext.Regions.ToList();

            // Map Domain Models to DTOs
            var regionsDto = new List<RegionDto>();
            foreach (var regionDomain in regionsDomain)
            {
                regionsDto.Add(new RegionDto()
                {
                    Id = regionDomain.Id,
                    Name = regionDomain.Name,
                    Code = regionDomain.Code,
                    RegionImageUrl = regionDomain.RegionImageUrl,

                });
            }



            // Return DTOs
            return Ok(regionsDto);
        }


        //GET SINGLE REGION (Get Region BY ID)
        //GET:https://localhost:portnumber/api/regions/{id}
        [HttpGet("ById/{id:Guid}")]
        public IActionResult GetById([FromRoute] Guid id)
        {
            //var region = dbContext.Regions.Find(id);
            //Get Region Domain Model From Database

            var regionDomain = dbContext.Regions.FirstOrDefault(x => x.Id == id);

            if (regionDomain == null)
            {
                return NotFound();
            }

            //Map/Convert Region Domain Models to Region DTO
            //
            var regionDto = new RegionDto
            {
                Id = regionDomain.Id,
                Name = regionDomain.Name,
                Code = regionDomain.Code,
                RegionImageUrl = regionDomain.RegionImageUrl,
            };

            //return Dto
            return Ok(regionDto);
        }


        // POST To Create New Region
        // POST: https://localhost:portnumber/api/regions
        [HttpPost]
        public IActionResult Creat([FromBody] AddRegionRequestDto addRegionRequestDto)
        {
            // Map of Convert DTO to Domain Models
            var regionDomainModels = new Region
            {

                Code = addRegionRequestDto.Code,
                Name = addRegionRequestDto.Name,
                RegionImageUrl = addRegionRequestDto.RegionImageUrl,

            };
            // Use Domain Models to create Region
            dbContext.Regions.Add(regionDomainModels);
            dbContext.SaveChanges();

            //Map Domain model back to DTO
            var regionsDto = new RegionDto
            {
                Id = regionDomainModels.Id,
                Name = regionDomainModels.Name,
                Code = regionDomainModels.Code,
                RegionImageUrl = regionDomainModels.RegionImageUrl,
            };




            return CreatedAtAction(nameof(GetById), new { id = regionDomainModels.Id }, regionDomainModels);

        }

        //Update region
        //Put: https://localhost:portnumber/api/regions/{id}

        [HttpPut("{id:Guid}")]
        public IActionResult Update([FromRoute] Guid id, [FromBody] UpdateRegionRequestDto updateRegionRequestDto)
        {
            // Check if region exists
            var regionDomainModel = dbContext.Regions.FirstOrDefault(x => x.Id == id);
            if (regionDomainModel == null)
            {
                return NotFound();
            }

            //Map DTO to Domain model

            regionDomainModel.Code = updateRegionRequestDto.Code;
            regionDomainModel.Name = updateRegionRequestDto.Name;
            regionDomainModel.RegionImageUrl = updateRegionRequestDto.RegionImageUrl;

            dbContext.SaveChanges();

            //Convert Domain Model to DTO
            var regionDto = new RegionDto
            {
                Id = regionDomainModel.Id,
                Name = regionDomainModel.Name,
                Code = regionDomainModel.Code,
                RegionImageUrl = regionDomainModel.RegionImageUrl,
            };


            return Ok(regionDto);
        }

        // Delete Region
        // DELETE :  https://localhost:portnumber/api/regions/{id}
        [HttpDelete("ById/{id:Guid}")]
        public IActionResult Delete([FromRoute] Guid id)
        {
            var regionDomainModel = dbContext.Regions.FirstOrDefault(x => x.Id == id);
            if (regionDomainModel == null)
            {
                return NotFound();
            }

            //delete region
            dbContext.Regions.Remove(regionDomainModel);
            dbContext.SaveChanges();

            //return delete Region back
            //map Domain Model to DTO
            var regionDto = new RegionDto
            {
                Id = regionDomainModel.Id,
                Name = regionDomainModel.Name,
                Code = regionDomainModel.Code,
                RegionImageUrl = regionDomainModel.RegionImageUrl,
            };
            return Ok();
        }


    }
}
