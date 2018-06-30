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
    //提交报损信息

    submitDamage(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_MAR_TRAIN',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //上报车次结算
    submitBus(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_TRAIN_CLEAR',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //获取车次详情
    getTrain(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_TRAIN_INFO',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //编辑车次信息
    editTrain(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_SELEMAN_TRAIN_EDITINFO',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //验证车次结算
    testClearing(params) {
        return axios({
            url: 'rest/CHENGFENG_SELEMAN_CHECK_TRAIN_CLEAR',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //删除车次
    deleteTrain(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_SELEMAN_TRAIN_DEL',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //计算结算|提交车次结算
    countTrain(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_SELEMAN_TRAIN_DEL',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },


};