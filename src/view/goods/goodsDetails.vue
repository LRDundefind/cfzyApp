<template>
    <div class="page-content">
        <!--还款记录列表-->
        <div class="page-main page-loadmore-wrapper topScroll">
            <div class="" v-show="showList==false">
                <div class="main-list" @click="showType">
                    <div class="clearfix goods">货品分类
                        <!--<span><img class="right-icon" src="../../assets/index/gray-right-icon.png"/></span>-->
                        <span class="name">{{goods.goodName}}<img class="right-icon"
                                                                  src="../../assets/index/gray-right-icon.png"/></span>
                    </div>
                </div>

                <div class="main-list" style="position: relative">
                    <div class="clearfix goods">数量
                        <input type="text" placeholder="请输入数量" v-model="goods.goodNum" readonly
                               v-if="goods.goodName ==''">
                        <input type="number" placeholder="请输入数量" v-model="goods.goodNum" v-else>
                    </div>

                    <div class="clearfix goods">入库单位
                        <div class="choice" v-if="goods.goodName !=''">
                            <select v-model="goods.numUnit">
                                <option value="unit_pie">件</option>
                                <option v-if="Unit=='unit_kg' " value="unit_kg">公斤</option>
                                <option v-else-if="Unit=='unit_jin'" value="unit_jin">斤</option>
                            </select>
                            <img class="jin-right"
                                 src="../../assets/index/gray-right-icon.png"/>
                        </div>
                    </div>
                </div>


            </div>
            <div class="" v-if="showList == true">
                <goods-list ref="goods" @choiceGoods="oNchoiceGoods"></goods-list>

                <!--<div v-for="item in goodsData" :key='item.id' class="type-list">-->
                    <!--<div class="" @click="hideType(item)">-->
                        <!--<div class="ub ">-->
                            <!--<div class=" ub-f3">{{item.goodName}}</div>-->
                        <!--</div>-->
                        <!--<div class=" ub ">-->
                            <!--<div class="unit ub-f3">{{item.sellUnit | sellNnit}}</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->


            </div>

            <div v-show="showList == false">
                <div v-show="deleteDisabled == 'edit'">
                    <div class="login_cont" >
                        <div @click="addGoods('add')" class="loginbtn">确定</div>
                    </div>
                </div>
                <div class='update clearfix' v-show="deleteDisabled != 'edit'">
                    <mt-button type="primary" :disabled="deleteDisabled == 'edit'" size="large" class='f-l'
                               @click="deleteGoods('delete')">删除
                    </mt-button>
                    <mt-button type="primary" size="large" class='f-l' @click="addGoods('add')">确定</mt-button>
                </div>
            </div>

        </div>



    </div>
</template>

<script>
    import goodsList from '@/view/damage/goodsList'

    import {MessageBox, Toast} from 'mint-ui';
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
                wrapperHeight: 0,//容器高度
                Unit: '',
                deleteDisabled: '',
                goods: {
                    goodId: '',
                    goodName: '',//货品名称
                    numUnit: '',//货品入库单位
                    goodNum: '',//入库量
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

        components: {
            'goods-list': goodsList,
        },

        created(){
            if (typeof(this.edit.goodId) != "undefined" && this.edit.goodId != '') {
                this.goods = this.edit;
                this.Unit = this.goods.numUnit;
                this.deleteDisabled = 'delete'
            } else {
                this.deleteDisabled = 'edit'
            }
        },

        mounted () {
            this.wrapperHeight = document.documentElement.clientHeight - 120;
            this.getlist()
        },
        methods: {
            oNchoiceGoods(item){
                this.showList = false;
                this.Unit = item.sellUnit;
                this.goods.goodId = item.goodId;
                this.goods.goodName = item.goodName;
                this.goods.numUnit = item.sellUnit;
            },

            //初始化数据--获取档位货品列表
            getlist(){
                damage.goodsList(this.goodsListParams).then(response => {
                    this.goodsData = response.data.results;
//                    this.storageData = response.data.results;
                })
            },
            showType(){
                this.showList = true;
            },

            deleteGoods(){
                //删除货品
                MessageBox.confirm('确认删除？', '').then(() => {
                    this.addGoods('delete');
                }, () => {

                });
            },

            //添加货品列表
            addGoods(type){
                console.log(type);
                if (type == 'add') {
                    if (this.goods.goodName && this.goods.numUnit && this.goods.goodNum) {
                        if (!(new RegExp(/^\d+(?:.\d{1,2})?$/).test(this.goods.goodNum))) {
                            Toast({
                                message: '请输入正确的数字',
                                position: 'middle',
                                duration: 1000
                            });
                        } else {
                            this.$emit('addGoods', this.goods);
                        }
                    } else {
                        Toast('请完善信息');
                        return false;
                    }
                }
                if (type == 'delete') {
                    this.goods.goodName = '';
                    this.$emit('addGoods', this.goods);
                }

            },
            //隐藏货品列表
            hideType(item){
                this.Unit = item.sellUnit;
                this.goods.goodId = item.goodId;
                this.goods.goodName = item.goodName;
                this.goods.numUnit = item.sellUnit;
//                if (this.goods.numUnit == 'unit_kg') {
//                    this.goods.numUnit = '公斤'
//                } else if (this.goods.numUnit == 'unit_pie') {
//                    this.goods.numUnit = '件'
//                } else if (this.goods.numUnit == 'unit_jin') {
//                    this.goods.numUnit = '斤'
//                }
                console.log(this.goods.numUnit);
                this.showList = false;
            },

        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .topScroll{
        top: 40px;
        bottom: 0;
    }
    .page-loadmore-wrappe{
        overflow: auto;
        -webkit-overflow-scrolling : touch;
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
                line-height: 1;
                width: 100%;
                appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
                background-size: 0.9rem 0.9rem;
                color: #666666;
                outline: none;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                background-color: #fff;
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

    /*.type-list {*/
    /*background: #fff;*/
    /*margin-top: 0.2rem;*/
    /*padding: 0.2rem 0.3rem;*/
    /*color: #333;*/
    /*font-size: 0.3rem;*/

    /*.unit {*/
    /*font-size: 0.26rem;*/
    /*color: #666666;*/
    /*padding-top: 0.1rem;*/
    /*}*/
    /*.date {*/
    /*font-size: 0.28rem;*/
    /*color: #808080;*/
    /*text-align: right;*/
    /*}*/

    /*}*/

    .login_cont {
        width: 5.5rem;
        margin: 7rem auto 0;
        .loginbtn {
            @include login_btn;
            background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
            margin: 0 !important;
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