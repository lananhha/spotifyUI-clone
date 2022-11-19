import axios from "axios";

const options = (showId) =>  ({
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/show/metadata',
    params: {showId: showId},
    headers: {
      'X-RapidAPI-Key': '5fd18c1277msh15e13549299159bp19930bjsn0e62ad7422fe',
      'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
    }
});

const getDataMetaPodcast = async (showId) => {
    const response = await axios.request(options(showId))
    const result = response.status === 200 ? response.data : {}
    return result
} 

export default getDataMetaPodcast
  