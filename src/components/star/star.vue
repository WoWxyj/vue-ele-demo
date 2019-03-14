<template>
    <div class="star" :class="starType">
        <span v-for="(itemclass, index) in itemclasses" :class="itemclass" class="star-item" :key="index"></span>
    </div>
</template>

<script>
    const LENGHT = 5
    const LSL_ON = 'on'
    const LSL_HALF = 'half'
    const LSL_OFF = 'off'
    export default {
        props: {
            size: {
                type: Number
            },
            score: {
                type: Number
            }
        },
        computed: {
            starType () {
                return 'star-' + this.size
            },
            itemclasses () {
                let result = []
                let score = Math.floor(this.score * 2) / 2
                let hasDecimal = score % 1 !== 0 // 小数
                let integer = Math.floor(score) // 整数
                for (let i = 0; i < integer; i++) { // 全星
                    result.push(LSL_ON)
                }
                if (hasDecimal) { // 半星
                    result.push(LSL_HALF)
                }
                while (result.length < LENGHT) { // 无星
                    result.push(LSL_OFF)
                }
                return result
            }
        }
    }
</script>

<style lang="stylus">
    .star
        width: 100%
        margin-top: 16px
        text-align center
        &.star-48, &.star-36, &.star-24
            width: 100%
            .star-item
                display: inline-block
                &.on
                    background url('./img/star48_on@2x.png') no-repeat
                    background-size: 100%
                &.half
                    background url('./img/star48_half@2x.png') no-repeat
                    background-size: 100%
                &.off
                    background url('./img/star48_off@2x.png') no-repeat
                    background-size: 100%
        &.star-48
            .star-item
                width: 20px
                height: 20px
                margin-right: 22px
        &.star-36
            .star-item
                width: 15px
                height: 15px
                margin-right: 6px
        &.star-24
            .star-item
                width: 10px
                height: 10px
                margin-right: 3px
</style>
