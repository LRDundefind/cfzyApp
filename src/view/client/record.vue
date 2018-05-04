<template>
    <div class="page-content storage">

        <mt-header fixed title="消费记录">
            <mt-button icon="back" slot="left" @click="goDetail" v-if="selected == 'basic'"></mt-button>
            <!--<mt-button slot="right" style="font-size: 0.32rem">-->
                <!--切换档位-->
            <!--</mt-button>-->
        </mt-header>

        <mt-header fixed title="还款记录" v-if="selected == 'goods'">
            <mt-button icon="back" slot="left" @click="goBasic"></mt-button>
            <!--<mt-button slot="right" style="font-size: 0.32rem">-->
                <!--切换档位-->
            <!--</mt-button>-->
        </mt-header>

        <mt-navbar v-model="selected" v-if="selected">
            <mt-tab-item id="basic">查看消费记录</mt-tab-item>
            <mt-tab-item id="goods">查看还款记录</mt-tab-item>
        </mt-navbar>
        <mt-tab-container>
            <!--消费记录-->
            <div v-if="selected == 'basic'">

                <!--<search-box @getSmeage="searchBlack" :msg="msg" ref="search"/>-->

                <ul class="order-record">
                    <li v-for="item in consumeData" @click="ordersDetail(item.oid)">
                        <div class="ub list-top">
                            <span class="ub-f1">订单号 {{item.orderNo}}</span>
                            <i class="c-6">{{item.status}}</i>
                        </div>
                        <div class="ub list-bottom">
                            <span class="ub-f1 c-6">{{item.placeOrderTime}}</span>
                            <i>{{item.salesAmount}}</i>
                        </div>
                    </li>
                </ul>
            </div>
            <!--货品信息-->
            <div v-if="selected == 'goods'">
                <ul class="pay-list">
                    <li class="pay-total ub ub-pj">
                        <div class="ub ub-ac">
                            <span class="ub-f1 c-3">赊账总金额</span>
                            <i class="c-6">￥30000</i>
                        </div>
                        <div class="ub ub-ac">
                            <span class="ub-f1 c-3">待还款金额</span>
                            <i class="c-6">￥30000</i>
                        </div>
                    </li>
                    <li v-for="item in repaymentData">
                        <div class="ub list-t">
                            <div class="pay">还款金额</div>
                            <div class="edu ub-f1">{{item.refundAmount}}</div>
                            <div class="type">{{item.refundType}}</div>
                        </div>
                        <div class="ub list-c">
                            <div class="data">还款日期</div>
                            <div class="datatime">{{item.refundTime}}</div>
                        </div>
                        <div class="ub list-b">
                            <div class="remarks c-6">备注</div>
                            <div class="info ub-f1 c-6">{{item.remark}}</div>
                        </div>
                    </li>
                </ul>
            </div>

        </mt-tab-container>
    </div>
</template>

<script>
    import {client} from '@/services/apis/client'
    import {Toast} from 'mint-ui';
    import searchBox from '@/components/searchBox/search'
    import {keyValue} from '@/services/apis/key-value';

    export default {
        components: {searchBox},

        data () {
            return {
//                msg: '',
                selected: 'basic',
                keyValueData: [],
                payType: [],
                cid: this.$route.params.id,
                consumeData: [],//消费记录数据
                repaymentData: [],//还款记录数据
                consumeParams: {
                    search: '',
                    cid: this.$route.params.id,
                },
                repaymentParams: {
                    cid: this.$route.params.id,
                },
            }
        },
        created(){
            keyValue()
                .then(response => {
                    this.keyValueData = response.data.results;
                    this.payType = this.keyValueData.pay_type;
                })
        },

        mounted () {
            //查看消费记录
            this.getConsume();
            //查看还款记录
            this.getRepayment();
        },
        methods: {
            //初始化数据--查看消费记录
            getConsume(){
                console.log(this.consumeParams);
                client.consume(this.consumeParams).then(response => {
                    if (response.data.results) {
                        this.consumeData = response.data.results;
                    }
                    console.log(this.consumeData);
                })
            },

            //初始化数据--查看还款记录
            getRepayment(){
                client.repayment(this.repaymentParams).then(response => {
                    if (response.data.results) {
                        this.repaymentData = response.data.results;
                        //转换支付方式
                        for (var i = 0; i < this.repaymentData.length; i++) {
                            for (var j = 0; j < this.payType.length; j++) {
                                if (this.repaymentData[i].refundType == this.payType[j].key) {
                                    this.repaymentData[i].refundType = this.payType[j].value;
                                }
                            }
                        }
                        console.log(this.repaymentData)
                    }
                })
            },

//            searchBlack(msg){
//                this.consumeParams.search = msg;
//                this.getlist();
//            },

            goDetail(){
                this.$router.push({name: 'client_detail', params: {ids: this.cid}});
            },
            goBasic(){
                this.selected = 'basic';
            },

            //跳转到订单详情
            ordersDetail(oid){
                this.$router.push({
                    name: 'ordersList/ordersDetail',
                    params: {
                        oid:oid
                    }
                });
            }

        },
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    i {
        font-style: normal;
    }

    .searchBox {
        margin-bottom: 0.2rem;
    }

    .mint-navbar {
        margin: 0.2rem 0;
        .mint-tab-item {
            color: #4c4c4c;
            font-size: 0.28rem; /*没有生效*/
            .mint-tab-item-label {
                font-size: 0.28rem;
            }
        }
        .mint-tab-item.is-selected {
            border-bottom: none;
            color: #33d57c;
            background: url(../../assets/huankuanjilu_line_btn@2x.png) no-repeat center 80%;
            background-size: 1.4rem;
        }
    }

    .order-record {
        font-size: 0.24rem;
        color: #333;
        li {
            background: #fff;
            margin-bottom: 0.2rem;
            padding: 0.18rem 0.3rem;
            .list-top {
                line-height: 0.53rem;
                span, i {
                    display: block;
                }
                span {
                    font-size: 0.3rem;
                }
            }
            .list-bottom {
                line-height: 0.48rem;
                span, i {
                    display: block;
                }
                i {
                    font-size: 0.32rem;
                    color: #49c98b;
                }
            }
        }
    }

    .pay-list {
        font-size: 0.24rem;
        color: #333;
        .pay-total {
            font-size: 0.26rem;
            span {
                display: block;
                margin-right: 0.36rem;
            }
            i {
                display: block;
                font-size: 0.34rem;
                color: #33d57c;
            }
        }
        li {
            background: #fff;
            margin-bottom: 0.2rem;
            padding: 0.18rem 0.3rem 0.16rem;
            .list-t {
                line-height: 0.5rem;
                .pay {
                    font-size: 0.3rem;
                    margin-right: 0.36rem;
                }
                .edu {
                    font-size: 0.3rem;
                    color: #33d57c;
                }
                .type {
                    font-size: 0.26rem;
                    color: #4c4c4c;
                }

            }
            .list-c {
                line-height: 0.5rem;
                font-size: 0.26rem;
                color: #4c4c4c;
                .data {
                    margin-right: 0.15rem;
                }
            }
            .list-b {
                line-height: 0.5rem;
                font-size: 0.24rem;
                line-height: 0.48rem;
                .remarks {
                    margin-right: 0.15rem;
                }
            }
        }
    }


</style>