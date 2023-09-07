import axios from 'axios'

const gifBaseUrl = 'https://waifu.it/api/'
const ApiToken = 'OTAxOTE0MTY0Nzk1MTUwMzg2.MTY5NDAxNzgzNA--.7005d95a6830'
export async function getGif (endpoint) {
  try {
    const { data } = await axios.get(`${gifBaseUrl}${endpoint}`, {
      headers: {
        Authorization: ApiToken
      }
    })
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

const animeBaseUrl = 'https://api.jikan.moe/v4/anime'
export async function getAnime (name) {
  try {
    const { data } = await axios.get(animeBaseUrl, { params: { q: name } })
    console.log(data)
    return data.data
  } catch (error) {
    throw new Error(error.message)
  }
}
