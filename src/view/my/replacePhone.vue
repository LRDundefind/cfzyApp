<template>

    <div class="replacePhone">
        <mt-header fixed title="修改手机号">
            <mt-button icon="back" @click="goPersonal" slot="left"></mt-button>
        </mt-header>
        <div class="page-main page-loadmore-wrappe topScroll">
            <div class="login_cont m-t-20">
                <div class="bg1">
                    <span class="usericonBg"></span>
                    <input v-model="phoneNumber" type="Number" placeholder="手机号" class="usericon ">
                </div>
            </div>
            <div class="login_phone">
                <div class="text">单个手机仅可用作一个账户使用</div>
                <div @click="loginBtn" class="loginbtn">更改手机号</div>
            </div>


        </div>

    </div>

</template>
<style scoped lang='scss'>
    .topScroll{
        top: 0.9rem;
        bottom: 0.2rem;
    }
    .page-loadmore-wrappe{
        overflow: auto;
        -webkit-overflow-scrolling : touch;
    }
    .login_cont {
        width: 5.5rem;
        margin: 0.5rem auto;
        .loginbtn {
            @include login_btn;
            background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
            margin: 0 !important;
        }
    }

    .bg1 {
        position: relative;
    }

    .bg1 .usericonBg {
        @include login_input_icon;
        background-image: url(../../assets/login/dl_yonghuming_icon.png);
    }

    .login_phone{
        width: 5.5rem;
        margin: 8rem auto 0;
        .text {
            display: block;
            font-size: 0.2rem;
            text-align: center;
            color: #999;
            margin-bottom: 0.5rem;
        }
        .loginbtn {
            @include login_btn;
            background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
            margin: 0 !important;
        }
    }
    .usericon {
        @include login_input;
    }

</style>
<script>
    import {Toast} from 'mint-ui';
    export default {
        name: 'replacePhone',
        data () {
            return {
                phoneNumber: '',
                userName: this.$route.params.userName,
                headImg: this.$route.params.headImg,
            }
        },
        mounted () {
            //console.log(this.selName);
            //console.log(this.headImg);
        },
        methods: {
            //返回到个人中心
            goPersonal(){
                this.$router.push({name: 'personDetails', params: {userName: this.userName, headImg: this.headImg}});
            },
            //跳转到获取验证码页面
            loginBtn(){
                if (this.phoneNumber == '') {
                    Toast({
                        message: '手机号不可为空',
                        position: 'middle',
                        duration: 5000
                    });
                }
                else if (!(new RegExp(/^1[3|4|5|6|7|8|9][0-9]{9}$/).test(this.phoneNumber))) {
                    Toast({
                        message: '手机号输入格式有误',
                        position: 'middle',
                        duration: 5000
                    });
                }
                else {
                    this.$router.push({
                        name: 'yanzheng',
                        params: {
                            phone: this.phoneNumber,
                            firstlogin: 'Info',
                            selName: this.selName,
                            headImg: this.headImg
                        }
                    });
                    //调取接口

                }
            }
        }
    }
</script>


