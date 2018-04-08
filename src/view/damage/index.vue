<template>
    <div class="page-content">
        <mt-header fixed title="货品损坏">
            <router-link to="/zhuce" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-main">
            <div v-for="n in 20" :key='n' class="main-list">
                <div class="ub clearfix">
                    <div class="ub-f5">
                        <div>
                            <span class="information">2018-03-{{n}}</span>
                            <span class="information">张雄</span>
                            <span class="information">车次56</span>
                        </div>
                        <div class="date">
                            <span class="time">到达时间</span>
                            <span class="time">16:40</span>
                        </div>
                    </div>
                    <div class="ub-f1">
                        <img class="right-icon" src="../../assets/index/gray-right-icon.png"/>
                    </div>
                </div>
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
        methods: {
            getList(){
            },
            goDetail(n){
                this.$router.push({name: 'client_detail', params: {id: n}});
            }

        }
    }
</script>
<style scoped lang="scss">
    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.3rem;
        color: #333;
        font-size: 0.3rem;
        .date{
            padding-top: 0.28rem;
            .time{
                font-size: 0.24rem;
                color: #666666;
                padding-top: 0.28rem;
            }
        }

        .right-icon {
            float: right;
            width: 0.18rem;
            padding-top: 0.3494rem;
        }
    }

</style>