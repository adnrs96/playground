import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import auth from '@/store/auth.module'
import ui from '@/store/ui.module'


export const playgroundApi = axios.create({
    baseURL: 'http://localhost:8000'
})

export const storyscriptApi = axios.create({
    baseURL: process.env.VUE_APP_STORYSCRIPT_GRAPHQL,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

storyscriptApi.interceptors.request.use(setToken)
storyscriptApi.interceptors.response.use(checkErrors)

function setToken(config: AxiosRequestConfig) {
    config.method = 'POST'
    const token: string | null = auth.tokenSecret
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}

function checkErrors(response: AxiosResponse) {
    if (response.data.errors) {
        for (const error of response.data.errors) {
            ui.showError(error.message)
        }
    }
    return response
}
