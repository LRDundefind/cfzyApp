import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export const my = {
    //修改密码
    password(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_SELEMAN_PASSWORD',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //关于及使用协议
    abouts(params){
        return axios({
            url: 'rest/CHENGFENG_GET_ABOUT',
            method: 'get',
            params: params || {}
        });
    },


};