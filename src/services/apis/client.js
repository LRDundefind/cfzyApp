import axios from "../index";
import { serverMoudle } from '@/util/fetch'


// 接口要求参数加密处理进行封装方法  auth:王欣宇 2018-04-04
export const client = {
    //货主列表
    dataList(params) {
        return axios({
            url: 'rest/CHENGFENG_GET_SELEMAN_CUSTOMER',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    }


};