import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {BASE_API_URL} from "../../constants/baseApiUrl";

export const getMasters = createAsyncThunk(
    'masters/all',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.get(BASE_API_URL + "/masters/")
            const {data} = response
            if (response.status === 200) {
                return [...data];
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)

export const createMaster = createAsyncThunk(
    'masters/create',
    async ({payload}, thunkAPI) => {
        try {
            const response = await axios.post(BASE_API_URL + "/masters/", payload, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const {data} = response
            if (response.status === 200) {
                return {...payload, ...data};
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)
export const updateMaster = createAsyncThunk(
    'masters/update',
    async ({id, payload}, thunkAPI) => {
        try {
            const response = await axios.patch(BASE_API_URL + "/masters/" + id, payload,{
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const {data} = response
            if (response.status === 200) {
                return {...payload, ...data};
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)
export const deleteMaster = createAsyncThunk(
    'masters/delete',
    async ({id}, thunkAPI) => {
        try {
            const response = await axios.delete(BASE_API_URL + "/masters/" + id,{
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const {data} = response
            if (response.status === 200) {
                return {id, ...data};
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)

const pending = (state) => {
    state.isSuccess = false
    state.isFetching = true
}

const errored = (state, {payload}) => {
    state.isFetching = false
    state.isSuccess = false
    state.isError = true
    state.errorMessage = payload.message;
}

export const mastersSlice = createSlice({
    name: 'masters',
    initialState: {
        items: [],
        isFetching: false,
        isSuccess: false,
        isError: false,
    },
    extraReducers: {
        [getMasters.rejected]: errored,
        [getMasters.fulfilled]: (state, {payload}) => {
            state.isFetching = false
            state.isSuccess = true
            if (state.isError) state.isError = false
            state.items = payload
        },
        [getMasters.pending]: pending,

        [createMaster.rejected]: errored,
        [createMaster.fulfilled]: (state, {payload}) => {
            state.isFetching = false
            state.isSuccess = true
            if (state.isError) state.isError = false
            state.items.push(payload)
        },
        [createMaster.pending]: pending,

        [updateMaster.rejected]: errored,
        [updateMaster.fulfilled]: (state, {payload}) => {
            state.isFetching = false
            state.isSuccess = true
            if (state.isError) state.isError = false
            const candidate = state.items.find(i => i.id === payload.id)
            const indexOf = state.items.indexOf(candidate)
            if (indexOf > -1) {
                state.items[indexOf] = payload
            }
        },
        [updateMaster.pending]: pending,

        [deleteMaster.rejected]: errored,
        [deleteMaster.fulfilled]: (state, {payload}) => {
            state.isFetching = false
            state.isSuccess = true
            if (state.isError) state.isError = false
            const candidate = state.items.find(i => i.id === payload.id)
            const indexOf = state.items.indexOf(candidate)
            if (indexOf > -1) {
                state.items.splice(indexOf, 1)
            }
        },
        [deleteMaster.pending]: pending,
    }
})

export const mastersSelector = (state) => state.masters.items