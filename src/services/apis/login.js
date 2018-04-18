import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export const login = {
    //登录
    auth(params) {
        return axios({
            url: '/rest/CHENGFENG_SELEMAN_LOGIN',
            method: 'get',
            params: params || {}
        });
    },
    // 获取短信验证码
    getmessname(params){
    	return axios({
            url: '/rest/CHENGFENG_GET_SMS',
            method: 'get',
            params: params || {}
        });
    },
    //注册
    zhuce(params){
    	return axios({
            url: '/rest/CHENGFENG_SET_NEWUSER',
            method: 'get',
            params: params || {}
        });
    },
    findpass(params){
    	return axios({
            url: '/rest/CHENGFENG_LOSE_LOGIN',
            method: 'get',
            params: params || {}
        });
    },

    //获取档位列表
    stalls(params){
        return axios({
            url: '/rest/CHENGFENG_GET_SELEMAN_GEAR',
            method: 'post',
            params: params || {}
        });
    }
}