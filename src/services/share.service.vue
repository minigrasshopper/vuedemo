<script>
// 微信分享
import configModel from "../models/config.model";
import httpService from "../services/http.service";

class ShareService{
  constructor(){}
  
  wxShare(succCb, cancelCb, errorCb){
    let params = {url: encodeURIComponent(window.location.href.split('#')[0])};
    httpService.getJSON(httpService.ACTION.SHARE, params, data => {
      this.wxConfig(data.cfg, configModel.shareInfo, succCb, cancelCb, errorCb);
    });
  }

  wxConfig(wxconfig, share, succCb, cancelCb, errorCb){
    wx.config({
      debug: false,
      appId: wxconfig.appId,
      timestamp: wxconfig.timestamp,
      nonceStr: wxconfig.nonceStr,
      signature: wxconfig.signature,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo'
      ]
    });
    wx.ready(function() {
      wx.onMenuShareAppMessage({ //朋友
        title: share.title,
        desc: share.desc,
        link: share.link,
        imgUrl: share.imgUrl,
        success: function() {
          succCb && succCb();
        },
        cancel: function() {
          cancelCb && cancelCb();
        }
      });
      wx.onMenuShareTimeline({ //朋友圈
        title: share.desc,
        link: share.link,
        imgUrl: share.imgUrl,
        success: function() {
          succCb && succCb();
        },
        cancel: function() {
          cancelCb && cancelCb();
        }
      });
      wx.onMenuShareQQ({ //QQ
        title: share.title,
        desc: share.desc,
        link: share.link,
        imgUrl: share.imgUrl,
        success: function() {
          succCb && succCb();
        },
        cancel: function() {
          cancelCb && cancelCb();
        }
      });
      wx.onMenuShareWeibo({ //QQ
        title: share.title,
        desc: share.desc,
        link: share.link,
        imgUrl: share.imgUrl,
        success: function() {
          succCb && succCb();
        },
        cancel: function() {
          cancelCb && cancelCb();
        }
      });
    });
    wx.error(function(res) {
      console.log(res);
      errorCb && errorCb(JSON.stringify(res));
    });
  }
}

let shareSerivice = new ShareService();
export default shareSerivice;
</script>
