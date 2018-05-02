<template>
    
    <div class="login">

            <mt-header fixed title="注 册">
                <router-link to="/login" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
                <!-- <mt-button icon="more" slot="right"></mt-button> -->
            </mt-header>

            <div class="login_header">
                <img src="../../assets/logo.png" alt="">
                <h2>上传头像</h2>
            </div>

            <div class="login_cont">
               <div class="bg1">
					<span class="usericonBg"></span>
					<input v-model="userName" placeholder="请输入您的姓名" class="usericon ">
				</div>

				<div class="bg3">
					<span class="usericonBg"></span>
                    <span class="phonePre">+86</span>
					<input v-model="phone" placeholder="请输入手机号" class="usericonPhone">
				</div>

				<div class="bg2">
					<span class="passIconBg"></span>
                    <input v-model="passWord" placeholder="请输入密码" :type="passwordtype" maxlength="16"  class="passIcon ">
                    <span class="passIconBgEYE"  v-bind:class="[ isActive ? 'hui' : 'green']" @click="changeType"></span>
				</div>

				<div  @click="loginBtn" class="loginbtn">注 册</div>
                <div class="goxieyi">
                    <p>点击上面的“注册”按钮，既表示你同意</p>
                    <a @click="showserver = true">程丰智运档主服务使用协议</a>
                    <!-- <router-link :to="{ name: 'xieyi', params: { userId: 123 }}"  ></router-link> -->
                </div>
            </div>
            <div class="xieyi" v-show="showserver">
                     <mt-header fixed title="服务协议">
                            <mt-button icon="back"  slot="left" @click="showserver = false"></mt-button>
                    </mt-header>
                     <div class="xieyi_cont">
                        {{message}}
                    </div>
            </div>
    </div>

</template>
<style scoped lang='scss'>
 .hui{
         background-image: url(../../assets/login/zhuce_mima_icon@2x.png);
    }
    .green{
         background-image: url(../../assets/login/zhuce_mima_green_icon@2x.png);
    }
    .xieyi{
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: 200;
        left: 0;
        top: 0;
        background: #fff;
    }
    .xieyitit{
        text-align: center;
        font-size: 0.2rem;
        color: #4c4c4c;
        line-height: 0.4rem;
    }
    .xieyi_cont{
       font-size: $fons_size_26;
       padding: 0.2rem;
       position: relative;
       top: 0.8rem;
       line-height: 0.48rem;
       color: #4c4c4c;
   }

    .login_header{
        width: 2rem;
        padding-top: 1.5rem;
        margin: 0 auto;
         h2{
            font-size: $fons_size_26;
            padding:0.2rem 0 1rem;
            color: $main_color333;
        }
        @include textAgain_center;
    }
    .login_cont{
        @include login_cont;
    }
    .bg1,.bg2,.bg3{
		position: relative;
	}
	.bg1 .usericonBg{
		 @include login_input_icon;
		background-image: url(../../assets/login/zhuce_name_icon@2x.png);
    }
    .bg3 .usericonBg{
		 @include login_input_icon;
		background-image: url(../../assets/login/dl_yonghuming_icon.png);
	}
	.bg2 .passIconBg{
		 @include login_input_icon;
		background-image: url(../../assets/login/dl_mima_icon.png);
    }
      .passIconBgEYE{
         @include login_input_icon;
         left:4.6rem;
         background-position: center center;
    }
    .phonePre{
        position: absolute;
        width: 0.5rem;
        z-index: 100;
        left: 4.8em;
        top: 0.3rem;
        font-size: 0.26rem;
    }
    .usericon,.passIcon{
		@include login_input;
    }
    .usericonPhone{
        @include login_input(1.75rem);
    }
    .loginbtn{
        @include login_btn;
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
    }
    .goxieyi {
         font-size: 0.2rem;
         text-align: $main_textCenter;
         color: $main_color999999;
        p{
            padding-bottom: 0.2rem;
        }
         a{
             color: $main_color;
             display: block;
         }
        }
</style>
<script>
 import Cookies from 'js-cookie'
  import { Toast } from 'mint-ui';
export default {
    name: 'login',
    data () {
        return {
            isActive:true,
          showserver:false,
          message:'<router-link> 组件支持用户在具有路由功能的应用中（点击）导航。 通过 to 属性指定目标地址，默认渲染成带有正确链接的 <a> 标签，可以通过配置 tag 属性生成别的标签.。另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名。',
          userName:'',
          passWord:'',
          phone:'',
          passwordtype:'password'
        }
    },
    mounted () {

    },
    methods: {
        changeType(){
           if(this.passwordtype=='password'){
               this.isActive=false;
               this.passwordtype='text';
           }
           else{
                this.isActive=true;
               this.passwordtype='password';
           }
           
       },
       loginBtn(){
           if(this.userName==''){
					 Toast({
                        message: '姓名不可为空',
                        position: 'middle',
                        duration: 5000
                        });
				}
				// else if(!(new RegExp( /^1[3|4|5|7|8][0-9]{9}$/).test(this.userName))){
				// 	Toast({
                //         message: '账号输入有误',
                //         position: 'middle',
                //         duration: 5000
                //         });
                // }
                else if(this.phone==''){
					Toast({
                        message: '请输入手机号',
                        position: 'middle',
                        duration: 5000
                        });
                }
                else if(!new RegExp(/^1[3|4|5|7|8][0-9]{9}$/).test(this.phone)){
                    Toast({
                        message: '手机号格式输入有误',
                        position: 'middle',
                        duration: 5000
                        });
                }
				else if(this.passWord==''){
					Toast({
                        message: '密码不可为空',
                        position: 'middle',
                        duration: 5000
                        });
                }
                else if(!(new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/).test(this.passWord))){
					Toast({
								message: '密码格式不正确，请输入6-16位数字和字母的组合',
								position: 'middle',
                                duration: 5000
							});
				}
                else{
                     Cookies.set('Zname',this.userName);
                     Cookies.set('Zphone',this.phone);
                     Cookies.set('Zpassword', this.passWord);
                    this.$router.push({name:'yanzheng',params: { phone: this.phone,firstlogin:'Y' }});
                }
           
       }
    }
}
</script>


