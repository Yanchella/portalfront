import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {BASE_API_URL} from "../../constants/baseApiUrl";

export const updateUser = createAsyncThunk(
    'users/update',
    async ({username, email, phone}, thunkAPI) => {
        try {
            const response = await axios.patch(BASE_API_URL + "/users/me", {
                username, email, phone
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const {data} = response
            if (response.status === 200) {
                return {username, email, phone, ...data}
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)

export const signupUser = createAsyncThunk(
    'users/signupUser',
    async ({username, email, password}, thunkAPI) => {
        try {
            const response = await axios.post(BASE_API_URL + "/auth/signup", {
                username, password, email
            })
            const {data} = response
            if (response.status === 200) {
                localStorage.setItem('accessToken', data.accessToken);
                return {...data, username, email};
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'users/login',
    async ({email, password}, thunkAPI) => {
        try {
            const response = await axios.post(BASE_API_URL + "/auth/signin", {email, password})
            let {data} = response;
            if (response.status === 200) {
                localStorage.setItem('accessToken', data.accessToken);
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const exchangeToken = createAsyncThunk(
    'users/exchangeToken',
    async ({accessToken}, thunkAPI) => {
        try {
            const response = await axios.get(BASE_API_URL + "/auth/access", {
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            })
            const {data} = response
            if (response.status === 200) {
                return {...data};
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const getOrders = createAsyncThunk(
    'users/orders',
    async (payload, thunkAPI) => {
        try {
            const response = await axios.get(BASE_API_URL + "/orders", {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            const {data} = response
            if (response.status === 200) {
                return [...data]
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
)

const initialState = () => ({
    username: '',
    email: '',
    phone: '',
    orders: [],
    isAdmin: false,
    emailConfirmed: false,

    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
})

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState(),
    reducers: {
        logoutUser: (state) => {
            return initialState()
        },
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;

            return state;
        },
    },
    extraReducers: {

        [updateUser.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.username = payload.username
            state.email = payload.email
            state.phone = payload.phone
        },
        [updateUser.pending]: (state) => {
            state.isSuccess = false;
            state.isFetching = true
        },
        [updateUser.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },

        [getOrders.fulfilled]: (state, {payload}) => {
            state.isFetching = false
            state.isSuccess = true
            state.orders = payload
        },
        [getOrders.pending]: (state) => {
            state.isFetching = true
        },
        [getOrders.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },

        [signupUser.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.email = payload.email;
            state.username = payload.username;
        },
        [signupUser.pending]: (state) => {
            state.isSuccess = false;
            state.isFetching = true
        },
        [signupUser.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [loginUser.fulfilled]: (state, {payload}) => {
            state.email = payload.email;
            state.username = payload.username;
            state.isFetching = false;
            state.isSuccess = true;
            return state;
        },
        [loginUser.rejected]: (state, {payload}) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMessage = payload.message;
        },
        [loginUser.pending]: (state) => {
            state.isSuccess = false;
            state.isFetching = true
        },
        [exchangeToken.pending]: (state) => {
            state.isSuccess = false;
            state.isFetching = true
        },
        [exchangeToken.fulfilled]: (state, {payload}) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.email = payload.email;
            state.username = payload.username;
            state.emailConfirmed = payload.emailConfirmed
            state.isAdmin = payload.role === "ADMIN"
            state.phone = payload.phone
        },
        [exchangeToken.rejected]: (state) => {
            state.isFetching = false;
            state.isError = true;
        },
    },
});

export const {clearState, logoutUser} = userSlice.actions;

export const userSelector = (state) => state.user;