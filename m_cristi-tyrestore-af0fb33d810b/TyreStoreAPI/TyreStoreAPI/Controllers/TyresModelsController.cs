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
    public class TyresModelsController : ControllerBase
    {
        private readonly tyresDBContext _context;

        public TyresModelsController(tyresDBContext context)
        {
            _context = context;
        }

        // GET: api/TyresModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TyresModels>>> GetTyresModels()
        {
            return await _context.TyresModels.ToListAsync();
        }

        [HttpPost, Route("GetTyresModelById")]
        public async Task<ActionResult<TyresModels>> GetTyresModelById([FromBody] int id)
        {
            var models = await _context.TyresModels.FindAsync(id);

            if (models == null)
            {
                return NotFound();
            }

            return models;
        }

        [HttpPost, Route("DeleteTyresModelById")]
        public async Task<ActionResult<IEnumerable<TyresModels>>> DeleteTyresModelById([FromBody] int id)
        {
            var models = await _context.TyresModels.FindAsync(id);
            if (models == null)
            {
                return NotFound();
            }

            _context.TyresModels.Remove(models);
            await _context.SaveChangesAsync();

            return await _context.TyresModels.ToListAsync();
        }

        [HttpPost, Route("UpdateTyresModel")]
        public async Task<ActionResult<IEnumerable<TyresModels>>> UpdateTyresModel([FromBody] TyresModels model)
        {
            _context.Entry(model).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TyresModelsExists(model.Id))
                {
                    return NotFound();
                }
                else
                    throw;
            }

            return await _context.TyresModels.ToListAsync();
        }

        [HttpPost, Route("CreateTyresModel")]
        public async Task<ActionResult<IEnumerable<TyresModels>>> CreateTyresModel([FromBody] TyresModels model)
        {
            model.Id = model.Id > 0 ? model.Id : _context.TyresModels.ToList().Last().Id + 1;

            _context.TyresModels.Add(model);
            _context.Database.OpenConnection();
            _context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT tyres_models ON");

            await _context.SaveChangesAsync();

            _context.Database.ExecuteSqlCommand("SET IDENTITY_INSERT tyres_models OFF");

            return await _context.TyresModels.ToListAsync();
        }

        private bool TyresModelsExists(int id)
        {
            return _context.TyresModels.Any(e => e.Id == id);
        }
    }
}
