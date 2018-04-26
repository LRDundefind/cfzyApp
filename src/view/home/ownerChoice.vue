<template>
    <div class="page-content" id="client_detail">
        <mt-header fixed title="档位选择">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="page-main">
            <div v-for="item in ownerList" :key='item.gid' class="main-list">
                <div @click="handleCommand(item)">
                    <div class="stall ub">
                        <div class="ub-f1">{{item.gearName}}</div>
                        <div class="ub-f1 userName">{{item.userName}} <span class="place">&nbsp(档主)</span></div>
                    </div>
                    <div class="place"> <span>{{item.position}}</span> <span v-show="item.position != ''">—</span> {{item.markName}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import {home} from '@/services/apis/home.api'

    export default {
        name: 'client_detail',
        data () {
            return {
                ownerList: [],
            }
        },
        mounted () {
            this.getList();
        },
        methods: {
            getList(){
                let params = {};
                home.gearList(params).then(response => {
                    this.ownerList = response.data.results;
//                    console.log(response.data.results);
                })

            },
            goChange(n){
                this.$router.push({name: 'index_change', params: {id: n}});
            },
            //档位切换
            handleCommand(command){
                var temp = command;
                var s = JSON.parse(Cookies.get('gidOwnID_lists'));
                var number = null;
                s.forEach(function (value,index) {
                    if (value.gid == command.gid) {
                        number = index;
                    }
                });
                s.splice(number, 1);
                s.unshift(temp);

                let gidOwnID_lists = JSON.stringify(s);
                Cookies.set('gidOwnID_lists', gidOwnID_lists);
                this.$router.push({name: 'home'});
            },

        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">

    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.3rem;
        .stall {
            font-size: 0.3rem;
            color: #333333;
            padding: 0.02rem 0 0.28rem 0;
            min-height: 0.4rem;
            .userName{
                text-align: right;
            }
        }
        .place {
            font-size: 0.26rem;
            color: #666666;
            padding-bottom: 0.02rem;
        }
    }


</style>