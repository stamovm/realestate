import axios from 'axios'

export const BASE_URL = 'https://realty-in-us.p.rapidapi.com/'

export const fetchApi = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'x-rapidapi-host': 'realty-in-us.p.rapidapi.com',
        'x-rapidapi-key': process.env.RAPID_API_KEY,
      },
    })
    return data
  } catch (err) {
    if (err.response) {
      console.error(err.response.data)
      console.error(err.response.status)
      console.error(err.response.headers)
    } else {
      console.log(`Error: ${err.message}`)
    }
  }
}
