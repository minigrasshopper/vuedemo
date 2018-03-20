// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import configModel from './models/config.model'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 微信oauth认证
oAuth.cfg(configModel.uid, configModel.isDebug, configModel.scope);
oAuth.checkToken((apiopenid, apitoken) => {
  configModel.apiopenid = apiopenid;
  configModel.apitoken = apitoken;
  // 认证完成后，启动模块
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
});
