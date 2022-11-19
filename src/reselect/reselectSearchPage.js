import {createSelector} from 'reselect'

const stateSearch = state => state.searchPage

export const metaDataSearch = createSelector(
    stateSearch,
    item => item.dataSearch
)

export const resultArtist = createSelector(
    metaDataSearch,
    item => item.artists
)

export const resultAlbum = createSelector(
    metaDataSearch,
    item => item.albums
)

export const resultPlaylist = createSelector(
    metaDataSearch,
    item => item.playlists
)

export const resultPodcast = createSelector(
    metaDataSearch,
    item => item.podcasts
)

export const resultEpisode = createSelector(
    metaDataSearch,
    item => item.episodes
)

export const resultGenres = createSelector(
    metaDataSearch,
    item => item.genres
)

export const resultProfile = createSelector(
    metaDataSearch,
    item => item.users
)

export const resultSong = createSelector(
    metaDataSearch,
    item => item.tracks
)