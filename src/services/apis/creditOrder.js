import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export const creditOrder = {
    //获取赊账收款列表
    getList(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_SELEMAN_CREDIT',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //获取客户还款详情
    getDetails(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_CREDITINFO',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //提交还款信息
    submitRepay(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_SELEMAN_CREDITAMOUNT',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },

};