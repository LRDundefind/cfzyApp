<template>
    <div class="page-content">
        <mt-header fixed title="还款订单">
            <mt-button icon="back" @click="goMy()" slot="left"></mt-button>
        </mt-header>

        <div class="page-main page-loadmore-wrapper topScroll">

            <div v-for="item in listStore" :key='item.cid' class="main-list">
                <ul>
                    <li>
                        <div class="name ">
                            <span class="customer">订单号</span>{{item.orderNo}}
                        </div>
                    </li>
                    <li>
                        <div class="total">
                            <div class=" ub">
                                <div class="ub-f1 account">销售金额</div>
                                <div class="ub-f1 account-number">{{item.salesAmount}}</div>
                            </div>
                            <div class=" ub">
                                <div class="ub-f1 account account-top">待还款</div>
                                <div class="ub-f1 account-number account-top">{{item.stayStillAmount}}</div>
                            </div>
                            <div class=" ub">
                                <div class="ub-f1 account account-top">还款金额</div>
                                <div class="ub-f1 account-number account-top">{{item.this_amount}}</div>
                            </div>
                        </div>
                    </li>

                    <li class="clearfix">
                        <div class="time ub ub-ae">
                            {{item.placeOrderTime}}
                        </div>
                    </li>

                </ul>
            </div>

        </div>
    </div>
</template>

<script>
    import {creditOrder} from '@/services/apis/creditOrder'
    import {Loadmore, Indicator, Toast} from 'mint-ui'

    export default {
        data () {
            return {
                item: '',
                listStore: [],
                refundAmount: '',
                bearerId: '',
                cid: '',

            }
        },

        created(){
        },
        mounted () {
            //路由传参
            this.item = this.$route.params.item;
            this.cid = this.$route.params.item.cid;
            this.refundAmount = this.$route.params.item.refundAmount;
            this.bearerId = this.$route.params.item.bearerId;
            this.getList();
        },

        methods: {
            //跳转到首页
            goMy(){
                let data = this.item;
                //console.log(data);
                this.$router.push({name: 'repayment', params: {cid: this.cid,item:data}});
            },
            //获取还款订单列表
            getList(){
                let data = {
                    cid: this.cid,
                    refundAmount: this.refundAmount,
                    bearerId: this.bearerId,
                };
                creditOrder.viewRepay(data).then(response => {
                    this.listStore = response.data.results;
                })
            },
        }
    }
</script>
<style scoped lang="scss">

    .topScroll {
        height: calc(100vh - 40px);
        top: 40px;
        bottom: 0rem;
    }

    .page-loadmore-wrapper {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }

    .im {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        overflow: hidden;
        background-image: url(../../assets/kehu_gengxinziliao_btn@2x.png)
    }

    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0 0.3rem;
        color: #333;
        .heade {
            font-size: 0.4rem;
            border-bottom: 1px #f0f0f0 solid;
        }
        h3 {
            font-size: 0.4rem;

            line-height: 0.8rem;
        }
        ul {
            li:nth-last-child(1) {
                border: none;
            }
            li {
                border-bottom: 1px solid #dedede;
                font-size: 0.3rem;

                .name {
                    min-height: 0.3rem;
                    font-size: 0.3rem;
                    color: #333333;
                    padding: 0.3rem 0;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    display: block;
                    .customer {
                        padding-right: 0.2rem;
                    }
                }

                .total {
                    padding: 0.2rem 0;
                    .account-top {
                        margin-top: 0.2rem;
                    }
                    .account {
                        font-size: 0.24rem;
                        color: #666;
                    }
                    .account-number {
                        color: #333;
                        font-size: 0.28rem;
                        text-align: right;
                    }
                }
                .time {
                    padding: 0.3rem 0;
                    color: #333;
                    font-size: 0.26rem;
                }
            }
        }
    }

</style>