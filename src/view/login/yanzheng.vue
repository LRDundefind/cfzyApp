<template>

    <div class="login">
        <mt-header fixed title="验证码">
            <mt-button icon="back" @click="goPersonal" v-if="this.logintime == 'Info'" slot="left"></mt-button>

            <router-link to="/login" slot="left" v-else>
                <mt-button icon="back"></mt-button>
            </router-link>
            <!-- <mt-button icon="more" slot="right"></mt-button> -->
        </mt-header>

        <div class="login_header">
            <img src="../../assets/logo1.png" alt="">
        </div>
        <div class="phoneNumber">已向{{phoneNumber}}发送短信验证码短信 </div>

            <div class="login_cont">
                <!-- <div class="ub ub-pc" >
                    <div class="ub-f1"><input type="text" class="number" maxlength="1" v-Wfocus1="Jd1" v-model="phoneNumber1"></div>
                    <div class="ub-f1"><input type="text" class="number" maxlength="1" v-Wfocus2="Jd2" v-model="phoneNumber2"></div>
                    <div class="ub-f1"><input type="text" class="number" maxlength="1" v-Wfocus3="Jd3" v-model="phoneNumber3"></div>
                    <div class="ub-f1"><input type="text" class="number" maxlength="1" v-Wfocus4="Jd4" v-model="phoneNumber4"></div>
                </div> -->
                <securitycode v-model="code"></securitycode>
                <div>
                    <span v-show="show" @click="getphoneNumber();daojishi()"  class="getNumber">获取验证码</span>
         			<span v-show="!show" class="getNumber">重新获取（{{count}}）</span>
                </div>
                <!-- :class="[isActive ? 'activeClass' : 'errorClass' ]" -->
        <div @click="loginBtn" class="findbtn" >确 定</div>
    </div>
    </div>
</template>
<style scoped lang='scss'>
.activeClass{
    z-index: 1000;
}
.errorClass{
    z-index: -1;
}
    .security-code-wrap {
        overflow: hidden;
    }

  .security-code-container {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    .field-wrap {
      list-style: none;
      display: block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      background-color: #fff;
      margin: 2px;
      color: #000;
      .char-field {
        font-style: normal;
      }
    }
  }

  .input-code {
    position: absolute;
    left: -9999px;
    top: -99999px;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: visible;
    z-index: -1;
  }

    .login_header {
        width: 2rem;
        padding-top: 1.5rem;
        margin: 0 auto;
        @include textAgain_center;

    }
    .phoneNumber{
        color: #666;
        font-size: 0.26rem;
        text-align: center;
        padding: 0.52rem 0 0.84rem;
    }

    .login_cont {
        @include login_cont;
    }

    .find {
        font-size: 0.25rem;
        color: #666;
    }

    .getNumber {
        display: block;
        font-size: 0.2rem;
        text-align: center;
        margin: 0.8rem auto 0;
    }

    .number {
        width: 70%;
        height: 1rem;
        border: 1px solid #dfdfdf;
        text-align: center;
        font-size: 0.5rem;
        margin-left: 0.25rem;
        box-sizing: border-box;
    }

    .findbtn {
        @include login_btn;
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
    }
    
