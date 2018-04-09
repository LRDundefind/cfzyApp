<template>
    <div class="page-content">
        <mt-header fixed title="货 主">
            <router-link to="/" slot="left">
                <mt-button @click="$router.go(-1)" icon="back"></mt-button>
            </router-link>
        </mt-header>

        <div class="page-main">
            <search-box ref="search"/>
            <div v-for="n in 20" :key='n' class="main-list">
                <h3>小马{{n}}号</h3>
                <ul class="clearfix">
                    <li class="f-l">未结算车次 <span>{{n}}</span></li>
                    <li class="f-l">发货总数 <span>8</span></li>
                    <li class="f-l">交易总金额 <span>￥1000</span></li>
                    <li class="f-l">待汇款 <span>￥200</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import searchBox from '@/components/searchBox/search'
    export default {
        components: {searchBox},
        data () {
            return {
                //searchValue:this.$refs.search.searchValue
            }
        },
        mounted () {

        },
        methods: {}
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