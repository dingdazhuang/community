<template>
    <div class="center-message">
        
        <div @click="changeTab(1)" :class="['item-tab', {'active': msgIndex==1} ]">
            系统消息     
            <mt-badge v-if="parseInt($route.query.system_count) " class="badge" type="error">{{$route.query.system_count}}</mt-badge>
            <i :class="[ msgIndex ==1 ? 'self-icon-angle-down' : 'self-icon-angle-right', 'fa-lg']"></i>
        </div>
        <div class="msg-container">
            <ul v-if="msgIndex==1 && systemMsg" class="content shrink-list" >
                <li v-for="(item, index) in systemMsg" :key="index" >
                    <div class="msg-list">
                        <h2>{{item.title}}</h2>
                        <div class="msg" v-html="item.content"></div> 
                        <p>{{item.create_time | transformDate}}</p>
                    </div>
                </li>
            </ul>
        </div>
        
        <div @click="changeTab(2)" :class="['item-tab', {'active': msgIndex==2} ]">我的帖子     <i :class="[ msgIndex ==2 ? 'self-icon-angle-down' : 'self-icon-angle-right', 'fa-lg']"></i></div>
        <div class="msg-container">
           <ul v-if="msgIndex==2" class="content shrink-list">
                <li>
                    <div class="msg-list">
                        <h2>消息标题消息标题消息标题消息标题</h2>
                        <div class="msg">
                            <p>消息内容消息内容消息内容消息内容消息内容消息内容消息内容</p>
                        </div> 
                    </div>
                </li>
            </ul> 
        </div>
        
        <div @click="changeTab(3)" :class="['item-tab', {'active': msgIndex==3} ]">我收到的回复     <i :class="[ msgIndex ==3 ? 'self-icon-angle-down' : 'self-icon-angle-right', 'fa-lg']"></i></div>
        <div class="msg-container">
            <ul v-if="msgIndex==3" class="content shrink-list">
                <li>
                    <div class="msg-list">
                        <h2>消息标题消息标题消息标题消息标题</h2>
                        <div class="msg">
                            <p>消息内容消息内容消息内容消息内容消息内容消息内容消息内容</p>
                        </div> 
                    </div>
                </li>
            </ul>
        </div>
    </div>    
</template>

<script>
import { Badge } from 'mint-ui'
import { mapMutations, mapActions } from 'vuex'
import { hasClass, removeClass, setClientHeight } from 'common/js/dom'
import { formatDate } from 'common/js/tools'

export default {
    components: { 'mt-badge': Badge },
    data() {
        return {
            titleInfo: {
                title: '消息',
                showIcon: false
            },
            msgIndex: 0,
            sliderDeleteParams: {
                lastTouch:　'',
                targetTouch: ''
            },
            data: [1,2,3,4,5,6],
            unread: 12,
            systemMsg: ''
        }
    },
    methods: {
        ...mapActions([ 'handleTitle']),
        initTabStyle() {
            let height = setClientHeight();
            document.querySelector('.center-message').style.minHeight = height +　'px'

            let domArray = document.querySelectorAll(".msg-container")
            let tabHeight = document.querySelector(".item-tab").offsetHeight
            
            domArray.forEach(element => {
                element.style.maxHeight = (height - 3*tabHeight) + 'px'
            });
        },
        changeTab (index, ev) {
            ev = ev || event;
            this.msgIndex = hasClass(ev.currentTarget, 'active') ? 0 : index

            if (index == 1 && !this.systemMsg) {
                this.axios.get("/member/getSystemMsg").then(response => {
                    this.systemMsg = response.data
                })
            }
        },
        // touchStart(ev) {
        //     ev = ev || event;
        //     this.sliderDeleteParams.lastTouch = this.sliderDeleteParams.targetTouch;
        //     this.sliderDeleteParams.targetTouch = ev.currentTarget;
        // },
        // touchEnd(ev) {
        //     ev = ev || event;
        //     //若上一个左滑项与当前触摸项不是同一个。上一个左滑项右滑，不再显示删除按钮
        //     if ( this.sliderDeleteParams.lastTouch && (this.sliderDeleteParams.lastTouch !== this.sliderDeleteParams.targetTouch)) { 
        //         removeClass(this.sliderDeleteParams.lastTouch.children[0].children[0], 'left-slider')
        //     }   
        // } 
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            showIcon: this.titleInfo.showIcon
        });

        this.$nextTick().then(()=>{   this.initTabStyle()    })
    },
    filters: {
        transformDate(time) {
            return formatDate(time, "yyyy-MM-dd hh:mm")
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../common/css/index.scss";

.center-message {
    .msg-container { overflow: auto; } 
    font-size: $font-size-small;  /*no*/
    @include color-background;
    // min-height: 950px;
    @include box-sizing;
    .item-tab {
        font-weight: 800;
        padding: 1em 35px;
        color: $text-color-dark;
        border-bottom: 1px solid $border-color-d;  /*no*/
        .badge { font-size: $font-size-min; /*no*/ margin-left: .5em; }
        i { float: right; }
    }
    .active { color: $text-color-orange;}
    .content {
        height: auto;
        border-bottom: 1px solid $border-color-d;  /*no*/
        .msg-list {
            margin: 25px 40px 0 40px;
            border-bottom: 1px solid $text-color-l;  /*no*/
            padding-bottom: 25px;
            h2 { @include no-wrap; font-weight: 500 }
            >p { text-align: right; color: $text-color-l; font-size: $font-size-min; /*no*/ }
            .msg { margin-top: 10px; text-align: justify; color: $text-color-l; }
        }
        li:last-child .msg-list { border: 0 }
    }
}
</style>

