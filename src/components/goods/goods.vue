<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuwrapper">
            <ul>
                <li v-for="(item, $index) in goods" :key="$index" class="goodsmenu" :class="{'current': currentIndex === $index}" @click="selectMenu($index, $event)">
                    <span class="menuName">
                        <icon v-show="item.type>0" :size = "12" :supp="item.type"></icon>
                        {{ item.name }}
                    </span>
                </li>
            </ul>
        </div>
        <div class="food-wrapper" ref="foodwrapper">
            <ul class="foodList">
                <li v-for="(item, $index) in goods" :key="$index" class="allFood food-list-hook">
                    <h3 class="foodTitle">{{ item.name }}</h3>
                    <ul class="foodListOne">
                        <li v-for="(food, $index) in item.foods" :key="$index" class="otherFood">
                            <div class="foodLeft">
                                <img :src="food.icon" alt="">
                            </div>
                            <div class="foodRight">
                                <h3 class="foodName">{{ food.name }}</h3>
                                <p class="foodDescrip">{{ food.description }}</p>
                                <p class="foodSell">
                                    <span class="sellCount">月售{{ food.sellCount }}份</span>
                                    <span class="rating">好评率{{ food.rating }}%</span>
                                </p>
                                <p class="price"><span class="rmb">￥</span>{{ food.price }}<span class="oldPrice" v-show="food.oldPrice">￥{{ food.oldPrice }}</span></p>
                                <div class="cartcontrol-wrapper">
                                    <addlabel :food="food" v-on:cart-add="cartAdd"></addlabel>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price = "seller.deliveryPrice" :min-price = "seller.minPrice"></shopcart>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import icon from '../star/icon.vue'
    import shopcart from '../shopcart/shopcart.vue'
    import addlabel from '../cartcontrol/cartcontrol.vue'
    const ERR_OK = 0
    export default {
        components: {
            icon,
            shopcart,
            addlabel
        },
        props: {
            seller: {
                type: Object
            }
        },
        data () {
            return {
                goods: [],
                listHeight: [],
                scrollY: []
            }
        },
        computed: {
            currentIndex () {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i]
                    let height2 = this.listHeight[i + 1]
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i
                    }
                }
                return 0
            },
            selectFoods () {
                let foods = []
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if (food.count) {
                            foods.push(food)
                        }
                    })
                })
                return foods
            }
        },
        created () {
            this.$http.get('/api/goods').then(function (res) {
                if (res.body.errno === ERR_OK) {
                    this.goods = res.body.data
                    this.$nextTick(() => {
                        this._initScroll()
                        this._caculateHeight()
                    })
                }
            })
        },
        methods: {
            // 点击左边菜单
            selectMenu (index, event) {
                if (!event._constructed) {
                    return
                }
                let foodList = this.$refs.foodwrapper.getElementsByClassName('food-list-hook')
                let el = foodList[index]
                this.foodScroll.scrollToElement(el, 300)
            },
            cartAdd (el) { // dom元素更新后执行， 因此此处能正确打印出更改之后的值；
            　  this.$nextTick( () => {
                    this.$refs['shopcart'].drop(el);　//调用shopcart组件的drop()函数
                });
            },
            _drop (target) {
                this.$refs.shopcart.drop(target)
            },
            _initScroll () {
                this.meunScroll = new BScroll(this.$refs.menuwrapper, {
                    click: true
                })
                this.foodScroll = new BScroll(this.$refs.foodwrapper, {
                    click: true,
                    probeType: 3
                })
                this.foodScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y))
                })
            },
            _caculateHeight () {
                let foodList = this.$refs.foodwrapper.getElementsByClassName('food-list-hook')
                let height = 0
                this.listHeight.push(height)
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            }
        },
        events: {
            'cart.add' (target) {
                this._drop(target)
            }
        }
    }
</script>

<style lang="stylus">
@import '../../common/stylus/mixin.styl';
    .goods
        display flex
        position absolute
        top 176px
        bottom 46px
        width 100%
        overflow hidden
        .menu-wrapper
            flex 0 0 80px
            width: 80px
            background #f3f5f7
            .goodsmenu
                display table
                height 54px
                width 56px
                line-height 14px
                margin 0 12px
                font-weight 200
                color #07111b
                border-1px(rgba(7, 17, 27, 0.1))
                &.current
                    position relative
                    margin-top -1px
                    font-weight 700
                    border-1px(rgba(7, 17, 27, 0))
                .menuName
                    display table-cell
                    width 56px
                    vertical-align middle
                    font-size 12px
        .food-wrapper
            flex 1
            margin-bottom: 0
            .allFood
                width 100%
                .foodTitle
                    width 100%
                    line-height 26px
                    font-size 12px
                    color rgb(147, 153, 159)
                    border-left 2px #d9dde1 solid
                    padding-left 14px
                    background #f3f5f7
                .foodListOne
                    width 100%
                    .otherFood
                        margin:0 18px
                        padding-top 18px
                        display flex
                        border-bottom 1px rgba(7, 17, 27, 0.1) solid
                        &:last-child
                            border-bottom 0
                        .foodLeft
                            flex 0 0 57px
                            img
                                width: 57px
                                height: 57px
                        .foodRight
                            flex 1
                            padding-left 10px
                            font-size 0
                            position relative
                            .foodName
                                padding 2px 0 8px
                                font-size 14px
                                color rgb(7,17,27)
                                line-height 14px
                            .foodDescrip, .foodSell
                                font-size 10px
                                color rgb(147,153,159)
                                line-height 12px
                            .foodDescrip
                                margin-bottom 8px
                            .foodSell
                                .rating
                                    padding-left: 6px
                            .price
                                font-size 14px
                                color rgb(240, 20, 20)
                                font-weight 700
                                line-height 48px
                                .oldPrice, .rmb
                                    font-size 10px
                                .oldPrice
                                     font-weight normal
                                     color rgb(147, 153, 159)
                                     padding-left 6px
                            .cartcontrol-wrapper
                                position absolute
                                right 0
                                bottom 12px

</style>
