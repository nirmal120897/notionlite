import { api } from "./client"

export const getAllPagesApi = () => {
    return api.get('/api/pages')
}

