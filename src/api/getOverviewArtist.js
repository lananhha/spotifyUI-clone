import axios from "axios";

const options = (artistId) =>  ({
  method: 'GET',
  url: 'https://spotify-scraper.p.rapidapi.com/v1/artist/overview',
  params: {artistId: artistId},
  headers: {
    'X-RapidAPI-Key': '5fd18c1277msh15e13549299159bp19930bjsn0e62ad7422fe',
    'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
  }
});

const getOverviewArtist = async (artistId) => {
    const response = await axios.request(options(artistId))
    const result = response.status === 200 ? response.data : {}
    return result
}
export default getOverviewArtist
