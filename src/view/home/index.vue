<template>
    <div class="main">
        <mt-header fixed title="首页">
            <router-link to="/ownerChoice" slot="left">
                <span class="c-3 f-s-16">白云上档A</span>
                <img class="header_img" src="../../assets/index/down_icon.png"/>
            </router-link>
        </mt-header>

        <div class=" b-c-b">
            <div class="home">
                <img  class="index-picture p-re" src="../../assets/index/shouye_dingbu_img@2x.png"/>
                <div class="ub ub-pc words ">
                    当日总收入（元）
                </div>
                <div class=" ub ub-pc totalNumber">
                    +5758.4
                </div>
                <div class="ub ub-pc total">
                    本月收入（元）215000
                </div>
                <img @click="goMy(5)" src="../../assets/index/shouye_touxiang_img@2x.png" class="p-ab head-img ">
                <div class="p-b-16">
                    <div class="black" @click="goBlack(5)">
                        <img src="../../assets/index/black_img.png"/>
                        <span class="black-title">黑名单</span>
                    </div>
                </div>
            </div>

            <!--总体情况-->
            <div class=" payments ">
                <div class="total-name">当日收支</div>
                <div>
                    <div class="ub p-re bd-b ">
                        <div class="ub ub-f1 bd-r" @click="goEarning">
                            <div class=" ">
                                <img src="../../assets/index/sale_icon.png"/></div>
                            <div class="">
                                <div class="number">15678.0</div>
                                <div class="money">当日销售额(元)</div>
                            </div>
                        </div>
                        <div class="ub ub-f1" @click="goEarning">
                            <div class=" ">
                                <img src="../../assets/index/total_income_icon.png"/></div>
                            <div class="">
                                <div class="number">15678.0</div>
                                <div class="money">当日总收入(元)</div>
                            </div>
                        </div>
                    </div>
                    <div class="ub p-re p-b-10 ">
                        <div class="ub ub-f1 bd-r" @click="goPaylist">
                            <div class=" ">
                                <img src="../../assets/index/total_pay_icon.png"/>
                            </div>
                            <div class="">
                                <div class="number">15678.0</div>
                                <div class="money">当日总支出(元)</div>
                            </div>
                        </div>
                        <div class="ub ub-f1" @click="creditCustomer">
                            <div class=" ">
                                <img src="../../assets/index/total_credit_icon.png"/>
                            </div>
                            <div class="">
                                <div class="number">15678.0</div>
                                <div class="money ">当日总赊账(元)</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!--当日收支    -->
            <div class="payments">
                <div class="total-name">总体情况</div>
                <div>
                    <div class="ub p-re bd-b ">
                        <div class="ub ub-f1  bd-r" @click="goEarning">
                            <div class=" ">
                                <img src="../../assets/index/sale_icon.png"/></div>
                            <div class="">
                                <div class="number">15678.0</div>
                                <div class="money">总销售额(元)</div>
                            </div>
                        </div>
                        <div class="ub ub-f1" @click="goEarning">
                            <div class=" ">
                                <img src="../../assets/index/total_income_icon.png"/></div>
                            <div class="">
                                <div class="number">15678.0</div>
                                <div class="money">总收入(元)</div>
                            </div>
                        </div>
                    </div>
                    <div class="ub p-re p-b-10 ">
                        <div class="ub ub-f1 bd-r" @click="goPaylist">
                            <div class=" ">
                                <img src="../../assets/index/total_pay_icon.png"/>
                            </div>
                            <div class="">
                                <div class="number">15678.0</div>
                                <div class="money">支出总金额(元)</div>
                            </div>
                        </div>
                        <div class="ub ub-f1" @click="creditCustomer">
                            <div class=" ">
                                <img src="../../assets/index/total_credit_icon.png"/>
                            </div>
                            <div class="">
                                <div class="number">15678.0</div>
                                <div class="money">赊账总金额(元)</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <!--坏账报警-->
            <div class="debt m-b-10">
                <div class="total-name">
                    坏账报警
                </div>
                <div class="debt-content">

                    <div class="ub  bd-b" @click="goOrder">
                        <div class="ub-f1">
                            <img class="debt-img" src="../../assets/index/bad_debt_red.png"/>
                        </div>
                        <div class="ub-f4  debt-common">
                            <div class="f-s-30 c-3">强东哥哥</div>
                            <div class="date">最长时间：7天</div>
                        </div>

                        <div class="ub-f1  debt-common">
                            <div class="">
                                <div class="f-s-30 c-red">156698</div>
                                <div class="repay">待还款</div>
                            </div>
                        </div>
                    </div>

                    <div class="ub  bd-b" @click="goOrder">
                        <div class="ub-f1">
                            <img class="debt-img" src="../../assets/index/bad_debt_yellow.png"/>
                        </div>
                        <div class="ub-f4  debt-common">
                            <div class="f-s-30 c-3">强东妈妈</div>
                            <div class="date">最长时间：7天</div>
                        </div>
                        <div class="ub-f1 ub ub-pe debt-common">
                            <div class="">
                                <div class="f-s-30 c-yellow">156698</div>
                                <div class="repay">待还款</div>
                            </div>
                        </div>
                    </div>

                    <div class="ub bd-b" @click="goOrder">
                        <div class="ub-f1">
                            <img class="debt-img" src="../../assets/index/bad_debt_orange.png"/>
                        </div>
                        <div class="ub-f4  debt-common">
                            <div class="f-s-16 c-3">强东爸爸</div>
                            <div class="date">最长时间：7天</div>
                        </div>
                        <div class="ub-f1 ub ub-pe  debt-common">
                            <div class="">
                                <div class="f-s-16 c-orange">156698</div>
                                <div class="repay">待还款</div>
                            </div>
                        </div>
                    </div>

                    <div class="ub" @click="goOrder">
                        <div class="ub-f1">
                            <img class="debt-img" src="../../assets/index/bad_debt_green.png"/>
                        </div>
                        <div class="ub-f4  debt-common">
                            <div class="f-s-16 c-3">强东姐姐</div>
                            <div class="date">最长时间：7天</div>
                        </div>
                        <div class="ub-f1 ub ub-pe  debt-common">
                            <div class="">
                                <div class="f-s-16 c-blue">156698</div>
                                <div class="repay">待还款</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        mounted () {

        },
        methods: {
            //跳转到我的首页
            goMy(id){
                this.$router.push({name: 'my', params: {id: id}});
            },
            goBlack(id){
                this.$router.push({name: 'blackList', params: {id: id}});
            },
            //跳转至收入列表
            goEarning(){
                this.$router.push({name: 'earning'});
            },
            //赊账账单
            creditCustomer(){
                this.$router.push({name: 'creditOrder'});
            },
            //跳转至支出列表
			goPaylist(){
                this.$router.push({name: 'pay'});
            },
            getList(){
            },
            goOrder(){
                this.$router.push({name: 'order'});
            },
        }
    }
