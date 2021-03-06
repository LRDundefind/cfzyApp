import axios from "../index";
import { serverMoudle } from '@/util/fetch'
// auth:wxy  2018 03 19 
// 如果使用mock对应的mock_list使用这个方法 直接获取数据
// export function shuju(params) {
//   return axios({
//     url: 'http://slams.dev.chinamobo.com/mock_list/mock_list',
//     method: 'get',
//     params: params || {}
//   });
// }
// export function headlineList(params) {
//   return axios({
//     url: 'http://slams.dev.chinamobo.com/headlineList',
//     method: 'get',
//     params: params || {}
//   });
// }

// 接口要求参数加密处理进行封装方法  auth:王欣宇 2018-04-04 
export const home = {
    //首页
    index(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_HOME',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    blacklist(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SAAS_BLACK',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //首页暂存订单
    temporaryOrderList(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_DEPOSIT',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //首页暂存订单-详情
    temporaryOrderDetail(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_ORDERINFO',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //首页暂存订单-详情 设定价格
    temporarySetPrice(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_SELEMAN_DEPOSIT',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },
    //获取档位列表
    gearList(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_GEAR',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },


};