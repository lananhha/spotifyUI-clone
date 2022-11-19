import getOverviewArtist from "../api/getOverviewArtist";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    artistId: null,
    metaDataArtistPage: {},
    loading: true
}

export const fetchOverviewArtist = createAsyncThunk('ArtistPage/fetchOverviewArtist', async (artistId) => {
    const data = await getOverviewArtist(artistId)
    return data
})

const ArtistPageSlice = createSlice({
    name: 'artistPage',
    initialState,
    reducers: {
        getArtistId (state, action) {
            state.artistId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOverviewArtist.fulfilled, (state, action) => {
            state.metaDataArtistPage = action.payload
            state.loading = false
        })
        builder.addCase(fetchOverviewArtist.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchOverviewArtist.rejected, (state, action) => {
            state.loading = true
        })
    }
})

const ArtistPageReducer = ArtistPageSlice.reducer
export const {getArtistId} = ArtistPageSlice.actions
export default ArtistPageReducer