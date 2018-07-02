<template>
    <div class="page-content">
        <mt-header fixed title="订单结算">
            <mt-button icon="back" @click="backPrint" slot="left"></mt-button>
        </mt-header>
        <!--车次结算列表-->
        <div class="page-main page-loadmore-wrappe topScroll">
            <div class="orderSettlementSheet f-s-13 c-3">
                <div id="print" style="margin-top: 0.2rem">
                    <div id="orderSettlementSheet-print"  class="b-c-f printLayout p-10">
                        <div class="textCenter f-s-15 title">{{listData.company_info.compayName}}</div>
                        <div class="textCenter c-3">{{listData.company_info.markName}}</div>
                        <div>
                            <div>客户：{{listData.customer_info.nickname}}</div>
                            <div class="space">车次：{{listData.order_info.trainsNum}}</div>
                            <div class="space">时间：{{listData.order_info.settleTime}}</div>
                            <div class="space">订单编号：{{listData.order_info.orderNo}}</div>
                        </div>

                        <ul class="demoBox p-t-10" >
                            <li class="ub textCenter">
                                <div class="ub-f4">品名</div>
                                <div class="ub-f3">件数</div>
                                <div class="ub-f3">数量</div>
                                <div class="ub-f3">单价</div>
                                <div class="ub-f3">金额</div>
                                <div class="ub-f3">包装费</div>
                            </li>

                            <li class="ub textCenter" v-for='item in listData.order_info.goods' :key="item.id">
                                <div class="ub-f4">{{item.goodName}}</div>
                                <div class="ub-f3">{{item.goodNum}}</div>
                                <div class="ub-f3">{{item.good_quantity}}</div>

                                <div class="ub-f3">{{item.price |format}}</div>
                                <div class="ub-f3">{{item.goodAmount |format}}</div>
                                <div class="ub-f3">{{item.packCost |format}}</div>
                            </li>

                            <li class="ub" style="border-top: 1px solid #ebeef5; padding: 0.2rem 0">
                                <div class="ub-f13 ">合计</div>
                                <div class="ub-f3 textCenter">{{listData.order_info.goodCost|format}}</div>
                                <div class="ub-f3 textCenter">{{listData.order_info.packCost|format}}</div>
                            </li>

                        </ul>

                        <div class="ub space f-s-14" >
                            <div class="ub-f1">过磅费：{{listData.order_info.weighCost|format}}</div>
                            <div class="ub-f1 ">三轮车费：{{listData.order_info.deliveryCost|format}}</div>
                            <!--<div class="ub-f1 textRight">包装费：{{listData.order_info.packCost}}</div>-->
                        </div>
                        <div class="ub p-b-10 f-s-14" style="border-bottom: 1px #666 solid;">
                            <div class="ub-f1 ">应付：{{listData.order_info.salesAmount|format}}</div>
                            <div class="ub-f1 ">实付：{{listData.order_info.actualAmount|format}}</div>
                        </div>

                        <div class="ub space f-s-14" >
                            <div class="ub-f1">产地：{{listData.order_info.origin}}</div>
                            <div class="ub-f1 ">档位前欠：{{listData.customer_info.frontArrears| format}}</div>

                        </div>

                        <div class="ub   space f-s-14" >
                            <div class="ub-f1">销售员：{{listData.order_info.selName}}</div>
                            <div class="ub-f1 ">档位累欠：{{listData.customer_info.totalArrears| format}}</div>

                        </div>

                        <div class="textCenter space f-s-14">地址：{{listData.company_info.address}}</div>
                        <div class="textCenter space f-s-14">联系电话：{{listData.company_info.phone}}</div>

                        <div class="clearfix">
                            <div class="money-btn ub ub-ae" >
                                <div class="btn" @click="setting">设置</div>
                                <div class="m-l-10 btn" @click="print">打印</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    import {damage} from '@/services/apis/damage.api'
    import { Loadmore ,Toast, Indicator,MessageBox} from 'mint-ui'
    import Cookies from 'js-cookie'

    export default {
        data () {
            return {
                printStyle: {
                    //					width: 0
                },
                listData:{
                    customer_info:{},
                    order_info:{},
                    company_info:{}
                },
                oid:'',//订单id
                come:'',
                trainList: [],
            }
        },

        mounted () {
            this.oid = this.$route.params.oid;
            this.come = this.$route.params.come || false;
            this.getList();
        },

        methods: {
            getList(){
                let data = {
                    oid:this.oid
                };
                damage.printClearing(data).then(response => {
                    this.listData = response.data.results;
                    console.log(response.data.results);
                    console.log(123456);
                })
            },
            setting(){
                alert('未进入设置');
                if (typeof XDYApp !== 'undefined') {
                    alert('进入设置')
                    XDYApp.printerSetting();
                }
            },
            print(){
                alert('未进入打印');
                if (typeof XDYApp !== 'undefined') {
                    alert('进入打印');
//                    XDYApp.printer(this.listData);
                    XDYApp.printer(JSON.stringify(this.listData));
                }
            },
            backPrint(){
                if(this.come){
                    this.$router.push({
                        name: 'orderKnot',
                    });
                }else {
                    this.$router.push({
                        name: 'cashAccount',
                    });
                }
            },

        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    i {
        font-style: normal;
    }
    .topScroll{
        height: calc(100vh - 50px);
        top: 40px;
        bottom: 0rem;
    }
    .page-loadmore-wrappe{
        overflow: auto;
        -webkit-overflow-scrolling : touch;
    }

    .orderSettlementSheet{
        .printLayout{
            padding: 0.3rem;
            .title{
                font-weight: 700;
                padding-bottom: 0.1rem;
            }
        }

    }


    .printLayout{
        font-size: 0.3rem;
    }

    .space{
        padding-top: 0.1rem;
    }

    ul{
        li:first-child{
            border-bottom: 1px #666 solid;
        }
        li{
            font-size: 0.26rem;
            padding: 0.05rem 0;
            list-style-type: none;
            color: #606266;
            word-break: break-all;
            div{
                padding-right: 0.1rem;
            }
        }
        li:last-child{
        }
    }

    .money-btn{
        float: right;
        padding: 0.3rem 0;
        text-align: right;
        .btn{
            font-size: 0.3rem;
            width: 1.88rem;
            line-height: 0.68rem;
            text-align: center;
            color: #fff;
            background: -webkit-linear-gradient(left, #30b03e 0%, #33d57c 100%);
            border-radius: 1rem;
        }
    }

</style>