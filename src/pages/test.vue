<template>
<div>
  test
</div>
</template>

<script>
import axiosService from "@/services/axios.service"
import orderService from '@/services/order.service'
import axios from 'axios';
export default {
  data() {
    return {};
  },
  mounted() {
    axiosService.promise([this.getCate(), this.getList()]).then(axios.spread((res1, res2)=>{
      console.log(res1);
    }))
  },
  updated() {},
  methods: {
    getCate() {
      return axiosService.getAxios("get", axiosService.ACTION.GOODS_CATE, {})
    },
    getList(){
      return axiosService.getAxios("get", axiosService.ACTION.GOODS_LIST, {})
    }
  }
};
</script>

<style scoped lang='scss'>

</style>
