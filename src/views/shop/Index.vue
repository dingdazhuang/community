<template>
    <div class="shop-index">
        <!-- 顶部轮播图 -->
        <div v-if="recommends.length" class="banner">
            <slider>
                <div v-for="(item, index) in recommends" :key="index">
                    <a :href="item.link">
                        <img class="needsclick" :src="item.img">
                    </a>
                </div>
            </slider>
        </div>
        <!-- 积分 -->
        <div class="score">
            <div class="title">
                <p class="dotted">{{'······'.repeat(30)}}</p>
                <p> <span>我的积分</span> <i>{{score || '***'}}</i></p>  
            </div>
            <ul class="score-bar">
                <router-link tag="li" to="/shop/strategy">  <i></i>  <p>赚积分</p>    </router-link >
                <router-link tag="li" to="/">    <i></i>  <p>积分抽奖</p>  </router-link >
                <router-link tag="li" to="order">    <i></i> <p>我的订单</p>  </router-link >
                <router-link tag="li" to="/shop/address">  <i></i> <p>地址管理</p>  </router-link >
            </ul>
        </div>
        <!-- 商品推荐位 -->
        <div class="hot-sale">
            <p> <span> ❤ </span>  猜你喜欢</p>
            <div v-if="hotSales.length" class="sale-items"> 
                <div>
                    <slider :autoPlay="true" :showDots="false" :isFullScreenSlider="false" >
                        <router-link tag="div" to="/"  v-for="(item, index) in hotSales" :key="index" >
                            <div class="item">
                                <div><img src="../../common/images/shop/14.jpg" /> </div>
                                <div>
                                    <p>{{item.sname}}</p>
                                    <p class="recom_price">市场参考价：{{item.price}}元</p>
                                    <p class="recom_score"><i>{{item.score}}</i> 积分<span v-if="item.price"> + ￥<i>{{item.price}}</i></span> </p>
                                    <i>兑换</i>
                                </div>
                            </div>
                        </router-link>
                    </slider>
                </div>
            </div>
        </div>
        <!-- 商品推荐 -->
        <i class="pic-background recommend"></i>
        <div class="link-card">
            <div class="card-list">
                <ul class="score-goods">
                    <router-link tag="li" :to="{ path: 'shop/list', query: { type: 1 }}">
                         <i     ></i>
                        <p>5000分以下</p>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'shop/list', query: { type: 2 }}">
                         <i ></i>
                        <p>5000-8000分</p>
                    </router-link>
                    <router-link tag="li" :to="{ path: 'shop/list', query: { type: 3 }}">
                         <i ></i>
                        <p>8000分以上</p>
                    </router-link>
                </ul>
                <p class="dotted">{{`······`.repeat(30) }}</p>
                <ul class="others">
                    <li>
                        <i></i> 
                        <p>新品专区</p>
                    </li>
                    <li>
                        <i></i> 
                        <p>好货精选</p>
                    </li>
                    <li>
                        <i></i> 
                        <p>淘优惠</p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 商品分类 -->
        <i class="pic-background"></i>
        <div class="link-card">
            <div class="card-list">
                <ul class="sport">
                    <li>
                        <i></i> 
                        <p>美食生活</p>
                    </li>
                    <li>
                        <i></i> 
                        <p>家居百货</p>
                    </li>
                    <li>
                        <i></i> 
                        <p>数码运动</p>
                    </li>
                </ul>
                <p class="dotted">{{`······`.repeat(30)}} </p>
                <ul class="disport">
                    <li>
                        <i></i> 
                        <p>动漫卡通</p>
                    </li>
                    <li>
                        <i></i> 
                        <p>美妆时尚</p>
                    </li>
                    <li>
                        <i></i> 
                        <p>电子卡券</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'
import Slider from '../../base/Slider/Slider'

