<template>
<div class="container">
  <comp-nav headline_in="创建订单"></comp-nav>
  <h5 class='subtitle'>订单商品</h5>
  <comp-goodorder :list_in="orderModel.cartGoodsList"></comp-goodorder>

  <div class="merchantBox exhibitBox">
    <span class="desc">选择取货门店</span>
    <span class="value">{{orderModel.orderParams.merchantid?'':'请选择'}}</span>
    <i class="iconfont icon-ahead"></i>
    <select name="merchant" v-model="orderModel.orderParams.merchantid">
      <option :value="item.id" v-for="(item, index) in orderModel.merchantList">{{item.name}}</option>
    </select>
    <p v-if="orderModel.orderParams.merchantid" v-html='getMerchantInfo(orderModel.orderParams.merchantid)'></p>
  </div>

  <h5 class='subtitle'>预定信息</h5>
  <div class="exhibitBox">
    <span class="desc">手机号</span>
    <input class="padding0" type="tel" placeholder="请输入" name="mobile" v-model="orderModel.orderParams.mobile">
  </div>
  <div class="exhibitBox">
    <span class="desc">取货日期</span>
    <span class="value">{{orderModel.orderParams.pickupdate?orderModel.orderParams.pickupdate:'请选择'}}</span>
    <i class="iconfont icon-ahead"></i>
    <select name="pickupdate" v-model="orderModel.orderParams.pickupdate">
      <option :value="item" v-for="(item, index) in orderModel.bookDateItems">{{item}}</option>
    </select>
  </div>
  <div class="exhibitBox">
    <span class="desc">取货时间</span>
    <span class="value">{{orderModel.orderParams.pickuptime?orderModel.orderParams.pickuptime:'请选择'}}</span>
    <i class="iconfont icon-ahead"></i>
    <select name="pickuptime" v-model="orderModel.orderParams.pickuptime">
      <option :value="item" v-for="(item, index) in orderModel.bookTimeItems">{{item}}</option>
    </select>
  </div>
  <div class="bottomBox">
    <p>实付款：<span>&yen;{{orderModel.fee}}</span></p>
    <button @click="jumpOrderDetail()">提交订单</button>
  </div>
</div>
</template>

<script>
import CompNav from "../components/nav.component";
import CompGoodorder from "../components/goodorder.component";
import elementService from "../services/element.service";
import commonService from "../services/common.service";
import orderService from "../services/order.service";
import orderModel from "../models/order.model";

export default {
  components: { CompNav, CompGoodorder },
  data() {
    return {
      orderModel: orderModel
    }
  },
  mounted() {
    this.init();
  },
  updated() {},
  methods: {
    init(){
      orderModel.orderParams = JSON.parse(JSON.stringify(orderModel.initParams));
      orderService.orderPercreate();
    },
    getMerchantInfo(id){
      if(!id){
        return;
      }
      let html = '';
      orderModel.merchantList.forEach((item, index) => {
        if(item.id == orderModel.orderParams.merchantid){
          html = item['name'] + "<br>" + item['address'];
        }
      });
      return html;
    },
    jumpOrderDetail(){
      if(!orderModel.orderParams.merchantid){
        elementService.message('请选择取货门店');
      }else if(!commonService.testMobile(orderModel.orderParams.mobile)){

      }else if(!orderModel.orderParams.pickupdate){
        elementService.message('请选择取货日期');
      }else if(!orderModel.orderParams.pickuptime){
        elementService.message('请选择取货时间');
      }else{
        // 请求后台
        orderService.orderCreate(data => {
          this.$router.push({ 
            name: "order-detail",
            query: {orderId: orderModel.orderId, delta: 2}
          });
        });
      }
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../assets/scss/common";

.container{
  .subtitle{
    padding: 8px $padding;
    color: $color-black;
    font-weight: 500;
    border-bottom: 1px solid $border;
  }
  .merchantBox{
    p{
      padding-top: 6px;
      padding-right: 10px;
      clear: both;
      color: $color-gray;
    }
  }
  .bottomBox{
    text-align: right;
  }
}
</style>
