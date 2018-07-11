<template>

    <div class="login">
        <mt-header fixed title="验证码">
            
                <mt-button icon="back" @click="goBack" slot="left"></mt-button>
            
            <!-- <mt-button icon="more" slot="right"></mt-button> -->
        </mt-header>

        <div class="login_header">
            <img src="../../assets/logo.png" alt="">
            <h2>已向{{phoneNumber}}发送短信验证码短信</h2>
        </div>

        <div class="login_cont">
            <div class="ub ub-pc" >
                <div class="ub-f1"><input type="text" class="number" maxlength="1" v-model="phoneNumber1"></div>
                <div class="ub-f1"><input type="text" class="number" maxlength="1" v-model="phoneNumber2"></div>
                <div class="ub-f1"><input type="text" class="number" maxlength="1" v-model="phoneNumber3"></div>
                <div class="ub-f1"><input type="text" class="number" maxlength="1" v-model="phoneNumber4"></div>
            </div>
            <div>
                <span v-show="show" @click="getphoneNumber();daojishi()"  class="getNumber">获取验证码</span>
                <span v-show="!show" class="getNumber">重新获取（{{count}}）</span>
            </div>
        </div>
        <div  @click="loginBtn" class="findbtn">确 定</div>
    </div>

</template>
<style scoped lang='scss'>
    .login_header{
        width: 2rem;
        padding-top: 1.5rem;
        margin: 0 auto;
        h2{
            font-size: $login_ftsize_18;
            padding:0.2rem 0 1rem;;
        }
        @include textAgain_center;

    }
    .login_cont{
        @include login_cont;
    }
    .find{
        font-size: 0.25rem;
        color: #666;
    }
    .getNumber{
        display: block;
        font-size: 0.2rem;
        text-align: center;
        margin: 0.8rem auto 0;
    }
    .number{
        width: 70%;
        height: 1rem;
        border: 1px solid #dfdfdf;
        text-align: center;
        font-size: 0.5rem;
        margin-left: 0.25rem;
        box-sizing: border-box;
    }
    .findbtn{
        width: 80% !important;
        @include login_btn(fixed);
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
    }
</style>
<script>
    import { Toast } from 'mint-ui';
    const TIME_COUNT = 60;
    export default {
        name: 'verification',
        data () {
            return {
                phoneNumber:'',
                phoneNumber1:'',
                phoneNumber2:'',
                phoneNumber3:'',
                phoneNumber4:'',
                show: false,
                count: '',
                timer: null
            }
        },
        mounted () {

        },
        //此获取验证码页面作废，新的获取验证码——login文件夹下面的yanzheng.vue页面
        created() {
            this.getRouterPar();
            this.daojishi();

        },
        methods: {
            getRouterPar(){
//           获取路由参数
                this.phoneNumber = this.$route.params.phone;
            },
            getphoneNumber(){

                alert(this.phoneNumber)
                this.phoneNumber1='';
                this.phoneNumber2='';
                this.phoneNumber3='';
                this.phoneNumber4='';
            },
            loginBtn(){
                if(this.phoneNumber4==''){
                    Toast({
                        message: '请输入完整验证码',
                        position: 'middle',
                        duration: 5000
                    });
                }
                else{
                    let yanNumber=this.phoneNumber1+this.phoneNumber2+this.phoneNumber3+this.phoneNumber4;
                    alert(yanNumber)

                }

            },
            // 倒计时函数
            daojishi(){
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            }
        }
    }
</script>


