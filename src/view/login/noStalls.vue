<template>
    <div class="main">
        <mt-header fixed title="首页" style="z-index:400;">
            <div class=" personal" slot="right">
                <img @click="goMy" src="../../assets/my/my_head.png"/>
            </div>
        </mt-header>

        <div class="">
            <!-- <div class="home">
                <span class="black-title">黑名单</span>
                <img @click="goBlack" class="p-re" src="../../assets/index/black_img.png"/>
            </div> -->

            <div class="stalls">
                <div>
                    <img @click="getlist" class="stalls_pic" src="../../assets/index/no_Stalls.png"/>
                </div>
                <div class="word">您还没有关联档位</div>
                <div class="word">请联系档位管理员</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { login } from '@/services/apis/login'
    import Cookies from 'js-cookie'
    import { MessageBox } from 'mint-ui';

    export default {
        data () {
            return {
                storageData: {
                    trainNum: '1',//当日入库量
                    order_quantity: '1',//当日下单量
                    deposit: '1',//暂存订单量
                }
            }
        },
        created () {
            if (typeof Cookies.get('Token') == 'undefined') {
                this.$router.push({name: 'login'});
            }
        },
        mounted () {

        },
        methods: {
            getlist(){
                MessageBox({
                  title: '提示',
                  message: '请关联档位后重新登录',
                  //showCancelButton: true
                });
                // let params = {};
                // login.stalls(params).then(response => {

                //     if(response.data.results == ''){

                //     }else {
                //         let gidOwnID_list=JSON.stringify(response.data.results[0]);
                //         Cookies.set('gidOwnID_lists', gidOwnID_list);                 //档位信息集合
                //         this.$router.push({name:'home'});
                //     }
                // })
            },
            //跳转到黑名单
            goBlack(){
                this.$router.push({name: 'blackList',params:{black:'nostall'}});
            },
            //跳转到个人中心
            goMy(){
                this.$router.push({name: 'my',params:{black:'nostall'}});
            },

        }
    }
</script>
<style scoped lang="scss">
    .personal {
        width: 0.68rem;
        padding-left: 50%;
    }

    .home {
        padding: 1.22rem 0.3rem 0.32rem;
        background-color: #ffffff;
        .black-title {
            top: 1.6rem;
            left: 0.75rem;
            color: #424248;
            font-size: 0.3rem;
            position: absolute;
            z-index: 100;
        }
    }

    .stalls{
        padding-top: 2rem;
        text-align: center;
        height: calc(100vh - 2rem);
        background-color: white;
        .stalls_pic{
            width: 4.18rem;
            padding: 1.22rem 0 0.42rem;
        }
        .word{
            font-size: 0.26rem;
            color: #4c4c4c;
            line-height: 2;
        }
    }


</style>