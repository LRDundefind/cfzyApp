<template>
    <div class="page-content storage">
        <mt-header fixed title="车次结算">
            <mt-button icon="back" slot="left" @click="goTrain"></mt-button>
        </mt-header>

        <div class="page-main page-loadmore-wrappe topScroll">


            <!--基本信息-->
            <div class="">
                <div class="main-list">
                    <div class="clearfix goods">货品分类
                        <span class="name">分类<img class="right-icon"
                                                                  src="../../assets/index/gray-right-icon.png"/></span>
                    </div>
                </div>

                <div class="main-list" style="position: relative">
                    <div class="clearfix goods">数量
                        <input type="text" placeholder="请输入数量" v-model="goodNum" readonly>
                    </div>

                    <div class="clearfix goods">入库单位
                        <div class="choice">
                            <select v-model="numUnit">
                                <option v-for="item in typeOfPay" :label="item.label" :value="item.value"></option>
                            </select>
                            <img class="jin-right"
                                 src="../../assets/index/gray-right-icon.png"/>
                        </div>
                    </div>
                </div>




                <div class="login_pass ub">
                    <div class="loginbtn1" @click="goTrain">取消</div>
                    <div class="loginbtn " @click="settlement('clearing')">确认结算信息</div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
    import {damage} from '@/services/apis/damage.api'
    import {MessageBox, Toast} from 'mint-ui';

    export default {
        data () {
            return {
                goodNum:'01231',
                numUnit:'unit_pie',

                money:'1414',//布局测试数据
                account:'123145',//布局测试收款账号

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
            this.testClearing();
        },

        methods: {
            goTrain(){
                this.$router.push({
                    name: 'trainManagement',
                });
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

        .main-list {
            background: #fff;
            margin-top: 0.2rem;
            padding: 0 0.3rem;
            color: #333;
            font-size: 0.28rem;
            line-height: 0.98rem;
            .goods {
                border-bottom: 1px #f0f0f0 solid;
                .choice {
                    padding-right: 0.2rem;
                    position: absolute;
                    top: 0.98rem;
                    right: 0.3rem;
                    .jin-right{
                        position: absolute;
                        top: 0.3rem;
                        width: 0.18rem;
                        right: 0rem;
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
                    width: 1.4rem;
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
                    color: #4c4c4c;
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



        .login_pass {
            margin: 0.4rem auto 0.2rem;
            padding-left: 5%;
            .loginbtn1{
                width: 47.5%!important;
                color: #0f0!important;
                @include login_btn;
                background: url(../../assets/kehu_chakanxiaofeijilu_btn@2x.png) no-repeat center;
                margin: 0 !important;
                margin-right: 2%!important;
            }

            .loginbtn {
                @include login_btn;
                width: 47.5%!important;
                background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
                margin: 0 !important;
            }
        }

    }

</style>