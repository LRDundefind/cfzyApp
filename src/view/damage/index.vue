<template>
    <div class="page-content">
        <mt-header fixed title="货品损坏">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-main page-loadmore-wrappe topScroll">
            <noDate v-if="noWdata"></noDate>

            <mt-loadmore
                    :auto-fill="false"
                    :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    :bottomDistance= 50
                    ref="loadmore">

                <div  class="main-list"  v-for="item in listStore" :key='item.tid'>
                    <div class="ub clearfix" @click="goReport(item)">
                        <div class="ub-f5">
                            <div>
                            <span class="information">
                                {{item.trainsNum}}
                            </span>
                            </div>
                            <div class="date">
                                <span class="time">到达时间</span>
                                <span class="time">{{item.putStorageTime}}</span>
                            </div>
                        </div>
                        <div class="ub-f1">
                            <img class="right-icon" src="../../assets/index/gray-right-icon.png"/>
                        </div>
                    </div>
                </div>
                <div v-if="allLoaded" class="m-t-10" style="text-align:center;font-size: 0.18rem;display: none">没有更多数据了</div>

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
                    console.log(response.data.results);
                })
            },
            goReport(item){
                this.$router.push({name: 'damageReport', params: {tid: item.tid, trainsNum: item.trainsNum}});
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
<style scoped lang="scss">
    .topScroll{
        height: calc(100vh - 50px);
        top: 50px;
        bottom: 0rem;
    }
    .page-loadmore-wrappe{
        overflow: auto;
        -webkit-overflow-scrolling : touch;
    }
    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.3rem;
        color: #333;
        font-size: 0.3rem;
        .information {
            min-height: 0.34rem;
        }
        span {
            padding-right: 0.1rem;
        }
        .date {
            padding-top: 0.28rem;
            .time {
                font-size: 0.24rem;
                color: #666666;
                padding-top: 0.28rem;
            }
        }

        .right-icon {
            float: right;
            width: 0.18rem;
            padding-top: 0.3494rem;
        }
    }

</style>