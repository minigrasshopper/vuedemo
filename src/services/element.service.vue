<script>
import Vue from "vue";

class ElementService {
  element = Vue.prototype; //获取Vue原型-暂且当作element
  loading = null;  //加载动画
  constructor(){
    
  }
  message(content, type){
    // content 提示信息
    // type 提示框类型 success / info / warning / error
    !type && (type = "info");
    this.element.$message({
      message: content,
      type: type,
      center: true,
      duration: 1500
    });
  }

  messageBox(content, type, confirmCb, cancelCb) {
    // content 提示信息
    // confirmCb 确认的回调 cancelCb 取消的回调
    // type 提示框类型 success / info / warning / error
    !type && (type = "info");
    this.element
      .$confirm(content, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type
      })
      .then(() => {
        // confirm的回调
        confirmCb && confirmCb();
      })
      .catch(() => {
        // cancel的回调
        cancelCb && cancelCb();
      });
  }

  loadingShow() {
    this.loading = this.element.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
  }

  loadingHide(){
    this.loading.close();
  }

};

let elementService = new ElementService();
export default elementService;
</script>
