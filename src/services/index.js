'use strict'

import axios from 'axios'
import qs from 'qs'
import Cookies from 'js-cookie'
import { serverMoudle } from '@/util/fetch'


let instance = axios.create({
     baseURL: process.env.BASE_API,
    timeout: 5000,
    withCredentials: false, //加了这段就可以跨域了
    // transformRequest: [function (data) { // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
    //             data = qs.stringify(data)
    //             return data
    //}]
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    console.log(config)
    // 在发送请求之前做些什么
    let token = Cookies.get('Token') || ''
    config.headers['Accept'] = '*/*';
    config.headers['Content-Type'] = 'application/json';
    if(token!='')config.headers['Authorization'] = 'Bearer '+token;
    return config;
    
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    response.headers['access'] = '*';
    if(response.data.status=='N'){
        // MessageBox({
        //     message: response.data.error_msg,
        //     type: 'error',
        //     duration: 3 * 1000
        // });
       }
    return response;
   

}, function (error) {
    //  对响应错误做点什么

 
    return Promise.reject(error);
});





export default instance;








