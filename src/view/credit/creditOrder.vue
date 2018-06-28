<template>
    <div class="page-content">
        <mt-header fixed title="赊账收账">
            <mt-button icon="back" @click="goMy()" slot="left"></mt-button>
        </mt-header>
        <search-box @getSmeage="searchBlack" :message='placeMessage' ref="search"/>

        <div class="page-main page-loadmore-wrapper topScroll">
            <noDate v-if="noWdata"></noDate>
            <mt-loadmore
                    v-else
                    :auto-fill="false"
                    :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                    :bottomDistance=50
                    ref="loadmore">
                <!--<noDate v-if="noWdata"></noDate-->

                <div v-for="item in listStore" :key='item.cid' class="main-list">
                    <ul>

                        <li class=" ub">
                            <div class="name ub-f1">
                                <span class="customer">客户</span>{{item.cusName}}
                            </div>
                            <div class="pay ub-f1">待还款￥{{item.notPayAmount}}</div>
                        </li>
                        <li>
                            <div class="total">
                                <div class=" ub">
                                    <div class="ub-f1 account">总赊账</div>
                                    <div class="ub-f1 account-number">{{item.notPayAmount}}</div>
                                </div>
                                <div class=" ub">
                                    <div class="ub-f1 account account-top">承账方</div>
                                    <div class="ub-f1 account-number account-top">{{item.bearerName}}</div>
                                </div>
                            </div>
                        </li>

                        <li class="clearfix">
                            <div class="money-btn ub ub-ae" @click="repay(item)">
                                <div class="btn">还款</div>
                            </div>
                        </li>

                    </ul>
                </div>
                <div v-if="allLoaded" class="m-t-10" style="text-align:center;font-size: 0.18rem;display: none">
                    没有更多数据了
                </div>
            </mt-loadmore>


        </div>
    </div>
</template>

<script>
    import searchBox from '@/components/searchBox/search'
    import {creditOrder} from '@/services/apis/creditOrder'
    import {Loadmore, Indicator, Toast} from 'mint-ui'
    import noDate from '@/components/noData/noDate'

    export default {
        data () {
            return {
                placeMessage: '请输入客户名称',
                msg: '',
                black: '',
                allLoaded: false,
                wrapperHeight: 0,//容器高度
                noData: false,
                params: {
                    current_page: 1,
                    page_size: 10,
                    search: ''
                },
                listStore: [],
                listdata: null,
                noWdata: false,

            }
        },
        components: {
            noDate,
            searchBox
        },
        created(){
            this.black = this.$route.params.black || false;
            this.wrapperHeight = document.documentElement.clientHeight - 100;
            this.getList();
            app.Vwaiting();
        },
        mounted () {
        },

        methods: {
            //跳转到首页
            goMy(){
                this.$router.push({name: 'home'});
            },
            //按客户名称搜索
            searchBlack(msg){
                Indicator.open({
                    text: 'Loading...',
                    spinnerType: 'fading-circle'
                });
                this.params.current_page = 1;
                this.params.search = msg;
                this.listStore = [];
                this.getList();
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
                this.$refs.loadmore.onBottomLoaded();
            },
            getList(){
                creditOrder.getList(this.params).then(response => {
                    this.listdata = response.data.results.list;
                    if (this.listdata == '' && this.params.current_page == 1) {
                        this.noWdata = true;
                    }
                    app.Cwaiting();
                    if (this.listdata.length == this.params.page_size) {
                        //判断是否应该加载下一页
                        this.params.current_page += 1;
                    } else {
                        //禁用上拉加载
                        this.allLoaded = true;
                    }
                    if (this.listdata) {
                        this.listStore.push(...this.listdata)

                    }
                    if (this.listStore == '') {
                        this.noWdata = true;
                        app.Cwaiting();
                    }
                    this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
                    Indicator.close();
                })
            },
            //还款
            repay(item){
                let data = item;
                delete data.nickname;
                delete data.idCard;
                delete data.company;
                delete data.creditAmount;
                delete data.cusName;
                this.$router.push({name: 'repayment', params: {cid: item.cid,item:data}});
            }
        }
    }
</script>
<style scoped lang="scss">

    .topScroll {
        height: calc(100vh - 100px);
        top: 100px;
        bottom: 0rem;
    }

    .page-loadmore-wrapper {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }

    .im {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        overflow: hidden;
        background-image: url(../../assets/kehu_gengxinziliao_btn@2x.png)
    }

    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0 0.3rem;
        color: #333;
        .heade {
            font-size: 0.4rem;
            border-bottom: 1px #f0f0f0 solid;
        }
        h3 {
            font-size: 0.4rem;

            line-height: 0.8rem;
        }
        ul {

            li:nth-last-child(1){
                border: none;
            }

            li {
                border-bottom: 1px solid #dedede;
                font-size: 0.3rem;
                .pay {
                    min-height: 0.3rem;
                    font-size: 0.28rem;
                    color: #49c98b;
                    padding: 0.4rem 0 0.22rem 0.26rem;
                    text-align: right;
                }
                .name {
                    min-height: 0.3rem;
                    font-size: 0.3rem;
                    color: #333333;
                    padding: 0.3rem 0;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    display: block;
                    .customer {
                        color: #666
                    }

                }

                .total{
                    padding: 0.2rem 0;
                    .account-top{
                        margin-top: 0.3rem;
                    }
                    .account{
                        font-size: 0.24rem;
                        color: #666;
                    }
                    .account-number{
                        color: #333;
                        font-size: 0.28rem;
                        text-align: right;
                    }
                }

                .money-btn{
                    float: right;
                    padding: 0.3rem 0;
                    text-align: right;
                    .btn{
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
    }

</style>