<template>
<div class="container">
  <comp-nav back_in='0' headline_in="登录-测试路由守卫"></comp-nav>
  <div class='loginBox abs-center'>
    <input type="text" placeholder="请输入用户名" v-model='username' onkeyup="this.value=this.value.replace(/\s+/g,'')">
    <input type="password" placeholder="请输入密码" v-model='password' onkeyup="this.value=this.value.replace(/\s+/g,'')">
    <button @click='loginHandle()'>登 录</button>
  </div>
</div>
</template>

<script>
import CompNav from "../components/nav.component";
import elementService from "../services/element.service";
import userModel from '../models/user.model';

export default {
  components: { CompNav },
  data() {
    return {
      username: '',  // 测试帐号admin
      password: '', // 测试密码admin
    }
  },
  mounted() {
    
  },
  updated() {},
  methods: {
    loginHandle(){
      if(this.username == 'admin' && this.password == 'admin'){
        elementService.message('登录成功');
        userModel.isLogin = 1;
        this.$router.push( {name: 'home'} );
      }else{
        elementService.message('用户名和密码不匹配');
      }
    }
  }
};
</script>

<style scoped lang='scss'>
@import "../assets/scss/common";
.container{
  background: #fff;
}
.loginBox{
  text-align: center;
  width: 100%;
  input{
    width: 80%;
    margin-bottom: 10px;
  }
  button{
    width: 30%;
    height: 36px;
    color: #fff;
    border-radius: 4px;
    background: $color-primary;
    font-size: 1.6rem;
  }
}
</style>
