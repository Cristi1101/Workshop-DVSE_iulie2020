using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TyreStoreAPI.Models;

namespace TyreStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleManufacturersController : ControllerBase
    {
        private readonly tyresDBContext _context;

        public VehicleManufacturersController(tyresDBContext context)
        {
            _context = context;
        }

        // GET: api/VehicleManufacturers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleManufacturers>>> GetVehicleManufacturers()
        {
            return await _context.VehicleManufacturers.ToListAsync();
        }

        [HttpPost, Route("GetVehicleManufacturerById")]
        public async Task<ActionResult<VehicleManufacturers>> GetVehicleManufacturerById([FromBody] int id)
        {
            var manufacturers = await _context.VehicleManufacturers.FindAsync(id);

            if (manufacturers == null)
            {
                return NotFound();
            }

            return manufacturers;
        }

        [HttpPost, Route("DeleteVehicleManufacturerById")]
        public async Task<ActionResult<IEnumerable<VehicleManufacturers>>> DeleteVehicleManufacturerById([FromBody] int id)
        {
            var manufacturers = await _context.VehicleManufacturers.FindAsync(id);
            if (manufacturers == null)
            {
                return NotFound();
            }

            _context.VehicleManufacturers.Remove(manufacturers);
            await _context.SaveChangesAsync();

            return await _context.VehicleManufacturers.ToListAsync();
        }

        [HttpPost, Route("UpdateVehicleManufacturer")]
        public async Task<ActionResult<IEnumerable<VehicleManufacturers>>> UpdateVehicleManufacturer([FromBody] VehicleManufacturers manufacturer)
        {
            _context.Entry(manufacturer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleManufacturersExists(manufacturer.Id))
                {
                    return NotFound();
                }
                else
                    throw;
            }

            return await _context.VehicleManufacturers.ToListAsync();
        }

        [HttpPost, Route("CreateVehicleManufacturer")]
        public async Task<ActionResult<IEnumerable<VehicleManufacturers>>> CreateVehicleManufacturer([FromBody] VehicleManufacturers manufacturer)
        {
            manufacturer.Id = manufacturer.Id > 0 ? manufacturer.Id : _context.VehicleManufacturers.ToList().Last().Id + 1;

            _context.VehicleManufacturers.Add(manufacturer);
            _context.Database.OpenConnection();
            _context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT vehicle_manufacturers ON");

            await _context.SaveChangesAsync();

            _context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT vehicle_manufacturers OFF");

            return await _context.VehicleManufacturers.ToListAsync();
        }

        private bool VehicleManufacturersExists(int id)
        {
            return _context.VehicleManufacturers.Any(e => e.Id == id);
        }
    }
}
