import {configureStore} from '@reduxjs/toolkit'
import homeReducer from '../feature/HomePageSlice'
import currentReducer from '../feature/CurrentSlice'
import playlistReducer from '../feature/PlaylistSlice'
import searchReducer from '../feature/SearchSlice'
import ArtistPageReducer from '../feature/ArtistPageSlice'
import AlbumPageReducer from '../feature/AlbumPageSlice'
import PodcastReducer from '../feature/PodcastSlice'
// import currentTrackSoundReducer from '../feature/CurrentSongSlice'

const store = configureStore({
    reducer: {
        homePage: homeReducer,
        currentState: currentReducer,
        playlistPage: playlistReducer,
        searchPage: searchReducer,
        artistPage: ArtistPageReducer,
        albumPage: AlbumPageReducer,
        podcastPage: PodcastReducer
    }
})

export default store