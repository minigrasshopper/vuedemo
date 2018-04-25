<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang='scss'>
/*引入无须编译的css文件*/
@import "../static/css/same.css";
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
// element-start
.el-message{
  width: 60% !important;
  padding: 10px !important;
}
.el-message--info{
  background: #fff !important;
  .el-icon-info{
    color: #108ee9 !important;
  }
  .el-message__content{
    color: #666 !important;
  }
}
// element-end
</style>
