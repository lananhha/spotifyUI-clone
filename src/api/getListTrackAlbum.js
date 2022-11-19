import axios from "axios";

const options = (albumId) =>  ({
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/album/tracks',
    params: {albumId: albumId},
    headers: {
      'X-RapidAPI-Key': '5fd18c1277msh15e13549299159bp19930bjsn0e62ad7422fe',
      'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
    }
  });

const getListTrackAlbum = async (albumId) => {
    const response = await axios.request(options(albumId))
    const result = response.status === 200 ? response.data : {}
    return result
}

export default getListTrackAlbum
  