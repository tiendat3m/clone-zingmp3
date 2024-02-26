import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
    friday: {},
    radio: {},
    top100: {},
    xone: {},
    newMusic: [],
    isLoading: false,
    newRelease: {},
    weekChart: [],
    favoritedArtists: {},
    singers: [],
    chart: {},
    rank: [],
    scrollTop: true,
    currentWidth: null,
    chill: {},
    hotAlbum: {},
    outstanding: null,
    vnMusic: null,
    asiaMusic: null,
    usMusic: null,
    concertMusic: null

}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionId === 'hSlider')?.items || null,
                friday: action.homeData?.find(item => item.sectionId === 'hAutoTheme1') || {},
                radio: action.homeData?.find(item => item.sectionId === 'hLiveRadio') || {},
                top100: action.homeData?.find(item => item.sectionId === 'h100') || {},
                xone: action.homeData?.find(item => item.sectionId === 'hXone') || {},
                newMusic: { ...action.homeData?.find(item => item.sectionId === 'hAlbum'), title: 'Nhạc mới' } || {},
                newRelease: action.homeData?.find(item => item.sectionType === 'new-release') || {},
                weekChart: action.homeData?.find(item => item.sectionType === 'weekChart')?.items || [],
                favoritedArtists: action.homeData?.find(item => item.sectionId === 'hArtistTheme') || {},
                chart: action.homeData?.find(item => item.sectionId === 'hZC')?.chart || {},
                rank: action.homeData?.find(item => item.sectionId === 'hZC')?.items || [],
                singers: action.homeData?.find(item => item.sectionType === 'artistSpotlight')?.items || [],
                chill: action.homeData?.find(item => item.sectionId === 'hEditorTheme') || {},
                hotAlbum: action.homeData?.find(item => item.sectionId === 'hAlbum') || {},
            }
        case actionTypes.GET_TOP100:
            return {
                ...state,
                outstanding: action.top100Data?.find(item => item?.genre?.name === 'Nổi bật') || null,
                vnMusic: action.top100Data?.find(item => item?.genre?.name === 'Nhạc Việt Nam') || null,
                asiaMusic: action.top100Data?.find(item => item?.genre?.name === 'Nhạc Châu Á') || null,
                usMusic: action.top100Data?.find(item => item?.genre?.name === 'Nhạc Âu Mỹ') || null,
                concertMusic: action.top100Data?.find(item => item?.genre?.name === 'Nhạc Hòa Tấu') || null,
            }
        case actionTypes.LOADING:
            return {
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