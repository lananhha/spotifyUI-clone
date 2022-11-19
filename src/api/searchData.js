import axios from "axios";

const options = (name, limit = 50) => ({
  method: 'GET',
  url: 'https://spotify-scraper.p.rapidapi.com/v1/search',
  params: {term: name, limit: limit},
  headers: {
    'X-RapidAPI-Key': '5fd18c1277msh15e13549299159bp19930bjsn0e62ad7422fe',
    'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
  }
});

const searchData = async (name) => {
    const response = await axios.request(options(name))
    const result = response.status === 200 ? response.data : {}
    return result
}

export default searchData