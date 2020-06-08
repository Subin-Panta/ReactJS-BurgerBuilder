import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://burger-builder-48be0.firebaseio.com/'
})
export default instance