export default {
    data() {
        return {
            titleInfo: {
                title: '积分商城',
                hideReturnIcon: true,
                showIcon: false,
            },
            recommends: [
                // {linkUrl: '#1', picUrl: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109173040544.jpg'},
                // {linkUrl: '#2', picUrl: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109173040544.jpg'},
                // {linkUrl: '#2', picUrl: 'http://221.123.178.232/smallgamesdk/Public/Uploads/20180109173040544.jpg'},
            ],
            hotSales: [
                {id: "4", sname: "戴尔台式  一体机电脑", logo: "", price: "8999", score: "8888"},
                {id: "3", sname: "神舟游戏本笔记本电脑", logo: "", price: "5000", score: "8888"},
                {id: "2", sname: "宏基台式一体机电脑", logo: "", price: "6999", score: "8888"},
                {id: "3", sname: "神舟游戏本笔记本电脑", logo: "", price: "5000", score: "8888"}
            ]
        }
    },
    components:{ Slider },
    methods: {
        ...mapActions([ 'handleTitle']),
        // loadImage() {
            // if (!this.checkloaded) {
            //     this.checkloaded = true
            //     this.$refs.scroll.refresh()
            // }
        // }
    },
    created() {
        this.axios.get("/mall/index").then(response => {
            if (response.code == 200) {
                this.recommends = response.data.banner
            }
        })
    },
    mounted() {
        this.handleTitle({
            title:    this.titleInfo.title, 
            hideReturnIcon: this.titleInfo.hideReturnIcon,
            showIcon: this.titleInfo.showIcon,
        });
    },
    computed: {
        ...mapGetters(['score'])
    }
}
</script>

<style lang="scss" scoped>
// @import "../../common/css/zd-icon-sprite.css";
@import "../../common/css/index.scss";

// [class*="zd-shop-"] {
//     /* width:25px;
//     height: 25px; */
//     background: url('../../common/images/shop/icons/img.png');
//     background-repeat: no-repeat;
//     vertical-align: top;
//     display: inline-block !important; 
//     /* margin: 0 5px; */
//     background-size: 923px 315px;
//   }

