<template>
    <div class="">
        <mt-header fixed title="货品损坏">
            <router-link to="/" slot="left">
                <mt-button @click="$router.go(-1)" icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-main">
            <div class="information">
                <span>2018-03-20</span>
                <span>李小</span>
                <span>车次89</span>
            </div>
            <div v-for="n in 5" :key='n' class="main-list">
                <!--<div class="ub ub-ac heade">-->
                    <!--<div class='ub-f1 ut-s'>设置</div>-->
                <!--</div>-->
                <div class="" @click="goRecord">
                    <div class="ub ub-pj type">
                        <div class="ub-f1 category"><span>大白菜{{n}}类（公斤）</span></div>
                        <div class="ub-f1 number"><span class="count">数量</span> <span>20{{n}}</span></div>
                    </div>
                    <div class="ub ub-pj reason">
                        <div class="ub-f1"><span>货品损坏原因</span></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="login_cont">
            <div @click="goRecord" class="loginbtn">记录货品损坏</div>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        mounted () {

        },
        methods: {
            getList(){},
            goRecord(){
                this.$router.push({name:'damageRecord'});
            }

        }
    }
</script>
<style scoped lang="scss">
    .information{
        font-size: 0.28rem;
        color: #4c4c4c;
        padding: 0.32rem;
        background-color: #fff;
        margin: 0.2rem 0;
        line-height: 0.34rem;
        span{
            padding-right: 0.1rem;
        }
    }

    .main-list{
        background: #fff;
        padding: 0.32rem 0.32rem 0 0.32rem;
        color: #666;
        font-size: 0.28rem;
        .type{
            .category{
                color: #333333;
            }
            .number{
                text-align: right;
                .count{
                    font-size: 0.24rem;
                    padding-right: 0.1rem;
                }
            }
        }
        .reason{
            font-size: 0.24rem;
            padding: 0.34rem 0 0.32rem 0;
            border-bottom: 1px #f0f0f0 solid;
        }
    }
    .login_cont{
        width: 5.5rem;
        margin: 0 auto;
    }
    .loginbtn{
        width: 80% !important;
        @include login_btn(fixed);
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
        margin: 0!important;
    }

</style>