<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  	name: 'App',
  	data() {
        return {
            
        }
    },
  	created() {
        if (typeof XDYApp !== 'undefined') {
          if (XDYApp.getLoginMessage() == '') {
            Cookies.remove('Token');
            this.$router.push({name: 'login'})
          }else{
    	      let loginMessage = JSON.parse(XDYApp.getLoginMessage());
            Cookies.set('Token', loginMessage.token);
            Cookies.set('randomKey', loginMessage.randomKey);
            Cookies.set('roleId', loginMessage.roleId);          //身份区分，档主还是财务
            Cookies.set('sid', loginMessage.sid);                //登录用户ID
            Cookies.set('userName', loginMessage.userName);     //姓名
            Cookies.set('compayName', loginMessage.compayName); //公司名称
            Cookies.set('uid', loginMessage.uid);  
            Cookies.set('gidOwnID_lists', loginMessage.gidOwnID_lists);
            Cookies.set('owner_id', loginMessage.owner_id);
            Cookies.set('haveTrainInfo', loginMessage.haveTrainInfo);
            
          }
        }
	  },
}
</script>

<style>
body{
  margin:0; 
}
</style>
