<template>
    <div class="page-content">
        <mt-header fixed title="货品入库">
            <router-link :to="{ name: 'client_detail', params: { id: 1 }}" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button slot="right" style="font-size: 0.32rem">确认入库</mt-button>
        </mt-header>
        <!--还款记录列表-->
        <div class="page-main">
            <div v-for="n in 20" :key='n' class="main-list">
                <p class="clearfix">大白菜{{n}}类
                    <span><img class="right-icon" src="../../assets/index/gray-right-icon.png"/></span>
                    <span>{{n+'00'}}公斤</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>

    export default {

        data () {
            return {}
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
        padding: 0 0.3rem;
        color: #333;
        font-size: 0.28rem;
        line-height: 0.98rem;
        > p {
            > span {
                float: right;
                color: #4c4c4c;
                font-size: 0.26rem;
                text-align: right;
                line-height: 0.98rem;
                .right-icon {
                    width: 0.18rem;
                    padding-top: 0.3294rem;
                    padding-left: 0.24rem;
                }
            }
        }
    }

</style>