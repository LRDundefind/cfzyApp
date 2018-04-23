<template>
    <div class="page-content">
        <mt-header fixed title="货品损坏">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-main">
            <div v-for="item in damageData" :key='item.tid' class="main-list">
                <div class="ub clearfix" @click="goReport(item)">
                    <div class="ub-f5">
                        <div>
                            <span class="information">
                                {{item.trainsNum}}
                            </span>
                        </div>
                        <div class="date">
                            <span class="time">到达时间</span>
                            <span class="time">{{item.putStorageTime}}</span>
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
    import {damage} from '@/services/apis/damage.api'

    export default {
        data () {
            return {
                damageData:{
                    trainsNum:'',//展示车次 入库日期 货主名称 次数
                    putStorageTime:'',//入库时间
                    tid:'',
                }
            }
        },

        mounted () {
            this.trainList();
        },
        methods: {
            trainList(){
                let data = {
                    current_page: 1,
                    page_size: 10,
                };
                damage.damageList(data).then(response => {
                    this.damageData = response.data.results;
                    console.log(response.data.results);
                })
            },
            goReport(item){
                this.$router.push({name: 'damageReport',params:{tid:item.tid,trainsNum:item.trainsNum}});
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
        .information{
            min-height: 0.34rem;
        }
        span {
            padding-right: 0.1rem;
        }
        .date {
            padding-top: 0.28rem;
            .time {
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