<template>

    <div class="replacePhone">
        <mt-header fixed title="修改手机号">
            <mt-button icon="back" @click="goPersonal" slot="left"></mt-button>
        </mt-header>

        <div class="login_cont m-t-20">
            <div class="bg1">
                <span class="usericonBg"></span>
                <input v-model="phoneNumber" type="Number" placeholder="手机号" class="usericon ">
            </div>
            <div>
                <div class="text">单个手机仅可用作一个账户使用</div>
            </div>
            <div @click="loginBtn" class="findbtn">更改手机号</div>
        </div>

    </div>

</template>
<style scoped lang='scss'>
    .login_cont {
        width: 5.5rem;
        margin: 0.5rem auto;
    }

    .bg1 {
        position: relative;
    }

    .bg1 .usericonBg {
        @include login_input_icon;
        background-image: url(../../assets/login/dl_yonghuming_icon.png);
    }

    .text {
        width: 80%;
        display: block;
        font-size: 0.2rem;
        position: fixed;
        bottom: 2.5rem;
        left: 1.7rem;
    }

    .usericon {
        @include login_input;
    }

    .findbtn {
        width: 80% !important;
        @include login_btn(fixed);
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
    }
</style>
<script>
    import {Toast} from 'mint-ui';
    export default {
        name: 'replacePhone',
        data () {
            return {
                phoneNumber: '',
                selName: this.$route.params.selName,
                headImg: this.$route.params.headImg,
            }
        },
        mounted () {
            //console.log(this.selName);
            //console.log(this.headImg);
        },
        methods: {
            goPersonal(){
                this.$router.push({name: 'personDetails', params: {selName: this.selName, headImg: this.headImg}});
            },

            loginBtn(){
                if (this.phoneNumber == '') {
                    Toast({
                        message: '手机号不可为空',
                        position: 'middle',
                        duration: 5000
                    });
                }
                else if (!(new RegExp(/^1[3|4|5|7|8][0-9]{9}$/).test(this.phoneNumber))) {
                    Toast({
                        message: '手机号输入格式有误',
                        position: 'middle',
                        duration: 5000
                    });
                }
                else {
                    this.$router.push({name: 'yanzheng',
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


