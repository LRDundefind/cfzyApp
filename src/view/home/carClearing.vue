<template>
    <div class="page-content storage">
        <mt-header fixed title="车次结算">
            <mt-button icon="back" slot="left" @click="goTrain"></mt-button>
        </mt-header>

        <div class="page-main page-loadmore-wrappe topScroll">


            <!--基本信息-->
            <div class="">
                <div class="basic-list">
                    <p class="clearfix">货主信息
                        <!--<span class="name">123465</span>-->
                    </p>
                    <p class="clearfix">姓名
                        <span class="name">{{ownerInfo.shipName}}</span>
                    </p>
                    <p class="clearfix">手机号
                        <span class="name">{{ownerInfo.phone}}</span>
                    </p>
                    <p class="clearfix">供应商名称
                        <span class="name">{{ownerInfo.supplierName}}</span>
                    </p>
                    <p class="clearfix">账户信息
                        <span class="name">{{ownerInfo.acount}}</span>
                    </p>
                    <p class="clearfix">地址
                        <span class="name">{{ownerInfo.address}}</span>
                    </p>
                </div>

                <div class="basic-list">
                    <p class="clearfix">备注</p>
                    <div class="remark">
                    <textarea maxlength="420" name="" id="" cols="30" rows="3" placeholder="货主备注信息"
                              v-model="ownerInfo.remark" readonly></textarea>
                    </div>
                </div>

                <div class="basic-list">
                    <p class="clearfix">结算信息</p>
                    <p class="clearfix">货品费用
                        <span class="name">{{goodCost}}</span>
                    </p>
                    <p class="clearfix">提成费用
                        <span class="name">{{commission}}</span>
                    </p>
                    <p class="clearfix">回扣
                        <span class="name">{{rebates}}</span>
                    </p>

                    <p class="clearfix" v-for="item in storage" :key='item.tid' v-show="storage != ''">{{item.expendName}}
                        <span class="name">{{item.amount}}</span>
                    </p>


                    <p class="clearfix">固定代销费<input type="number" maxlength="12" placeholder="请输入固定代销费" v-model="marketingCost"></p>

                </div>

                <div class="pay">
                    <div class="cost" @click="settlement('compute')">计算最终结算费用</div>
                </div>

                <div class="basic-list">

                    <p class="clearfix">结算金额
                        <span class="money" v-show="amountClearing ==''">￥0.00</span>
                        <span class="money" v-show="amountClearing !=''">￥{{amountClearing}}</span>
                    </p>

                </div>

                <div class="basic-list">
                    <p class="clearfix">备注</p>
                    <div class="remark">
                    <textarea maxlength="420" name="" id="" cols="30" rows="3" placeholder="结算备注信息"
                              v-model="remark"></textarea>
                    </div>
                </div>

                <div class='update clearfix ub'>
                    <mt-button type="primary" size="large" class='btn1 ub-f1' @click="goTrain">取消</mt-button>
                    <mt-button type="primary" size="large" class='btn2 ub-f1' @click="settlement('clearing')" :disabled="confirmDisabled">确认结算信息</mt-button>
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
                storage:[],
                tid:'',
                confirmDisabled:false,
                amountClearing:'',//结算金额
                ownerInfo: {},//货主信息
                goodCost: '',//货款总金额
                commission :'',//提成费用合计总额
                rebates: '',//回扣
                marketingCost: '',//固定代销费
                remark:'',//结算备注
            }
        },
        mounted () {
            this.tid = this.$route.params.tid || false;
            this.testClearing();
        },

        methods: {
            //验证车次结算
            testClearing(){
                let data = {
                    tid: this.tid,
                };
                damage.testClearing(data)
                    .then(response => {
                        if (response.data.status == 'Y') {
                            this.ownerInfo = response.data.results.goods_owner_info;
                            this.goodCost = response.data.results.goodCost;//货款总金额
                            this.commission = response.data.results.commission;//提成费用合计总额
                            this.rebates = response.data.results.rebates;//回扣
                            this.storage = response.data.results.storage;//
                        } else {
                            Toast({
                                message: response.data.error_msg,
                                position: 'middle',
                                duration: 2000
                            });
                        }
                    })
            },

            //计算结算费用与提交车次申请
            settlement(apply){
                if (!(new RegExp(/^\d+(?:.\d{1,2})?$/).test(this.marketingCost))) {
                    Toast({
                        message: '请输入正确的数字',
                        position: 'middle',
                        duration: 1000
                    });
                }else {
                    let data = {
                        tid: this.tid,
                        marketingCost:this.marketingCost,
                        remark:this.remark,
                    };
                    if(apply == 'compute'){
                        data.computer ='Y'
                    }else {
                        if(this.amountClearing == ''){
                            Toast({
                                message: '请先计算最终结算费用！',
                                position: 'middle',
                                duration: 1000
                            });
                            return false;
                        }else {
                            data.computer ='N';
                            this.confirmDisabled = true;
                        }

                    }
                    console.log(data);
                    damage.countTrain(data)
                        .then(response => {
                            if (response.data.status == 'Y') {
                                if(apply == 'compute'){
                                    this.amountClearing = response.data.results.payAmount
                                }else {
                                    Toast({
                                        message: '结算操作成功！',
                                        position: 'middle',
                                        duration: 1000
                                    });
                                    setTimeout(() => {
                                        this.confirmDisabled = false;
                                        this.$router.push({name: 'trainManagement'});
                                    }, 1000)
                                }
                            } else {
                                this.confirmDisabled = false;
                                if(response.data.error_msg){
                                    Toast({
                                        message: response.data.error_msg,
                                        position: 'middle',
                                        duration: 2000
                                    });
                                }else if(response.data.results){
                                    Toast({
                                        message: response.data.results,
                                        position: 'middle',
                                        duration: 2000
                                    });
                                }

                            }
                        })
                }
            },
            //跳转到车次管理列表
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

        .update {
            left: -0.1rem;
            padding: 0.3rem 0.2rem;
            .btn1 {
                background: url(../../assets/kehu_chakanxiaofeijilu_btn@2x.png) no-repeat center;
                background-size: 100% 100%;
                width: 100%;
                color: #33d57c;
                margin: 0 3%;
                font-size: 0.3rem !important;
            }
            .btn2 {
                background: url(../../assets/kehu_gengxinziliao_btn@2x.png) no-repeat center;
                background-size: 100% 95%;
                width: 100%;
                font-size: 0.3rem !important;
            }
            button {
                margin: 0 auto;
                height: 1rem;
            }

        }

        .pay {
            margin-top: 0.2rem;
            padding: 0 0.3rem;
            color: #333;
            font-size: 0.28rem;
            line-height: 0.98rem;
            .cost {
                margin: 0 auto;
                color: #33d57c;
                border: 1px solid #33d57c;
                width: 60%;
                height: 0.6rem;
                line-height: 0.6rem;
                border-radius: 30px;
                font-size: 0.3rem;
                text-align: center;
            }
        }
        .basic-list {
            background: #fff;
            margin-top: 0.2rem;
            padding: 0 0.3rem;
            color: #333;
            font-size: 0.28rem;
            line-height: 0.98rem;

            > p {
                border-top: 1px #f0f0f0 solid;
                .money{
                    float: right;
                    font-size: 0.3rem;
                    color: #33d57c;
                    font-weight: 600;
                }
                .name {
                    float: right;
                }
                .right-icon {
                    width: 0.18rem;
                    padding-top: 0.3294rem;
                    padding-left: 0.24rem;
                }
                > input {
                    font-size: 0.26rem;
                    float: right;
                    color: #4c4c4c;
                    text-align: right;
                    line-height: 0.4rem;
                    margin-top: 0.3rem
                }
                .upload {
                    color: #33d570;
                    float: right;
                }
            }
            > p:nth-child(1) {
                border: none;
            }
            .remark {
                color: #666;
                padding-bottom: 0.8rem;
                textarea {
                    border: none;
                    width: 100%;
                    font-size: 0.26rem;
                    color: #4c4c4c;
                }
            }
        }

    }

</style>