<template>
    <div class="page-content">
        <div class="page-main">

            <div class="b-c-f">
                <div class="top ">
                    <div class="ub ub-pc p-t-10">
                        <div class="c-f f-s-18 ">完善用户资料</div>
                        <div @click="$router.go(-1)" class="leftIcon"></div>
                    </div>
                    <div class="ub ub-pc">
                        <div>
                            <img class="header-img" src="../../assets/my/my_head.png"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-list">
                <p class="clearfix">姓名
                    <input type="text" v-model="name">
                    <!--<input type="text" v-model="nameWrite" v-else>-->
                </p>
                <p class="clearfix" @click="goPhone()">手机号<input type="text" v-model="phone" readonly></p>
            </div>

        </div>
        <div class="login_cont">
            <div @click="goLogin" class="loginbtn">保存</div>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        data () {
            return {
                name:'小马云',
                phone:'18236911784',
                company:'阿里巴巴',
                business:'',
                duty:'1111111',
                scope:'支付宝',
                publicity:'',
            }
        },
        mounted () {

        },
        methods: {
            goPhone(){
                this.$router.push({ name: 'replacePhone'})

            },
            getList(){},
            handleSave(){

            },
        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .top{
        background-image: url("../../assets/my/my_top.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .leftIcon{
            width: 0.32rem !important;
            left: 0.3rem !important;
            @include login_input_icon;
            background-image: url(../../assets/index/left_icon.png);
        }
        .header-img{
            width: 1.24rem;
            height: 1.24rem;
            padding: 0.9rem 0 1.4rem 0;
        }
    }
    .main-list{
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.2rem;
        color: #333;
        font-size: 0.28rem;
        line-height: 1rem;
        >p{
            border-top: 1px #f0f0f0 solid;
            >input{
                float: right;
                color: #4c4c4c;
                text-align: right;
                line-height: 1rem;
            }
        }
        >p:nth-child(1){
            border:none;
        }
    }
    .loginbtn{
        width: 80% !important;
        @include login_btn(fixed);
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
        margin: 0!important;
    }
    .login_cont{
        width: 5.5rem;
        margin: 0 auto;
    }
    
</style>