<script>
import httpService from "../services/http.service";
import cartModel from "../models/cart.model";

class CartServie{
  constructor(){
    
  }

  getCartInfo(cb){
    // 获取购物车信息
    httpService.getJSON(httpService.ACTION.CART_LIST, {}, data => {
      cb && cb();
      // 给cart.model赋值
      for (const key in cartModel) {
        if (data.hasOwnProperty(key)) {
          cartModel[key] = data[key];
        }
      }
    });
  }

  addCart(num, cb){
    // 增加购物车数量
    httpService.getJSON(httpService.ACTION.CART_CREATE, {goodsId: cartModel.goodId, num: num}, data => {
      cb && cb();
    });
  }

  reduceCart(cb){
    // 减少购物车数量
    httpService.getJSON(httpService.ACTION.CART_SUBTRACT, {goodsId: cartModel.goodId}, data => {
      cb && cb();
    }); 
  }

  deleteCart(cb){
    // 删除购物车某个商品
    httpService.getJSON(httpService.ACTION.CART_DEL, {goodsId: cartModel.goodId}, data => {
      cb && cb();  
    }); 
  }
  
  togglePickCart(cb){
    // 切换是否选中支付
    httpService.getJSON(httpService.ACTION.CART_PICK, {goodsId: cartModel.goodId}, data => {
      cb && cb();
    }); 
  }
}

let cartServie = new CartServie();
export default cartServie;
</script>
