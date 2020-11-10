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
    public class TyresSizesController : ControllerBase
    {
        private readonly tyresDBContext _context;

        public TyresSizesController(tyresDBContext context)
        {
            _context = context;
        }

        // GET: api/TyresSizes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TyresSizes>>> GetTyresSizes()
        {
            return await _context.TyresSizes.ToListAsync();
        }

        [HttpPost, Route("GetTyresSizeById")]
        public async Task<ActionResult<TyresSizes>> GetTyresSizeById([FromBody] int id)
        {
            var sizes = await _context.TyresSizes.FindAsync(id);

            if (sizes == null)
            {
                return NotFound();
            }

            return sizes;
        }

        [HttpPost, Route("DeleteTyresSizeById")]
        public async Task<ActionResult<IEnumerable<TyresSizes>>> DeleteTyresSizeById([FromBody] int id)
        {
            var sizes = await _context.TyresSizes.FindAsync(id);
            if (sizes == null)
            {
                return NotFound();
            }

            _context.TyresSizes.Remove(sizes);
            await _context.SaveChangesAsync();

            return await _context.TyresSizes.ToListAsync();
        }

        [HttpPost, Route("UpdateTyresSize")]
        public async Task<ActionResult<IEnumerable<TyresSizes>>> UpdateTyresSize([FromBody] TyresSizes size)
        {
            _context.Entry(size).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TyresSizesExists(size.Id))
                {
                    return NotFound();
                }
                else
                    throw;
            }

            return await _context.TyresSizes.ToListAsync();
        }

        [HttpPost, Route("CreateTyresSize")]
        public async Task<ActionResult<IEnumerable<TyresSizes>>> CreateTyresSize([FromBody] TyresSizes size)
        {
            size.Id = size.Id > 0 ? size.Id : _context.Tyres.ToList().Last().Id + 1;

            _context.TyresSizes.Add(size);
            _context.Database.OpenConnection();
            _context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT tyres_sizes ON");

            await _context.SaveChangesAsync();

            _context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT tyres_sizes OFF");

            return await _context.TyresSizes.ToListAsync();
        }

        private bool TyresSizesExists(int id)
        {
            return _context.TyresSizes.Any(e => e.Id == id);
        }
    }
}
