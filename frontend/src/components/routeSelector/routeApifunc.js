import axios from 'axios'

export async function getRoutesFromApi(startCity, destination) {
    const baseURL = `${process.env.REACT_APP_API_URL}/booking/`
    let incoming = await axios.post(baseURL, { startCity, destination })
    return incoming
}