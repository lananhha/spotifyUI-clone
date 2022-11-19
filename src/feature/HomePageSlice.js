import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api/getHome'

const initialState = {
    dataHomePage: [],
    loading: true
}

export const fetchHomePage = createAsyncThunk('homePage/getDataHomePage', async () => {
    const data = await api.getHome()
    if (data.hasOwnProperty('genres')) {
        return data.genres
    }
})

const homePageSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchHomePage.fulfilled, (state, action) => {
            state.dataHomePage = action.payload
            state.loading = false
        })
        builder.addCase(fetchHomePage.pending, (state, action) => {
            state.loading = true
        })
        builder.addCase(fetchHomePage.rejected, (state, action) => {
            state.loading = true
        })
    }
})

const homeReducer = homePageSlice.reducer
export default homeReducer