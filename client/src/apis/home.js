import axios from '../axios'

export const getHome = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/home',
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const getTop100 = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            url: '/top100',
            method: 'get',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
}) 