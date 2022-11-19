import {createSelector} from 'reselect'

const stateArtist = state => state.artistPage

export const metaDataArtistPage = createSelector(
    stateArtist,
    item => item.metaDataArtistPage
)

export const discographyArtistPage = createSelector(
    metaDataArtistPage,
    item => item.discography
)

