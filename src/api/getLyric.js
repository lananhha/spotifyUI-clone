import axios from "axios";

const options = (trackId) => ({
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/track/lyrics',
    params: {trackId: trackId},
    headers: {
      'X-RapidAPI-Key': '5fd18c1277msh15e13549299159bp19930bjsn0e62ad7422fe',
      'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
    }
  });

const getLyric = async (trackId) => {
  const response = await axios.request(options(trackId))
  const result = response.status === 200 ? response.data : false
  return result
} 

export default getLyric