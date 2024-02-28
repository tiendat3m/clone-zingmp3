import actionTypes from "./actionTypes";
import * as apis from "../../apis"

export const getHome = () => async (dispatch) => {
    try {
        const response = await apis.getHome()
        // console.log(response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_HOME,
                homeData: response.data.data.items,
            })
        } else {
            dispatch({
                type: actionTypes.GET_HOME,
                homeData: null,
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_HOME,
            homeData: null,
        })
    }
}

export const getTop100 = () => async (dispatch) => {
    try {
        const response = await apis.getTop100()
        // console.log(response)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_TOP100,
                top100Data: response?.data?.data,
            })
        } else {
            dispatch({
                type: actionTypes.GET_TOP100,
                top100Data: null,
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_TOP100,
            top100Data: null,
        })
    }
}


export const zeroScrollTop = (flag) => ({
    type: actionTypes.ZERO_SCROLLTOP,
    flag
})

export const setCurrentWidth = (w) => ({
    type: actionTypes.CURRENT_WIDTH,
    w
})