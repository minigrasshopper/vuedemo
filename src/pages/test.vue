<template>
<div>
  test
</div>
</template>

<script>
import axiosService from "@/services/axios.service"
import orderService from '@/services/order.service'
import axios from 'axios'
export default {
  data() {
    return {};
  },
  mounted() {
    this.getCate().then(()=>{
      console.log('1244');
    });
    return 
    axios.all([this.getCate(), this.getList()]).then(axios.spread(function (pre, next) {
      // 两个请求现在都执行完成
      console.log(pre);
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
