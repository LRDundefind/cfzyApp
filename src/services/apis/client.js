import axios from "../index";
import { serverMoudle } from '@/util/fetch'


// 接口要求参数加密处理进行封装方法  auth:王欣宇 2018-04-04
export const client = {
    //客户列表
    dataList(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_CUSTOMER',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //客户详情
    Listmessage(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_CUSTOMERINFO',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //新增客户
    addC(params) {
        return axios({
            url: 'rest/CHENGFENG_ADD_SELEMAN_CUSTOMERINFO',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //获取系统客户详情
    getXTmessage(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SAAS_CUSTOMERINFO',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    Cgemessage(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_SELEMAN_CUSTOMERINFO',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //查看消费记录
    getRecordList(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_CUSTOMER_ORDER',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //查看还款记录
    getPayList(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_CUSTOMER_TRANSFER',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },

};