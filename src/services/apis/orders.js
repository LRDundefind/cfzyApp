import axios from "../index";
import { serverMoudle } from '@/util/fetch'

//订单
export const orders = {
    //车次日销售列表
    getTrainSaleList(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_SELEMAN_TRAINSELL',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //订单列表
    getOrdersList(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_SELEMAN_TRAINORDER',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //订单详情
    getOrdersDetail(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_SELEMAN_ORDERINFO',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //订单详情-完成提货
    getOrdersTake(data) {
        return axios({
            url: '/rest/CHENGFENG_SET_SELEMAN_ORDERPICK',
            method: 'post',
            data: serverMoudle(data)
        });
    },

}

