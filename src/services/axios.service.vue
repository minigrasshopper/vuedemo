<script>
import axios from "axios";
import Qs from "qs";
import configModel from "@/models/config.model";

class AxiosService {
  baseURL = "http://q.letwx.com/api/";
  ACTION = {   // all action
    // good
    GOODS_CATE: 'jsapi?action=mall/goods/cate',   // 分类列表
    GOODS_LIST: 'jsapi?action=mall/goods/list',  // 商品列表
    GOODS_DETAIL: 'jsapi?action=mall/goods/detail',  // 商品详情
  };
  
  constructor() {
    axios.defaults.headers["Content-Type"] = "application/json";
    axios.defaults.transformRequest.push(data => {
      // data-json string
      if (data) {
        data = JSON.parse(data);
        // 对data进行任意转换
        return JSON.stringify(data);
      }
    });
    axios.defaults.paramsSerializer = function(params) {
      // params - json object
      if (params) {
        // 对params进行任意转换
        params.uid = configModel.uid;
        params.wxapiopenid = configModel.apiopenid;
        params.wxapitoken = configModel.apitoken;
        params.debug = 'nf';
        return Qs.stringify(params, { arrayFormat: "brackets" });
      }
    };
  }

  getJSON(type, url, params, cb) {
    axios({
      method: type,
      baseURL: this.baseURL,
      url: url,
      responseType: "json",
      params: type == 'get' ? params : {},
      data: type == 'post' ? params : {}
    })
      .then(response => {
        console.log(response.data);
        cb && cb(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  getAxios(type, url, params){
    return axios({
      method: type,
      baseURL: this.baseURL,
      url: url,
      responseType: "json",
      params: type == 'get' ? params : {},
      data: type == 'post' ? params : {}
    })
  }

  promise(arr, cb){
    axios.all(arr).then(axios.spread(() => {
      // 两个请求现在都执行完成
      // arr的长度未知，用arguments对象解决
      console.log(arguments.length);
      console.log(arguments[0]);
      // cb(arguments);
    }))
  }
}

let axiosService = new AxiosService();
export default axiosService;
</script>
