<template>
<footer>
  <ul>
    <li @click="tabHandle(1)" :class="type==1?'selected':''">
      <div>
        <i class="iconfont icon-home"></i>
        <p>首页</p>
      </div>
    </li>
    <li @click="tabHandle(2)" :class="type==2?'selected':''">
      <div>
        <i class="iconfont icon-category"></i>
        <p>全部分类</p>
      </div>
    </li>
    <li @click="tabHandle(3)" :class="type==3?'selected':''">
      <div>
        <i class="iconfont icon-cart"></i>
        <p>购物车</p>
      </div>
      <span v-if="cartModel.length != 0" class="cartNum">{{cartModel.length}}</span>
    </li>
    <li @click="tabHandle(4)" :class="type==4?'selected':''">
      <div>
        <i class="iconfont icon-profile"></i>
        <p>个人中心</p>
      </div>
    </li>
  </ul>
  <ul :class="cateShow?'cateRun':''">
    <li v-if="item.goodsnum > 0" :class="cateId==item.id?'selected':''" @click="jumpGoodList(item.name, item.id)" v-for="(item, key) in goodModel.category">{{item.name}}</li>
  </ul>
</footer>
</template>

<script>
import cartModel from "../models/cart.model";
import goodModel from "../models/good.model";
/*
  props: 接受外部传入组件的参数;
  data: 组件内部操作的参数;
  为防止组件重写，组件内部只操作data的参数，props只接受外部传入参数
*/
export default {
  props: {
    type_in: {
      default: 0
    }
  },
  data() {
    return {
      type: this.type_in, // 当前tab[1,2,3,4]
      goodModel: goodModel, // 用于展示商品分类
      cateShow: false, // 类别是否展示
      cateId: null, // 当前选中的类别的id
      cartModel: cartModel  // 用于展示购物车数量
    }
  },
  watch: {
    type_in(newValue){
      this.type = newValue;
    }
  },
  mounted() {},
  updated() {},
  methods: {
    tabHandle(type) {
      this.type = type;
      switch (type) {
        case 1:
          this.$router.push({ name: "home" });
          break;
        case 2:
          this.cateShow = !this.cateShow;
          break;
        case 3:
          this.$router.push({ name: "cart" });
          break;
        case 4:
          this.$router.push({ name: "profile" });
          break;
      }
    },
    jumpGoodList(categoryName, categoryId) {
      this.cateId = categoryId;
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

@keyframes cateRun {
  from {
    bottom: 0;
    transform: translateX(-50%) translateY(100%);
  }
  to {
    bottom: 60px;
    transform: translateX(-50%) translateY(0);
  }
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  height: 50px;
  background: #fff;
  text-align: center;
  border-top: 1px solid $border;
  ul:nth-child(1) {
    height: 100%;
    li {
      width: 25%;
      height: 100%;
      float: left;
      position: relative;
      border-right: 1px solid $border;
      div {
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 1;
        transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translateX(-50%) translateY(-50%);
        p {
          font-size: 1.2rem;
          color: #666;
        }
      }
      .iconfont {
        color: #666;
        font-size: 2rem;
      }
      .cartNum{
        position: absolute;
        top: 2px;
        right: 2px;
        background: $color-primary;
        color: #fff;
        padding: 0 4px;
        font-size: 1.2rem;
        border-radius: 6px;
      }
    }
    li:last-child {
      border-right: none;
    }
    li.selected {
      div {
        p {
          color: $color-primary;
        }
      }
      .iconfont {
        color: $color-primary;
      }
    }
  }
  ul:nth-child(2) {
    background: #fff;
    position: absolute;
    z-index: -99;
    left: 37.5%;
    border: 1px solid $border;
    border-radius: 4px;
    padding: 0 8px;
    bottom: 0;
    transform: translateX(-50%) translateY(100%);
    li {
      padding: 5px 0;
      border-bottom: 1px solid $border;
    }
    li:last-child {
      border-bottom: none;
    }
    li.selected {
      color: $color-primary;
    }
  }
  ul.cateRun {
    animation: cateRun 0.6s linear both;
  }
}
</style>
