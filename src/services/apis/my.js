import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export const my = {
    //货主列表
    password(params) {
        return axios({
            url: 'rest/CHENGFENG_SET_SELEMAN_PASSWORD',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    },

};