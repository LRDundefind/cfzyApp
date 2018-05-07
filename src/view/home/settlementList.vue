<template>
    <div class="page-content">
        <mt-header fixed title="车次结算">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <!--车次结算列表-->
        <div class="page-main page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore
                    :auto-fill="false"
                    :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    ref="loadmore">
                <ul class="settlement-list">
                    <li v-for="item in listStore" :key='item.tid' @click="settlementDetail(item)">
                        <div class="ub list-top">
                            <div class="ub-f3">{{item.trainsNum}}</div>
                            <div class="number ub-f2"><span class="carNumber">车牌号</span>{{item.plateNum}}</div>
                        </div>
                        <div class="list-bottom  ">
                            <div class="ub-ac ub">
                                <div class="ub-f2">入库时间&nbsp;&nbsp;{{item.putStorageTime}}</div>
                                <div class="btn">申请结算</div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-if="allLoaded" class="m-t-10" style="text-align:center;font-size: 0.18rem">没有更多数据了</div>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    import {damage} from '@/services/apis/damage.api'

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
            }
        },
        mounted () {
            let windowWidth = document.documentElement.clientWidth;//获取屏幕高度
            if(windowWidth>768){//这里根据自己的实际情况设置容器的高度
                this.wrapperHeight = document.documentElement.clientHeight - 130;
            }else{
                this.wrapperHeight = document.documentElement.clientHeight - 40;
            }
            this.getList();
        },
        methods: {
            getList(){
                damage.damageList(this.params).then(response => {
                    this.trainList = response.data.results;
                    if(this.trainList.length==this.params.page_size){
                        //判断是否应该加载下一页
                        this.params.current_page+=1 ;
                    }else{
                        //禁用上拉加载
                        this.allLoaded = true;
                    }
                    if (this.trainList) {
                        this.listStore.push(...this.trainList)
                    }
                })
            },

            //跳转到车次结算详情
            settlementDetail(item){
                this.$router.push({
                    name: 'settlementList/detail',
                    params: {
                        id: item.tid, item: item,
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
                this.getList();
            }

        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    i {
        font-style: normal;
    }

    .page-loadmore-wrapper {
        overflow: scroll
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
                .number {
                    font-size: 0.24rem;
                    color: #4c4c4c;
                    text-align: right;
                    .carNumber {
                        padding-right: 0.12rem;
                    }
                }
            }

            .list-bottom {
                color: #666;
                line-height: 1.32rem;
                .btn {
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