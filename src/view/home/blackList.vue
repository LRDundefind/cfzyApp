<template>
    <div class="page-content">
        <mt-header fixed title="平台黑名单">
            <mt-button icon="back" @click="goMy()" slot="left"></mt-button>
        </mt-header>
        <search-box @getSmeage="searchBlack" :message='placeMessage' ref="search"/>

        <div class="page-main page-loadmore-wrapper topScroll" >
            <noDate v-if="noWdata"></noDate>
            <mt-loadmore
                    v-else
                    :auto-fill="false"
                    :top-method="loadTop"
                    :bottom-method="loadBottom"
                    :bottom-all-loaded="allLoaded"
                     :bottomDistance= 50
                    ref="loadmore">
                <!--<noDate v-if="noWdata"></noDate-->

                <div v-for="item in listStore" :key='item.cid' class="main-list" @click="goDetail(item.cid)">
                    <ul class="ub">
                        <li class="ub-f1" style="padding-top: 0.3rem">
                            <img class="black-img" v-show="item.headImg!=''" :src="imgpath+item.headImg">
                            <img class="black-img" v-show="item.headImg==''" src="../../assets/my/my_head.png" alt="">
                        </li>
                        <li class="ub-f2">
                            <div class="name">{{item.cusName}}</div>
                            <div class="reason">拉黑原因：{{item.blockingReason}}</div>
                        </li>
                        <li class="ub-f3 ub ub-pe">
                            <div>
                                <div class="date">{{item.createTime}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div v-if="allLoaded" class="m-t-10" style="text-align:center;font-size: 0.18rem;display: none">没有更多数据了</div>
            </mt-loadmore>


        </div>
    </div>
</template>

<script>
    import searchBox from '@/components/searchBox/search'
    import {home} from '@/services/apis/home.api'
    import {Loadmore, Indicator,Toast} from 'mint-ui'
    import noDate from '@/components/noData/noDate'

    export default {
        data () {
            return {
                placeMessage: '请输入客户名称、电话或身份证号',
                msg: '',
                black: '',
                allLoaded: false,
                wrapperHeight: 0,//容器高度
                noData: false,
                params: {
                    current_page: 1,
                    page_size: 10,
                    search:''
                },
                listStore: [],
                listdata:null,
                imgpath: process.env.BASE_PATH,
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
            //跳转到平台黑名单
            goMy(){
                if (this.black == 'nostall') {
                    this.$router.push({name: 'noStalls'})
                } else {
                    this.$router.push({name: 'home'});
                }
            },
            //搜索功能
                searchBlack(msg){
                    this.params.search=msg;
                    this.listStore = [];
                    this.params.current_page = 1;
                    this.noWdata = false;
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
            //获取平台黑名单列表
            getList(){
                home.blacklist(this.params).then(response => {
                    this.listdata = response.data.results;
                    if(this.listdata==''&& this.params.current_page == 1){
                        this.noWdata=true;
                    }
                    app.Cwaiting();
                    if(this.listdata.length==this.params.page_size){
                        //判断是否应该加载下一页
                        this.params.current_page+=1 ;
                    }else{
                        //禁用上拉加载
                        this.allLoaded = true;
                    }
                    if (this.listdata) {
                        this.listStore.push(...this.listdata)

                    }
                    if(this.listStore==''){
                        this.noWdata=true;
                        app.Cwaiting();
                    }
                     this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
                    Indicator.close();
                })
            },
            //跳转到黑名单详情
            goDetail(cid){
                if (this.black == 'nostall') {
                    Toast({
                        message: '当前档位未上班！',
                        position: 'middle',
                        duration: 5000
                    });
                }else {
                    this.$router.push({name: 'client_detail', params: {ids: cid, come: 'black'}});
                }
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
        height: 1.66rem;
        .heade {
            font-size: 0.4rem;
            border-bottom: 1px #f0f0f0 solid;
        }
        h3 {
            font-size: 0.4rem;

            line-height: 0.8rem;
        }
        ul {

            li {
                font-size: 0.3rem;
                .black-img {
                    width: 1.06rem;
                    height: 1.06rem;
                    border-radius: 50%;
                }
                .name {
                    min-height: 0.3rem;
                    font-size: 0.3rem;
                    color: #333333;
                    padding: 0.4rem 0 0.22rem 0.26rem;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    display: block;
                }
                .reason {
                    font-size: 0.24rem;
                    color: #808080;
                    padding-left: 0.26rem;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    display: block;
                    width: 5rem;
                }
                .date {
                    font-size: 0.22rem;
                    color: #808080;
                    padding-top: 0.46rem;
                }

            }
        }
    }

</style>