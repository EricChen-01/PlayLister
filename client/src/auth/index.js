import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();

export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    SET_LOGGED_IN: "SET_LOGGED_IN",
    LOGIN_ERROR: "LOGIN_ERROR",
    REGISTER_ERROR: "REGISTER_ERROR",
    HIDE_MODALS: "HIDE_MODALS",
}

const CurrentModal = {
    NONE : "NONE",
    LOGIN_ERROR: "LOGIN_ERROR",
    REGISTER_ERROR: "REGISTER_ERROR",
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        currentModal: CurrentModal.NONE
    });
    const history = useHistory();

    useEffect(() => {
        console.log("GETTING LOGGED IN")
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    currentModal: CurrentModal.NONE
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    currentModal: CurrentModal.NONE
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    currentModal: CurrentModal.NONE
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    currentModal: CurrentModal.NONE
                })
            }
            case AuthActionType.SET_LOGGED_IN:{
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    currentModal: CurrentModal.NONE
                })
            }
            case AuthActionType.LOGIN_ERROR:{
                return setAuth({
                    user: null,
                    loggedIn: false,
                    currentModal: CurrentModal.LOGIN_ERROR
                })
            }
            case AuthActionType.HIDE_MODALS: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    currentModal: CurrentModal.NONE
                })
            }
            case AuthActionType.REGISTER_ERROR:{
                return setAuth({
                    user: null,
                    loggedIn: false,
                    currentModal: CurrentModal.REGISTER_ERROR
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(firstName, lastName, email, password, passwordVerify) {
        const response = await api.registerUser(firstName, lastName, email, password, passwordVerify);      
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
        }else{
            authReducer({
                type: AuthActionType.REGISTER_ERROR,
                payload: {}
            })
        }
    }

    auth.loginUser = async function(email, password) {
        const response = await api.loginUser(email, password);
        //console.log(response.request.status) <-- this gets status code regardless if theres error
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
        }else{
            authReducer({
                type: AuthActionType.LOGIN_ERROR,
                payload: {}
            })
        }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        return initials;
    }

    auth.hideModals = function(){
        authReducer({
            type: AuthActionType.HIDE_MODALS,
            payload: {}
        });
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };