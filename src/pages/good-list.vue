<template>
<div class="container">
  <comp-nav :headline_in="goodModel.categoryName"></comp-nav>
  <comp-goodlist :list_in='goodModel.goodListCate'></comp-goodlist>
</div>
</template>

<script>
import CompNav from "../components/nav.component";
import CompGoodlist from "../components/goodlist.component";
import goodService from "../services/good.service";
import goodModel from "../models/good.model";

export default {
  components: { CompNav, CompGoodlist },
  data() {
    return {
      goodModel: goodModel
    };
  },
  mounted() {
    this.init();
  },
  updated() {},
  methods: {
    init() {
	    goodModel.categoryName = this.$route.query.categoryName;
      goodModel.categoryId = this.$route.query.categoryId;
      goodService.getGoodListCate();
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../assets/scss/common";
</style>
