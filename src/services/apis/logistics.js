import axios from "../index";
import { serverMoudle } from '@/util/fetch'
import md5 from 'js-md5';
import Cookies from 'js-cookie'
// let rd=parseInt(100*Math.random());  //需要的随机数
// if(rd>900){
//      rd
// }
// else{
//      rd=rd+100
// }
// let time=new Date().getTime();     //生成时间戳
// let uId= Cookies.get('sid');

// 调取接口逻辑
// 1：post请求请求路径需要添加三位的随机数，时间戳和uid外加sign签名，请求的参数都是明文的方式没有什么特殊处理
// 2:sign签名需要格外注意首先 sign（tokenId, time, rd, json）
//  json中在包括uid 请求的参数（content）inCode相当于接口名称 tokenId可以为空 时间戳 随机数

export const logistics = {
    //
    auth(params) {
        
        // var Lista={
        //     uId:uId,
        //     content:params,
        //     tokenId:'',
        //     time:time,
        //     rd:rd,
        //     inCode:42001,
        // }
        return axios({
            url:'rest/CHENGFENG_GET_XDTINFO',
            // url: 'http://xdt.52cfzy.com/intf?sign='+md5(sign1.sort())+'&time='+time+'&rd='+rd+'&tokenId=',
            method: 'post',
            data: serverMoudle(params) || {}
        });
    }
}