</style>
<script>

    import {Toast} from 'mint-ui';
    import Bus from '@/components/bus.js'
    import {login} from '@/services/apis/login'
    import Cookies from 'js-cookie'
    import securitycode from '@/view/login/mobiephone'
    const TIME_COUNT = 60;
    export default {
        name: 'login',
        components:{
            securitycode
        },
         directives:{
            Wfocus1:{
                inserted:function(el,{value}){
                    if(value){
                        el.Wfocus();
                    }
                }
            }
        },
        data () {
            return {
                code:'',
                isActive:true, //确定是够可以点击
                logintime: this.$route.params.firstlogin,
                phoneNumber: this.$route.params.phone,
                form: {},
                phoneNumber1: '',
                phoneNumber2: '',
                phoneNumber3: '',
                phoneNumber4: '',
                show: false,
                count: '',
                timer: null,
                auth: {
                    key: "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJRqAC45zJt7CFWUuRQgA+mm", //加密的key
                    randomKey: '' //生成签名的key
                },
                userName:this.$route.params.userName,
                headImg:this.$route.params.headImg,
            }
        },
        mounted () {

        },
        created() {
            this.getmessage();
            this.daojishi();

        },
        methods: {
            goPersonal(){
                this.$router.push({name: 'personDetails', params: {userName: this.userName, headImg: this.headImg}});
            },

            hideKeyboard() {
                // 输入完成隐藏键盘
                document.activeElement.blur() // ios隐藏键盘
                this.$refs.input.blur() // android隐藏键盘
            },
            handleSubmit() {
                this.$emit('input', this.value)
            },
            handleInput(e) {
                this.$refs.input.value = this.value
                if (this.value.length >= this.number) {
                this.hideKeyboard()
                }
                this.handleSubmit()
            },
            getmessage(){
                if (this.logintime == 'Y') {
                    this.verCodeName = 'Register'
                } else if (this.logintime == 'Info') {
                    this.verCodeName = 'Info'
                } else {
                    this.verCodeName = 'Forget'
                }
                let params = this.form;
                this.form.phone = this.phoneNumber;
                this.form.verCodeName = this.verCodeName;
                // 获取短信验证码
                params = {
                    'str': strEnc(JSON.stringify(this.form), this.auth.key, this.auth.key, this.auth.key)
                };
                login.getmessname(params).then(response => {
                    if (response.data.status = 'N') {
                        Toast({
                            message: response.data.error_msg,
                            position: 'middle',
                            duration: 3000
                        });
                    }
                })
            },
            getphoneNumber(){
                // 重新获取短信验证码
                // this.phoneNumber1 = '';
                // this.phoneNumber2 = '';
                // this.phoneNumber3 = '';
                // this.phoneNumber4 = '';
                this.code='';
                this.getmessage();
            },
            loginBtn(){
                //    确定按钮进行验证
                if (this.code == '') {
                    Toast({
                        message: '请输入完整验证码',
                        position: 'middle',
                        duration: 5000
                    });
                }
                else if(this.isActive){
                    // let yanNumber = this.phoneNumber1 + this.phoneNumber2 + this.phoneNumber3 + this.phoneNumber4;
                    let yanNumber=this.code;
                    this.isActive=false;
                    if (this.logintime == 'Y') {
                        // 注册
                        this.zhuce(yanNumber);
                    }
                    else if(this.logintime == 'Info'){
                        this.$router.push({name:'personDetails',params: { phone: this.phoneNumber,yanNumber:yanNumber,userName:this.userName,headImg:this.headImg }});
                    }else {
                        // 修改密码
                        this.change(yanNumber);
                    }


                }

            },
            zhuce(yanzhengma){
                let datalist = {
                    userName: Cookies.get('Zname'),
                    phone: Cookies.get('Zphone'),
                    password: Cookies.get('Zpassword'),
                    verCode: yanzhengma
                };
                let params = {
                    'str': strEnc(JSON.stringify(datalist), this.auth.key, this.auth.key, this.auth.key)
                };
                login.zhuce(params).then(response => {
                    
                    if (response.data.error_code == '200') {
                        Cookies.remove('Zname');
                        Cookies.remove('Zphone');
                        Cookies.remove('Zpassword');
                        Toast({
                            message: '注册成功',
                            position: 'middle',
                            duration: 3000
                        });
                        setTimeout(() => {
                            this.isActive=true;
                            // Bus.$emit('sendPhone', this.phoneNumber);
                            Cookies.set('loginPhone',this.phoneNumber)
                            this.$router.push({name: 'login'});
                        }, 3000)

                    }
                    else {
                        Toast({
                            message: response.data.error_msg,
                            position: 'middle',
                            duration: 3000
                        })
                        // this.code='';
                        setTimeout(() => {
                            this.isActive=true;
                            // this.$router.push({name: 'zhuce'});
                        }, 3000)


                    }
                })
            },
            change(yanzhengma){
                let datalist = {
                    password: Cookies.get('Fpassword'),
                    phone: Cookies.get('Fphone'),
                    verCode: yanzhengma
                };
                let params = {
                    'str': strEnc(JSON.stringify(datalist), this.auth.key, this.auth.key, this.auth.key)
                };
                login.findpass(params).then(response => {
                    
                    if (response.data.error_code == '200') {
                        Toast({
                            message: '修改成功，请重新登录',
                            position: 'middle',
                            duration: 3000
                        })
                        setTimeout(() => {
                            this.isActive=true;
                            Cookies.remove('Fpassword');
                            Cookies.remove('Fphone');
                            this.$router.push({name: 'login'});
                        }, 3000)


                    }
                    else {
                        Toast({
                            message: response.data.error_msg,
                            position: 'middle',
                            duration: 3000
                        })
                        Bus.$emit('clearY','')
                        // this.code='';
                        setTimeout(() => {
                            // this.$router.push({name: 'forget'});
                            this.isActive=true;
                        }, 3000)


                    }
                })
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


