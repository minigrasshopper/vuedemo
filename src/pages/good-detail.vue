<template>
<div class="container">
  <comp-nav headline_in="商品详情">
    <i class='iconfont icon-cart' slot='extra' @click='jumpCart()'></i>
  </comp-nav>
  <div v-if='goodModel.goodDetail'>
    <img class="w-100" :src="goodModel.goodDetail.cover" alt="">
    <div class="infoBox">
      <h6>{{goodModel.goodDetail.name}}</h6>
      <div class='cartBox'>
        <span>&yen;{{goodModel.goodDetail.price}}</span>
        <comp-cartdeal @changeEmit='cartEmitHandle($event)'></comp-cartdeal>
      </div>
      <p>{{goodModel.goodDetail.tips}}</p>
    </div>
    <div class="descBox" v-html='goodModel.goodDetail.description'></div>
  </div>
  <div class='bottomBox'>
    <button @click='addCartHandle()'>加入购物车</button>
  </div>
</div>
</template>

<script>
import CompNav from "../components/nav.component";
import CompCartdeal from "../components/cartdeal.component";
import elementService from "../services/element.service";
import goodService from "../services/good.service";
import cartService from "../services/cart.service";
import goodModel from "../models/good.model";
import cartModel from "../models/cart.model";

export default {
  components: { CompNav, CompCartdeal },
  data() {
    return {
      goodModel: goodModel,
      num: 1
    };
  },
  mounted() {
    this.init();
  },
  updated() {
    // template模板不存在的元素，后面通过js生成，css样式无效，只能通过js修改样式
    $('.descBox').find('img').css('width', '100%');
  },
  methods: {
    init() {
      goodModel.goodId = this.$route.query.goodId;
      cartModel.goodId = goodModel.goodId;
      goodService.getGoodDetail();
    },
    cartEmitHandle(event) {
      this.num = event;
    },
    addCartHandle(){
      cartService.addCart(this.num, () => {
        elementService.message('成功加入购物车');
      });
    },
    jumpCart(){
      this.$router.push({name: 'cart'});
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../assets/scss/common";

.icon-cart{
  color: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  right: $padding;
  color: #fff;
  font-size: 2.4rem;
}
.infoBox {
  background: #fff;
  padding: $padding;
  border: 1px solid $border;
  border-left: none;
  border-right: none;
  h6 {
    font-weight: 500;
  }
  div.cartBox {
    overflow: hidden;
    margin: 5px 0;
    width: 100%;
    span {
      float: left;
      line-height: 32px;
      color: $color-primary;
      font-size: 1.6rem;
    }
    .cartdealBox {
      float: right;
    }
  }
}
.descBox{
  background: #fff;
  margin-top: 10px;
  padding: 0 $padding;
}
.bottomBox{
  text-align: center;
}
</style>
