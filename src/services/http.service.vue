<script>
import elementService from "../services/element.service";
import configModel from "../models/config.model";

class HttpService {
  times = 0;
  baseUrl = 'http://q.letwx.com/api/jsapi';
  ACTION = {   // all action
    // share
    SHARE: 'jscfg', // 微信分享
    // good
    GOODS_CATE: 'mall/goods/cate',   // 分类列表
    GOODS_LIST: 'mall/goods/list',  // 商品列表
    GOODS_DETAIL: 'mall/goods/detail',  // 商品详情
    // cart
    CART_CREATE: 'mall/cart/create',  // 加入购物车
    CART_LIST: 'mall/cart/list',  // 购物车列表
    CART_SUBTRACT: 'mall/cart/subtract',  // 减少购物车数量
    CART_DEL: 'mall/cart/del',  // 删除购物车中的商品
    CART_PICK: 'mall/cart/togglepick', // 购物车商品选中取消
    // order
    ORDER_PRECREATE: 'mall/order/precreate',  // 订单预览
    ORDER_CREATE: 'mall/order/create',  // 订单创建
    ORDER_DETAIL: 'mall/order/detail',  // 订单详情
    ORDER_CANCAL: 'mall/order/cancel',   // 订单取消
    ORDER_PAY: 'mall/order/wxpay',  // 订单支付
    ORDER_RECEIVE: 'mall/order/receive',  // 订单完成
    ORDER_DEL: 'mall/order/del',  // 订单删除
    ORDER_LIST: 'mall/order/list', // 订单列表
    // account
    ACCOUNT_INFO: 'mall/i/account/info',
  };
  constructor(){
    
  }
  
  getJSON(action, params, cb){
    let callback = "&callback=" + "jsonp" + this.times;
    let sameKey = '&uid=' + configModel.uid + '&wxapiopenid=' + configModel.apiopenid + '&wxapitoken=' + configModel.apitoken + '&debug=nf';
    this.times ++;
    elementService.loadingShow();
    JSONP.getJSON(this.baseUrl + '?action=' + action + '&params=' + JSON.stringify(params) + callback, sameKey, data => {
      elementService.loadingHide();
      console.log(data);
      switch (data.error) {
        case 0:
          cb && cb(data);
          break;
        default:
          elementService.message(data.error_msg, 'error');
          break;
      }
    });
  }
}

let httpService = new HttpService();
export default httpService;
</script>
