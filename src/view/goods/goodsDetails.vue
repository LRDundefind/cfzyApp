<template>
    <div class="page-content">
        <mt-header fixed title="货品信息">
            <router-link to="/" slot="left">
                <mt-button @click="$router.go(-1)" icon="back"></mt-button>
            </router-link>
        </mt-header>
        <!--还款记录列表-->
        <div class="page-main">
            <div class="" v-show="type==false">
                <div class="main-list" @click="showType">
                    <p class="clearfix">大白菜类
                        <!--<span><img class="right-icon" src="../../assets/index/gray-right-icon.png"/></span>-->
                        <span class="name">{{goods.goodName}}<img class="right-icon" src="../../assets/index/gray-right-icon.png"/></span>
                    </p>
                </div>

                <div class="main-list">
                    <p class="clearfix">数量
                        <input type="text" v-model="goods.goodNum">
                    </p>

                    <p class="clearfix">入库单位
                        <span><img class="right-icon" src="../../assets/index/gray-right-icon.png"/></span>
                        <span>{{goods.numUnit | sellNnit}}</span>
                    </p>
                </div>

                <div class='update clearfix'>
                    <mt-button type="primary" size="large" class='f-l' @click="$router.go(-1)">删除</mt-button>
                    <mt-button type="primary" size="large" class='f-l' @click="$router.go(-1)">确定</mt-button>
                </div>
            </div>
            <div class="" v-if="type == true">
                <div v-for="item in goodsData" :key='item.id' class="type-list">
                    <div class="" @click="hideType(item)">
                        <div class="ub type bd-b">
                            <div class="name ub-f5">蔬菜分类</div>
                            <div class="date ub-f1">{{item.goodName}}</div>
                        </div>
                        <div class=" ub unit">
                            <div class="name ub-f5">入库单位</div>
                            <div class="date ub-f1">{{item.sellUnit |sellNnit}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { damage } from '@/services/apis/damage.api'
    import { keyValue } from '@/services/apis/key-value';

    export default {
        data () {
            return {
                goods:{
                    goodId:'',
                    goodName:'请选择',//货品名称
                    numUnit:'',//货品入库单位
                    goodNum:'',//入库量
                },
                goodsData:{
                    goodName:'',
                    sellUnit:'',
                },
                goodsListParams:{
                    page_size:'10',
                    current_page:'1',
                },
                number: '1000',
                type:false,
            }
        },
        created(){

        },

        mounted () {
            this.getlist()
        },
        methods: {
            //初始化数据--获取档位货品列表
            getlist(){
                damage.goodsList(this.goodsListParams).then(response=>{
                    this.goodsData = response.data.results;
//                    this.storageData = response.data.results;
                    console.log(response.data.results);
                })
            },
            showType(){
                this.type = true;
            },
            hideType(item){
                this.goods.goodId = item.goodId;
                this.goods.goodName = item.goodName;
                this.goods.numUnit = item.sellUnit
                console.log(item);
                this.type = false;
            }
            //跳转到货品信息
//            goGoods(){
//               this.$router.push({
//                   name:'goods'
//               })
//            },
        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">

    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0 0.3rem;
        color: #333;
        font-size: 0.28rem;
        line-height: 0.98rem;
        > p {
            border-bottom: 1px #f0f0f0 solid;

            > input {
                float: right;
                color: #4c4c4c;
                text-align: right;
                line-height: 0.98rem;
            }
            > span {
                float: right;
                color: #4c4c4c;
                font-size: 0.26rem;
                text-align: right;
                line-height: 0.98rem;
                .right-icon {
                    width: 0.18rem;
                    padding-top: 0.3294rem;
                    padding-left: 0.24rem;
                }
            }
        }
    }

    .type-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.3rem;
        color: #333;
        font-size: 0.3rem;

        .type {
            padding-bottom: 0.22rem;
        }
        .unit {
            padding-top: 0.22rem;
        }
        .name {
            font-size: 0.3rem;
            color: #333333;
        }

        .date {
            font-size: 0.28rem;
            color: #808080;
            text-align: right;
        }

    }

    .update {
        .mint-button--primary:nth-child(1) {
            background: url(../../assets/kehu_chakanxiaofeijilu_btn@2x.png) no-repeat center;
            background-size: contain;
            width: 41%;
            color: #0f0;
            margin: 0 3%;
            font-size: 0.3rem !important;
            position: fixed;
            bottom: 0.5rem;
        }
        .mint-button--primary:nth-child(2) {
            background: url(../../assets/kehu_gengxinziliao_btn@2x.png) no-repeat center;
            background-size: contain;
            width: 50%;
            font-size: 0.3rem !important;
            position: fixed;
            bottom: 0.5rem;
            left: 47%;
        }
        padding: 0.3rem 0 0rem 0;
        button {
            margin: 0 auto;
            height: 1rem;
        }
    }

</style>