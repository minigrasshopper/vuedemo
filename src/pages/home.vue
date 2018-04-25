<template>
<div class="container">
  <comp-nav back_in='0' headline_in="首页"></comp-nav>
  <comp-footer type_in='1'></comp-footer>
  <div class="swiper-container">
    <div class="swiper-pagination"></div>
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="../assets/images/swiper1.jpg" alt="">
      </div>
      <div class="swiper-slide">
        <img src="../assets/images/swiper2.jpg" alt="">
      </div>
      <div class="swiper-slide">
        <img src="../assets/images/swiper3.jpg" alt="">
      </div>
    </div>
  </div>
  <div class="goodsBox" v-for="(item, key) in goodModel.goodListLimit" v-if="item.goodsnum != 0">
    <p>
      <span>{{item.name}}</span>
      <span @click="jumpGoodList(item.name, item.id)">More</span>
    </p>
    <comp-goodlist :list_in='item.goods'></comp-goodlist>
  </div>
</div>
</template>

<script>
import CompNav from "../components/nav.component";
import CompFooter from "../components/footer.component";
import CompGoodlist from "../components/goodlist.component";
import goodService from "../services/good.service";
import cartService from "../services/cart.service";
import shareService from "../services/share.service";
import goodModel from "../models/good.model";

export default {
  components: { CompNav, CompFooter, CompGoodlist },
  data() {
    return {
      goodModel: goodModel
    };
  },
  mounted() {
    this.init();
  },
  updated() {
    this.SwiperInit();
  },
  methods: {
    init() {
      goodService.getCategory(() => {
         goodService.getGoodListLimit(() => {
            cartService.getCartInfo(()=>{
              shareService.wxShare();
            });
         }); 
      })
    },
    SwiperInit() {
      new Swiper(".swiper-container", {
        direction: "horizontal",
        pagination: ".swiper-pagination",
        loop: true,
        autoplay: 1000
      });
    },
    jumpGoodList(categoryName, categoryId) {
      this.$router.push({
        name: "good-list",
		    query: {categoryName: categoryName, categoryId: categoryId}
      });
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../assets/scss/common";

.swiper-container {
  width: 100%;
  height: 150px;
  .swiper-wrapper {
    .swiper-slide {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.goodsBox {
  > p {
    padding: 10px;
    overflow: hidden;
    background: #fff;
    span:nth-child(1) {
      float: left;
    }
    span:nth-child(2) {
      float: right;
      color: $color-primary;
    }
  }
}
</style>
