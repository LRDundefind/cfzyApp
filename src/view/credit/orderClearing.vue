<template>
    <div class="page-content">
        <mt-header fixed title="结算">
            <mt-button icon="back" @click="goBack()" slot="left"></mt-button>
        </mt-header>
        <!--订单列表-->
        <div class="page-main page-loadmore-wrapper">
            <!--信息一-->
            <div class="order-detail">
                <div class="ub term no-border">
                    <div class="ub-f1">客户</div>
                    <div v-show="detail.nickname !='' ">{{detail.nickname}}</div>
                    <div v-show="detail.nickname =='' && detail.phone == ''">临时客户</div>
                </div>
            </div>
            <!--信息二-->
            <div class="order-detail item-two">
                <div class="ub term">
                    <div class="ub-f1">货品费用</div>
                    <div class="edu">￥{{detail.goodCast | keepTwoNum}}</div>
                </div>
                <div class="ub term">
                    <div class="ub-f1">包装费</div>
                    <div class="edu">￥{{detail.packCost | keepTwoNum}}</div>
                </div>
                <div class="ub term">
                    <div class="ub-f1">过磅费</div>
                    <div class="edu">￥{{detail.weighCost | keepTwoNum}}</div>
                </div>
                <div class="ub term">
                    <div class="ub-f1">三轮费</div>
                    <div class="edu">￥{{detail.deliveryCost | keepTwoNum}}</div>
                </div>
                <div class="ub term no-border">
                    <div class="ub-f1">应付总金额</div>
                    <div class="total">￥{{detail.salesAmount | keepTwoNum}}</div>
                </div>
            </div>

            <div class="order-detail">
                <div class=" term clearfix no-border">支付方式
                    <div class="choice">
                        <select v-model="payType">
                            <option v-for="item in typeOfPay" :label="item.label" :value="item.value"></option>
                        </select>
                        <img class="jin-right"
                             src="../../assets/index/gray-right-icon.png"/></div>
                </div>
            </div>

            <div class="update">
                <mt-button class="sure" type="primary" size="large" @click="settlement" :disabled="confirmDisabled">结算</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import {orders} from '@/services/apis/orders.js';
    import {creditOrder} from '@/services/apis/creditOrder'

    export default {
        data () {
            return {
                confirmDisabled:false,
                oid: '',//订单id
                payType: 'type_alipay',
                typeOfPay: [{
                    value: 'type_alipay',
                    label: '支付宝'
                }, {
                    value: 'type_wechat',
                    label: '微信'
                }, {
                    value: 'type_cash',
                    label: '现金'
                }, {
                    value: 'type_card',
                    label: '银行卡'
                }],

                detail: {
                    nickname:'',
                    salesAmount:'',
                    packCost:'',
                    weighCost:'',
                    deliveryCost:'',
                    goodCast:'',
                    phone:'',


                },//订单详情数据
            }
        },
        mounted () {
            this.oid = this.$route.params.oid;
            this.ordersDetail();
        },
        methods: {
            //订单详情
            ordersDetail(){
                let params = {
                    oid: this.oid
                };
                orders.getOrdersDetailKnot(params)
                    .then(response => {
                        this.detail = response.data.results;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //结算订单
            settlement(){
                let data = {
                    oid: this.oid,//订单id
                    payType: this.payType,//结算方式
                };
                this.confirmDisabled = true;
                creditOrder.clearingKnot(data)
                    .then(response => {
                        if (response.data.status == 'Y') {
                            Toast({
                                message: '已完成结算操作',
                                position: 'middle',
                                duration: 1000
                            });
                            setTimeout(() => {
                                this.confirmDisabled = false;
                                this.$router.push({name: 'print', params: {oid: this.oid}});
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
            },
        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .page-main {
        top: 0.8rem;
        bottom: 0px;
    }

    .page-loadmore-wrapper {
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
    }

    i {
        font-style: normal;
    }

    .order-detail {
        font-size: 0.28rem;
        color: #333;
        background: #fff;
        padding: 0 0.3rem;
        margin-top: 0.2rem;
        .term {
            line-height: 0.96rem;
            border-bottom: 1px solid #dedede;
            .edu {
                color: #333;
                font-size: 0.28rem;
            }
            .choice {
                float: right;
                .jin-right {
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

                font-size: 0.28rem;
                position: relative;
                margin-left: 10px;
                width: 1.1rem;
                height: 40px;
            }
            div:nth-child(2) {
                color: #4c4c4c;
                font-size: 0.26rem;
            }
            div.total {
                font-size: 0.32rem;
                color: #49c98b;
            }
            div.tobepaid {
                font-size: 0.26rem;
                color: #33d570;
            }
        }
        .term.no-border {
            border-bottom: none;
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

</style>