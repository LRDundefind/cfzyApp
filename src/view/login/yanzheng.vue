<template>

    <div class="login">
             <mt-header fixed title="验证码">
                <router-link to="/login" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
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
 import { login } from '@/services/apis/login'
  import Cookies from 'js-cookie'
const TIME_COUNT = 60;
export default {
    name: 'login',
    data () {
        return {
          logintime:this.$route.params.firstlogin,
          phoneNumber:this.$route.params.phone,
          form:{},
          phoneNumber1:'',
          phoneNumber2:'',
          phoneNumber3:'',
          phoneNumber4:'',
          show: false,
          count: '',
          timer: null,
          auth:{
                    key:"MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJRqAC45zJt7CFWUuRQgA+mm", //加密的key
                    randomKey:'' //生成签名的key
                },
        }
    },
    mounted () {

    },
    created() {
        this.getmessage();
        this.daojishi();

        },
    methods: {
        getmessage(){
            if(this.logintime=='Y'){
                this.verCodeName='Register'
            }
            else{
                this.verCodeName='Forget'
            }
            let params = this.form;
            this.form.phone = this.phoneNumber;
            this.form.verCodeName = this.verCodeName;
            // 获取短信验证码
            params = {
                    'str': strEnc(JSON.stringify(this.form),this.auth.key,this.auth.key,this.auth.key)
                    };
            login.getmessname(params).then(response=>{
                  
            })
        },
        getphoneNumber(){
            // 重新获取短信验证码
            this.phoneNumber1='';
            this.phoneNumber2='';
            this.phoneNumber3='';
            this.phoneNumber4='';
            this.getmessage();
        },
       loginBtn(){
        //    确定按钮进行验证
           if(this.phoneNumber4==''){
               Toast({
                    message: '请输入完整验证码',
                    position: 'middle',
                    duration: 5000
                    });
           }
           else{
               let yanNumber=this.phoneNumber1+this.phoneNumber2+this.phoneNumber3+this.phoneNumber4;
               
                if(this.logintime=='Y'){
                    // 注册
                    this.zhuce(yanNumber);
                }
                else{
                    // 修改密码
                    this.change(yanNumber);
                }
                
                
           }
           
       },
       zhuce(yanzhengma){
            let datalist = {
                userName:Cookies.get('Zname'),
                phone:Cookies.get('Zphone'),
                password:Cookies.get('Zpassword'),
                verCode:yanzhengma
            };
            let params = {
                'str': strEnc(JSON.stringify(datalist),this.auth.key,this.auth.key,this.auth.key)
                };
            login.zhuce(params).then(response=>{
                    Cookies.remove('Zname');
                    Cookies.remove('Zphone');
                    Cookies.remove('Zpassword');
                  if(response.data.error_code=='200'){
                      this.$router.push({name:'login'});
                  }
                  else{
                      this.$router.push({name:'zhuce'});
                  }
            })
       },
       change(yanzhengma){
            let datalist = {
                password:Cookies.get('Fpassword'),
                phone:Cookies.get('Fphone'),
                verCode:yanzhengma
            };
            let params = {
                'str': strEnc(JSON.stringify(datalist),this.auth.key,this.auth.key,this.auth.key)
                };
            login.findpass(params).then(response=>{
                    Cookies.remove('Fpassword');
                    Cookies.remove('Fphone');
                  if(response.data.error_code=='200'){
                      this.$router.push({name:'login'});
                  }
                  else{
                      this.$router.push({name:'forget'});
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


