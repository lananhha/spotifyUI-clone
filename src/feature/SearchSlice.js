import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import searchData from "../api/searchData";

const initialState={
    dataSearch: {},
    keySearch: '',
    isSearch: true,
}

export const searchByName = createAsyncThunk('searchPage/searchByName', async (name) => {
    const data = await searchData(name)
    return data
})

const searchSlice = createSlice({
    name:'searchPage',
    initialState,
    reducers: {
        updateKeySearch(state, action) {
            state.keySearch = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(searchByName.fulfilled, (state, action) => {
            state.dataSearch = action.payload
            state.isSearch = false
        })
        builder.addCase(searchByName.rejected, (state, action) => {
            state.isSearch = true
        })
        builder.addCase(searchByName.pending, (state, action) => {
            state.isSearch = true
        })
    }
})

const searchReducer = searchSlice.reducer
export const {updateKeySearch} = searchSlice.actions
export default searchReducer