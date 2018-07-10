<template>
    <div class="page-content">
        <mt-header fixed title="车次结算">
            <router-link to="/trainManagement" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <!--车次结算详情-->
        <div class="page-main page-loadmore-wrappe settlement-detail" :style="{ height: wrapperHeight + 'px' }">

            <div class="ub detail-bottom">
                <div class="ub-f3" style="width: 1rem ;word-break: break-all">{{trainsNum}}</div>
                <div class="number ub-f2"><span class="carNumber">车牌号</span>{{plateNum}}</div>
            </div>
            <div class="detail-top ub ub-ac">
                <div class="ub-f1 time">入库时间</div>
                <div class="number">{{putStorageTime}}</div>


            </div>
            <div class="table-list">
                <table>
                    <thead>
                    <tr>
                        <th>品名</th>
                        <th>库存量</th>
                        <th>销售量</th>
                        <th>损坏量</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in goodsList" :key='item.tid'>
                        <td>{{item.goodName}}</td>
                        <td>{{item.surplusNum}}</td>
                        <td>{{item.sell_quantity}}</td>
                        <td>{{item.lossNum}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="login_cont">
                <div @click="settlement" class="loginbtn" v-show="sold != 'sold'">申请结算</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import {damage} from '@/services/apis/damage.api'
    import Cookies from 'js-cookie'

    export default {
        data () {
            return {
                roleId:'',
                wrapperHeight: 0,//容器高度
                item: {},
                tid: '',//车次id
                trainsNum: '', //车次信息
                plateNum: '',//车牌号
                putStorageTime: '',//入库时间
                goodsList: '',
                sold:'',//是否展示结算按钮
            }
        },
        mounted () {
            this.roleId = Cookies.get('roleId');
            this.wrapperHeight = document.documentElement.clientHeight - 60;
            this.item = this.$route.params.item;
            this.sold = this.$route.params.sold;
            this.tid = this.item.tid;
            this.trainsNum = this.item.trainsNum;
            this.plateNum = this.item.plateNum;
            this.putStorageTime = this.item.putStorageTime;
            if (this.tid) {
                this.getList();
            }
        },
        methods: {
            getList(){
                let data = {
                    tid: this.tid
                };
                damage.damageDetails(data)
                    .then(response => {
                        this.goodsList = response.data.results;
                        console.log(this.goodsList);
                        console.log(1111);
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },

            //申请结算
            settlement(){
                let data = {
                    tid: this.tid
                };
                if(this.roleId == 'role_sel'){
                    damage.submitBus(data)
                        .then(response => {
                            if (response.data.status == 'Y') {
                                Toast({
                                    message: '已完结算操作',
                                    position: 'middle',
                                    duration: 1000
                                });
                                setTimeout(() => {
                                    this.$router.push({name: 'trainManagement'});
                                }, 1000)
                            } else {
                                Toast({
                                    message: response.data.error_msg,
                                    position: 'middle',
                                    duration: 1000
                                });
                            }
                        })
                }else {
                    damage.testClearing(data)
                        .then(response => {
                            if (response.data.status == 'Y') {
                                if(response.data.results.status == 'Y'){
                                    this.$router.push({
                                        name: 'carClearing',
                                        params: {
                                            tid: this.tid,
                                        }
                                    });

                                }else {
                                    Toast({
                                        message:  '当前车次含有暂存订单/未支付订单',
                                        position: 'middle',
                                        duration: 1500
                                    });
                                }
                            } else {
                                Toast({
                                    message:  response.data.error_msg,
                                    position: 'middle',
                                    duration: 1500
                                });
                            }
                        })
                }

            },
        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    i {
        font-style: normal;
    }

    .topScroll {
        top: 0.8rem;
        bottom: 0;
    }

    .page-loadmore-wrappe {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }

    .settlement-detail {
        color: #4c4c4c;
        margin-top: 0.2rem;
        .detail-height {
        }
        .detail-top {
            line-height: 0.98rem;
            margin-bottom: 0.2rem;
            padding: 0 0.3rem;
            background: #fff;
            font-size: 0.3rem;
            color: #333333;
            .number {
                font-size: 0.26rem;
                color: #4c4c4c;
                text-align: right;
                .carNumber {
                    padding-right: 0.12rem;
                }
            }
        }

        .detail-bottom {
            margin-bottom: 0.2rem;
            padding: 0.3rem 0.3rem;
            background: #fff;
            font-size: 0.3rem;
            color: #333333;
            .number {
                font-size: 0.26rem;
                color: #4c4c4c;
                text-align: right;
                .carNumber {
                    padding-right: 0.12rem;
                }
            }
        }

        .table-list {
            font-size:0.26rem;
            padding: 0.32rem 0.3rem 0.2rem;
            background: #fff;
            table {
                width: 100%;
                border-top: 1px solid #dedede;
                thead {
                    background: #f2f2f2;
                    line-height: 0.6rem;
                    tr {
                        th {
                            font-weight: normal;
                            text-align: left;
                        }
                        th:first-child {
                            padding-left: 0.22rem;
                        }
                    }
                }
                tbody {
                    tr {
                        height: 0.96rem;
                        border-bottom: 1px solid #dedede;
                        td:first-child {
                            padding-left: 0.2rem;
                            width: 1.8rem;
                            padding-right: 0.2rem;
                            margin-top: 0.15rem;
                            word-break: break-all;
                        }
                    }
                    tr:last-child {
                        border-bottom: none;
                    }
                }
            }
        }

        .loginbtn {
            @include login_btn;
            background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
            margin: 0 !important;
        }
        .login_cont {
            width: 5.5rem;
            margin: 0.8rem auto 0;
        }
    }


</style>
