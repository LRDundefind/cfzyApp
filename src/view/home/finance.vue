<template>
    <div class="main">
        <div class="pos-r wxy">

            <mt-header fixed title="首页财务兼卖手" style="z-index:400;">
                <router-link to="/ownerChoice" slot="left">
                    <span class="c-3 f-s-16">{{gearName}}</span>
                    <img class="header_img" src="../../assets/index/down_icon.png"/>
                </router-link>
                <div class=" personal" @click="goMy()" slot="right">
                    <!--<img class="personal_img" :src="personalData.headImg"/>-->
                    <img class="personal_img" v-show="personalData.headImg!=''" :src="imgpath + personalData.headImg">
                    <img class="personal_img" v-show="personalData.headImg==''" src="../../assets/my/my_head.png"
                         alt="">
                </div>
            </mt-header>
        </div>
        <div class="page-main page-loadmore-wrappe topScroll">

            <div class="home pos-r" @click="goBlack">
                <span class="black-title">黑名单</span>
                <img class="p-re" src="../../assets/index/black_img.png"/>
            </div>

            <!--当日入库-->
            <div class="ub today">
                <div class="ub-f1 bd-r">
                    <div class="number">{{storageData.trainNum}}</div>
                    <div class="words">
                        <div>当日</div>
                        <div>收入(元)</div>
                    </div>
                </div>
                <div class="ub-f1 bd-r">
                    <div class="number">{{storageData.order_quantity}}</div>
                    <div class="words">
                        <div>当日</div>
                        <div>支出(元)</div>
                    </div>
                </div>
                <div class="ub-f1 bd-r">
                    <div class="number">{{storageData.deposit}}</div>
                    <div class="words">
                        <div>当日赊账</div>
                        <div>金额(元)</div>
                    </div>
                </div>

                <div class="ub-f1">
                    <div class="number">{{storageData.deposit}}</div>
                    <div class="words">
                        <div>当日</div>
                        <div>收赊账(元)</div>
                    </div>
                </div>

            </div>

            <!--货品-->
            <div class="goods">
                <div class="ub">
                    <div class="ub-f1" :class= "[ this.role==false? 'left-finance' : 'order-left'] " >
                        <div class="bd-b" @click="goStorage" v-if="role">
                            <div>
                                <img class="goods-image left-imge" src="../../assets/index/goods_storage.png"/>
                            </div>
                            <div class="name">货品入库</div>
                        </div>

                        <div class="bd-b" v-if="role">
                            <div>
                                <img class="goods-image left-imge" src="../../assets/index/goods_storage.png"/>
                            </div>
                            <div class="name">现结收账</div>
                        </div>

                        <div class="bd-b" >
                            <div>
                                <img class="goods-image left-imge" src="../../assets/index/goods_storage.png"/>
                            </div>
                            <div class="name">支出</div>
                        </div>

                        <div class="" @click="goDamage">
                            <div>
                                <img class="goods-image right-img" src="../../assets/index/goods_damaged.png"/>
                            </div>
                            <div class="name">货品损坏</div>
                        </div>

                        <!--<div class="" @click="goTemporaryOrderList">-->
                            <!--<div>-->
                                <!--<img v-if="this.storageData.deposit == 0" class="goods-image left-imge"-->
                                     <!--src="../../assets/index/no_dot_total_income_icon.png"/>-->
                                <!--<img v-else class="goods-image left-imge"-->
                                     <!--src="../../assets/index/dot_total_income_icon.png"/>-->
                            <!--</div>-->
                            <!--<div class="name">暂存订单</div>-->
                        <!--</div>-->
                    </div>



                    <div class="ub-f1">
                        <div class="bd-b">
                            <div class="">
                                <img class="goods-image right-img" src="../../assets/index/goods_damaged.png"/>
                            </div>
                            <div class="name">暂存订单</div>
                        </div>

                        <div class=" bd-b bb">
                            <div>
                                <img class="goods-image right-img" src="../../assets/index/trips_computing.png"/>
                            </div>
                            <div class="name">赊账还款</div>
                        </div>

                        <div class=" bd-b bb" v-if="role">
                            <div>
                                <img class="goods-image right-img" src="../../assets/index/trips_computing.png"/>
                            </div>
                            <div class="name">车次管理</div>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {home} from '@/services/apis/home.api'
    import Cookies from 'js-cookie'
    import {my} from '@/services/apis/my'

    export default {
        data () {
            return {
                role:true,
                imgpath: process.env.BASE_PATH,
                gearName: '',
                personalData: {
                    headImg: '',
                },
                storageData: {
//                    trainNum:'',//当日入库量
//                    order_quantity:'',//当日下单量
                    deposit: '',//暂存订单量
                }
            }
        },
        created () {
            if (typeof Cookies.get('Token') == 'undefined') {
                this.$router.push({name: 'login'});
            }else{
                var g = Cookies.get('gidOwnID_lists')
                if(typeof g == 'undefined' || g == ''){
                    this.$router.push({name:'noStalls'});
                }else{
                    if (JSON.parse(Cookies.get('gidOwnID_lists')).gearName) {
                        this.gearName = JSON.parse(Cookies.get('gidOwnID_lists')).gearName;
                    }
                }
            }
        },
        mounted () {
            this.info();
            this.getlist();
            app.Vwaiting();
        },
        methods: {
            //获取头像
            info(){
                let params = {};
                my.getInfo(params).then(response => {
                    if (response.data.status == 'Y') {
                        this.personalData = response.data.results;
                    } else {

                    }
                })
            },

            //获取当日交易情况
            getlist(){
                let params = {};
                home.index(params).then(response => {
                    this.storageData = response.data.results;
                    app.Cwaiting();
//                    console.log(response.data.results);
                })
            },

            //跳转到我的首页
            goMy(){
                this.$router.push({name: 'my'});
            },
            goOwnerChoice(){
                this.$router.push({name: 'ownerChoice'});
            },
            goBlack(){
                this.$router.push({name: 'blackList'});
            },
            //跳转至收入列表
            goEarning(){
                this.$router.push({name: 'earning'});
            },
            //跳转至暂存订单列表
            goTemporaryOrderList(){
                this.$router.push({name: 'temporaryOrderList'});
            },
            //跳转至车次列表
            goSettlementList(){
                this.$router.push({name: 'settlementList'});
            },
            getList(){
            },
            goOrder(){
                this.$router.push({name: 'order'});
            },
            //跳转到货品入库
            goStorage(){
                this.$router.push({name: 'storage'});
            },
            //跳转到货品损坏
            goDamage(){
                this.$router.push({name: 'damage'});
            },
        }
    }
