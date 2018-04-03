<template>
    
    <div class="login">

            <mt-header fixed>
                <router-link to="/login" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
                <!-- <mt-button icon="more" slot="right"></mt-button> -->
            </mt-header>

            <div class="login_cont">
               <div class="bg1">
					<span class="usericonBg"></span>
					<input v-model="phoneNumber" placeholder="新密码" class="usericon ">
				</div>

                <div class="bg1">
					<span class="usericonBg"></span>
					<input v-model="phoneNumber" placeholder="确认新密码" class="usericon ">
				</div>

				<div  @click="loginBtn" class="findbtn">更改登录密码</div>
                
            </div>

            
        
    </div>

</template>
<style scoped lang='scss'>
    .login_cont{
        width: 80%;
        margin: 0 auto;
        position: relative;
        top: 2rem;
    }
    .bg1{
		position: relative;
	}
	.bg1 .usericonBg{
		position: absolute;
		width: 0.5rem;
		height: 0.5rem;
		z-index: 100;
		left: 0.5em;
		top: 0.3rem;
		background: url(../../assets/login/dl_yonghuming_icon.png) no-repeat;
	}
    .usericon{
		display: block;
		width: 100%;
		height: 1rem;
		box-sizing: border-box;
		padding-left: 1.25rem;
		border: 1px solid #dfdddf;
        margin-bottom: 0.35rem;
        border-radius: 2em;
        font-size: 0.25rem;
    }
    .findbtn{
		width: 80%;
		height: 1rem;
        line-height: 1rem;
        border-radius: 2em;
        font-size: 0.35rem;
        text-align: center;
        color: #fff;
        background: url(../../assets/kehu_gengxinziliao_btn@2x.png) no-repeat;
        background-size: 100% 100%;
         position: fixed;
         bottom: 0.5rem;
    }
</style>
<script>
export default {
    name: 'login',
    data () {
        return {
          userName:'',
          passWord:'',
          phone:''
        }
    },
    mounted () {

    },
    methods: {
       loginBtn(){

       }
    }
}
</script>


