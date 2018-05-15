<template>
    <div class="page-content" id="client_detail">
        <mt-header fixed title="档位选择">
            <mt-button icon="back" @click="goBack()" slot="left"></mt-button>
        </mt-header>
        <div class="page-main page-loadmore-wrappe topScroll">
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
                Cookies.set('gidOwnID_lists', temp);
                //清除下单页面相关cookies
                Cookies.remove('trainTid');
	        	Cookies.remove('trainsNum');
	        	Cookies.remove('plateNum');
	        	Cookies.remove('customerName'); 
	        	Cookies.remove('customerId');
                window.history.go(-1);
//              this.$router.push({name: 'home'});
            },

        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .topScroll{
        top: 0.8rem;
        bottom: 0.2rem;
    }
    .page-loadmore-wrappe{
        overflow: auto;
        -webkit-overflow-scrolling : touch;
    }

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