<template>
	<div class="page-content">
		<mt-header fixed  title="赊账规则">
			<router-link to="/" slot="left">
			    <mt-button icon="back" @click="goBack()"></mt-button>
			</router-link>
		</mt-header>
		<!--赊账规则-->
		<div class="page-main rules">
			{{rules.rules}}
		</div>
	</div>
</template>

<script>
import {order} from '@/services/apis/order.js'

export default {

    data () {
        return {
        	rules: [],
        }
    },
    mounted () {
		this.getRules();
    },
    methods: {
    	//赊账规则
		getRules(){
			var params = {};
			order.creditRules(params)
				.then(response => {
					this.rules = response.data.results;
				})
				.catch(function (response) {
					console.log(response);
				});
		},
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">

.rules{
    word-break: break-all;
    font-size: 0.26rem;
    color: #4c4c4c;
    line-height: 0.45rem;
    padding: 0.4rem 0.3rem;
}


</style>