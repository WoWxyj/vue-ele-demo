<template>
    <div class="addlabel">
        <div class="reduce icon-remove_circle_outline" v-show="food.count>0" @click="removeicon"></div>
        <div class="albelcount" v-show="food.count>0">{{ food.count }}</div>
        <div class="add icon-add_circle" @click="addicon($event)"></div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    props: {
        food: {
            food: Object
        }
    },
    methods: {
        addicon (event) {
            if (!event._constructed) {
                return
            }
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1)
            } else {
                this.food.count++
            }
            this.$emit('cart.add', event.target)
        },
        removeicon (event) {
            if (!event._constructed) {
                return
            }
            if (this.food.count) {
                this.food.count--
            }
        }
    }
}
</script>

<style lang="stylus">
    .addlabel
        font-size 0
        .reduce, .albelcount, .add
            display inline-block
            line-height 24px
        .reduce, .add
            font-size 24px
            color #00a0dc
            padding 0 6px
        .albelcount
            font-size 10px
            vertical-align: top;
</style>
