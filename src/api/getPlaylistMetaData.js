import axios from "axios";

const options = (playlistId) => ({
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/playlist/metadata',
    params: { playlistId: playlistId },
    headers: {
        'X-RapidAPI-Key': '5fd18c1277msh15e13549299159bp19930bjsn0e62ad7422fe',
        'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
    }
});


const getPlaylistMetaData = async (playlistId) => {
    const response = await axios.request(options(playlistId));
    const result = response.status === 200 ? response.data : {};
    return result;
}
export const api = {getPlaylistMetaData}

