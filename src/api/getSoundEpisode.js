import axios from "axios";

const options = (episodeId) => ({
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/episode/details',
    params: {episodeId: episodeId},
    headers: {
      'X-RapidAPI-Key': '5fd18c1277msh15e13549299159bp19930bjsn0e62ad7422fe',
      'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
    }
  });

const getSoundEpisode = async (episodeId) => {
    const response = await axios.request(options(episodeId))
    const data = response.status === 200 ? response.data : {}
    return data
}

export default getSoundEpisode
  