import axios from  './config'
import qs from 'qs'
import store from '../store/index'
import router from '../router/index'

axios.interceptors.request.use(
    config => {
        if (store.getters.token) {
            let str = randomString()

            config.headers.Authorization = `zdkj${store.getters.token}${str}`
            config.headers.Substr = str.length - 1
            config.headers.TokenSize = str.length + 5
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

axios.interceptors.response.use(
    response => {
        return response
    },
    err => {
        if (err.response) {
            switch (err.response.status) {
                case 401: logout()
            }
        }
        return Promise.reject(err)
    }
)

function logout() {
    store.commit('logout')
    router.currentRoute.path !== 'login' &&
    router.replace({
        path: 'login',
        query: { redirect: router.currentRoute.path }
    })
}

export function post(url, data) {
    Indicator.open({
        text: '加载中。。。',
        spinnerType: 'fading-circle'
    })
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(data)).then(response => {
            Indicator.close()
            if (response.data.code == 403) {
                let instance = Toast('身份验证失败，请重新登陆')
                setTimeout(() => {
                    instance.close()
                    logout()
                }, 2000)
            } else if(response.data.code == 405) {
                let instance = Toast(response.data.msg)
                setTimeout(() => {
                    instance.close()
                    logout()
                }, 2000)
            }
            resolve(response.data)
        }).catch(err => reject(err))
    })
}

export function get(url, data, hideLoading = false) {
    if (!hideLoading) Indicator.open()
    return new Promise((resolve, reject) => {
        axios.get(url, data).then(response => {
            Indicator.close()
            if (response.data.code == 403) {
                let instance = Toast('身份验证失败，请重新登陆')
                setTimeout(() => {
                    instance.close()
                    logout()
                }, 2000)
            } else if(response.data.code == 405) {
                let instance = Toast(response.data.msg)
                setTimeout(() => {
                    instance.close()
                    logout()
                }, 2000)
            }
            resolve(response.data)
        }).catch(err => reject(err))
    })
}

export function upload(url, data) {
    axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    Indicator.open({
        text: '发布中',
        spinnerType: 'fading-circle'
    })
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(response => {
            Indicator.close()
            if (response.data.code==403) {

                let instance = Toast('身份验证失败，请重新登录');
                setTimeout(() => {
                    instance.close();
                    logout()
                }, 2000);
            } else if (response.data.code==405) {
                let instance = Toast(response.data.msg)
                setTimeout(() => {
                    instance.close();
                    logout()
                }, 2000);
            }
            resolve(response.data) 
        }).catch(err => reject(err))
    })
}

function randomString(len = Math.ceil(Math.random() *10 + 1)) {
    let arr = ['a', 'b', 'c', 'd', 'e', 'f','g','h','i','j','k','l','m','n','o','0','1','2','3','4','5','6','7','8','9']
    let str = ''
    let size = arr.length - 1
    for (let i = 0; i < len; i++) {
        str += arr[Math.floor(Math.random()*size +1)];
    }
    return str
}