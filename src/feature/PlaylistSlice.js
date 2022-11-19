import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api/getPlaylistMetaData';
import getTrackListPlaylist from '../api/getListTrackPlaylist';
const initialState = {
    metadataPlaylistPage: {},
    trackList: [],
    bgHeaderPrimary: false,
    loading: true
}

export const fetchPlaylistMetaData = createAsyncThunk('playlistPage/getDataPlaylistPage', async (playlistId) => {
    const data = await api.getPlaylistMetaData(playlistId);
    return data
})

export const fetchTrackListData = createAsyncThunk('playlistPage/getTrackListData', async (playlistId) => {
    const data = await getTrackListPlaylist(playlistId);
    return data.contents.items
})



const playlistSlice = createSlice({
    name: 'playlistPage',
    initialState,
    reducers: {
        changeBgHeader(state, action) {
            state.bgHeaderPrimary = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPlaylistMetaData.fulfilled, (state, action) => {
            state.metadataPlaylistPage = action.payload
            state.loading = false
        })
        builder.addCase(fetchPlaylistMetaData.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchPlaylistMetaData.rejected, (state, action) => {
            state.loading = false
        })
        builder.addCase(fetchTrackListData.fulfilled, (state, action) => {
            state.trackList = action.payload
        })
    }
})

const playlistReducer = playlistSlice.reducer
export const {changeBgHeader} = playlistSlice.actions
export default playlistReducer