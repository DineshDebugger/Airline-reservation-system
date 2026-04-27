import axios from 'axios'

export function registerUser(newUserDetails){
    let apiUrl = '${process.env.REACT_APP_API_URL}/register'
    return axios.post(apiUrl,newUserDetails,{
        headers:{
            'Content-Type': 'application/json'
        }
    })
}
