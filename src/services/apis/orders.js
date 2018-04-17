import axios from "../index";
import { serverMoudle } from '@/util/fetch'

//订单
export const orders = {
    //车次日销售列表
    getTrainList(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_SELEMAN_TRAIN',
            method: 'post',
            data: serverMoudle(data)
        });
    },


}

