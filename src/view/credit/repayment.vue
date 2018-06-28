<template>
    <div class="page-content storage">
        <mt-header fixed title="赊账还款">
            <mt-button icon="back" slot="left" @click="goTrain"></mt-button>
        </mt-header>

        <div class="page-main page-loadmore-wrappe topScroll">
            <!--基本信息-->
            <div class="">
                <div class="info-list ub">
                    <div class="">
                        <img class="black-img" src="../../assets/my/my_head.png" alt="">
                    </div>
                    <div class="">
                        <div class="info">客户 <span class="son">李欧姆</span></div>
                        <div class="info">身份证 <span class="son">410927199307077777</span></div>
                        <div class="info">手机号 <span class="son">18236911784</span></div>
                        <div class="info">企业名称 <span class="son">某某公司</span></div>
                    </div>

                </div>

                <div class="main-list" style="position: relative">
                    <div class="clearfix goods">还款信息
                        <span>货主A</span>
                    </div>

                    <div class="clearfix goods">欠款总金额
                        <span>￥1500.00</span>
                    </div>

                    <div class="clearfix goods">还款金额
                        <input v-model="goodNum" type="number" placeholder="请输入金额">
                    </div>


                    <div class="clearfix goods">还款方式
                        <div class="choice">
                            <select v-model="numUnit">
                                <option v-for="item in typeOfPay" :label="item.label" :value="item.value"></option>
                            </select>
                        <img class="jin-right"
                                 src="../../assets/index/gray-right-icon.png"/> </div>

                    </div>
                    <div class="clearfix goods c-3">收款账号
                        <input v-model="goodNum" type="number" placeholder="请输入收款账号">
                    </div>
                </div>

                <div class="main-list">
                    <div class="clearfix c-3">备注</div>
                    <div class="remark">
                            <textarea maxlength="420" name="" id="" cols="30" rows="3" placeholder="备注信息"
                                      v-model="goodNum"></textarea>
                    </div>
                </div>

                <div class="list">
                    <div class="clearfix goods" style="">查看可还款订单
                        <div class="choice">
                            <img class="jin-right"
                                 src="../../assets/index/gray-right-icon.png"/>
                        </div>
                    </div>
                </div>

                <div class="update">
                    <mt-button class="sure" type="primary" size="large" @click="submit">确认还款</mt-button>
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
                cid:'',

                goodNum:'01231',
                numUnit:'type_alipay',

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
            this.cid = this.$route.params.cid;
            this.getInfo();
        },

        methods: {
            //获取客户还款详情
            getInfo(){
                
            },
            //返回赊账还款列表
            goTrain(){
                this.$router.push({
                    name: 'creditOrder',
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

        .info-list{
            background: #fff;
            margin-top: 0.2rem;
            padding:0.3rem 0.3rem 0.1rem;
            color: #666;
            font-size: 0.28rem;
            .black-img {
                width: 1.16rem;
                height: 1.16rem;
                border-radius: 50%;
                padding-right: 0.25rem;
            }
            .info{
                padding-bottom: 0.2rem;
                .son{
                    padding-left: 0.2rem;
                    color: #333;
                }
            }

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