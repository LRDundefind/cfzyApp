<template>
    <div class="page-content">
        <mt-header fixed title="平台黑名单">
            <mt-button icon="back" @click="goMy()" slot="left"></mt-button>
        </mt-header>
        <search-box @getSmeage="searchBlack" :message='placeMessage' ref="search"/>

        <div class="page-main page-loadmore-wrapper topScroll">
            <div v-for="item in listData" :key='item.cid' class="main-list" @click="goDetail(item.cid)">
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
            <noDate v-if="noWdata"></noDate>
        </div>
    </div>
</template>

<script>
    import searchBox from '@/components/searchBox/search'
    import {home} from '@/services/apis/home.api'
    import {Loadmore, Indicator} from 'mint-ui'
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
                    search: ''
                },
                listData: [],
                imgpath: process.env.BASE_PATH,
                noWdata:false,

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
            goMy(){
                if (this.black == 'nostall') {
                    this.$router.push({name: 'noStalls'})
                } else {
                    this.$router.push({name: 'home'});
                }
            },
            searchBlack(msg){
                this.params.search = msg;
                this.listData = [];
                this.getList();
            },
            getList(){
                home.blacklist(this.params).then(response => {
                    this.listData = response.data.results;
                    if(this.listData==''){
                        this.noWdata=true;
                    }
                    app.Cwaiting();
                })
            },

            goDetail(cid){
                this.$router.push({name: 'client_detail', params: {ids: cid, come: 'black'}});
            }

        }
    }
</script>
<style scoped lang="scss">
    .topScroll {
        top: 2.2rem;
        bottom: 0.3rem;
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
                }
                .name {
                    font-size: 0.3rem;
                    color: #333333;
                    padding: 0.4rem 0 0.22rem 0.26rem;
                }
                .reason {
                    font-size: 0.24rem;
                    color: #808080;
                    padding-left: 0.26rem;
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