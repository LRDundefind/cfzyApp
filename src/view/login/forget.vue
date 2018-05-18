<template>

    <div class="login">
            <mt-header fixed title="手机号">
                <router-link to="/login" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
                <!-- <mt-button icon="more" slot="right"></mt-button> -->
            </mt-header>

            <div class="login_cont">
                <div class="bg1">
					<span class="usericonBg"></span>
					<input v-model="phoneNumber" placeholder="手机号" class="usericon ">
				</div>
                <div class="bg1">
					<span class="usericonBg2"></span>
					<input type="password" v-model="passwordnew1" placeholder="新密码" class="usericon ">
				</div>
                <div class="bg1">
					<span class="usericonBg2"></span>
					<input type="password" v-model="passwordnew2" placeholder="确认新密码" class="usericon ">
				</div>
				<div  @click="loginBtn" class="findbtn">找回密码</div>
                
            </div>
        
    </div>

</template>
<style scoped lang='scss'>
    .login_cont{
        @include login_cont;
        position: relative;
        top: 2rem;
    }
    .bg1{
		position: relative;
	}
	.bg1 .usericonBg{
		@include login_input_icon;
		background-image: url(../../assets/login/dl_yonghuming_icon.png);
	}
    .bg1 .usericonBg2{
        @include login_input_icon;
        background-image: url(../../assets/login/dl_mima_icon.png);
    }
    .usericon{
		@include login_input;
    }
    .findbtn{
        // width: 80% !important;
        @include login_btn;
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
    }
</style>
<script>
 import { Toast } from 'mint-ui';
 import Cookies from 'js-cookie'
export default {
    name: 'login',
    data () {
        return {
          phoneNumber:'',
          passwordnew1:'',
          passwordnew2:''
        }
    },
    mounted () {

    },
    methods: {
       loginBtn(){
           if(this.phoneNumber==''){
					Toast({
                        message: '手机号不可为空',
                        position: 'middle',
                        duration: 5000
                        });
				}
				else if(!(new RegExp( /^1[3|4|5|6|7|8|9][0-9]{9}$/).test(this.phoneNumber))){
					Toast({
                        message: '手机号输入格式有误',
                        position: 'middle',
                        duration: 5000
                        });
				}
                else if(this.passwordnew1!=this.passwordnew2){
					Toast({
                        message: '两次输入密码不同请重新输入',
                        position: 'middle',
                        duration: 5000
                        });
                    this.passwordnew1='';
                    this.passwordnew2='';
				}
                else if(!(new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/).test(this.passwordnew1))){
					Toast({
                        message: '密码格式不正确，请输入6-16位数字和字母的组合',
                        position: 'middle',
                        duration: 5000
                        });
                    this.passwordnew1='';
                    this.passwordnew2='';
				}
                 else if(!(new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/).test(this.passwordnew2))){
					Toast({
                        message: '密码格式不正确，请输入6-16位数字和字母的组合',
                        position: 'middle',
                        duration: 5000
                        });
                    this.passwordnew1='';
                    this.passwordnew2='';
				}
				else{
                    Cookies.set('Fpassword',this.passwordnew2);
                    Cookies.set('Fphone',this.phoneNumber);
					this.$router.push({name:'yanzheng',params: { phone: this.phoneNumber,firstlogin:'N' }});
					//调取接口
					
				}
       }
    }
}
</script>


