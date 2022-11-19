import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {Suspense, lazy} from 'react';
import { useSelector } from 'react-redux';

import MainLayout from "./layout/MainLayout";
const SearchPage = lazy(() => import('./pages/SearchPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const LovedSongPage = lazy(() => import('./pages/LovedSongPage'))
const PlaylistPage = lazy(() => import('./pages/PlaylistPage'))
const AllResultSearch = lazy (() => import('./modules/search/router-search-page/AllResultSearch'))
const ArtistResultSearch = lazy(() => import('./modules/search/router-search-page/ArtistResultSearch'))
const AlbumResultSearch = lazy(() => import('./modules/search/router-search-page/AlbumResultSearch'))
const GenresResultSearch = lazy(() => import('./modules/search/router-search-page/GenresResultSearch'))
const PlaylistResultSearch = lazy(() => import('./modules/search/router-search-page/PlaylistResultSearch'))
const PodcastAndEpisodesResult = lazy(() => import('./modules/search/router-search-page/PodcastAndEpisodesResult'))
const SongResultSearch = lazy(() => import('./modules/search/router-search-page/SongResultSearch'))
const UserResultSearch = lazy(() => import('./modules/search/router-search-page/UserResultSearch'))
const ArtistPage = lazy(() => import('./pages/ArtistPage'))
const AlbumPage = lazy(() => import('./pages/AlbumPage'))
const PodcastPage = lazy(() => import('./pages/PodcastPage'))
function App() {
  return (
    <Suspense>
     <Router>
        <div className="App w-full">
          <Routes>
            <Route element={<MainLayout />}>
              <Route path='/' element={<HomePage/>}></Route>
              <Route path='/search' element={<SearchPage />}>
                <Route index element={<AllResultSearch />}></Route>
                <Route path='artists' element={<ArtistResultSearch />}></Route>
                <Route path='songs' element={<SongResultSearch />}></Route>
                <Route path='playlists' element={<PlaylistResultSearch/>}></Route>
                <Route path='albums' element={<AlbumResultSearch />}></Route>
                <Route path='podcastAndEpisodes' element={<PodcastAndEpisodesResult />}></Route>
                <Route path='genres' element={<GenresResultSearch />}></Route>
                <Route path='users' element={<UserResultSearch />}></Route>
              </Route>
              <Route path='/podcast/:id' element={<PodcastPage />}></Route>
              <Route path='/artist/:id' element={<ArtistPage />}></Route>
              <Route path='/album/:id' element={<AlbumPage />}></Route>
              <Route path='/love-song' element={<LovedSongPage />}></Route>
              <Route path='/playlist/:id' element={<PlaylistPage />}></Route>
            </Route>
          </Routes>
        </div>
     </Router>
    </Suspense>
  );
}

export default App;
