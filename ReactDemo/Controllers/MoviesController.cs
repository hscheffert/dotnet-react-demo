using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ReactDemo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MoviesController : ControllerBase
    {

        private readonly ILogger<WeatherForecastController> _logger;

        public MoviesController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        //[HttpGet]
        //public async Task<List<Movie>> Get()
        //{
        //    string url = "http://example.com/movies.json";
        //    //string url = "https://restcountries-v1.p.rapidapi.com/all";

        //    HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, url);
        //    request.Headers.Add("Accept", "application/vnd.github.v3+json");
        //    List<Movie> movieList = new List<Movie>();

        //    using (HttpClient client = new HttpClient())
        //    {
                
        //        using (var response = await client.GetAsync(url))
        //        {
        //            string apiResponse = await response.Content.ReadAsStringAsync();

        //            movieList = JsonConvert.DeserializeObject<List<Movie>>(apiResponse);
                        
        //            Console.WriteLine(movieList);
        //        }
        //    }

        //    return movieList;
        //}
    }
}
