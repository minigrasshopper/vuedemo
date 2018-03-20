<template>
<div class="container">
  <comp-nav headline_in="订单列表"></comp-nav>
  <ul class="stateBox">
    <li @click="toggleHandle('unpaid')" :class="state=='unpaid'?'selected':''"><span>待付款</span></li>
    <li @click="toggleHandle('unshipped')" :class="state=='unshipped'?'selected':''"><span>待发货</span></li>
    <li @click="toggleHandle('shipped')" :class="state=='shipped'?'selected':''"><span>待收货</span></li>
    <li @click="toggleHandle('completed')" :class="state=='completed'?'selected':''"><span>已完成</span></li>
  </ul>
  <ul class="orderBox">
    <li v-for="item in orderModel.orderList" v-if="item.status == state">
      <comp-goodorder :list_in="item.goods"></comp-goodorder>
      <h6><button @click="jumpOrderDetail(item.id)">查看详情</button></h6>
    </li>
  </ul>
</div>
</template>

<script>
import CompNav from "../components/nav.component";
import CompGoodorder from "../components/goodorder.component";
import elementService from "../services/element.service";
import orderService from "../services/order.service";
import orderModel from "../models/order.model";

export default {
  components: { CompNav, CompGoodorder },
  data() {
    return {
      orderModel: orderModel,
      state: this.$route.query.state ? this.$route.query.state : 'unpaid'
    }
  },
  mounted() {
    this.init();
  },
  updated() {},
  methods: {
    init(){
      orderService.getOrderList();
    },
    jumpHome(){
      this.$router.push({name: 'home'});
    },
    jumpOrderDetail(orderId){
      this.$router.push({ 
        name: "order-detail",
        query: {orderId: orderModel.orderId}
      });
    },
    toggleHandle(state){
      this.state = state;
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../assets/scss/common";

.container{
  ul.stateBox{
    overflow: hidden;
    background: #fff;
    padding: $padding;
    margin-bottom: 10px;
    li{
      float: left;
      width: 25%;
      text-align: center;
      span{
        padding-bottom: 6px;
      }
    }
    li.selected{
      span{
        color: $color-primary;
        border-bottom: 1px solid $color-primary;
      }
    }
  }

  ul.orderBox{
    li{
      margin-bottom: 10px;
      h6{
        text-align: right;
        padding: $padding;
        background: #fff;
        border-bottom: 1px solid $border;
        button{
          background: $color-primary;
          color: #fff;
          height: 30px;
          padding: 0 10px;
          border-radius: 6px;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
