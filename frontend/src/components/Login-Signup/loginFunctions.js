import axios from 'axios'

export function logUserIn(userCredentials) {
    let apiUrl = `${process.env.REACT_APP_API_URL}/login`
    return axios.post(apiUrl,userCredentials, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
 

export function loadRoutes(){
    const authToken = sessionStorage.getItem('authToken' || '')
    let apiUrl = `${process.env.REACT_APP_API_URL}/user/profile?secret_token=${authToken}`
    return axios.get(apiUrl)
}

export function getCurrentUserDetails(authToken){
    const token =  authToken
    let apiUrl = `${process.env.REACT_APP_API_URL}/user/profile?secret_token=${token}`
    return axios.get(apiUrl)
}