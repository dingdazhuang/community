import axios from 'axios'
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/mock' : '/index.php/home'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

import qs from 'qs'
import * as types from './mutations-type'

export default {
    handleTitle ({commit}, payload) { commit(types.SET_TITLE, payload) },
    login ({commit}, payload) {
        return new Promise((resolve, reject) => {
            axios.post('./login/login', qs.stringify(payload)).then(response => { // 序列化
                let res = response.data
                if (res.code == 200) commit(types.SET_USERINFO, res)
                resolve(res)
            }).catch(err => reject(err))
        })
    },
    cookieLogin({commit}) {
        return new Promise((resolve, reject) => {
            axios.get('/login/cookie_login').then(response => {
                let res = response.data
                if (res.code == 200) {
                    commit(types.SET_USERINFO, res)
                }
                resolve(res)
            }).then(err => reject(err))
        })
    },
    getUserData({commit}) {
        return new Promise((resolve, reject) => {
            axios.get('./member/index').then(response => {
                let res = response.data
                if (res.code == 200) {
                    commit(types.SET_USERINFO, res)
                }
                resolve(res)
            }).then(err => reject(err))
        })
    }
}