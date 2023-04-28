import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const config = {
  headers: { Authorization: token },
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

const getOne = async (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (objectToUpdate) => {
  const response = await axios.put(
    `${baseUrl}/${objectToUpdate.id}`,
    objectToUpdate,
    config
  )
  return response.data
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}

export default { getAll, getOne, create, update, remove, setToken }
