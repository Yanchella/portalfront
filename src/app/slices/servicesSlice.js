import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {BASE_API_URL} from "../../constants/baseApiUrl";

export const getServices = createAsyncThunk(
    'services/all',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.get(BASE_API_URL + "/services/")
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

export const createService = createAsyncThunk(
    'services/create',
    async ({payload}, thunkAPI) => {
        try {
            const response = await axios.post(BASE_API_URL + "/services/", payload, {
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
export const updateService = createAsyncThunk(
    'services/update',
    async ({id, payload}, thunkAPI) => {
        try {
            const response = await axios.patch(BASE_API_URL + "/services/" + id, payload,{
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
export const deleteService = createAsyncThunk(
    'services/delete',
    async ({id}, thunkAPI) => {
        try {
            const response = await axios.delete(BASE_API_URL + "/services/" + id,{
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

export const servicesSlice = createSlice({
    name: 'services',
    initialState: {
        items: [],
        isFetching: false,
        isSuccess: false,
        isError: false,
    },
    extraReducers: {
        [getServices.rejected]: errored,
        [getServices.fulfilled]: (state, {payload}) => {
            state.isFetching = false
            state.isSuccess = true
            if (state.isError) state.isError = false
            state.items = payload
        },
        [getServices.pending]: pending,

        [createService.rejected]: errored,
        [createService.fulfilled]: (state, {payload}) => {
            state.isFetching = false
            state.isSuccess = true
            if (state.isError) state.isError = false
            state.items.push(payload)
        },
        [createService.pending]: pending,

        [updateService.rejected]: errored,
        [updateService.fulfilled]: (state, {payload}) => {
            state.isFetching = false
            state.isSuccess = true
            if (state.isError) state.isError = false
            const candidate = state.items.find(i => i.id === payload.id)
            const indexOf = state.items.indexOf(candidate)
            if (indexOf > -1) {
                state.items[indexOf] = payload
            }
        },
        [updateService.pending]: pending,

        [deleteService.rejected]: errored,
        [deleteService.fulfilled]: (state, {payload}) => {
            state.isFetching = false
            state.isSuccess = true
            if (state.isError) state.isError = false
            const candidate = state.items.find(i => i.id === payload.id)
            const indexOf = state.items.indexOf(candidate)
            if (indexOf > -1) {
                state.items.splice(indexOf, 1)
            }
        },
        [deleteService.pending]: pending,
    }
})

export const servicesSelector = (state) => state.services.items