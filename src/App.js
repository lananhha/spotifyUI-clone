import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Suspense, } from 'react';

import MainLayout from "./layout/MainLayout";
import Playlist from './pages/PlaylistPage';
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import PodcastPage from './pages/PodcastPage'
import ArtistPage from './pages/ArtistPage'
import AlbumPage from './pages/AlbumPage'
import LovedSongPage from './pages/LovedSongPage'
import LyricPage from './pages/LyricPage';
import AllResultSearch from './modules/search/router-search-page/AllResultSearch'
import ArtistResultSearch from './modules/search/router-search-page/ArtistResultSearch'
import AlbumResultSearch from './modules/search/router-search-page/AlbumResultSearch'
import GenresResultSearch from './modules/search/router-search-page/GenresResultSearch'
import PlaylistResultSearch from './modules/search/router-search-page/PlaylistResultSearch'
import PodcastAndEpisodesResult from './modules/search/router-search-page/PodcastAndEpisodesResult'
import SongResultSearch from './modules/search/router-search-page/SongResultSearch'
import UserResultSearch from './modules/search/router-search-page/UserResultSearch'

function App() {
  return (
    <Suspense>
      <Router>
        <div className="App w-full">
          <MainLayout />
          <Routes>
            <Route path='/' index element={<HomePage />}></Route>
            <Route path='/search' element={<SearchPage />}>
              <Route index element={<AllResultSearch />}></Route>
              <Route path='artists' element={<ArtistResultSearch />}></Route>
              <Route path='songs' element={<SongResultSearch />}></Route>
              <Route path='playlists' element={<PlaylistResultSearch />}></Route>
              <Route path='albums' element={<AlbumResultSearch />}></Route>
              <Route path='podcastAndEpisodes' element={<PodcastAndEpisodesResult />}></Route>
              <Route path='genres' element={<GenresResultSearch />}></Route>
              <Route path='users' element={<UserResultSearch />}></Route>
            </Route>
            <Route path='/podcast/:id' element={<PodcastPage />}></Route>
            <Route path='/artist/:id' element={<ArtistPage />}></Route>
            <Route path='/album/:id' element={<AlbumPage />}></Route>
            <Route path='/love+song' element={<LovedSongPage />}></Route>
            <Route path='/playlist/:id' element={<Playlist />}></Route>
            <Route path='/lyric' element={<LyricPage />}></Route>
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
