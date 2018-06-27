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
};