<template>
    <div class="foodcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight': totalPrice > 0}">
                        <i class="icon-shopping_cart" :class="{'highlight': totalPrice > 0}"></i>
                    </div>
                    <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
                </div>
                <div class="left-price" :class="{'highlight': totalCount > 0}">￥{{ totalPrice }}</div>
                <div class="left-desc">另需配送费￥{{ deliveryPrice }}元</div>
            </div>
            <div class="content-right" :class="payClass">{{ payDesc }}</div>
        </div>
        <div class="ball-container">
            <div transition="drop" v-for="(ball, $index) in balls" :key="$index" v-show="ball.show" class="ball">
                <div class="inner"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        selectFoods: {
            type: Array,
            default () {
                return []
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
            type: Number,
            default: 0
        }
    },
    data () {
        return {
            balls: [{
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                },
                {
                    show: false
                }]
        }
    },
    methods: {
        drop (el) {
            console.log(el)
        }
    },
    computed: {
        // 商品价格
        totalPrice () {
            let total = 0
            this.selectFoods.forEach((food) => {
                total += food.price * food.count
            })
            return total
        },
        // 商品数量
        totalCount () {
            let count = 0
            this.selectFoods.forEach((food) => {
                count += food.count
            })
            return count
        },
        // 还差多少元起送
        payDesc () {
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}元起送`
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice
                return `还差￥${diff}元起送`
            } else {
                return '去结算'
            }
        },
        // 去结算/起送样式
        payClass () {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough'
            } else {
                return 'enough'
            }
        }
    }
}
</script>

<style lang="stylus">
    .foodcart
        width 100%
        position fixed
        bottom 0
        background #141d27
        .content
            display flex
            .content-left
                flex 1
                .logo-wrapper
                    display inline-block
                    position relative
                    top -10px
                    margin 0 12px
                    padding 6px
                    width 56px
                    height 56px
                    box-sizing border-box
                    vertical-align top
                    border-radius 50%
                    background #141d27
                    .logo
                        width 100%
                        height 100%
                        text-align center
                        border-radius 50%
                        background #2b343c
                        &.highlight
                            background rgb(0,160,220)
                        .icon-shopping_cart
                            line-height 44px
                            font-size 24px
                            color #80858a
                            &.highlight
                                color #fff
                    .num
                        position absolute
                        top 0
                        right 0
                        width 24px
                        height 16px
                        background #f01414
                        font-size 12px
                        color #fff
                        text-align center
                        line-height 16px
                        border-radius 20px
                        box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
                .left-price, .left-desc
                    display inline-block
                    font-weight 700
                    line-height 24px
                    color rgba(255,255,255,0.4)
                .left-price
                    margin-top 16px
                    padding-right 12px
                    font-size 16px
                    border-right 1px rgba(255,255,255,0.1) solid
                    &.highlight
                        color #fff
                .left-desc
                    padding-left 12px
                    font-size 12px
            .content-right
                flex 0 0 105px
                width 105px
                text-align center
                font-size 12px
                color rgba(255,255,255,0.4)
                font-weight 700
                line-height 24px
                padding-top 16px
                &.not-enough
                    background #2b333b
                &.enough
                    background #00b43c
                    color rgb(255,255,255)
        .ball-container
            .ball
                position fixed
                left 32px
                bottom 22px
                z-index 200
                &.drop-transition
                    transition all 0.4s
                    .inner
                        width 16px
                        height 16px
                        border-radius 50%
                        background rgb(0, 160, 220 )
                        transition all 0.4s
</style>
