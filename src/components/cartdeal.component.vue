<template>
<div class='cartdealBox'>
  <button @click="reduceHandle()">
    <i class="iconfont icon-reduce"></i>
  </button>
  <input :disabled='disabled == 1 ? true : false' type="number" 
  @blur="changeHandle()" v-model="num" onkeyup="this.value=this.value.replace(/\D+/g,'')">
  <button @click="addHandle()">
    <i class="iconfont icon-add"></i>
  </button>
</div>
</template>

<script>
/*
  props: 接受外部传入组件的参数;
  data: 组件内部操作的参数;
  为防止组件重写，组件内部只操作data的参数，props只接受外部传入参数
*/

/* 备注：新增parentctrol_in属性
在good-detail页面中，num值可在本组件内部完成，然后再请求后台
在cart页面中，num值的改变必须先请求后台，成功后再改变
所以，增加parentctrol_in属性，控制本组件点击事件不改变num值，num值从父组件提供，也就是num_in
*/
export default {
  props: {
    disabled_in: {
      default: 0 
    },
    num_in: {
      default: 1
    },
    parentctrol_in: {
      default: 0
    }
  },
  data() {
    return {
      disabled: this.disabled_in,   // input框是否禁止输入
      num: Number(this.num_in), // 购买商品数量
      parentctrol: this.parentctrol_in, // 是否由父组件控制
    }
  },
  watch: {
    disabled_in(newValue){
      this.disabled = newValue;
    },
    num_in(newValue){
      this.num = Number(newValue);
    },
    parentctrol_in(newValue){
      this.parentctrol = newValue;
    }
  },
  mounted() {},
  updated() {},
  methods: {
    changeHandle(){
	  if (!Number(this.num) || this.num == 0){
        this.num = 1;
      }
      this.$emit("changeEmit", this.num);
    },
    reduceHandle() {
      if(this.parentctrol == 1){
        this.$emit("reduceEmit");
        return false;
      }
      if (this.num <= 1) {
        return false;
      }
      this.num--;
      this.$emit("changeEmit", this.num);
    },
    addHandle() {
      if(this.parentctrol == 1){
        this.$emit("addEmit");
        return false;
      }
      this.num++;
      this.$emit("changeEmit", this.num);
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../assets/scss/common";

.cartdealBox {
  overflow: hidden;
  display: inline-block;
  button,
  input {
    float: left;
    width: 30px;
    height: 30px;
  }
  button {
    background: #83898f;
    border-radius: 2px;
    .iconfont {
      font-size: 2.2rem;
      color: #fff;
    }
  }
  input {
    text-align: center;
    width: 40px;
    margin: 0 4px;
  }
}
</style>
