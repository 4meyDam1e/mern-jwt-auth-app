import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalsService from "./goalsService";

const initialState = {
    goals: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ""
};

// Create new goal
export const createGoal = createAsyncThunk("goals/create", async (goal, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalsService.createGoal(goal, token);
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get user goals
export const getGoals = createAsyncThunk("goals/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user?.token;
        return await goalsService.getGoals(token);
    } catch (error) {
        const message = (error.response && 
            error.response.data && 
            error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const goalsSlice = createSlice({
    name: "goals",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload);
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const { reset } = goalsSlice.actions;
export default goalsSlice.reducer;