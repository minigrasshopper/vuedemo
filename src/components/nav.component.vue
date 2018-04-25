<template>
<nav>
  <i v-if="back == 1" @click="backHandle()" class="iconfont icon-back"></i>
  <p class="headline">{{headline}}</p>
  <slot name='extra'></slot>
</nav>
</template>

<script>
/*
  props: 接受外部传入组件的参数;
  data: 组件内部操作的参数;
  为防止组件重写，组件内部只操作data的参数，props只接受外部传入参数
*/
export default {
  props: {
    delta_in: {
      default: 1
    },
    back_in: {
      default: 1
    },
    headline_in: {
      default: ""
    }
  },
  data() {
    return {
      back: this.back_in,
      headline: this.headline_in,
      delta: this.delta_in
    }
  },
  watch: {
    back_in(newValue){
      this.back = newValue;
    },
    headline_in(newValue){
      this.headline = newValue;
    },
    delta_in(newValue){
      this.delta = newValue;
    },
  },
  mounted() {},
  updated() {},
  methods: {
    backHandle() {
      this.$router.go(-this.delta);
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../assets/scss/common";

nav{
  background: $color-primary;
  height: 36px;
  line-height: 36px;
  position: fixed;
  text-align: center;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 99;
  color: #fff;
  .icon-back{
    position: absolute;
    left: $padding;
    font-size: 2.4rem;
    line-height: 36px;
  }
  .headline{
    font-size: 1.6rem;
  }
}
</style>
