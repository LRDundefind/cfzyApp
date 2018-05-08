<template>
    <div class="page-content">
        <search-box @getSmeage="searchBlack" :msg="msg" ref="search"/>

        <div class="page-main page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px' }">
            <div v-if="noData" class="noData">
                <!--<img src="../../assets/com_wushuju_icon.png" alt="">-->
                暂无数据
            </div>
            <mt-loadmore
                    :auto-fill="false"
                    :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    ref="loadmore">

                <div v-for="item in listStore" :key='item.id' class="main-list">
                    <div @click="choiceOwner(item)">
                        <div class="name">{{item.shipName}}</div>
                        <div class="ub car">
                            <div class="ub ub-f2">
                                <div>待结算车次
                                    <span class="number">{{item.unsettlement}}</span>
                                </div>
                            </div>
                            <div class="ub ub-f1">
                                <div>发货总次数
                                    <span class="number">{{item.trainNum}}</span>
                                </div>
                            </div>
                        </div>

                        <div class="ub">
                            <div class="ub ub-f2">
                                <div>已结算
                                    <span class="number">{{item.tradeAmount}}</span>
                                </div>
                            </div>
                            <div class="ub ub-f1">
                                <div>尚欠款
                                    <span class="number pay">{{item.notPayAmount}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="allLoaded" class="m-t-10" style="text-align:center;font-size: 0.18rem">没有更多数据了</div>
            </mt-loadmore>
        </div>
    </div>
</template>

<script>
    import searchBox from '@/components/searchBox/search'
    import {damage} from '@/services/apis/damage.api'
    import { Loadmore , Indicator} from 'mint-ui'

    export default {
        components: {searchBox},
        name: 'owner',
        data () {
            return {
                msg: '',
                allLoaded: false,
                wrapperHeight: 0,//容器高度
                noData:false,
                listStore: [],
                params:{
                    page_size: 10,
                    current_page: 1,
                    search:''
                },
                listData:[],
                //searchValue:this.$refs.search.searchValue
            }
        },
        mounted () {
            this.wrapperHeight = document.documentElement.clientHeight - 100;
            this.getList();
        },
        methods: {
            searchBlack(msg){
                Indicator.open({
                    text: 'Loading...',
                    spinnerType: 'fading-circle'
                });
                this.params.current_page = 1;
                this.params.search=msg;
                this.listStore = [];
                this.getList();
            },
            //初始化数据--获取货主列表
            getList(){
                damage.ownerList(this.params).then(response => {
                    this.listData=response.data.results;
                    if(this.listData.length==this.params.page_size){
                        //判断是否应该加载下一页
                        this.params.current_page+=1 ;
                    }else{
                        //禁用上拉加载
                        this.allLoaded = true;
                    }
                    if (this.listData) {

                        this.listStore.push(...this.listData);
                    }
                    if (!this.listStore) this.noData = true;
                    Indicator.close();
                })
            },
            loadTop(){
                Indicator.open({
                    text: 'Loading...',
                    spinnerType: 'fading-circle'
                });
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
            },
            //选择货主
            choiceOwner(item){
                this.$emit('choiceOwner', item);
            },
        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .page-loadmore-wrapper {
        overflow: scroll
    }
    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.3rem;
        color: #666;
        font-size: 0.24rem;
        .name {
            font-size: $fons_size_30;
            color: $main_color333;
            border-bottom: $main_border;
            line-height: 0.8rem;
            min-height: 0.8rem;
        }
        .number {
            padding-left: 0.2rem;
        }
        .pay {
            color: #49c98b;
        }
        .car {
            padding: 0.2rem 0 0.22rem 0;

        }

    }

</style>