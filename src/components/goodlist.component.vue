<template>
<ul class="goodList">
  <li v-for="(item, index) in list" @click="jumpGoodDetail(item.id)">
    <div class="wh-same rel">
      <img class="abs-center wh-100" :src="item.cover" alt="">
    </div>
    <div>
      <h6>{{item.name}}</h6>
      <p>&yen;{{item.price}}</p>
    </div>
  </li>
</ul>
</template>

<script>
import goodModel from "../models/good.model";
/*
  props: 接受外部传入组件的参数;
  data: 组件内部操作的参数;
  为防止组件重写，组件内部只操作data的参数，props只接受外部传入参数
*/
export default {
  props: {
    list_in: {
      default: []
    }
  },
  data() {
    return {
      list: this.list_in,
    }
  },
  watch: {
    list_in(newValue){
      this.list = newValue;
    }
  },
  mounted() {},
  updated() {},
  methods: {
    jumpGoodDetail(goodId) {
      this.$router.push({ 
        name: "good-detail",
        query: {goodId: goodId}
      });
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../assets/scss/common";

ul.goodList {
  width: 100%;
  overflow: hidden;
  padding: 0 10px;
  background: #fff;
  li{
    float: left;
    width: calc(50% - 5px);
    position: relative;
    border: 1px solid $border;
    margin-bottom: 10px;
    div{
      h6{
        font-weight: 500;
        line-height: 20px;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      p{
        color: $color-primary;
        margin-top: 5px;
      }
    }
    div:nth-child(2){
      padding: 10px;
    }
  }
  li:nth-child(2n) {
    margin-left: 5px;
  }
  li:nth-child(2n+1) {
    margin-right: 5px;
  }
}
</style>
