<template>

    <div class="login">
            <div class="login_header">
                <img src="../../assets/login/logo.png" alt="">
                <h2>果蔬批发进销存系统<br>让记账对账不再难</h2>
            </div>

            <div class="login_cont">
               <div class="bg1">
					<span class="usericonBg"></span>
					<input v-model="userName" placeholder="用户名" class="usericon ">
				</div>
				
				<div class="bg2">
					<span class="passIconBg"></span>
					<input v-model="passWord" placeholder="密码" :type="passwordtype"   class="passIcon " maxlength="16">
                    <span class="passIconBgEYE" v-bind:class="[ isActive ? 'hui' : 'green']" @click="changeType"></span>
				</div>

				<div  @click="loginBtn" class="loginbtn">登 录</div>

                <div class="ub ub-pc find">
                    <div class="ub-f1"><router-link :to="{ name: 'forget'}"  >找回密码</router-link></div>
                    <div class="ub-f1" style="text-align: right;"><router-link :to="{ name: 'zhuce'}" >去注册</router-link></div>
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
            font-size: $fons_size_24;
            padding:0.2rem 0 1rem;
            color: $main_color333;
            width: 2.6rem;
            margin-left: -0.3rem;
            text-align: center;
        }
        @include textAgain_center;
    }
    .login_cont{
        @include login_cont;
    }
    .bg1,.bg2{
		position: relative;
	}
	.bg1 .usericonBg{
		@include login_input_icon;
		background-image: url(../../assets/login/dl_yonghuming_icon.png);
	}
	.bg2 .passIconBg{
	    @include login_input_icon;
		background-image: url(../../assets/login/dl_mima_icon.png);
    }
    .usericon,.passIcon{
        @include login_input;
    }
    .passIconBgEYE{
         @include login_input_icon;
         left:4.6rem;
        
         background-position: center center;
    }
    .hui{
         background-image: url(../../assets/login/zhuce_mima_icon@2x.png);
    }
    .green{
         background-image: url(../../assets/login/zhuce_mima_green_icon@2x.png);
    }
    .loginbtn{
		@include login_btn;
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
    }
    .find{
        font-size: 0.24rem;
        padding: 0 0.2rem;
        color: #666666;
        a{
            color: #666666;
        }
    }
</style>
<script>
 import { Toast } from 'mint-ui';
 import {logistics} from '@/services/apis/logistics'
  import Bus from '@/components/bus.js'
 import { login } from '@/services/apis/login'
 import Cookies from 'js-cookie'
export default {
    name: 'login',
    data () {
        return {
          isActive:true,
          userName:'',
          passWord:'',
          passwordtype:'password',
          form:{},
          auth:{
			        key:"MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJRqAC45zJt7CFWUuRQgA+mm", //加密的key
			        randomKey:'' //生成签名的key
			    },
        }
    },
    mounted () {
       
    },
    created(){
        // let _this = this;
        //  Bus.$on('sendPhone', (msg)=>{　  
        //              this.userName=msg;
        //              console.log(this.userName)
        //              alert(this.userName)
        //         })
        if(Cookies.get('loginPhone')) {
            this.userName=Cookies.get('loginPhone');
        }
        else{
            this.userName='';
        } 
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
       XDTlogin(){
                let rd=parseInt(100*Math.random());  //需要的随机数
                if(rd>900){
                    rd
                }
                else{
                    rd=rd+100
                }
                let time=new Date().getTime();     //生成时间戳
                let uId= Cookies.get('sid');
                let params = {
                            uId:'',
                            tokenId:'',
                            time:time,
                            rd:rd,
                            inCode:100017,
                            content:{
                                    mobilePhone:Cookies.get('xdtPhne'),
                                    xdyUserId:uId,
                            }
                    };
                logistics.auth(params).then(response => {
                    let ss=JSON.parse(response.data.results)
                    Cookies.set('xdtuseid', ss.content.userId); 
                    // console.log(ss)
                    
                })
            },
       loginBtn(){
           
            if(this.userName==''){
					 Toast({
                        message: '账号不可为空',
                        position: 'middle',
                        duration: 5000
                        });
				}
				else if(!(new RegExp( /^1[3|4|5|6|7|8|9][0-9]{9}$/).test(this.userName))){
					Toast({
                        message: '账号输入有误',
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
                        message: '密码格式不正确',
                        position: 'middle',
                        duration: 5000
                        });
				}
				else{
                    let params = this.form;
                    this.form.phone = this.userName;
                    this.form.password = this.passWord;
                    params = {
                        'str': strEnc(JSON.stringify(this.form),this.auth.key,this.auth.key,this.auth.key)
                        };
                    
                    login.auth(params).then(response => {
                        if(response.data.status=='Y'){
                            
                            let result = response.data.results;
                            Cookies.set('Token', result.token);
                            Cookies.set('randomKey', result.randomKey);
                             Cookies.set('xdtPhne', result.phone); 
                             Cookies.set('roleId', result.roleId);          //身份区分，档主还是财务
                             Cookies.set('sid', result.sid);                //登录用户ID
                             Cookies.set('userName', result.userName);     //姓名
                             Cookies.set('compayName', result.compayName); //公司名称
                             Cookies.set('uid', result.uid);

                            if(result.stalls_list.length==0){
                                this.XDTlogin();
                                this.$router.push({name:'noStalls'});
                            }
                            else{
                                let gidOwnID_list=JSON.stringify(result.stalls_list[0]);
                                Cookies.set('gidOwnID_lists', gidOwnID_list);                 //档位信息集合
                                this.XDTlogin();
                                this.$router.push({name:'home'});
                            }
                            
                            
                             
                            

                             
                        }
                        else{
                            Toast({
                                message: response.data.error_msg,
                                position: 'middle',
                                duration: 5000
                                });
                        }
                    })
					
					//调取接口
					
				}
       }
    }
}
</script>