</script>
<style scoped lang="scss">
    .header_img {
        width: 0.32rem;
        padding-top: 0.1rem;
        padding-left: 0.05rem;
    }

    .home {
        background-color: #ffffff;
        padding: 0 0.3rem;
        margin-top: 0.2rem;
        .index-picture {
            width: 100%;
        }
        .words {
            top: 0.53rem;
            font-size: 0.26rem;
            padding-left: 0.3rem;
            position: absolute;
            color: #ffffff;
        }
        .totalNumber {
            top: 1.23rem;
            color: #ffffff;
            position: absolute;
            font-size: 0.72rem;
            padding-left: 0.3rem;
        }
        .total {
            top: 2.65rem;
            color: white;
            font-size: 0.28rem;
            padding-left: 0.3rem;
            position: absolute;

        }
        .head-img {
            top: 0.5rem;
            right: 0.42rem;
        }
    }

    .black-title {
        top: 3.95rem;
        left: 0.75rem;
        color: #424248;
        font-size: 0.3rem;
        position: absolute;
    }

    .payments, .debt {
        background-color: white;
        padding: 0.2rem;
        margin-top: 0.22rem;
        .total-name {
            padding: 0.12rem 0 0 0.4rem;
            color: #333;
            font-size: 0.28rem;
        }
        .number {
            font-size: 0.36rem;
            color: #333333;
            padding: 0.42rem 0 0.14rem 0;
        }
        .money{
            font-size: 0.24rem;
            color: #999999;
        }
        img {
            width: 0.8125rem;
            padding: 0.42rem 0.28rem 0.32rem 0.3rem;
        }
        .debt-img {
            width: 0.54rem;
            height: 0.47rem;
            padding: 0.63rem 0 0.46rem 0;
        }
        .debt-content {
            padding: 0 0.4rem;
        }
        .debt-common {
            padding-top: 0.4rem;
            .repay{
                text-align: right;
                font-size: 0.22rem;
                color: #808080;
                padding-top: 0.24rem;
            }
            .date{
                padding-top: 0.24rem;
                font-size: 0.22rem;
                color: #808080;
            }
        }
    }


</style>