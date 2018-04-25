<template>
<div class="container">
  <comp-nav back_in='0' headline_in="购物车"></comp-nav>
  <comp-footer type_in='3'></comp-footer>
  <h6 class='noHint' v-if="cartModel.goodsList.length == 0">购物车是空的<br>快去添加商品吧</h6>
  <ul class='goodListCart'>
    <li v-for='(item, key) in cartModel.goodsList' :class='item.picked==1?"selected":""'>
      <i class='iconfont icon-select abs-v-center' @click='togglepickHandle(key)'></i>
      <img :src="item.cover" alt="">
      <div class='infoBox'>
        <h6>{{item.name}}</h6>
        <div class='cartBox'>
          <span>&yen;{{item.price}}</span>
          <comp-cartdeal disabled_in='1' parentctrol_in='1' :num_in='item.count' @reduceEmit='reduceEmitHandle(key)' @addEmit='addEmitHandle(key)'></comp-cartdeal>
        </div>
      </div>
      <i class='iconfont icon-delete' @click='delHandle(key)'></i>
    </li>
  </ul>
  <div class="otherBox">
    <h3>其他推荐</h3>
    <comp-goodlist :list_in='goodModel.goodListRandom'></comp-goodlist>
  </div>
  <div class="bottomBox" v-if="cartModel.volume != 0">
    <p>合计：<span>&yen;{{cartModel.volume}}</span></p>
    <button @click="jumpOrderCreate()">结 算</button>
  </div>
</div>
</template>

<script>
import CompNav from "../components/nav.component";
import CompFooter from "../components/footer.component";
import CompCartdeal from "../components/cartdeal.component";
import CompGoodlist from "../components/goodlist.component";
import elementService from "../services/element.service";
import goodService from "../services/good.service";
import cartService from "../services/cart.service";
import cartModel from "../models/cart.model";
import goodModel from "../models/good.model";

export default {
  components: { CompNav, CompFooter, CompCartdeal, CompGoodlist },
  data() {
    return {
      cartModel: cartModel,
      goodModel: goodModel
    };
  },
  mounted() {
    this.init();
  },
  updated() {},
  methods: {
    init() {
      goodService.getCategory(() => {
        cartService.getCartInfo( () => {
          goodService.getGoodListRandom();
        });
      })
    },
    addEmitHandle(goodId){
      cartModel.goodId = goodId;
      // 增加商品数量
      cartService.addCart(1, () => {
        elementService.message('购物车+1');
        cartService.getCartInfo();
      });
    },
    reduceEmitHandle(goodId){
      cartModel.goodId = goodId;
      // 减少商品数量
      cartService.reduceCart(() => {
        elementService.message('购物车-1');
        cartService.getCartInfo();
      });
    },
    delHandle(goodId){
      cartModel.goodId = goodId;
      // 删除商品
      cartService.deleteCart(() => {
        elementService.message('已删除');
        cartService.getCartInfo();
      });
    },
    togglepickHandle(goodId){
      cartModel.goodId = goodId;
      // 商品选中取消
      cartService.togglePickCart(() => {
        cartService.getCartInfo();
      });
    },
    jumpOrderCreate(){
      this.$router.push({name: "order-create"});
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../assets/scss/common";

.container{
  padding-bottom: 110px;
  .noHint{
    text-align: center;
    color: $color-gray;
    padding: 12px;
    line-height: 20px;
    font-size: 1.6rem;
    font-weight: 500;
  }
  .otherBox{
    margin-top: 20px;
    border-top: 1px solid $border;
    h3{
      text-align: center;
      padding: 10px;
      font-size: 1.6rem;
      color: $color-black;
    }
  }
  .bottomBox{
    bottom: 50px;
    text-align: right;
  }
  // 商品列表+购物车
  ul.goodListCart{
    li.selected{
      .icon-select{
        color: $color-primary;
      }
    }
    li{
      overflow: hidden;
      padding: $padding $padding $padding 30px;
      border-bottom: 1px solid $border;
      border-top: 1px solid $border;
      position: relative;
      background: #fff;
      margin-bottom: 10px;
      .icon-select{
        color: #ccc;
        font-size: 2.4rem;
        left: 15px;
        transform: translateX(-50%) translateY(-50%);
      }
      .icon-delete{
        font-size: 2.4rem;
        color: $color-black;
        float: right;
        margin-top: 6px;
        clear: both;
      }
      img{
        float: left;
        width: 60px;
        height: 60px;
        border: 1px solid $border;
      }
      .infoBox{
        float: right;
        width: calc(100% - 60px);
        padding-left: 5px;
        h6{
          font-weight: 500;
          margin-bottom: 6px;
        }
        .cartBox{
          overflow: hidden;
          span{
            line-height: 30px;
            color: $color-primary;
          }
          .cartdealBox{
            float: right;
          }
        }
      }
    }
  }
}
</style>
