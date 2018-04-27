<template>
<div>
  test
</div>
</template>

<script>
import axiosService from "@/services/axios.service"
import orderService from '@/services/order.service'

export default {
  data() {
    return {};
  },
  mounted() {
    axiosService.promise([this.getCate(), this.getList()], (arr) => {
      console.log(arr[0]);
      console.log(arr[1]);
    })
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