</script>
<style scoped lang="scss">
    .topScroll {
        top: 0.8rem;
        bottom: 60px;
    }

    .page-loadmore-wrappe {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }

    .header_img {
        width: 0.32rem;
        padding-top: 0.1rem;
        padding-left: 0.05rem;
    }

    .bb {
        box-sizing: border-box;
    }

    .personal {
        .personal_img {
            width: 0.68rem;
            height: 0.68rem;
            border-radius: 50%;
        }
    }

    .home {
        padding: 0.42rem 0.3rem 0.32rem;
        background-color: #ffffff;
        .black-title {
            top: 0.8rem;
            left: 0.75rem;
            color: #424248;
            font-size: 0.3rem;
            position: absolute;
            z-index: 100;
        }
    }

    .today {
        background-color: white;
        margin: 0.22rem 0;
        padding: 0.32rem 0;

        .number {
            font-size: 0.42rem;
            color: #33d57c;
            min-height: 0.48rem; 
            word-break: break-all;
            text-align: center;
        }
        .words {
            font-size: 0.24rem;
            color: #666;
            padding-top: 0.24rem;
            text-align: center;

        }
    }

    .goods {
        background-color: white;
        padding: 0 0.56rem;

        .order-left:after {
            content: '';
            position: absolute;
            top: 0.52rem;
            left: 100%;
            display: inline-block;
            width: 1px;
            height: 13rem;
            background-color: #f0f0f0;
        }

        .left-finance:after {
            content: '';
            position: absolute;
            top: 0.52rem;
            left: 100%;
            display: inline-block;
            width: 1px;
            height: 5.96rem;
            background-color: #f0f0f0;
        }

        .goods-image {
            width: 1.72rem;
            padding: 0.52rem 0.735rem 0 0.735rem;
        }

        .name {
            font-size: 0.3rem;
            color: #333333;
            text-align: center;
            padding: 0.32rem 0 0.52rem;
        }
    }


</style>