<template>
    <div class="page-content" id="client_detail">
        <mt-header fixed title="档位选择">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-main">
            <div v-for="n in 20" :key='n' class="main-list">
                <div class="stall">档位{{n}}</div>
                <div class="place">广东市-广东市-白云山农产品综合批发市场{{n}}</div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'client_detail',
        data () {
            return {
                value: ''
            }
        },
        mounted () {

        },
        methods: {
            getList(){
            },
            goChange(n){
                this.$router.push({name: 'index_change', params: {id: n}});
            },
            //跳转到消费记录（同订单列表）
//            consumptionRecords(id){
//                this.$router.push({
//                    name: 'earning/orderList',
//                    params: {
//                        id:id
//                    }
//                });
//            }
        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">

    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.3rem;
        .stall{
            font-size: 0.3rem;
            color: #333333;
            padding: 0.02rem 0 0.28rem 0;
        }
        .place{
            font-size: 0.26rem;
            color: #666666;
            padding-bottom:0.02rem;
        }
    }


</style>