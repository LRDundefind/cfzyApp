<template>
    <div class="page-content">
        <mt-header fixed title="货品信息">
            <router-link to="/" slot="left">
                <mt-button @click="$router.go(-1)" icon="back"></mt-button>
            </router-link>
        </mt-header>
        <!--还款记录列表-->
        <div class="page-main">
            <div class="main-list">
                <p class="clearfix">大白菜类
                    <span><img class="right-icon" src="../../assets/index/gray-right-icon.png"/></span>
                    <span>大白菜A类</span>
                </p>
            </div>

            <div class="main-list">
                <p class="clearfix">数量
                    <input type="text" v-model="number">
                </p>

                <p class="clearfix">入库单位
                    <span><img class="right-icon" src="../../assets/index/gray-right-icon.png"/></span>
                    <span>公斤</span>
                </p>
            </div>

        </div>
    </div>
</template>

<script>

    export default {

        data () {
            return {
                number:'1000',
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
        padding: 0 0.3rem;
        color: #333;
        font-size: 0.28rem;
        line-height: 0.98rem;
        > p {
            border-bottom: 1px #f0f0f0 solid;

            >input{
                float: right;
                color: #4c4c4c;
                text-align: right;
                line-height: 0.98rem;
            }
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