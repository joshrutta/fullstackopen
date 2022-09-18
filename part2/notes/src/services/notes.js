import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/notes'
// const baseUrl = 'https://fullstack-notes-app.fly.dev/api/notes'
const baseUrl = '/api/notes';

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

export default { getAll, create, update }