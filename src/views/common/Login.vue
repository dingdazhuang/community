<template>
<div class="login">
  <i class="decoration1"></i>
  <i class="decoration2"></i>
  <form @submit.prevent>
    <ul>
      <li>
        <em>账号：</em><input type="text" v-model.trim="loginParams.login_user" placeholder="手机号" autofocus />
      </li>
      <li>
        <em>密码：</em><input type="password" v-model.trim="loginParams.login_pwd" placeholder="密码">
      </li>
    </ul>
    <div if="isCodeShow" class="code">
      <input type="text" placeholder="验证码" v-model.trim="loginParams.login_code" />
      <img :src="verify" class="verify" @click="changeVerify" alt="图片验证">
    </div>
    <button @click="handeLogin">登 陆</button>
  </form>
  <ul>
    <router-link tag="li" to="/register">注册账号</router-link>
    <li >忘记密码</li>
  </ul>
  <div class="others">
    <div class="part">
      <p class="dotted">{{'....'.repeat(40)}}</p>
      <p>快捷登录</p>
    </div>
    <div>
      <i @click="qqLogin"><i @click="wxLogin"></i> </i>
    </div>
  </div>
  <p class="state">登录即表示同意用户协议</p>
</div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { initClientHeight } from 'common/js/dom'
import { hex_md5 } from 'common/js/md5'

export default {
  name: '',
  data () {
    return {
      titleInfo: {
        title: '登陆',
        showIcon: false,
        showBottomTab: true
      },
      loginParams: {
        login_pwd: '',
        login_user: '',
        login_code: ''
      },
      isCodeShow: false,
      verify: 'http://shop-test.73776.com/index.php/home/login/verify/'
    }
  },
  methods: {
    ...mapActions(['handleTitle', 'login']),
    handleLogin() {
      if (!this.loginParams.login_user || this.loginParams.login_pwd) {
        Toast({
          message: '请输入完整登陆信息',
          position: 'middle',
          duration: 2000
        })
        return;
      } else if (this.isCodeShow && !this.loginParams.login_code) {
        Toast({
					message: '请输入验证码',
					position: 'middle',
					duration: 3000
        })
        return ;
      }
      let postParams = {...this.loginParams}
      postParams.login_pwd = hex_md5(this.loginParams.login_pwd)
      this.login(postParams).then(res => {
        if (res.code == 200) {
          let instance = Toast('登陆成功')
          setTimeout(() => {
            instance.close()
            this.$router.go(-1)
          }, 2000)
        } else if (res.code == 700) {
          this.isCodeShow = true
        } else if (res.code == 400) {
          Toast({
            message: '登陆失败，请稍后重试',
            position: 'middle',
            duration: 2000
          })
        } else if (res.code == 402 || res.code == 401) {
          Toast({
            message: res.msg,
            position: 'middle',
            duration: 3000
          })
        }
      })
    },
    changeVerify(ev) {
      ev = ev || event
      target = ev.currentTarget
      target.src += Math.floor(Math.random() * 10 + 1)
    },
    wxLogin() {
      this.notAllow()
    },
    qqLogin() {
      this.notAllow()
    },
    notAllow() {
      Toast({message:"暂不支持该功能",duration: 1000})
    },
    mounted() {
      this.handleTitle({
        title: this.titleInfo.title,
        showIcon: this.titleInfo.showIcon,
        showBottomTab: this.titleInfo.showBottomTab
      })
      initClientHeight(document.querySelector('.login'))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../common/css/index.scss";

.login {
    width: 100%;
    height: 100%;
    padding-top: 80px;
    position: absolute;
    @include color-background;
    @include box-sizing;
    form {
        text-align: center;
        ul {
            @include box-sizing;
            width: 100%;
            text-align: right;
            li {
                width: 75%;
                height: 80px;
                line-height: 80px;
                margin: 0 auto;
                position: relative;
                font-size: $font-size-small; /*no*/
                border-bottom: 1px solid black; /*no*/
                input { 
                    border: 0;
                    outline: 0; 
                    height: 78px;
                    line-height: 78px;
                    text-indent: 1em;
                    min-width: 80%;
                    // font-size: $font-size-small; /*no*/
                }
            }
        }
        button {
            margin: 50px 0;
            width: 40%;
            @include color-grad-btn; 
            outline: none;
            border: 0;
            height: 60px;
            line-height: 60px;
            font-size: $font-size-normal; /*no*/
            font-weight: 600;
        }
    }
    .code {
        padding: 15px 12.5% 0;
        display: flex;
        justify-content: space-between;
        input { width: 100%; text-indent: 1em; width: 10em; border-bottom: 1px solid black; /*no*/ outline: none;}
        .verify {	 width: 150px; height: 50px; border: 1px solid $border-color-d; /*no*/ }
    }
    >ul {
        padding: 0 25%;
        li {
            text-align: center;
            height: 45px;
            line-height: 45px;
            color: $text-color-l;
        }
    }
    .others {
        width: 100%;
        padding: 0 80px;
        @include box-sizing;
        .part {
            position: relative;
            margin: 200px 0 35px;
            p:last-child {
                @include color-background;
                @include center; height: 1em;
                width: 6em;
                text-align: center;
                color: $text-color-l;
            }
            .dotted {
                width: 80%;
                overflow: hidden;
                 width: 80%;
            }
        }
        div {
            @include flex-around;
            i {
                display: block;   
                width: 115px;
                height: 115px;
                @include background-image-center;
                &:first-child {
                    background-image: url('../../common/images/icons/qq.jpg');
                }
                &:last-child {
                    background-image: url('../../common/images/icons/wechat.jpg');
                }
            }
        }
    }
    .state {
        margin-top: 80px;
        color: $text-color-dark;
        text-align: center;
    }
    .decoration1, .decoration2 {
        position: absolute;
        display: inline-block;
    }
    .decoration1 {
        width: 0; 
        height: 0; 
        border-left: 25px solid transparent; 
        border-right: 25px solid transparent; 
        border-bottom: 50px solid #ffebbc; 
        top: 50%;
        right: 10%;
        transform: rotate(30deg);
    }
    .decoration2 {
        width: 35px;
        height: 35px;
        @include border-radius(50%);
        border: 8px solid #ffebbc;
        top: 45%;
        left: 22%;
    }
}
</style>
