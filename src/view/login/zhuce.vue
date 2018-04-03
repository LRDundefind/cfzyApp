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
                    <input v-model="passWord" placeholder="请输入密码" :type="passwordtype"   class="passIcon ">
                    <span class="passIconBgEYE" @click="changeType"></span>
				</div>

				<div  @click="loginBtn" class="loginbtn">注 册</div>
                <div class="goxieyi">
                    <p>点击上面的“注册”按钮，既表示你同意</p>
                    <router-link :to="{ name: 'xieyi', params: { userId: 123 }}"  >程丰智运档主服务使用协议</router-link>
                </div>
            </div>
        
    </div>

</template>
<style scoped lang='scss'>
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
         background-image: url(../../assets/login/zhuce_mima_icon@2x.png);
         background-position: center center;
    }
    .phonePre{
        position: absolute;
        width: 0.5rem;
        z-index: 100;
        left: 4.8em;
        top: 0.32rem;
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
export default {
    name: 'login',
    data () {
        return {
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
               this.passwordtype='text';
           }
           else{
               this.passwordtype='password';
           }
           
       },
       loginBtn(){

       }
    }
}
</script>


