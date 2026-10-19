import { api } from "./client"



export const registerApi = (data) => {
    return api.post('/api/users', data)
}

export const loginApi = (data) => {
    return api.post('api/users/login', data)
}