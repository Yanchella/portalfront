import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import store from "./app/store";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MantineProvider} from "@mantine/core";
import {AuthWrapper} from "./components/AuthWrapper";
import {ModalsProvider} from "@mantine/modals";
import {Home} from "./pages/Home";
import {SignIn} from "./pages/SingIn";
import {SignUp} from "./pages/SignUp";
import {ForgotPassword} from "./pages/ForgotPassword";
import {ResetPassword} from "./pages/ResetPassword";
import {Catalog} from "./pages/Catalog";
import {About} from "./pages/About";
import {Profile} from "./pages/Profile";
import {Orders} from "./pages/Orders";
import {Masters} from "./pages/Masters";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{primaryColor: "pink"}}>
            <Provider store={store}>
                <ModalsProvider>
                    <AuthWrapper>
                        <BrowserRouter>
                            <Routes>
                                <Route index element={<Home/>}/>
                                <Route path="/signin" element={<SignIn/>}/>
                                <Route path="/signup" element={<SignUp/>}/>
                                <Route path="/forgot" element={<ForgotPassword/>}/>
                                <Route path="/reset" element={<ResetPassword/>}/>

                                <Route path="/catalog" element={<Catalog/>}/>

                                <Route path="/masters" element={<Masters/>}/>
                                <Route path="/about" element={<About/>}/>
                                <Route path="/account" element={<Profile/>}/>
                                <Route path="/orders" element={<Orders/>}/>
                            </Routes>
                        </BrowserRouter>
                    </AuthWrapper>
                </ModalsProvider>
            </Provider>
        </MantineProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
