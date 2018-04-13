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
    getmessname(params){
    	return axios({
            url: '/rest/CHENGFENG_GET_SMS',
            method: 'get',
            params: params || {}
        });
    },
    zhuce(params){
    	return axios({
            url: '/rest/CHENGFENG_SET_NEWUSER',
            method: 'get',
            params: params || {}
        });
    }
}