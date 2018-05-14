<template>
	<div class="page-content">
		<mt-header fixed  title="赊账规则">
			    <mt-button icon="back" @click="goBack()" slot="left"></mt-button>
		</mt-header>
		<!--赊账规则-->
		<div class="page-main rules page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px' }">
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
            wrapperHeight: 0,//容器高度
        }
    },
    mounted () {
		this.getRules();
		this.wrapperHeight = document.documentElement.clientHeight - 140;
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
    margin: 0.4rem 0.3rem;
    width: auto;
}
.page-loadmore-wrapper{
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
}

</style>