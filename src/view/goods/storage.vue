<template>
    <div class="page-content storage">
        <mt-header fixed title="货品入库" v-if="selected">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button slot="right" style="font-size: 0.32rem" :disabled="selected == 'basic'">确认入库</mt-button>
        </mt-header>
        <mt-header fixed title="货主列表" v-if="ownerList">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button slot="right" style="font-size: 0.32rem" :disabled="selected == 'basic'">确认入库</mt-button>
        </mt-header>

        <mt-navbar v-model="selected" v-if="selected">
            <mt-tab-item id="basic" >基本信息</mt-tab-item>
            <mt-tab-item id="goods" >货品信息</mt-tab-item>
        </mt-navbar>
        <mt-tab-container>
            <!--基本信息-->
            <div v-if="selected == 'basic'">
                <div class="">
                    <div class="basic-list" @click="goList">
                        <p class="clearfix">姓名
                            <span class="name">{{stall.name}}<img class="right-icon" src="../../assets/index/gray-right-icon.png"/></span>
                        </p>
                    </div>

                    <div class="basic-list">
                        <p class="clearfix">司机姓名<input type="text" v-model="stall.driverName"></p>
                        <p class="clearfix">司机电话<input type="text" v-model="stall.driverPhone"></p>
                    </div>

                    <div class="basic-list">
                        <p class="clearfix">车牌号<input type="text" v-model="stall.plateNum"></p>
                        <p class="clearfix">发货地点<input type="text" v-model="stall.startAddress"></p>
                    </div>

                    <div class="basic-list">
                        <p class="clearfix">产地<input type="text" v-model="stall.origin"></p>
                        <p class="clearfix">产地证明
                            <input type="text" v-model="stall.originProveName">
                        </p>
                        <p class="clearfix">检验证明<input type="text" v-model="stall.checkProveName"></p>
                        <p class="clearfix">承运合同<input type="text" v-model="stall.carrierContractName"></p>
                    </div>

                    <div class="basic-list">
                        <p class="clearfix">备注</p>
                        <div class="remark">
                            <textarea name="" id="" cols="30" rows="3" placeholder="备注信息" v-model="stall.remark"></textarea>
                        </div>
                    </div>
                </div>

            </div>
            <!--货品信息-->
            <div v-if="selected == 'goods'">
                <div v-for="n in 2" :key='n' class="goods-list">
                    <p @click="editGoods(n)" class="clearfix">大白菜{{n}}类
                        <span><img class="right-icon" src="../../assets/index/gray-right-icon.png"/></span>
                        <span>{{n + '00'}}公斤</span>
                    </p>
                </div>
                <div class="login_cont">
                    <div @click="createGoods" class="loginbtn">添加货品</div>
                </div>
            </div>
            <!--货主列表-->
            <div v-if="ownerList">
                <owner-list ref="owner" @choiceOwner="oNchoiceOwner"></owner-list>
            </div>
            <!--入库货品信息-->
            <div v-if="goodsDetails">
                <goods-details></goods-details>
            </div>

        </mt-tab-container>
    </div>
</template>

<script>
    import ownerList from '@/view/damage/ownerList'
    import goodsDetails from '@/view/goods/goodsDetails'
    export default {
        data () {
            return {
                selected: 'basic',
                stall:{
                    name: '请选择',
                    good_sid:'',
                    driverName: '东东强',
                    driverPhone: '18236911783',
                    plateNum:'123456',//车牌号
                    company: '阿里巴巴',
                    startAddress: '北京市海淀区魏公村',
                    origin:'产地',

                    originProveName:'',//产地证明名称
                    originProveUrl:'',//产地证明图片地址

                    checkProveName:'',//检验证明图片名称
                    checkProveUrl:'',//检验证明图片地址

                    carrierContractName:'',//承运合同图片名称
                    carrierContractUrl:'',//承运合同图片地址

                    remark:'',//备注
                    goods:'',//货品信息
                },

                goodsDetails:false,//货品列表详情
                ownerList:false,//货主列表
            }
        },
        components:{
            'owner-list': ownerList,
            'goods-details': goodsDetails,
        },
        mounted () {

        },
        methods: {
            //选择货主
            oNchoiceOwner(item){
                this.stall.name = item.shipName;
                this.stall.good_sid = item.sid;
                this.ownerList = false;
                this.selected = 'basic';
            },
            //显示货主列表
            goList(){
                this.ownerList = true;
                this.selected = false;
            },


            //跳转到订单详情
            orderDetail(id){
                this.$router.push({
                    name: 'orderList/orderDetail',
                    params: {
                        id: id
                    }
                });
            },
            //编辑货品
            editGoods(id){
                this.$router.push({name: 'goodsDetails/update', params: {id: id}});
            },
            //添加货品
            createGoods(){

                this.selected = false;
                this.goodsDetails = true;
            },

            //跳转到首页
            goHome(){
                this.$router.push({name: 'home'});
            },

            getList(){
            },



        },
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .storage {
        .mint-navbar {
            margin-top: 0.2rem;
            .mint-tab-item {
                color: #4c4c4c;
                font-size: 0.28rem; /*没有生效*/
                .mint-tab-item-label {
                    font-size: 0.28rem;
                }
            }
            .mint-tab-item.is-selected {
                border-bottom: none;
                color: #33d57c;
                background: url(../../assets/huankuanjilu_line_btn@2x.png) no-repeat center 80%;
                background-size: 1.4rem;
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
                .name {
                    float: right;
                }
                .right-icon {
                    width: 0.18rem;
                    padding-top: 0.3294rem;
                    padding-left: 0.24rem;
                }
                > input {
                    float: right;
                    font-size: 0.26rem;
                    color: #4c4c4c;
                    text-align: right;
                    line-height: 0.98rem;
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
        .goods-list {
            background: #fff;
            margin-top: 0.2rem;
            padding: 0 0.3rem;
            color: #333;
            font-size: 0.28rem;
            line-height: 0.98rem;
            > p {
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
        .login_cont{
            width: 5.5rem;
            margin: 0 auto;
        }
        .loginbtn{
            width: 80% !important;
            @include login_btn(fixed);
            background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
            margin: 0!important;
        }
    }

</style>