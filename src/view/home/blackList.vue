<template>
    <div class="page-content">
        <mt-header fixed  title="平台黑名单">
            <router-link to="/zhuce" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>
        <search-box ref="search"/>
        <div class="page-main">
            <div v-for="n in 20" :key='n' class="main-list" @click="goDetail(10)">
                <ul class="ub">
                    <li class="ub-f1">
                        <img class="black-img" src="../../assets/index/shouye_touxiang_img@2x.png"/>
                    </li>
                    <li class="ub-f5">
                        <div class="name">宇文护</div>
                        <div class="reason">加入黑名单理由或详细情况，欠款</div>
                    </li>
                    <li class="ub-f2 ub ub-pe">
                        <div>
                            <div class="date">2017-04-27</div>
                        </div>
                    </li>
                </ul>
                
            </div>
        </div>
    </div>
</template>

<script>
    import searchBox from '@/components/searchBox/search'
    export default {
        data () {
            return {

            }
        },
        components:{
            searchBox
        },
        mounted () {

        },
        methods: {
            getList(){},
            goDetail(n){
                this.$router.push({name:'client_detail',params: { id: n }});
            }

        }
    }
</script>
<style scoped lang="scss">
    .im{
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        overflow: hidden;
        background-image: url(../../assets/kehu_gengxinziliao_btn@2x.png)
    }
    .main-list{
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.3rem;
        color: #333;
        .heade{
            font-size: 0.4rem;
            border-bottom: 1px #f0f0f0 solid;
        }
        h3{
            font-size: 0.4rem;

            line-height: 0.8rem;
        }
        ul{

            li{
                font-size: 0.3rem;
                .black-img{
                    width: 1.06rem;
                }
                .name{
                    font-size: 0.3rem;
                    color: #333333;
                    padding: 0 0 0.15rem 0.22rem;
                }
                .reason{
                    font-size: 0.22rem;
                    color: #808080;
                    padding-left: 0.22rem;
                }
                .date{
                    font-size: 0.22rem;
                    color:#808080;
                    padding-top: 0.16rem;
                }

            }
        }
    }

</style>