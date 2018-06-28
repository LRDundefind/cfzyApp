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
    //查看还款订单
    viewRepay(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_CREDITAMOUNT',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //获取现结收账列表
    getKnot(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_SELEMAN_KNOT_LIST',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //获取现结收账列表
    clearingKnot(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_SELEMAN_KNOTCLEAR',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //取消订单
    cancelKnot(params) {
        return axios({
            url: 'rest/CHENGFENG_SELEMAN_CANCEL_ORDER',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },



};