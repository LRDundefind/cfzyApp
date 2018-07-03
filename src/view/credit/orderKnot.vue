<template>

    <div class="page-main page-loadmore-wrapper">
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
                    <li class=" ub" @click="ordersDetail(item.oid)">
                        <div class="name ub-f2">
                            <span class="order-number">订单号</span>{{item.orderNo}}
                        </div>
                        <div class="pay ub-f1">
                                <span v-show="item.status == 'status_topick'">待提货</span>
                                <span v-show="item.status == 'status_complete'">已完成</span>
                                <span v-show="item.status == 'status_cancel'">已取消</span>
                                <span v-show="item.status == 'status_topay'">待支付</span>
                        </div>
                    </li>
                    <li @click="ordersDetail(item.oid)">
                        <div class="customer">
                            <span class="nickName">姓名</span>
                            <span v-show="item.nickname !=''">{{item.nickname}}</span>
                            <span v-show="item.nickname =='' && item.phone ==''">临时客户</span>
                        </div>
                        <div class="sort">
                            {{item.goodName}}
                        </div>
                        <div class="money">
                            ￥{{item.salesAmount}}
                        </div>
                    </li>

                    <li class="clearfix" v-show="item.status=='status_complete'" style="border-top:1px solid #dedede">
                        <div class="money-btn ub ub-ae">
                            <div class="btn" @click="print(item.oid)">打印</div>
                        </div>
                    </li>

                    <li class="clearfix" v-show="item.status=='status_topay'" style="border-top:1px solid #dedede">
                        <div class="money-btn ub ub-ae">
                            <div class="btn1" @click="cancel(item.oid)">取消</div>
                            <div class="btn" @click="clearing(item.oid)">结算</div>
                        </div>
                    </li>

                </ul>
            </div>
            <div v-if="allLoaded" class="m-t-10" style="text-align:center;font-size: 0.18rem;display: none">
                没有更多数据了
            </div>
        </mt-loadmore>
    </div>

</template>

<script>
    import {Loadmore, Indicator, Toast, MessageBox} from 'mint-ui'
    import Cookies from 'js-cookie'
    import noDate from '@/components/noData/noDate'
    import {creditOrder} from '@/services/apis/creditOrder'

    export default {
        data () {
            return {
                msg: '',
                black: '',
                allLoaded: false,
                wrapperHeight: 0,//容器高度
                noData: false,
                params: {
                    current_page: 1,
                    page_size: 10,
                    orderType:'order_knot'
                },
                listStore: [],
                listdata: null,
                noWdata: false,

            }
        },
        components: {
            noDate,
        },
        created () {
            this.getList();
            app.Vwaiting();
        },
        mounted () {

        },

        methods: {
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
                creditOrder.getOrderList(this.params).then(response => {
                    this.listdata = response.data.results;
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
            //取消订单
            cancel(oid){
                MessageBox.confirm('您确定取消该订单吗？', '').then(() => {
                    let data = {
                        oid: oid
                    };
                    creditOrder.cancelKnot(data).then(response => {
                        if (response.data.status == 'Y') {
                            Toast({
                                message: '取消订单操作成功',
                                position: 'middle',
                                duration: 1500
                            });
                        } else {
                            Toast({
                                message: response.data.error_msg,
                                position: 'middle',
                                duration: 1000
                            });
                        }
                    });
                    this.listStore = [];
                    this.params.current_page = 1;
                    this.getList();
                    this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
                    this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
                }, () => {

                });
            },

            //跳转到结算
            clearing(oid){
                this.$router.push({
                    name: 'orderClearing',
                    params: {
                        oid:oid
                    }
                });
            },
            //跳转到订单详情
            ordersDetail(oid){
                this.$router.push({
                    name: 'ordersList/ordersDetail',
                    params: {
                        oid:oid
                    }
                });
            },
            print(oid){
                this.$router.push({name: 'print', params: {oid:oid,come:'knot'}});
            },
        },
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .page-main{
        height: calc(100vh - 150px);
        top: 100px;
        bottom: 1.1rem;
    }
    .page-loadmore-wrapper {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
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
            li:first-child {
                border-bottom: 1px solid #dedede;
            }
            li {
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
                    .order-number {
                        color: #333;
                        font-size: 0.3rem;
                        padding-right: 0.2rem;
                    }
                }
                .customer {
                    padding: 0.2rem 0;
                    color: #333;
                    .nickName {
                        font-size: 0.28rem;
                        color: #666;
                        padding-right: 0.2rem;
                    }
                }
                .sort {
                    padding: 0.2rem;
                    color: #666;
                    line-height: 1.5;
                    word-wrap:break-word;
                    word-break:keep-all;
                    overflow:hidden;
                    background-color: #f5f5f5;
                }
                .money {
                    padding: 0.2rem 0;
                    text-align: right;
                    color: #49c98b;
                    font-weight: bold;
                    font-size: 0.3rem;
                }
                .money-btn {
                    float: right;
                    padding:0.3rem 0;
                    text-align: right;
                    .btn1 {
                        font-size: 0.3rem;
                        width: 1.88rem;
                        line-height: 0.68rem;
                        text-align: center;
                        background: -webkit-linear-gradient(left, #30b03e 0%, #33d57c 100%);
                        border-radius: 1rem;
                        background: url(../../assets/kehu_chakanxiaofeijilu_btn@2x.png) no-repeat center;
                        background-size: contain;
                        color: #0f0;
                        margin-right: 0.2rem;
                    }
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
    }



</style>