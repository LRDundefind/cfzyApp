<template>
    <div class="page-content">
        <div class="page-main">
            <search-box ref="search"/>
            <div v-for="item in ownerData" :key='item.id' class="main-list">
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
        </div>
    </div>
</template>

<script>
    import searchBox from '@/components/searchBox/search'
    import {damage} from '@/services/apis/damage.api'

    export default {
        components: {searchBox},
        name:'owner',
        data () {
            return {
                ownerData: {
                    shipName: '',//货主名称
                    trainsNum: '',//进货车次总数
                    unsettlement: '',//未结算车次总数
                    tradeAmount: '',//交易总金额
                    notPayAmount: '',//待汇款总金额
                },
                blacklistParams: {
                    search: '',
                    page_size: '10',
                    current_page: '1',
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
                damage.ownerList(this.blacklistParams).then(response => {
                    this.ownerData = response.data.results;
                    console.log(this.ownerData);
                })
            },
            //选择货主
            choiceOwner(item){
                this.$emit('choiceOwner',item);
            },
        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">

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