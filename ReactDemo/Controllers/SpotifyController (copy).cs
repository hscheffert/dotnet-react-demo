using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System;

namespace ReactDemo.Controllers
{
    [ApiController]
    [Route("api/spotify")]
    public class SpotifyControllerX : ControllerBase
    {
        private readonly ILogger<SpotifyControllerX> _logger;
        private static readonly HttpClient client = new HttpClient();
        private readonly string ClientID = "abc52fe1958c4015a2642c5ed78be886";

        public SpotifyControllerX(ILogger<SpotifyControllerX> logger)
        {
            _logger = logger;
            client.BaseAddress = new Uri("https://api.spotify.com");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/vnd.github.v3+json"));
            client.DefaultRequestHeaders.Add("User-Agent", ".NET Foundation Repository Reporter");
        }


        [HttpGet]
        public async Task<List<Repository>> GetRepos()
        {
            var stream = client.GetStreamAsync("https://api.github.com/orgs/dotnet/repos");
            return await JsonSerializer.DeserializeAsync<List<Repository>>(await stream);
        }
    }
}
