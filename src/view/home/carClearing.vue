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
                        <span class="name">测试姓名</span>
                    </p>
                    <p class="clearfix">手机号
                        <span class="name">测试：18236911783</span>
                    </p>
                    <p class="clearfix">供应商名称
                        <span class="name">测试集团</span>
                    </p>
                    <p class="clearfix">账户信息
                        <span class="name">测试123456789</span>
                    </p>
                    <p class="clearfix">地址
                        <span class="name">测试地址</span>
                    </p>
                </div>

                <div class="basic-list">
                    <p class="clearfix">备注</p>
                    <div class="remark">
                    <textarea maxlength="420" name="" id="" cols="30" rows="3" placeholder="货主备注信息"
                              v-model="stall.remark"></textarea>
                    </div>
                </div>

                <div class="basic-list">
                    <p class="clearfix">结算信息</p>
                    <p class="clearfix">货品费用
                        <span class="name">测试1000.00</span>
                    </p>
                    <p class="clearfix">提成费用
                        <span class="name">测试1000.00</span>
                    </p>
                    <p class="clearfix">回扣
                        <span class="name">测试1000.00</span>
                    </p>
                    <p class="clearfix">车费
                        <span class="name">测试1000.00</span>
                    </p>
                    <p class="clearfix">卸车费
                        <span class="name">测试1000.00</span>
                    </p>
                    <p class="clearfix">固定代销费<input type="text" maxlength="8" v-model="stall.plateNum"></p>

                </div>

                <div class="pay">
                    <div class="cost">计算最终结算费用</div>
                </div>

                <div class="basic-list">

                    <p class="clearfix">结算金额
                        <span class="money">测试￥0.00</span>
                    </p>

                </div>

                <div class="basic-list">
                    <p class="clearfix">备注</p>
                    <div class="remark">
                    <textarea maxlength="420" name="" id="" cols="30" rows="3" placeholder="结算备注信息"
                              v-model="stall.remark"></textarea>
                    </div>
                </div>

                <div class="login_pass ub">
                    <div class="loginbtn1 ">取消</div>
                    <div class="loginbtn ">确认结算信息</div>
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
                stall: {
                    name: '请选择',
                    good_sid: '',//货主id
                    driverName: '',//司机姓名
                    driverPhone: '',//司机电话
                    plateNum: '',//车牌号
                    startAddress: '',//发货地点
                    origin: '',//产地

                    originProve: '',//产地证明图片地址

                    checkProve: '',//检验证明图片地址

                    carrierContract: '',//承运合同图片地址

                    remark: '',//备注
                    goods: '',//货品信息
                },

            }
        },
        mounted () {

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