import axios from "../index";
import { serverMoudle } from '@/util/fetch'

export function keyValue (data) {
    return axios({
        url: 'rest/CHENGFENG_GET_KEY',
        method: 'post',
        data: serverMoudle(data) || {}
    });
}
