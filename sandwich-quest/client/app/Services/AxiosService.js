import { baseURL } from '../env.js'

// @ts-ignore
// eslint-disable-next-line no-undef
export const api = axios.create({
  baseURL: baseURL,
  timeout: 12000,
  withCredentials: true
})
