<script>
import elementService from "../services/element.service";

class CommonService {
  testMobile(str) {
    // 验证手机号码
    let reg = /^1[34578]\d{9}$/;
    if (!str) {
      elementService.message("请输入手机号码");
      return false;
    } else if (!reg.test(str)) {
      elementService.message("手机号码错误");
      return false;
    }
    return true;
  }

  testTel(str) {
    // 验证固话、手机号码
    let integer1 = /^(0|86|17951)?(13[0-9]|15[012356789]|17[01678]|18[0-9]|14[57])[0-9]{8}$/;
    let integer2 = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/;
    if (!str) {
      elementService.message("请输入电话号码");
      return false;
    } else if (!integer1.test(str) && !integer2.test(str)) {
      elementService.message("电话号码错误");
      return false;
    }
    return true;
  }

  testEmail(str) {
    // 验证email
    let reg = /^(?:\w+\.?)*\w+@(?:\w+\.)*\w+$/;
    if (!str) {
      elementService.message("请输入邮箱地址");
      return false;
    } else if (!reg.test(str)) {
      elementService.message("邮箱地址错误");
      return false;
    }
    return true;
  }

  testCardID(sId) {
    // 验证身份证号码
    let aCity = {
      11: "北京",
      12: "天津",
      13: "河北",
      14: "山西",
      15: "内蒙古",
      21: "辽宁",
      22: "吉林",
      23: "黑龙江",
      31: "上海",
      32: "江苏",
      33: "浙江",
      34: "安徽",
      35: "福建",
      36: "江西",
      37: "山东",
      41: "河南",
      42: "湖北",
      43: "湖南",
      44: "广东",
      45: "广西",
      46: "海南",
      50: "重庆",
      51: "四川",
      52: "贵州",
      53: "云南",
      54: "西藏",
      61: "陕西",
      62: "甘肃",
      63: "青海",
      64: "宁夏",
      65: "新疆",
      71: "台湾",
      81: "香港",
      82: "澳门",
      91: "国外"
    };
    let iSum = 0;
    let info = "";
    if (!sId) {
      elementService.message("请输入你的身份证号");
      return false;
    }
    if (!/^\d{17}(\d|x)$/i.test(sId)) {
      elementService.message("你输入的身份证长度或格式错误");
      return false;
    }
    sId = sId.replace(/x$/i, "a");
    if (aCity[parseInt(sId.substr(0, 2))] == null) {
      elementService.message("你的身份证地区非法");
      return false;
    }
    let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    let d = new Date(sBirthday.replace(/-/g, "/"));
    if (
      sBirthday !=
      d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
    ) {
      elementService.message("身份证上的出生日期非法");
      return false;
    }
    for (let i = 17; i >= 0; i--) {
      iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    }
    if (iSum % 11 != 1) {
      elementService.message("你输入的身份证号非法");
      return false;
    }
    return true;
  }
}

let commonService = new CommonService();
export default commonService;
</script>
