<template>
    <div class="">
        <mt-header fixed title="货品损坏">
            <router-link to="/damage" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-main page-loadmore-wrappe topScroll">
            <div class="information">
                <span>{{trainsNum}}</span>
            </div>
            <div v-for="item in goodsList" :key='item.goodId' class="main-list">
                <!--<div class="ub ub-ac heade">-->
                <!--<div class='ub-f1 ut-s'>设置</div>-->
                <!--</div>-->
                <div class="" @click="goRecordUpdate(item)">
                    <div class="ub ub-pj type">
                        <div class="ub-f1 category"><span>{{item.goodName}} ({{item.numUnit | sellNnit}}) </span></div>
                        <div class="ub-f1 number"><span class="count">数量</span> <span>{{item.lossNum}}</span></div>
                    </div>
                    <div class="ub ub-pj reason">
                        <div class="ub-f1">
                            <span>损坏原因：</span>
                            <span>{{item.lossRemark}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--<div class="login_cont">-->
            <!--<div @click="goRecord" class="loginbtn">记录货品损坏</div>-->
        <!--</div>-->

    </div>
</template>

<script>
    import {damage} from '@/services/apis/damage.api'

    export default {
        data () {
            return {
                tid: '',
                trainsNum: '',
                goodsList: {
//                    goodName: '',//货品名称
//                    goodId: '',//货品id
//                    sellUnit: '',//售卖单位
//                    numUnit: '',//入库单位
//                    lossNum: '',//损坏数量
//                    lossRemark: '',//损坏原因

                },

            }
        },
        mounted () {
            this.tid = this.$route.params.tid || false;
            this.trainsNum = this.$route.params.trainsNum;
            this.getList();
        },
        methods: {
            //获取货品列表
            getList(){
                let data = {
                    tid: this.tid
                };
                damage.damageDetails(data)
                    .then(response => {
                        this.goodsList = response.data.results;
//                        console.log(response.data.results);
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //跳转到货品损坏编辑页面
            goRecordUpdate(item){
                this.$router.push({name: 'damageRecord/update', params: {id:item.id,tid: item.tid,type:'edit',trainsNum:this.trainsNum,item:item}})
            },
//            goRecord(){
//                this.$router.push({name: 'damageRecord/create', params: {id: this.tid, type: 'add',trainsNum:this.trainsNum}});
//            }
        }
    }
</script>
<style scoped lang="scss">
    .topScroll{
        top: 0.8rem;
        bottom: 0.2rem;
    }
    .page-loadmore-wrappe{
        overflow: auto;
        -webkit-overflow-scrolling : touch;
    }
    .information {
        font-size: 0.28rem;
        color: #4c4c4c;
        padding: 0.32rem;
        background-color: #fff;
        margin: 0.2rem 0;
        line-height: 0.34rem;
        span {
            padding-right: 0.1rem;
        }
    }

    .main-list {
        background: #fff;
        padding: 0.32rem 0.32rem 0 0.32rem;
        color: #666;
        font-size: 0.28rem;
        .type {
            .category {
                color: #333333;
            }
            .number {
                text-align: right;
                .count {
                    font-size: 0.24rem;
                    padding-right: 0.1rem;
                }
            }
        }
        .reason {
            font-size: 0.24rem;
            padding: 0.34rem 0 0.32rem 0;
            border-bottom: 1px #f0f0f0 solid;
            word-break: break-all;
            line-height: 1.8;
            min-height: 0.24rem;
        }
    }

    .login_cont {
        width: 5.5rem;
        margin: 0 auto;
    }

    .loginbtn {
        width: 80% !important;
        @include login_btn(fixed);
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
        margin: 0 !important;
    }

</style>