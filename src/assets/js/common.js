import axios from 'axios';
import qs from 'qs';
import common from "./common";

export default {
    developmentPath: "http://localhost:8081/",
    productionPath: "http://172.20.0.54/checking/",
    server: 2,
    getServerPath: () => {
      if (process.env.NODE_ENV === 'production') {
        return common.productionPath
      } else {
        return common.developmentPath
      }
    },
    get(path, param, callback, eCallback) {
      axios.get(common.getServerPath() + path, {
          headers: {
            'server-code': common.server
          },
          params: param
        })
        .then(res => {
          if (typeof callback === 'function') {
            callback(res);
          }
        })
        .catch(function (err) {
          console.log(err);
          if (typeof eCallback === 'function') {
            eCallback();
          }
        })
    },
    post(path, param, callback, eCallback) {
      axios({
          url: common.getServerPath() + path,
          method: "post",
          data: param,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'server-code': common.server
          },
          transformRequest: [
            function (param) {
              return qs.stringify(param);
            }
          ]
        })
        .then(response => {
          if (typeof callback === 'function') {
            callback(response);
          }
        })
        .catch(function (error) {
          console.log(error);
          if (typeof eCallback === 'function') {
            eCallback();
          }
        });
    },
    handerData(res, self) {
        let state = res.data.state;
        if (state == -1) {
            self.$q.notify({
                message: '未登陆，请重新登陆',
                color: 'warning'
            });
            self.$router.push("/Login");
            return "error";
        } else if (state == 0) {
            self.$q.notify({
                message: res.data.msg,  
                color: 'warning'
            });
            return "error";
        } else {
            return res.data.data;
        }
    },
    getMsg(res, self) {
        let state = res.data.state;
        if (state == -1) {
            self.$q.notify({
                message: '未登陆，请重新登陆',
                color: 'warning'
            });
            self.$router.push("/Login");
            return "error";
        } else if (state == 0) {
            self.$q.notify({
                message: res.data.msg,  
                color: 'negative'
            });
            return "error";
        } else {
            return res.data.msg;
        }
    },
    dateFormat(fmt, date) {
        var o = {
            "M+": date.getMonth() + 1,     //月份 
            "d+": date.getDate(),     //日 
            "h+": date.getHours(),     //小时 
            "m+": date.getMinutes(),     //分 
            "s+": date.getSeconds(),     //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds()    //毫秒 
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
}