<template>
    <div class="header">
        <div class="headerTop">
            <!-- 左边logo -->
            <div class="headerTopLogo">
                <img class="logo" :src="seller.avatar" alt="">
            </div>
            <!-- 右边名称 -->
            <div class="headerTopTxt">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{ seller.name }}</span>
                </div>
                <div class="desc">{{ seller.description }}/{{ seller.deliveryTime }}分钟送达</div>
                <div v-if="seller.supports" class="descrip">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="descripIcon">{{ seller.supports[0].description }}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="headerfive" @click="showDetail">
                <span>{{ seller.supports.length }}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="headeradver" @click="showDetail">
            <span class="advericon"></span>
            <span class="advertext">{{ seller.bulletin }}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="">
        </div>
        <div class="detailDiv" v-show="detailShow">
            <transition name="moved">
                <div class="detail-every">
                    <div class="detail-wrapper clearfix">
                        <div class="detail-content">
                            <h3>{{ seller.name }}</h3>
                            <star :size = "48" :score = "seller.score"></star>
                            <div class="detail-line">
                                <div class="line"></div>
                                <div class="title">基本信息</div>
                                <div class="line"></div>
                            </div>
                            <ul v-if="seller.supports" class="detail-supports">
                                <li class="detail-supports-li" v-for="(detailSupport, $index) in seller.supports" :key="$index">
                                    <icon :size = "16" :supp="seller.supports[$index].type"></icon>
                                    <span class="detailDescrip">{{ seller.supports[$index].description }}</span>
                                </li>
                            </ul>
                            <div class="detail-line">
                                <div class="line"></div>
                                <div class="title">商家公告</div>
                                <div class="line"></div>
                            </div>
                            <div class="detail-bulltin">
                                <p>{{ seller.bulletin }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="detail-close" @click="closeDetail">
                        <i class="icon-close"></i>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import star from '../star/star.vue'
import icon from '../star/icon.vue'
export default {
    components: {
        star,
        icon
    },
    props: {
        seller: {
            type: Object
        }
    },
    data () {
        return {
            classMap: ['decresase', 'discount', 'special', 'guarantee', 'invoice'],
            detailShow: false
        }
    },
    methods: {
        // 弹出详情页
        showDetail () {
            this.detailShow = true
        },
        // 关闭详情页
        closeDetail () {
            this.detailShow = false
        }
    }
}
</script>

<style lang="stylus">
.header
    color #fff
    overflow hidden
    position relative
    z-index 1
    .headerTop
        position relative
        background rgba(0,0,0,0.4)
        padding 24px 0 18px 24px
        line-height 1
        .headerTopLogo
            display inline-block
            .logo
                height 64px
                width 64px
                border-radius 4px
        .headerTopTxt
            display inline-block
            padding-left 18px
            font-size 0
            vertical-align top
            .title
                padding-bottom 8px
                .brand
                    display inline-block
                    vertical-align top
                    width 30px
                    height 18px
                    background url('./img/brand@2x.png') no-repeat
                    background-size 100%
                .name
                    font-size 16px
                    padding-left 6px
            .desc
                font-size 12px
                padding-bottom 10px
            .descrip
                font-size 10px
                .icon
                    display inline-block
                    width 12px
                    height 12px
                    vertical-align top
                    background-size 100%
                    &.decresase
                        background url('./img/decrease_1@2x.png') no-repeat
                        background-size 100%
                    &.discount
                        background url('./img/discount_1@2x.png') no-repeat
                        background-size 100%
                    &.guarantee
                        background url('./img/guarantee_1@2x.png') no-repeat
                        background-size 100%
                    &.invoice
                        background url('./img/invoice_1@2x.png') no-repeat
                        background-size 100%
                    &.special
                        background url('./img/special_1@2x.png') no-repeat
                        background-size 100%
        .headerfive{
            position absolute
            right 12px
            bottom 20px
            display block
            padding 3px 6px 3px 10px
            font-size 10px
            font-weight 200
            line-height 24px
            border-radius 20px
            background rgba(0,0,0,0.2)
        }
    .headeradver
        position relative
        padding 0 22px 0 12px
        height 28px
        line-height 28px
        background rgba(7,17,27,0.2)
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        .advericon
            display inline-block
            width 22px
            height 12px
            background url('./img/bulletin@2x.png') no-repeat
            background-size 100%
            vertical-align middle
        .advertext
            font-size 10px
        .icon-keyboard_arrow_right
            position absolute
            right 10px
            top 8px
    .background
        position absolute
        z-index -3
        top 0
        left 0
        width 100%
        height 100%
        filter blur(5px);
        img
            width 100%
            height 100%
    .detailDiv
        position fixed
        z-index 100
        top 0
        left 0
        width 100%
        height 100%
        overflow auto
        transition: all 0.5s
        background: rgba(7, 17, 27, 0.8)
        &.moved-enter-active, &.moved-leave-active {
            transition: all 0.5s linear;
            transform: translate3d(0, 0, 0);
        }
        &.moved-enter, &.moved-leave {
            transform: translate3d(100%, 0, 0);
        }
        .detail-every
            width 100%
            height 100%
            .detail-wrapper
                width: 100%
                min-height 100%
                .detail-content
                    margin-top 64px
                    padding-bottom 64px
                    h3
                        font-size 16px
                        font-weight 700
                        color #ffffff
                        line-height 16px
                        text-align center
                    .detail-line
                        width: 80%
                        margin: 28px auto
                        display: flex
                        .line
                            flex: 1
                            position: relative
                            display: inline-block
                            top: -6px
                            border-bottom: 1px #ccc solid
                        .title
                            font-size: 14px
                            line-height 14px
                            font-weight 700
                            padding: 0 12px
                    .detail-supports
                        width: 80%
                        margin: 28px auto
                        .detail-supports-li
                            padding-left 12px
                            padding-bottom: 12px
                            &:last-child
                                padding-bottom:0
                            .detailDescrip
                                font-size 12px
                                line-height 12px
                    .detail-bulltin
                        width: 80%
                        margin: 24px auto 0
                        p
                            padding: 0 12px
                            font-size 12px
                            font-weight 200
                            line-height 24px
            .detail-close
                position relative
                width 32px
                height 32px
                margin -64px auto 0 auto
                clear both
                font-size 32px
</style>
