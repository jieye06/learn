import axios from 'axios'
import Qs from 'qs'
import {
  Message
} from 'view-design';

axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 30000;

// 添加响应拦截器
axios.interceptors.response.use(function(res) {
  let code = res.data.responseCode;
  if (code) {
    switch (code) {
      case '200':
        return Promise.resolve(res.data);
        break;
      case '99996':
        window.top.location.href = process.env.SESSION_INVALID_URL;
        break;
      default:
        return Promise.reject(res.data);
    }
  } else {
    if (res.data) {
      return Promise.resolve(res.data);
    }
    return Promise.reject(res);
  }
}, function(error) {
  if (error.message) {
    return Promise.reject(error);
  } else {
    let data = {
      message: '网络异常，请稍后再试'
    };

    return Promise.reject(data);
  }
});

export default {

  doAxios: function(params, succ, fail) {
    return axios(params).then(res => {
      Message.error(res.message);
      if (succ) {
        succ(res);
      }
      return Promise.resolve(res);
    }, err => {
      if (fail) {
        fail(err);
      } else {
        // 默认异常弹出错误信息，也可以定义fail覆盖此处默认异常消息弹窗
        Message.error(err.message);
      }
      // 抛出异常，各个页面可以继续处理或者忽略
      return Promise.reject(err);
    })
  },
  get: function(url, params, succ, fail) {
    return this.doAxios({
      method: 'get',
      url: url,
      params: params,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }, succ, fail);
  },
  post: function(url, params, succ, fail) {
    return this.doAxios({
      method: 'post',
      url: url,
      data: Qs.stringify(params),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    },succ,fail)
  },
  postJson: function(url, params, succ, fail) {
    return this.doAxios({
      method: 'post',
      url: url,
      data: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json;charset:utf-8;'
      }
    }, succ, fail);
  },
  upload: function(url, params, succ, fail) {
    return this.doAxios({
      method: 'post',
      url: url,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }, succ, fail);
  }

}