.shop-index {
    width: 100%;
    @include box-sizing;
    .banner { 
        width: 100%; 
        height: 240px;
        overflow: hidden;
        >div{ height: 240px; }
    }
    .dotted { 
        width: 100%;
        overflow: hidden;
        color: $text-color-ll;
        font-size: $font-size-small; /*no*/
        word-spacing: 0;
    }
    //积分栏
    .score {
        width: 100%;
        height: 220px;
        @include box-sizing;
        @include color-background;
        padding: 20px 0;
        .title {
            width: 100%;
            text-align: center;
            margin-bottom: 10px;
            position: relative; 
            p:last-child {
                @include center;
                font-size: 0; 
                width: 320px;
                height: 30px;
                @include color-background;
                span,i {
                    line-height: 30px;
                    font-size:14px; /*no*/
                    display: inline-block;
                    @include box-sizing;
                    height: 30px;
                    width: 135px;
                }   
                span {
                    background-color: $text-color-orange-d;
                    border-top-left-radius: 1em;
                    border-bottom-left-radius: 1em;
                    color:$text-color-w;
                    padding: 1px 0;         /*no*/
                }      
                i {
                    color: $text-color-orange-d;
                    border: 1px solid $text-color-orange-d;  /*no*/
                    border-top-right-radius: 1em;
                    border-bottom-right-radius: 1em;
                }
            }  
        }
        .score-bar { 
            width: 100%; 
            @include box-sizing;
            color: $text-color-l; 
            min-height: 140px;
            display: flex;
            padding: 0 5%;
            li {
                flex: 1;
                height: auto;
                text-align: center;
                padding: .133333rem;
                >div {
                    margin: 10px 0;
                    height: 90px;
                    width:  90px;
                    span {
                        height:90px;width:90px;
                    }
                }
                i{
                    background-size: 90px 90px;
                    background-repeat: no-repeat;
                    display: inline-block;
                    margin: 10px 0;
                    height: 90px;
                    width:  90px;
                }
                &:first-child i{ background-image: url('../../common/images/shop/icons/earn_score.jpg') }  
                &:nth-child(2) i{ background-image: url('../../common/images/shop/icons/draw_score.jpg') }
                &:nth-child(3) i{ background-image: url('../../common/images/shop/icons/order.jpg') }
                &:last-child i{ background-image: url('../../common/images/shop/icons/address.jpg') }
            }
            
        }
    }
    //热卖 商品推荐位
    .hot-sale {
        width: 100%;
        height: 210px;
        @include box-sizing;
        padding: 15px 0 15px 30px;
        >p { 
            font-size: $font-size-normal; /*no*/
            color: black;
            font-weight: 800;
            margin-bottom: 8px;
            span { 
                color: $text-color-orange; 
                font-size: $font-size-small; /*no*/
                padding: 0 5px;
            }
        }
        .sale-items {
            width: 100%;
            height: 140px;
            overflow: hidden;
            >div {
                width: 78%;
                @include box-sizing;
               .item {
                    position: relative;
                    border-right: 10px solid #ebebeb;
                    @include border-radius(1em);
                    @include color-background;
                    @include flex-center;
                    div {
                        @include box-sizing;
                        &:first-child {
                            line-height: 140px;
                            width: 30.43%;
                            text-align: center;
                            img { 
                                height: 100px; 
                                @include border-radius(1em);
                            }
                        } 
                        &:nth-child(2) {
                            padding: 25px 0;
                            max-width: 60%;
                            >p {
                                &:first-child {
                                    font-size: $font-size-small; /*no*/
                                    font-weight: 800;
                                    @include no-wrap;
                                }
                                &:nth-child(2) {
                                    color: $text-color-l;
                                    font-size: $font-size-min; /*no*/
                                    margin: 5px 0 15px;
                                    transform: scale(0.9);
                                    margin-left: -5%;
                                }
                                &:nth-child(3) {
                                    color: $text-color-orange;
                                    span:nth-child(2) { color: red } 
                                }
                            }
                            >i {
                                text-align: center;
                                display: block;
                                width: 22%;
                                max-width: 150px;
                                height: 1.6em;
                                line-height: 1.6em;
                                position: absolute;
                                margin: auto;
                                top: 0;
                                bottom: 0;
                                right: 15px;
                                color: #fff;
                                background: $text-color-orange;
                                @include border-radius(1em);
                            }
                        }
                    }
                } 
            }
            
        }
    }
    //背景图（推荐，分类）
    .pic-background, .recommend{ 
        display: block;
        width: 100%;
        min-height: 160px;
        background: url("../../common/images/shop/icons/sort.jpg") no-repeat;
        background-position: center center; 
        background-size: 100%; 
    }
    .recommend { 
        background: url("../../common/images/shop/icons/recommend.jpg") no-repeat;
        background-size:100%;
        background-position: center center; 
    } 

    //商品推荐， 分类
    .link-card {
        @include flex-between;
        width: 100%;
        height: 360px;
        // padding: 20px 0;
        margin-bottom: 15px; 
        @include color-background;
        .card-list {
            width: 100%;
            padding: 0 40px;
            @include box-sizing;
            position: relative;
            ul {
                @include flex-between;
                width: 100%;
                height: 50%;
                li{
                    padding: 0 10px;
                    margin: 20px 0;
                    width: auto;
                    height: auto;
                    text-align: center;
                    @include extend-click;
                    i{
                        display: block;
                        @include background-image-center;
                        width: 100px;
                        height: 100px;
                        margin: 0 auto;
                        margin-bottom: 20px;
                    }
                }
            }
            .dotted {  @include center; height: 1em; width: 80%; }
            .score-goods {
                li {
                    &:first-child i { background-image: url('../../common/images/shop/icons/G1.jpg') }
                    &:nth-child(2) i { background-image: url('../../common/images/shop/icons/G2.jpg') }
                    &:nth-child(3) i { background-image: url('../../common/images/shop/icons/G3.jpg') }
                }
            }
            .others {
                li {
                    &:first-child i { background-image: url('../../common/images/shop/icons/G4.jpg') }
                    &:nth-child(2) i { background-image: url('../../common/images/shop/icons/G5.jpg') }
                    &:nth-child(3) i { background-image: url('../../common/images/shop/icons/G6.jpg') }
                }
            }
            .sport {
                li {
                    &:first-child i { background-image: url('../../common/images/shop/icons/sort1.jpg') }
                    &:nth-child(2) i { background-image: url('../../common/images/shop/icons/sort2.jpg') }
                    &:nth-child(3) i { background-image: url('../../common/images/shop/icons/sort3.jpg') }
                }
            }
            .disport {
                li {
                    &:first-child i { background-image: url('../../common/images/shop/icons/sort4.jpg') }
                    &:nth-child(2) i { background-image: url('../../common/images/shop/icons/sort5.jpg') }
                    &:nth-child(3) i { background-image: url('../../common/images/shop/icons/sort6.jpg') }
                }
            }
        }
    }
}
</style>
