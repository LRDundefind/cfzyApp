<template>
    <div class="main">
        <mt-header fixed title="首页">
            <router-link to="/ownerChoice" slot="left">
                <span class="c-3 f-s-16">白云上档A</span>
                <img class="header_img" src="../../assets/index/down_icon.png"/>
            </router-link>
            <div class=" personal" @click="goMy(5)" slot="right">
                <img src="../../assets/index/shouye_touxiang_img@2x.png"/>
            </div>
        </mt-header>

        <div class="">

            <div class="home" @click="goBlack">
                <span class="black-title">黑名单</span>
                <img class="p-re" src="../../assets/index/black_img.png"/>
            </div>

            <!--当日入库-->
            <div class="ub today">
                <div class="ub-f1 bd-r">
                    <div class="number">{{storageData.trainNum}}</div>
                    <div class="words">当日入库</div>
                </div>
                <div class="ub-f1 bd-r">
                    <div class="number">{{storageData.order_quantity}}</div>
                    <div class="words">当日下单</div>
                </div>
                <div class="ub-f1">
                    <div class="number">{{storageData.deposit}}</div>
                    <div class="words">暂存下单</div>
                </div>
            </div>

            <!--货品-->
            <div class="goods">
                <div class="ub">
                    <div class="ub-f1">
                        <div class="bd-r bd-b" @click="goStorage">
                            <div>
                                <img class="goods-image left-imge" src="../../assets/index/goods_storage.png"/>
                            </div>
                            <div class="name">货品入库</div>
                        </div>
                        <div class="bd-r" @click="goTemporaryOrderList">
                            <div>
                                <img v-if="this.storageData.deposit == 0" class="goods-image left-imge" src="../../assets/index/no_dot_total_income_icon.png"/>
                                <img v-else class="goods-image left-imge" src="../../assets/index/dot_total_income_icon.png"/>
                            </div>
                            <div class="name">暂存订单</div>
                        </div>
                    </div>
                    <div class="ub-f1">
                        <div class="bd-b">
                            <div class="" @click="goDamage">
                                <img class="goods-image right-img" src="../../assets/index/goods_damaged.png"/>
                            </div>
                            <div class="name">货品损坏</div>
                        </div>

                        <div class=" bd-b bb" @click="goSettlementList">
                            <div>
                                <img class="goods-image right-img" src="../../assets/index/trips_computing.png"/>
                            </div>
                            <div class="name">车次结算</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script> 
     import { home } from '@/services/apis/home.api'
    export default {
        data () {
            return {
                storageData:{
                    trainNum:'',//当日入库量
                    order_quantity:'',//当日下单量
                    deposit:'',//暂存订单量
                }
            }
        },
        mounted () {
            this.getlist()
        },
        methods: {

            getlist(){
                let params={};
                home.index(params).then(response=>{
                    this.storageData = response.data.results;
                    console.log(response.data.results);
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
    .header_img {
        width: 0.32rem;
        padding-top: 0.1rem;
        padding-left: 0.05rem;
    }
    .bb{
        box-sizing: border-box;
    }
    .personal {
        width: 0.68rem;
        padding-left: 50%;
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
            text-align: center;
            min-height: 0.48rem;
        }
        .words {
            font-size: 0.24rem;
            color: #666;
            padding-left: 0.8rem;
            padding-top: 0.24rem;
        }
    }

    .goods {
        background-color: white;
        padding: 0 0.56rem;
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