<template>
    <div class="main">
        <mt-header fixed title="首页">
            <div class=" personal" @click="goMy(5)" slot="right">
                <img src="../../assets/index/shouye_touxiang_img@2x.png"/>
            </div>
        </mt-header>

        <div class="">
            <div class="home" @click="goBlack(5)">
                <span class="black-title">黑名单</span>
                <img class="p-re" src="../../assets/index/black_img.png"/>
            </div>

            <div class="stalls">
                <div>
                    <img class="stalls_pic" src="../../assets/index/no_Stalls.png"/>

                </div>
                <div class="word">您还没有关联档位</div>
                <div class="word">请联系档位管理员</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {home} from '@/services/apis/home.api'
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
        mounted () {
            this.getlist()
        },
        methods: {
            getlist(){
                let params = {}
                home.index(params).then(response => {
                    this.storageData = response.data.results;
                    console.log(response.data.results);

                })
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
        margin-top: 0.22rem;
        text-align: center;
        height: 10.4rem;
        background-color: white;
        .stalls_pic{
            width: 4.18rem;
            padding-bottom: 0.42rem;
        }
        .word{
            font-size: 0.26rem;
            color: #4c4c4c;
            line-height: 2;
        }
    }


</style>