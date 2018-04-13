import axios from "../index";
import { serverMoudle } from '@/util/fetch'

//下单
export const order = {
    //车次列表
    getTrainList(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_SELEMAN_TRAIN',
            method: 'post',
            data: serverMoudle(data)
        });
    },
    //车次-货品详细信息 / 订单价格数量设置
    getTrainInfo(data) {
        return axios({
            url: '/rest/CHENGFENG_GET_SELEMAN_TGOODS',
            method: 'post',
            data: serverMoudle(data)
        });
    },


}
