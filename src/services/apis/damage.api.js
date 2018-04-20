import axios from "../index";
import {serverMoudle} from '@/util/fetch'


// 接口要求参数加密处理进行封装方法  auth:王欣宇 2018-04-04
export const damage = {
    //货主列表
    ownerList(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_GOODOWNER',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //获取档位货品列表
    goodsList(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_GOOD',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //提交货品入库
    submitGoods(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_SELEMAN_TRAIN',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //货品损坏车次列表
    damageList(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_TRAIN',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //获取车次的货品信息列表
    damageDetails(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_TGOODS',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },


};