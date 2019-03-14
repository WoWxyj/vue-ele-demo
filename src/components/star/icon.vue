<template>
    <span :class="iconSize">
        <span class="detailIcon" :class="classMap[ supp ]"></span>
    </span>
</template>

<script>
export default {
    props: {
        size: {
            type: Number
        },
        supp: {
            type: Number
        }
    },
    data () {
        return {
            classMap: ['decresase', 'discount', 'special', 'guarantee', 'invoice']
        }
    },
    computed: {
        iconSize () {
            return 'icon-' + this.size
        }
    }
}
</script>

<style lang="stylus">
.icon-12, .icon-16
    .detailIcon
        display inline-block
        vertical-align middle
        background-size 100%
.icon-16
    .detailIcon
        width: 16px
        height: 16px
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
.icon-12
    .detailIcon
        width: 12px
        height: 12px
        &.decresase
            background url('./img/decrease_3@2x.png') no-repeat
            background-size 100%
        &.discount
            background url('./img/discount_3@2x.png') no-repeat
            background-size 100%
        &.guarantee
            background url('./img/guarantee_3@2x.png') no-repeat
            background-size 100%
        &.invoice
            background url('./img/invoice_3@2x.png') no-repeat
            background-size 100%
        &.special
            background url('./img/special_3@2x.png') no-repeat
            background-size 100%
</style>
