<template>

    <div class="alterPassword">

        <mt-header fixed title="修改密码">
            <mt-button icon="back" @click="goBack()" slot="left"></mt-button>
        </mt-header>
        <div class="page-main page-loadmore-wrappe topScroll">

            <div class="login_cont p-t-40">
                <div class="bg1">
                    <span class="usericonBg"></span>
                    <input v-model="params.old_password" placeholder="旧密码" type="password" class="usericon ">
                </div>

                <div class="bg3">
                    <span class="usericonBg"></span>
                    <input v-model="params.password" placeholder="新密码" type="password" class="usericonPhone">
                </div>

                <div class="bg2">
                    <span class="passIconBg"></span>
                    <input v-model="params.confirmPassword" placeholder="确认密码" type="password" class="passIcon ">
                </div>

                <div @click="alterPass" class="findbtn">更改登录密码</div>

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
    .findbtn {
        width: 80% !important;
        @include login_btn(fixed);
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
    }

    .login_cont {
        @include login_cont;
    }

    .bg1, .bg2, .bg3 {
        position: relative;
    }

    .bg1 .usericonBg {
        @include login_input_icon;
        background-image: url(../../assets/login/dl_mima_icon.png);
    }

    .bg3 .usericonBg {
        @include login_input_icon;
        background-image: url(../../assets/login/dl_mima_icon.png);
    }

    .bg2 .passIconBg {
        @include login_input_icon;
        background-image: url(../../assets/login/dl_mima_icon.png);
    }

    .usericon, .passIcon {
        @include login_input;
    }

    .usericonPhone {
        @include login_input;
    }

    .loginbtn {
        @include login_btn;
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
    }
</style>
<script>
    import {Toast} from 'mint-ui';
    import {my} from '@/services/apis/my'

    export default {
        name: 'login',
        data () {
            return {
                params: {
                    old_password: '',
                    password: '',
                    confirmPassword: ''
                }

            }
        },
        mounted () {

        },
        methods: {
            alterPass(){
                if (this.params.old_password && this.params.password && this.params.confirmPassword) {
                    if (!(new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/).test(this.params.old_password))) {
                        Toast({
                            message: '旧密码格式有误',
                            position: 'middle',
                            duration: 5000
                        });
                    } else if (!(new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/).test(this.params.password))) {
                        Toast({
                            message: '新密码格式有误',
                            position: 'middle',
                            duration: 5000
                        });
                    } else if (this.params.password != this.params.confirmPassword) {
                        Toast({
                            message: '两次输入密码不一致',
                            position: 'middle',
                            duration: 5000
                        });
                    } else {
                        let data = this.params;
                        delete data.confirmPassword;
                        console.log(data);
                        my.password(data).then(response => {
                            if (response.data.status == 'Y') {
                                Toast({
                                    message: '密码修改成功',
                                    position: 'middle',
                                    duration: 5000
                                });
                                this.$router.push({name: 'my'});
                            } else if (response.data.status == 'N') {
                                Toast({
                                    message: response.data.error_msg,
                                    position: 'middle',
                                    duration: 5000
                                });
                            }
                        })
                    }
                } else {
                    Toast({
                        message: '请完善信息',
                        position: 'middle',
                        duration: 5000
                    });
                }
            },
        }
    }
</script>


