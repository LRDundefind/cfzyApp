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
                        <div class="ub list-top">
                            <div class="ub-f3 trainsNum">{{item.trainsNum}}</div>
                            <div class="sale ub-f2">未售卖</div>
                        </div>
                        <div class="ub list-top">
                            <div class="numberPlate ub-f2"><span class="">车牌号&nbsp;&nbsp;</span>{{item.plateNum}}</div>
                        </div>
                        <div class="list-bottom  ">
                            <div class="ub-ac ub">
                                <div class="ub-f2">
                                    <!--<div>货品结算金额&nbsp;&nbsp;{{item.putStorageTime | capitalize}}</div>-->
                                    <div>到达时间&nbsp;&nbsp;{{item.putStorageTime | capitalize}}</div>
                                </div>
                                <div class="btn" @click="settlementDetail(item)">编辑</div>
                                <div class="btn">售完结算</div>
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
    import { Loadmore , Indicator} from 'mint-ui'
    export default {
        data () {
            return {
                allLoaded: false,
                wrapperHeight: 0,//容器高度
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
        created () {
            let windowWidth = document.documentElement.clientWidth;//获取屏幕高度
            if(windowWidth>768){//这里根据自己的实际情况设置容器的高度
                this.wrapperHeight = document.documentElement.clientHeight - 130;
            }else{
                this.wrapperHeight = document.documentElement.clientHeight - 40;
            }
            this.getList();
            app.Vwaiting();
        },
        filters: {
            capitalize: function (value) {
                return value.slice(-6);
            }
        },

        methods: {
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
                console.log(item.trainsNum);

                this.$router.push({
                    name: 'storage/train',
                    params: {
                        trainsNum: item.trainsNum, status: "售卖中",
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

            }

        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    i {
        font-style: normal;
    }
    .topScroll{
        height: calc(100vh - 50px);
        top: 50px;
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
                    margin-left: 0.15rem;
                    font-size: 0.3rem;
                    width: 1.88rem;
                    line-height: 0.68rem;
                    text-align: center;
                    color: #fff;
                    background: -webkit-linear-gradient(left, #30b03e 0%, #33d57c 100%);
                    border-radius: 1rem;
                }
            }
        }
    }
</style>