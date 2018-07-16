<template>
    <div class="page-content storage">
        <mt-header fixed title="赊账还款">
            <mt-button icon="back" slot="left" @click="goTrain"></mt-button>
        </mt-header>

        <div class="page-main page-loadmore-wrappe topScroll">
            <!--基本信息-->
            <div class="">
                <!--<div class="info-list ub">-->
                    <!--<div class="">-->
                        <!--<div class="info">客户 <span class="son">{{repayInfo.nickname}}</span></div>-->
                        <!--<div class="info">身份证 <span class="son">{{repayInfo.idCard}}</span></div>-->
                        <!--<div class="info">手机号 <span class="son">{{repayInfo.phone}}</span></div>-->
                        <!--<div class="info">企业名称 <span class="son">{{repayInfo.company}}</span></div>-->
                    <!--</div>-->
                <!--</div>-->

                <div class="main-list">
                    <div class="clearfix goods">客户
                        <span>{{repayInfo.nickname}}</span>
                    </div>
                    <div class="clearfix goods">身份证
                        <span>{{repayInfo.idCard}}</span>
                    </div>
                    <div class="clearfix goods">手机号
                        <span>{{repayInfo.phone}}</span>
                    </div>
                    <div class="clearfix goods">企业名称
                        <span class="line-break">{{repayInfo.company}}</span>
                    </div>
                </div>

                <div class="main-list" style="position: relative">
                    <div class="clearfix goods">还款信息
                        <span>{{bearerName}}</span>
                    </div>

                    <div class="clearfix goods">欠款总金额
                        <span>{{notPayAmount}}</span>
                    </div>

                    <div class="clearfix goods">还款金额
                        <input v-model="refundAmount" type="number" placeholder="请输入金额">
                    </div>


                    <div class="clearfix goods">还款方式
                        <div class="choice">
                            <select v-model="refundType" @change="payWay(refundType)">
                                <option value="type_cash">现金</option>
                                <option value="type_wechat">微信</option>
                                <option value="type_alipay">支付宝</option>
                                <option value="type_card">银行卡</option>
                            </select>
                        <img class="jin-right"
                                 src="../../assets/index/gray-right-icon.png"/> </div>

                    </div>
                    <div class="clearfix goods c-3">收款账号
                        <input v-show="refundType == 'type_cash'" v-model="gatherAccount" type="number" readonly placeholder="收款账号为空">
                        <input v-show="refundType != 'type_cash'" v-model="gatherAccount" type="number" placeholder="请输入收款账号">
                    </div>
                </div>

                <div class="main-list">
                    <div class="clearfix c-3">备注</div>
                    <div class="remark">
                            <textarea maxlength="420" name="" id="" cols="30" rows="3" placeholder="备注信息"
                                      v-model="remark"></textarea>
                    </div>
                </div>

                <div class="list">
                    <div class="clearfix goods" @click="viewRepay">查看可还款订单
                        <div class="choice">
                            <img class="jin-right"
                                 src="../../assets/index/gray-right-icon.png"/>
                        </div>
                    </div>
                </div>

                <div class="update">
                    <mt-button class="sure" type="primary" size="large" @click="confirm" :disabled="confirmDisabled">确认还款</mt-button>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
    import {creditOrder} from '@/services/apis/creditOrder'
    import {MessageBox, Toast} from 'mint-ui';

    export default {
        data () {
            return {
                confirmDisabled:false,
                cid:'',//客户id
                bearerId:'',//承赊方id
                bearerName:'',//承赊方名字
                notPayAmount:'',//待还款
                item:'',//赊账列表传参
                refundAmount:'',//还款金额
                refundType:'type_alipay',//还款方式
                gatherAccount:'',//收款账号
                remark:'',//备注信息
                repayInfo:{},//客户信息

                typeOfPay:[{
                    value:'type_alipay',
                    label:'支付宝'
                },{
                    value:'type_wechat',
                    label:'微信'
                },{
                    value:'type_cash',
                    label:'现金'
                },{
                    value:'type_card',
                    label:'银行卡'
                }],

            }
        },
        mounted () {
            //路由传参
            this.cid = this.$route.params.cid;
            this.item = this.$route.params.item;

            this.bearerId = this.$route.params.item.bearerId;//承赊方id
            this.bearerName = this.$route.params.item.bearerName;//承赊方名字
            this.notPayAmount = this.$route.params.item.notPayAmount;//待还款
            this.getInfo();
        },

        methods: {
            //选择还款方式
            payWay(way){
                if(way == 'type_cash'){
                    this.gatherAccount = '';
                }
            },
            //获取赊账还款详情
            getInfo(){
                let data = {
                    cid:this.cid,
                };
                creditOrder.getDetails(data).then(response => {
                    this.repayInfo = response.data.results;
                    if(this.item.refundAmount){this.refundAmount = this.item.refundAmount;}
                    if(this.item.refundType){this.refundType = this.item.refundType;}
                    if(this.item.gatherAccount){this.gatherAccount = this.item.gatherAccount;}
                    if(this.item.remark){this.remark = this.item.remark;}
                })
            },
            //返回赊账还款列表
            goTrain(){
                this.$router.push({
                    name: 'creditOrder',
                });
            },
            //查看可还款订单
            viewRepay(){
                if(this.refundAmount){
                    if (!(new RegExp(/^\d+(?:.\d{1,2})?$/).test(this.refundAmount))) {
                        Toast({
                            message: '请输入正确的金额',
                            position: 'middle',
                            duration: 1000
                        });
                    }else if(!(new RegExp(/^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$/).test(this.refundAmount))){
                        Toast({
                            message: '请输入大于0的金额',
                            position: 'middle',
                            duration: 1000
                        });
                    }else if(parseFloat(this.refundAmount)>parseFloat(this.notPayAmount)){
                        Toast({
                            message: '此次还款金额超出欠款额度，请重新输入',
                            position: 'middle',
                            duration: 1000
                        });
                    }else {
                        let data = this.item;
                        data.refundAmount = this.refundAmount;
                        if(this.refundType){
                            data.refundType = this.refundType;
                        }
                        if(this.gatherAccount){
                            data.gatherAccount = this.gatherAccount;
                        }
                        if(this.remark){
                            data.remark = this.remark;
                        }

                        console.log(this.item);
                        this.$router.push({name: 'repayOrder', params: {refundAmount: data.refundAmount,item:data}});
                    }

                }else {
                    Toast({
                        message: '请输入还款金额',
                        position: 'middle',
                        duration: 1000
                    });
                }
            },

            //提交还款信息
            confirm(){
                if (this.refundAmount) {
                    if(this.refundType != 'type_cash' && this.gatherAccount ==''){
                        Toast({
                            message: '请完善还款信息',
                            position: 'middle',
                            duration: 1000
                        });
                        return false;
                    }

                    if (!(new RegExp(/^\d+(?:.\d{1,2})?$/).test(this.refundAmount))) {
                        Toast({
                            message: '请输入正确的金额',
                            position: 'middle',
                            duration: 1000
                        });
                    }else if(!(new RegExp(/^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$/).test(this.refundAmount))){
                        Toast({
                            message: '请输入大于0的金额',
                            position: 'middle',
                            duration: 1000
                        });
                    }else if(parseFloat(this.refundAmount)>parseFloat(this.notPayAmount)){
                        Toast({
                            message: '此次还款金额超出欠款额度，请重新输入',
                            position: 'middle',
                            duration: 1000
                        });
                    } else {
                        this.confirmDisabled = true;
                        let data = {
                            cid:this.cid,//客户id
                            refundAmount:this.refundAmount,//还款金额
                            refundType:this.refundType,//还款方式
                            gatherAccount:this.gatherAccount,//收款账号
                            remark:this.remark,//备注
                            bearerId:this.bearerId,//承赊方id
                        };
                        creditOrder.submitRepay(data)
                            .then(response => {
                                if (response.data.status == 'Y') {
                                    Toast({
                                        message: '已完成还款操作',
                                        position: 'middle',
                                        duration: 1000
                                    });
                                    setTimeout(() => {
                                        this.$router.push({name: 'creditOrder'});
                                        this.confirmDisabled = false;
                                    }, 1000)
                                } else {
                                    this.confirmDisabled = false;
                                    Toast({
                                        message: response.data.results,
                                        position: 'middle',
                                        duration: 1000
                                    });
                                }
                            })
                            .catch(function (response) {
                                console.log(response);
                            });
                    }
                } else {
                    Toast('请完善信息');
                    return false;
                }


            },
        },
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .topScroll {
        height: calc(100vh - 50px);
        top: 40px;
        bottom: 0rem;
    }

    .page-loadmore-wrappe {
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }

    .storage {
        input:disabled, textarea:disabled {
            background-color: white !important;
        }

        .list{
            background: #fff;
            margin-top: 0.2rem;
            padding: 0 0.3rem;
            color: #333;
            font-size: 0.28rem;
            line-height: 0.98rem;
             .goods {
                 border-bottom: 1px #f0f0f0 solid;
                 margin-top: 0.2rem;
                 font-size: 0.28rem;
                 .choice {
                     float: right;
                     .jin-right {
                         width: 0.18rem;
                         padding-top: 0.3294rem;
                     }
                 }
             }
        }

        /*.info-list{*/
            /*background: #fff;*/
            /*margin-top: 0.2rem;*/
            /*padding:0.3rem 0.3rem 0.1rem;*/
            /*color: #666;*/
            /*font-size: 0.28rem;*/
            /*.black-img {*/
                /*width: 1.16rem;*/
                /*height: 1.16rem;*/
                /*border-radius: 50%;*/
                /*padding-right: 0.25rem;*/
            /*}*/
            /*.info{*/
                /*padding-bottom: 0.2rem;*/
                /*.son{*/
                    /*padding-left: 0.2rem;*/
                    /*color: #333;*/
                /*}*/
            /*}*/
        /*}*/
        .line-break{
            word-break: break-all;
            word-wrap: break-word;
            display: block;
            width: 70%;
        }
        .main-list {
            background: #fff;
            margin-top: 0.2rem;
            padding: 0 0.3rem;
            color: #666;
            font-size: 0.28rem;
            line-height: 0.98rem;
            .remark {
                color: #666;
                padding: 0.3rem 0;
                border-top: 1px #f0f0f0 solid;
                textarea {
                    border: none;
                    width: 100%;
                    font-size: 0.26rem;
                    color: #4c4c4c;
                }
            }

            .goods {
                border-bottom: 1px #f0f0f0 solid;
                .choice {
                    float: right;
                    .jin-right{
                        width: 0.18rem;
                        padding-top: 0.3294rem;
                    }
                }
                select {
                    border: none;
                    line-height: 0.3rem;
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    background-size: 0.9rem 0.9rem;
                    color: #666666;
                    outline: none;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                    background-color: #fff;

                    font-size: 0.30rem;
                    position: relative;
                    margin-left: 10px;
                    width: 1.1rem;
                    height: 40px;
                }

                > input {
                    float: right;
                    color: #4c4c4c;
                    text-align: right;
                    line-height: 0.4rem;
                    margin-top: 0.3rem;
                }
                > span {
                    float: right;
                    color: #333;
                    font-size: 0.26rem;
                    text-align: right;
                    line-height: 0.4rem;
                    margin-top: 0.35rem;
                    .right-icon {
                        width: 0.18rem;
                        padding-left: 0.24rem;
                    }
                }
            }
        }

        .update{
            margin:0 auto;
            padding:0.5rem 0;
            .mint-button--primary{
                background: url(../../assets/login/dengluzhuce_denglu_img@2x.png) no-repeat center;
                background-size:contain;
                font-size: 0.3rem !important;
                margin: 0 auto;
                height: 0.9rem;
            }
        }
    }

</style>