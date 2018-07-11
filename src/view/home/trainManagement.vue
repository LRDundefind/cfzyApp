<template>
    <div class="page-content">
        <mt-header fixed title="车次管理">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <!--车次结算列表-->
        <div class="page-main page-loadmore-wrappe topScroll">
            <noDate v-if="noWdata"></noDate>
            <mt-loadmore
                    :auto-fill="false"
                    :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    :bottomDistance= 50
                    ref="loadmore">
                <ul class="settlement-list">
                    <li v-for="item in listStore" :key='item.tid' >
                        <div class="ub list-top" @click="sold(item,'sold')">
                            <div class="ub-f3 trainsNum">{{item.trainsNum}}</div>
                            <div class="sale ub-f2" v-show="item.settleStatus == 'status_toremit'">待汇款</div>
                            <div class="sale ub-f2" v-show="item.settleStatus == 'status_selling'">售卖中</div>
                            <div class="sale ub-f2" v-show="item.settleStatus == 'status_topay'">待结算</div>
                            <div class="sale ub-f2" v-show="item.settleStatus == 'status_complete'">已完成</div>
                            <div class="sale ub-f2" v-show="item.settleStatus == 'status_not_selling'">未开卖</div>
                        </div>
                        <div class="ub list-top" @click="sold(item,'sold')">
                            <div class="numberPlate ub-f2"><span class="">车牌号&nbsp;&nbsp;</span>{{item.plateNum}}</div>
                        </div>
                        <div class="list-bottom  ">
                            <div class="ub-ac ub">
                                <div class="ub-f2">
                                    <!--<div>货品结算金额&nbsp;&nbsp;{{item.putStorageTime | capitalize}}</div>-->
                                    <div>到达时间&nbsp;&nbsp;{{item.putStorageTime | capitalize}}</div>
                                </div>
                                <div class="btn" @click="settlementDetail(item)">编辑</div>
                                <div v-show="item.settleStatus == 'status_not_selling'" class="btn1" @click="deleteTrain(item.tid)">删除</div>
                                <div v-show="item.settleStatus == 'status_selling'" class="btn" @click="sold(item,'noSold')">
                                    <span v-show="roleId == 'role_sel'">申请结算</span>
                                    <span v-show="roleId != 'role_sel'">售完结算</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <!-- <div v-if="allLoaded" class="m-t-10" style="text-align:center;font-size: 0.18rem">没有更多数据了</div> -->
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    import {damage} from '@/services/apis/damage.api'
    import noDate from '@/components/noData/noDate'
    import { Loadmore ,Toast, Indicator,MessageBox} from 'mint-ui'
    import Cookies from 'js-cookie'

    export default {
        data () {
            return {
                roleId:'',//卖手——role_sel;财务兼卖手--role_finance_sell;财务--role_finance;
                allLoaded: false,
                listStore: [],
                trainList: [],
                params:{
                    current_page: 1,
                    page_size: 10
                },
                noWdata:false,
            }
        },
        components:{
            noDate,
        },
        mounted () {
            this.roleId = Cookies.get('roleId');
            this.getList();
            app.Vwaiting();
        },
        //到达时间过滤器
        filters: {
            capitalize: function (value) {
                return value.slice(-6);
            }
        },

        methods: {
            //获取车次管理列表
            getList(){
                damage.damageList(this.params).then(response => {
                    this.trainList = response.data.results;
                    if(this.trainList==''&& this.params.current_page == 1){
                        this.noWdata=true;
                    }
                    app.Cwaiting();
                    if(this.trainList.length==this.params.page_size){
                        //判断是否应该加载下一页
                        this.params.current_page+=1 ;
                    }else{
                        //禁用上拉加载
                        this.allLoaded = true;
                    }
                    if (this.trainList) {
                        this.listStore.push(...this.trainList)
                        if(this.listStore==''){
                            this.noWdata=true;
                            app.Cwaiting();
                        }
                    }
                    this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
                    Indicator.close();
                })
            },

            //跳转到车次结算详情
            settlementDetail(item){
                this.$router.push({
                    name: 'storage/train',
                    params: {
                        tid: item.tid, status: item.settleStatus,
                    }
                });
            },
            loadTop(){
                this.listStore = [];
                this.params.current_page = 1;
                this.getList();
                this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
                this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
            },
            loadBottom() {
                Indicator.open({
                    text: 'Loading...',
                    spinnerType: 'fading-circle'
                });
                this.getList();
                this.$refs.loadmore.onBottomLoaded();

            },
            //删除车次管理
            deleteTrain(tid){
                MessageBox.confirm('确认删除？', '').then(() => {
                    let data = {
                        tid: tid
                    };
                    damage.deleteTrain(data).then(response => {
                        if (response.data.status == 'Y') {
                            Toast({
                                message: '删除操作成功',
                                position: 'middle',
                                duration: 1500
                            });
                            this.listStore = [];
                            this.params.current_page = 1;
                            this.getList();
                            this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
                            this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
                        } else {
                            Toast({
                                message: response.data.error_msg,
                                position: 'middle',
                                duration: 1000
                            });
                        }
                    });

                }, () => {
                    Toast({
                        message: '取消删除',
                        position: 'middle',
                        duration: 1500
                    });
                });
            },

            //售完结算与跳转到车次详情
            sold(item,sold){
                let data={};
                data.trainsNum = item.trainsNum;
                data.plateNum = item.plateNum;
                data.putStorageTime = item.putStorageTime;
                data.tid = item.tid;

                if(sold=='sold'){
                    this.$router.push({
                        name: 'settlementList/detail',
                        params: {
                            id: item.tid, item: data,sold:'sold',
                        }
                    });
                }
                this.$router.push({
                    name: 'settlementList/detail',
                    params: {
                        id: item.tid, item: data,
                    }
                });
            },
//            sold(item){
//                let data = {
//                    tid: item.tid,
//                };
//                damage.testClearing(data)
//                    .then(response => {
//                        if (response.data.status == 'Y') {
//                            if(response.data.results.status == 'Y'){
//                                let data={};
//                                data.trainsNum = item.trainsNum;
//                                data.plateNum = item.plateNum;
//                                data.putStorageTime = item.putStorageTime;
//                                data.tid = item.tid;
//                                if(this.roleId == 'role_sel'){
//                                    this.$router.push({
//                                        name: 'settlementList/detail',
//                                        params: {
//                                            id: item.tid, item: data,
//                                        }
//                                    });
//                                }else {
//                                    this.$router.push({
//                                        name: 'carClearing',
//                                        params: {
//                                            tid: item.tid,
//                                        }
//                                    });
//                                }
//                            }else {
//                                Toast({
//                                    message:  '当前车次含有暂存订单/未支付订单',
//                                    position: 'middle',
//                                    duration: 1500
//                                });
//                            }
//                        } else {
//                            Toast({
//                                message:  response.data.error_msg,
//                                position: 'middle',
//                                duration: 1500
//                            });
//                        }
//                    })
//            },
        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    i {
        font-style: normal;
    }
    .topScroll{
        height: calc(100vh - 50px);
        top: 40px;
        bottom: 0rem;
    }
    .page-loadmore-wrappe{
        overflow: auto;
        -webkit-overflow-scrolling : touch;
    }

    .settlement-list {
        font-size: 0.24rem;
        color: #666;
        li {
            background: #fff;
            margin-top: 0.2rem;
            padding: 0 0.3rem;
            .list-top {
                line-height: 0.86rem;
                border-bottom: 1px solid #dedede;
                font-size: 0.3rem;
                color: #333333;

                .numberPlate{
                    font-size: 0.24rem;
                    color: #333333;
                    padding-right: 0.12rem;
                }

                .sale{
                    font-size: 0.28rem;
                    color: rgb(51,210,118);
                    text-align: right;
                }

                .trainsNum{
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    display: block;
                }
            }

            .list-bottom {
                color: #666;
                line-height: 1.32rem;
                .btn {
                    margin-left: 0.2rem;
                    font-size: 0.3rem;
                    width: 1.88rem;
                    line-height: 0.68rem;
                    text-align: center;
                    color: #fff;
                    background: -webkit-linear-gradient(left, #30b03e 0%, #33d57c 100%);
                    border-radius: 1rem;
                }

                .btn1{
                    background: url(../../assets/kehu_chakanxiaofeijilu_btn@2x.png) no-repeat center;
                    margin-left: 0.15rem;
                    font-size: 0.3rem;
                    width: 1.88rem;
                    line-height: 0.68rem;
                    text-align: center;
                    border-radius: 1rem;
                    color: #33d57c;
                }
            }
        }
    }
</style>