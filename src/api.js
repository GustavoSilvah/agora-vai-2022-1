import ky from 'ky'

const api = ky.create({
    // Precisa terminar com /
    baseURL: 'https://agoravai-gustavo.onrender.com/',
    credentials: 'include',
    timeout: 10000,
    // Envia os cookies seguros de vlta em todas as requisições
})

export default api