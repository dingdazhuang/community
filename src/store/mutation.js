import * as types from './mutations-type'

function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if(keys) {
        for(var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}

export default {
    [types.SET_TITLE] (state, payload) {
        state.titleGroup.title = payload.title
        state.titleGroup.hideReturnIcon = payload.hideReturnIcon
        state.titleGroup.showIcon = payload.showIcon
        state.titleGroup.icon = payload.icon
        state.bottomTab.showBottomTab = payload.showBottomTab
    },
    [types.SET_USERINFO] (state, payload) {
        let data = payload.data[0] // ????????
        let userInfo = {
            uname: data.nickname || data.username || data.passport,
            uid: data.uid,
            avatar: data.avatar
        }
        state.token = payload.token
        state.score = data.score
        state.lottery_tickets = data.remain_times
        for (let index in userInfo) {
            state.userInfo[index] = userInfo[index]
        }
        if (payload.token && userInfo) {
            sessionStorage.setItem('zd_access_token', JSON.stringify(payload.token))
            sessionStorage.setItem('ZDKJ_USERINFO', JSON.stringify(userInfo))
        }
    },
    [types.SET_EDITOR_TYPE] (state, payload) {
        state.editType = payload
    },
    [types.SET_USERDATA] (state, payload) {
        state.score = payload.data.score // ??????
    },
    LOGOUT (state) {
        sessionStorage.clear()
        localStorage.clear()
        clearAllCookie()
        state.token = null
        state.score = null
        for (let i in state.userInfo) {
            state.userInfo[i] = null
        }
    }

}