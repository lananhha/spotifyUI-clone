import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getMetaDataAlbum from "../api/getMetaDataAlbum";
import getListTrackAlbum from "../api/getListTrackAlbum";

const initialState = {
    metaDataAlbumPage: {},
    listTrackAlbum: [],
    loading: true,
    loadingTrack: true
}

export const fetchMetaDataAlbumPage = createAsyncThunk('albumPage/fetchMetaDataAlbumPage', async (albumId) => {
    const data = await getMetaDataAlbum(albumId)
    return data
})

export const fetchListTrackAlbum = createAsyncThunk('albumPage/fetchListTrackAlbum', async (albumId) => {
    const data = await getListTrackAlbum(albumId)
    return data.tracks.items
})
const AlbumPageSlice = createSlice({
    name: 'albumPage',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchMetaDataAlbumPage.fulfilled, (state, action) => {
            state.metaDataAlbumPage = action.payload
            state.loading = false
        })
        builder.addCase(fetchMetaDataAlbumPage.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchMetaDataAlbumPage.rejected, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchListTrackAlbum.fulfilled, (state, action) => {
            state.listTrackAlbum = action.payload
            state.loadingTrack = false
        })
        builder.addCase(fetchListTrackAlbum.pending, (state, action) => {
            state.loadingTrack = true
        })
        builder.addCase(fetchListTrackAlbum.rejected, (state, action) => {
            state.loadingTrack = true
        })
    }
})

const AlbumPageReducer = AlbumPageSlice.reducer
export default AlbumPageReducer