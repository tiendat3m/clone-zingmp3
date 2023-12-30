import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
    friday: {},
    newEveryday: {},
    top100: {},
    xone: {},
    newMusic: [],
    isLoading: false,
    newRelease: {},
    weekChart: [],
    favoritedArtists: {},
    singers: [],
    chart: {},
    rank:  [],
    scrollTop: true,
    currentWidth: null,
    chill: {},
    hotAlbum: {},

}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME: 
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                friday: action.homeData?.find(item => item.sectionId === 'hAutoTheme1') || {},
                newEveryday: action.homeData?.find(item => item.sectionId === 'hAutoTheme2') || {},
                top100: action.homeData?.find(item => item.sectionId === 'h100') || {},
                xone: action.homeData?.find(item => item.sectionId === 'hXone') || {},
                newMusic: {...action.homeData?.find(item => item.sectionId === 'hAlbum'), title: 'Nhạc mới'} || {},
                newRelease: action.homeData?.find(item => item.sectionType === 'new-release') || {},
                weekChart: action.homeData?.find(item => item.sectionType === 'weekChart')?.items || [],
                favoritedArtists: action.homeData?.find(item => item.sectionId === 'hArtistTheme') || {},
                chart: action.homeData?.find(item => item.sectionId === 'hZC')?.chart || {},
                rank: action.homeData?.find(item => item.sectionId === 'hZC')?.items || [],
                singers: action.homeData?.find(item => item.sectionType === 'artistSpotlight')?.items || [],
                chill: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || {},
                hotAlbum: action.homeData?.find(item => item.sectionId === 'hAlbum') || {},                

            }
            case actionTypes.LOADING:
                return{
                    ...state,
                    isLoading: action.flag
                }
            case actionTypes.ZERO_SCROLLTOP:    
                return {
                    ...state,
                    scrollTop: action.flag
                }
            case actionTypes.CURRENT_WIDTH:    
                return {
                    ...state,
                    currentWidth: action.w
                }    

        default: 
            return state
    }
}

export default appReducer