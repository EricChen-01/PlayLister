import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/auth',
})


export const getLoggedIn = () => api.get(`/loggedIn/`);
export const loginUser = (email, password) => {
    return api.post(`/login/`, {
        email : email,
        password : password
    })
}
export const logoutUser = () => api.get(`/logout/`)
export const registerUser = (firstName, lastName, email, password, passwordVerify) => {
    return api.post(`/register/`, {
        firstName : firstName,
        lastName : lastName,
        email : email,
        password : password,
        passwordVerify : passwordVerify
    })
}


const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
}

// this intercepts any errors status
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        //console.log(error.response.data.errorMessage)
        return error;
    }
);

export default apis
