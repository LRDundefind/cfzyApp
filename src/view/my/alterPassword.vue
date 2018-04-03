<template>

    <div class="alterPassword">

        <mt-header fixed title="修改密码">
            <router-link to="/login" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <!-- <mt-button icon="more" slot="right"></mt-button> -->
        </mt-header>

        <div class="login_cont p-t-20">
            <div class="bg1">
                <span class="usericonBg"></span>
                <input v-model="oldPassword" placeholder="旧密码" class="usericon ">
            </div>

            <div class="bg3">
                <span class="usericonBg"></span>
                <input v-model="newPassword" placeholder="新密码" class="usericonPhone">
            </div>

            <div class="bg2">
                <span class="passIconBg"></span>
                <input v-model="confirmPassword" placeholder="确认密码" type="password"  class="passIcon ">
            </div>

            <div class="loginbtn">更改登录密码</div>
        </div>

    </div>

</template>
<style scoped lang='scss'>

    .login_cont{
        @include login_cont;
    }
    .bg1,.bg2,.bg3{
        position: relative;
    }
    .bg1 .usericonBg{
        @include login_input_icon;
        background-image: url(../../assets/login/dl_mima_icon.png);
    }
    .bg3 .usericonBg{
        @include login_input_icon;
        background-image: url(../../assets/login/dl_mima_icon.png);
    }
    .bg2 .passIconBg{
        @include login_input_icon;
        background-image: url(../../assets/login/dl_mima_icon.png);
    }

    .usericon,.passIcon{
        @include login_input;
    }
    .usericonPhone{
        @include login_input;
    }
    .loginbtn{
        @include login_btn;
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
    }
</style>
<script>
    export default {
        name: 'login',
        data () {
            return {
                oldPassword:'',
                newPassword:'',
                confirmPassword:''
            }
        },
        mounted () {

        },
        methods: {

        }
    }
</script>


