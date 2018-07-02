import axios from "../index";
import { serverMoudle } from '@/util/fetch'


// 接口要求参数加密处理进行封装方法 
export const expend = {
    //提交普通支出
    selemanPay(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_SELEMAN_PAY',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //提交货主汇款
    selemanRemit(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_SELEMAN_REMIT',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //获取档主列表
    ownerList(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_GOODOWNER',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //获取费用类型
    selemanType(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_TYPE',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
};