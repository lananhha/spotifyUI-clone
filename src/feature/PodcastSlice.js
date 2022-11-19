import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getDataMetaPodcast from "../api/getMetaDataPodcast";
import getListPodcastEpisodes from "../api/getListPodcastEpisodes";
import getSoundEpisode from "../api/getSoundEpisode";

const initialState = {
    metaDataPodcast: {},
    listPodcastEpisodes: [],
    soundEpisodeInfo: {},
    loading: true,
    loadingListPodcastEpisodes: true,
    loadingSound: true
}

export const fetchMetaDataPodcast = createAsyncThunk('podcastPage/fetchMetaDataPodcast', async (showId) => {
    const data = await getDataMetaPodcast(showId)
    return data
})

export const fetchListPodcastEpisodes = createAsyncThunk('podcastPage/fetchListPodcastEpisodes', async (showId) => {
    const data = await getListPodcastEpisodes(showId)
    if(data.episodes.items.length > 30) {
        return data.episodes.items.slice(0,30)
    }
    return data.episodes.items
})

export const fetchSoundEpisode = createAsyncThunk('podcastPage/fetchSoundEpisode', async (episodeId) => {
    const data = await getSoundEpisode(episodeId)
    return data
})

const PodcastSlice = createSlice({
    name: 'podcastSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMetaDataPodcast.fulfilled, (state, action) => {
            state.metaDataPodcast = action.payload
            state.loading = false
        })
        builder.addCase(fetchMetaDataPodcast.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchMetaDataPodcast.rejected, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchListPodcastEpisodes.fulfilled, (state, action) => {
            state.listPodcastEpisodes = action.payload
            state.loadingListPodcastEpisodes = false
        })
        builder.addCase(fetchListPodcastEpisodes.pending, (state, action) => {
            state.loadingListPodcastEpisodes = true
        })
        builder.addCase(fetchListPodcastEpisodes.rejected, (state, action) => {
            state.loadingListPodcastEpisodes = true
        })
        builder.addCase(fetchSoundEpisode.fulfilled, (state, action) => {
            state.soundEpisodeInfo = action.payload
            state.loadingSound = false
        })
        builder.addCase(fetchSoundEpisode.pending, (state, action) => {
            state.loadingSound = true
        })
        builder.addCase(fetchSoundEpisode.rejected, (state, action) => {
            state.loadingSound = true
        })
    }
})

const PodcastReducer = PodcastSlice.reducer
export default PodcastReducer