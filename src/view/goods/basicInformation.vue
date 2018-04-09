<template>
    <div class="page-content">
        <mt-header fixed  title="消费记录">
            <router-link :to="{ name: 'client_detail', params: { id: 1 }}" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <mt-button slot="right" style="font-size: 0.32rem">确认入库</mt-button>
        </mt-header>
        <!--消费记录列表-->
        <div class="">
            <div class="main-list" @click="goList">
                <p class="clearfix">姓名
                    <span class="name">马云<img class="right-icon" src="../../assets/index/gray-right-icon.png"/></span>
                </p>
            </div>

            <div class="main-list">
                <p class="clearfix">司机姓名<input type="text" v-model="driverName"></p>
                <p class="clearfix">司机电话<input type="text" v-model="driverPhone"></p>
            </div>

            <div class="main-list">
                <p class="clearfix">公司<input type="text" v-model="company"></p>
                <p class="clearfix">地址<input type="text" v-model="address"></p>
            </div>

            <div class="main-list">
                <p class="clearfix">车牌号<input type="text" v-model="numberPlate"></p>
                <p class="clearfix">发货地点<input type="text" v-model="deliveryPlace"></p>
            </div>

            <div class="main-list">
                <p class="clearfix">产地<input type="text" v-model="origin"></p>
                <p class="clearfix">产地证明
                    <input type="text" v-model="certificateOrigin">
                </p>
                <p class="clearfix">检验证明<input type="text" v-model="testCertificate"></p>
                <p class="clearfix">承运合同<input type="text" v-model="contractCarriage"></p>
            </div>

            <div class="main-list">
                <p class="clearfix">备注</p>
                <div class="remark">
                    <textarea name="" id="" cols="30" rows="3" placeholder="备注信息" v-model="message"></textarea>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import searchBox from '@/components/searchBox/search'
    export default {
        components: { searchBox },
        data () {
            return {
                name:'小马云',
                driverName:'东东强',
                driverPhone:'18236911783',
                company:'阿里巴巴',
                address:'北京市海淀区魏公村',
                numberPlate:'京A666666',
                deliveryPlace:'阿富汗石油广场',
                origin:'北京',
                certificateOrigin:'已经上传',
                testCertificate:'已经上传',
                contractCarriage:'已经上传',
                message:'我是备注信息',
                nameWrite:'',
                namehas:true,

            }
        },
        mounted () {

        },
        methods: {
            //跳转到货主列表
            goList(){
                this.$router.push({
                    name:'ownerList'
                })
            },

            //跳转到订单详情
            orderDetail(id){
                this.$router.push({
                    name: 'orderList/orderDetail',
                    params: {
                        id:id
                    }
                });
            }

        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    i{
        font-style: normal;
    }
    .main-list{
        background: #fff;
        margin-top: 0.2rem;
        padding: 0 0.2rem;
        color: #333;
        font-size: 0.28rem;
        line-height: 0.98rem;
        >p{
            border-top: 1px #f0f0f0 solid;
            .name{
                float: right;
            }
            .right-icon {
                width: 0.18rem;
                padding-top: 0.3294rem;
                padding-left: 0.24rem;
            }
            >input{
                float: right;
                color: #4c4c4c;
                text-align: right;
                line-height: 0.98rem;
            }
        }
        >p:nth-child(1){
            border:none;
        }
        .remark{
            color: #666;
            padding-bottom: 0.8rem;
            textarea{
                border: none;
                width: 100%;
                font-size: 0.26rem;
                color:#4c4c4c;
            }
        }
    }



</style>