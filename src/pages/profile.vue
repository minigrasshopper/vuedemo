<template>
<div class="container">
  <comp-nav back_in='0' headline_in="个人中心"></comp-nav>
  <comp-footer type_in='4'></comp-footer>
  <img src="../assets/images/profile.jpg" class='w-100' alt="">
  <div class='headerBox'>
    <img :src="userModel.headimgurl" alt="">
    <p>{{userModel.nickname}}</p>
  </div>
  <ul class="stateBox">
    <li @click="jumpOrderList('unpaid')">
      <i class="iconfont icon-paying"></i>
      <p>待付款</p>
      <span v-if="orderModel.stateObj.unpaid">{{orderModel.stateObj.unpaid}}</span>
    </li>
    <li @click="jumpOrderList('unshipped')">
      <i class="iconfont icon-shipping"></i>
      <p>待发货</p>
      <span v-if="orderModel.stateObj.unshipped">{{orderModel.stateObj.unshipped}}</span>
    </li>
    <li @click="jumpOrderList('shipped')">
      <i class="iconfont icon-shipped"></i>
      <p>待收货</p>
      <span v-if="orderModel.stateObj.shipped">{{orderModel.stateObj.shipped}}</span>
    </li>
    <li @click="jumpOrderList('completed')">
      <i class="iconfont icon-received"></i>
      <p>已完成</p>
      <span v-if="orderModel.stateObj.completed">{{orderModel.stateObj.completed}}</span>
    </li>
  </ul>
</div>
</template>

<script>
import httpService from "../services/http.service";
import CompNav from "../components/nav.component";
import CompFooter from "../components/footer.component";
import elementService from "../services/element.service";
import userModel from "../models/user.model";
import orderModel from "../models/order.model";
import goodService from "../services/good.service";
import orderService from "../services/order.service";

export default {
  components: { CompNav, CompFooter},
  data() {
    return {
      orderModel: orderModel,
      userModel: userModel
    };
  },
  mounted() {
    this.init();
  },
  updated() {},
  methods: {
    init() {
      goodService.getCategory(() => {
        orderService.getOrderList(() => {
          if(!userModel.headimgurl){
            httpService.getJSON(httpService.ACTION.ACCOUNT_INFO, {}, (data)=>{
              userModel.headimgurl = data.headimgurl;
              userModel.nickname = data.nickname;
            });
          }
        });
      })
    },
    jumpOrderList(state){
      this.$router.push({
        name: 'order-list', 
        query: {state: state}
      });
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../assets/scss/common";

.headerBox{
  text-align: center;
  background: #fff;
  padding-bottom: 10px;
  img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-top: -30px;
  }
  p{
    margin-top: 6px;
  }
}
.stateBox{
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid $border;
  padding: 5px 0;
  li{
    width: 25%;
    float: left;
    text-align: center;
    position: relative;
    .iconfont{
      font-size: 2.4rem;
      color: $color-gray;
    }
    p{
      color: $color-black;
      font-size: 1.2rem;
      margin-top: 2px;
    }
    span{
      position: absolute;
      top: 0;
      right: 0;
      border: 1px solid $color-primary;
      color: $color-primary;
      background: #fff;
      padding: 0 4px;
      border-radius: 6px;
      font-size: 1rem;
      display: block;
      height: 16px;
      line-height: 16px;
    }
  }
}
</style>
