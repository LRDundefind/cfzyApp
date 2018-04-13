<template>
    <div class="page-content">
        <mt-header fixed title="货 主">
            <router-link to="/" slot="left">
                <mt-button @click="$router.go(-1)" icon="back"></mt-button>
            </router-link>
        </mt-header>

        <div class="page-main">
            <search-box ref="search"/>
            <div v-for="item in ownerData" :key='ownerData.sid' class="main-list">
                <h3>{{item.shipName}}</h3>
                <ul class="clearfix">
                    <li class="f-l">未结算车次 <span>{{item.unsettlement}}</span></li>
                    <li class="f-l">发货总数 <span>{{item.trainsNum}}</span></li>
                    <li class="f-l">交易总金额 <span>{{item.tradeAmount}}</span></li>
                    <li class="f-l">待汇款 <span>{{item.notPayAmount}}</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import searchBox from '@/components/searchBox/search'
    import { damage } from '@/services/apis/damage.api'

    export default {
        components: {searchBox},
        data () {
            return {
                ownerData:{
                    shipName:'',//货主名称
                    trainsNum:'',//进货车次总数
                    unsettlement:'',//未结算车次总数
                    tradeAmount:'',//交易总金额
                    notPayAmount:'',//待汇款总金额
                },
                blacklistParams:{
                    search:'',
                    page_size:'10',
                    current_page:'1',
                },
                //searchValue:this.$refs.search.searchValue
            }
        },
        mounted () {
            this.getlist()
        },
        methods: {
            //初始化数据--获取货主列表
            getlist(){
                damage.ownerList(this.blacklistParams).then(response=>{
                    this.ownerData = response.data.results;
                    this.storageData = response.data.results;
                    console.log(this.ownerData);

                })
            },
        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">

    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.2rem;
        color: #333;
        h3 {
            font-size: $fons_size_30;
            color: $main_color333;
            border-bottom: $main_border;
            line-height: 0.8rem;
        }
        ul {

            li {
                width: 50%;
                font-size: $fons_size_24;
                margin-top: 0.24rem;
                color: $main_color666;
                span {
                    font-size: $fons_size_28;
                }
            }
            li:nth-child(2), li:nth-child(4) {
                text-align: right;
            }
        }
    }

</style>