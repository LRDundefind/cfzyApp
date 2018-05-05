<template>
    <div class="page-content">
        <mt-header fixed title="货品信息">
            <mt-button @click="goReport" icon="back" slot="left"></mt-button>
        </mt-header>

        <!--还款记录列表-->
        <div class="page-main">
            <div class="" v-show="showList==false">
                <div class="main-list" @click="showType">
                    <p class="clearfix">货品分类
                        <!--<span><img class="right-icon" src="../../assets/index/gray-right-icon.png"/></span>-->
                        <span class="name">{{goods.goodName}}<img class="right-icon"
                                                                  src="../../assets/index/gray-right-icon.png"/></span>
                    </p>
                </div>

                <div class="main-list">
                    <p class="clearfix">数量
                        <input type="text" placeholder="请输入损坏数量" v-model="goods.quantity" readonly
                               v-if="goods.goodName ==''">
                        <input type="number" placeholder="请输入损坏数量" v-model="goods.quantity" v-else>
                    </p>

                    <p class="clearfix">损坏原因
                        <input type="text" placeholder="请输入损坏原因" v-model="goods.lossRemark" readonly
                               v-if="goods.goodName ==''">
                        <input type="text" placeholder="请输入损坏原因" v-model="goods.lossRemark" v-else>
                    </p>
                </div>

                <div class="login_cont">
                    <div @click="addGoods" class="loginbtn">确定</div>
                </div>

            </div>
            <div class="" v-if="showList == true">
                <div v-for="item in goodsData" :key='item.id' class="type-list">
                    <div class="" @click="hideType(item)">
                        <div class="ub ">
                            <div class=" ub-f3">{{item.goodName}}</div>
                        </div>
                        <div class=" ub ">
                            <div class="unit ub-f3">{{item.sellUnit | sellNnit}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import {damage} from '@/services/apis/damage.api'
    import {keyValue} from '@/services/apis/key-value';

    export default {
        name: 'news',
        props: {
            edit: {
                type: Object,
                required: false
            }
        },
        data () {
            return {
                item: '',
                trainsNum: '',
                goodsType: '',
                id: '',
//                deleteDisabled: '',
                goods: {
                    goodId: '',//货品id
                    goodName: '',//货品名称
                    lossRemark: '',//备注
                    quantity: '',//数量
                },
                goodsData: {
                    goodName: '',
                    sellUnit: '',
                },
                goodsListParams: {
                    page_size: '10',
                    current_page: '1',
                },
                number: '1000',
                showList: false,
            }
        },
        created(){
            this.goodsType = this.$route.params.type || false;
            if (this.goodsType == 'edit') {
                this.item = this.$route.params.item;
                this.goods.goodId = this.item.goodId;
                this.goods.goodName = this.item.goodName;
                this.goods.lossRemark = this.item.lossRemark;
                this.goods.quantity = this.item.lossNum;
            }
            this.tid = this.$route.params.id || false;
        },
        mounted () {
            this.trainsNum = this.$route.params.trainsNum;
            console.log(this.trainsNum);
            this.getlist()
        },
        methods: {
            //跳转到车次列表页
            goReport(){
                console.log(1111);
                this.$router.push({name: 'damageReport', params: {tid: this.tid, trainsNum: this.trainsNum}});
                console.log(1111);

            },
            //初始化数据--获取档位货品列表
            getlist(){
                let data = {
                    tid: this.tid
                };
                damage.damageDetails(data).then(response => {
                    this.goodsData = response.data.results;
//                    this.storageData = response.data.results;
                })
            },
            showType(){
                this.showList = true;
            },
            //添加货品列表
            addGoods(){
                if (this.goods.goodName && this.goods.quantity && this.goods.lossRemark) {
                    if (!(new RegExp(/^\d+(?:.\d{1,2})?$/).test(this.goods.quantity))) {
                        Toast({
                            message: '请输入正确的数字',
                            position: 'middle',
                            duration: 1000
                        });
                    } else {
                        let data = this.goods;
                        delete data.goodName;
                        data.tid = this.tid;
                        damage.submitDamage(data)
                            .then(response => {
                                if (response.data.status == 'Y') {
                                    this.goReport();
                                } else {
                                    Toast({
                                        message: response.data.results,
                                        position: 'middle',
                                        duration: 1000
                                    });
                                }
                            })
                            .catch(function (response) {
                                console.log(response);
                            });
                    }
                } else {
                    Toast('请完善信息');
                    return false;
                }

            },
            //隐藏货品列表
            hideType(item){
                this.goods.goodId = item.goodId;
                this.goods.goodName = item.goodName;
//                this.goods.numUnit = item.sellUnit;
                console.log(item);
                this.showList = false;
            },

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
        padding: 0.2rem 0.3rem;
        color: #333;
        font-size: 0.3rem;

        .unit {
            font-size: 0.26rem;
            color: #666666;
            padding-top: 0.1rem;
        }
        .date {
            font-size: 0.28rem;
            color: #808080;
            text-align: right;
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