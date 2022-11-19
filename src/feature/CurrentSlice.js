import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import getTrackSound from '../api/getTrackSound'
const initialState = {
    currentPlaylistId: null,
    currentPlaylistPlaying: [],
    currentTrackId: null,
    currentTime: 0,
    currentIndexSong: 0,
    currentTrackSoundInfo: {},
    currentVolume: 0.5,
    prevVolume: null,
    loadingSound: true,
    listSongPlayed: [],
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isBack: false,
    isMute: false
}

export const fetchTrackSound = createAsyncThunk('nowPlaying/fetchTrackSound', async (trackId) => {
    const data = await getTrackSound(trackId)
    return data
})

const CurrentSlice = createSlice({
    name: 'nowPlay',
    initialState,
    reducers: {
        addCurrentPlaylist(state, action) {
            state.currentPlaylistId = action.payload
            localStorage.setItem("spotify_nowplay", JSON.stringify(state))
        },
        updateCurrentTrackId(state, action) {
            state.currentTrackId = action.payload
            localStorage.setItem("spotify_nowplay", JSON.stringify(state))
        },
        clickPlayButton(state, action) {
            state.isPlaying = true
            localStorage.setItem("spotify_nowplay", JSON.stringify(state))
        },
        clickPauseButton(state, action){
            state.isPlaying = false
            localStorage.setItem("spotify_nowplay", JSON.stringify(state))
        },
        updateListSongPlayed(state, action) {
            state.listSongPlayed.push(action.payload)
            localStorage.setItem("spotify_nowplay", JSON.stringify(state))
        },
        setCurrentTime(state, action) {
            state.currentTime = action.payload
            localStorage.setItem("spotify_nowplay", JSON.stringify(state))
        },
        clickRandomButton(state, action) {
            state.isRandom = !state.isRandom
            localStorage.setItem("spotify_nowplay", JSON.stringify(state))
        },
        clickRepeatButton(state, action) {
            state.isRepeat = !state.isRepeat
            localStorage.setItem("spotify_nowplay", JSON.stringify(state))
        },
        updateCurrentIndexSong(state, action) {
            state.currentIndexSong = action.payload
            localStorage.setItem("spotify_nowplay", JSON.stringify(state))
        },
        updateCurrentPlaylistPlaying(state, action) {
            state.currentPlaylistPlaying = action.payload
            localStorage.setItem("spotify_nowplay", JSON.stringify(state))
        },
        updateVolume(state, action) {
            state.currentVolume = action.payload
            localStorage.setItem("spotify_nowplay", JSON.stringify(state))
        },
        clickMuteButton(state, action) {
            state.isMute = !state.isMute
            localStorage.setItem("spotify_nowplay", JSON.stringify(state))
        },
        getPrevVolume(state, action) {
            state.prevVolume = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTrackSound.fulfilled, (state, action) => {
            state.currentTrackSoundInfo = action.payload
            state.loadingSound = false
        })
        builder.addCase(fetchTrackSound.pending, (state, action) => {
            state.loadingSound = true
        })
        builder.addCase(fetchTrackSound.rejected, (state, action) => {
            state.loadingSound = true
        })
    }
})

const {actions, reducer} = CurrentSlice
export const {
                addCurrentPlaylist,
                clickPlayButton,
                clickPauseButton, 
                updateCurrentTrackId, 
                updateListSongPlayed, 
                updateCurrentIndexSong,
                setCurrentTime, 
                clickRandomButton, 
                clickRepeatButton, 
                updateCurrentPlaylistPlaying,
                updateVolume,
                clickMuteButton,
                getPrevVolume} = actions
export default reducer