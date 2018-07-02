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
    //提交意见反馈
    feedBack(params) {
        return axios({
            url: 'rest/CHENGFENG_ADD_SAAS_FEEDBACK',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //获取个人信息
    getInfo(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMANINFO',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //修改手机号和个人信息
    alterPersonal(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_SELEMAN_PHONE',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //验证手机号
    numberCheck(params){
        return axios({
            url: '/rest/CHENGFENG_NUMBER_CHECK',
            method: 'get',
            params: params || {}
        });
    }

};