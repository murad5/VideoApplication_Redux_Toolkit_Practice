import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTags } from './tagsAPI';


export const initialState = {
    tags: [],
    isLoading: false,
    isError: false,
    error: ''
}
   
export const fetchTags = createAsyncThunk(
    'tags/fetchTags',
    async () => {
        const tags = await getTags();

        return tags;

    }

)


export const tagsSlice = createSlice(
    {
        name: 'tags',
        initialState,
        extraReducers: (builder) =>{
            builder
            .addCase(fetchTags.pending, (state) => {
                state.isLoading = true;
                state.isError = false;


            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tags = action.payload;
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.isLoading = false;
                state.tags = [];
                state.isError = true;
                state.error = action.error?.message;
            })
        }

    }
   

)

export default tagsSlice.reducer;