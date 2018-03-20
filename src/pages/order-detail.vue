<template>
<div class="container" v-if="orderModel.orderDetail">
  <comp-nav :delta_in="delta" headline_in="创建订单"></comp-nav>
  <comp-goodorder :list_in="orderModel.orderDetail.goods"></comp-goodorder>
  <h6 class="feeBox">实付款：<span>{{orderModel.orderDetail.realFee}}</span></h6>
  <div class="exhibitBox">
    <span class="desc">订单编号</span>
    <span class="value padding0">{{orderModel.orderDetail.orderSn}}</span>
  </div>
  <div class="exhibitBox">
    <span class="desc">订单时间</span>
    <span class="value padding0">{{orderModel.orderDetail.createat}}</span>
  </div>
  <div class="exhibitBox">
    <span class="desc">订单状态</span>
    <span class="value padding0">{{orderModel.orderDetail.statusMsg}}</span>
  </div>
  <div class="exhibitBox">
    <span class="desc">取货门店</span>
    <span class="value padding0">{{orderModel.orderDetail.pickupshop}}</span>
  </div>
  <div class="exhibitBox">
    <span class="desc">手机号</span>
    <span class="value padding0">{{orderModel.orderDetail.pickupmobile}}</span>
  </div>
  <div class="exhibitBox">
    <span class="desc">取货日期</span>
    <span class="value padding0">{{orderModel.orderDetail.pickupdate}}</span>
  </div>
  <div class="exhibitBox">
    <span class="desc">取货时间</span>
    <span class="value padding0">{{orderModel.orderDetail.pickuptime}}</span>
  </div>

  <div class="bottomBox" v-show="orderModel.orderDetail.status=='unpaid'">
    <!--unpaid-->
    <button v-on:click="cancelHandle()" class="f-l outline">取消订单</button>
    <button v-on:touchend="payHandle()" class="f-r">立即付款</button>
  </div>

  <div class="bottomBox" v-show="orderModel.orderDetail.status=='cancelled'">
    <!--cancelled-->
    <span class="f-l">订单已取消</span>
    <button v-on:touchend="jumpHome()" class="f-r">返回首页</button>
  </div>

  <div class="bottomBox" v-show="orderModel.orderDetail.status=='unshipped'">
    <!--unshipped-->
    <span class="f-l">待发货</span>
    <button v-on:touchend="jumpHome()" class="f-r">返回首页</button>
  </div>

  <div class="bottomBox" v-show="orderModel.orderDetail.status=='shipped'">
    <!--shipped-->
    <span class="f-l">已发货</span>
    <button v-on:touchend="receiveHandle()" class="f-r">确认收货</button>
  </div>

  <div class="bottomBox" v-show="orderModel.orderDetail.status=='completed'">
    <!--completed-->
    <span class="f-l">已完成</span>
    <button v-on:touchend="delHandle()" class="f-r">删除订单</button>
  </div>

  <div class="bottomBox" v-show="orderModel.orderDetail.status=='deleted'">
    <!--deleted-->
    <span class="f-l">已删除</span>
    <button v-on:touchend="jumpHome()" class="f-r">返回首页</button>
  </div>
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
      delta: this.$route.query.delta ? this.$route.query.delta : 1,
    }
  },
  mounted() {
    this.init();
  },
  updated() {},
  methods: {
    init(){
      orderModel.orderId = this.$route.query.orderId;
      orderService.orderDetail();
    },
    cancelHandle(){
      orderService.orderCancel();
    },
    payHandle(){
      orderService.orderPay();
    },
    receiveHandle(){
      orderService.orderReceive();
    },
    delHandle(){
      orderService.orderDel();
    },
    jumpHome(){
      this.$router.push({name: 'home'});
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../assets/scss/common";

.container{
  .feeBox{
    text-align: right;
    padding: $padding;
    color: $color-black;
    span{
      font-size: 1.6rem;
      color: $color-primary;
    }
  }
  .bottomBox{
    button{
      width: 46%;
    }
  }
}
</style>
