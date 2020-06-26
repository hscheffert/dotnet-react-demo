using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace ReactDemo.Controllers
{
    [ApiController]
    [Route("api/repositories")]
    public class GithubController : ControllerBase
    {
        private readonly ILogger<GithubController> _logger;
        private readonly HttpClient client = new HttpClient();

        public GithubController(ILogger<GithubController> logger)
        {
            _logger = logger;
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
