<template>
	<div class="page-content">
		<mt-header fixed  title="往来记录">
			<router-link :to="{ name: 'owner'}" slot="left">
			    <mt-button icon="back">返回</mt-button>
			</router-link>
		</mt-header>
		<mt-navbar v-model="selected">
		  	<mt-tab-item id="send">发货记录</mt-tab-item>
			<mt-tab-item id="remit">汇款记录</mt-tab-item>
		</mt-navbar>

		<!-- tab-container -->
		<mt-tab-container>
			<router-view name="recordRouteView" />
			  <!-- <mt-tab-container-item id="1">
			    <mt-cell v-for="n in 10" :title="'内容 ' + n" />
			  </mt-tab-container-item>
			  <mt-tab-container-item id="2">
			    <mt-cell v-for="n in 4" :title="'测试 ' + n" />
			  </mt-tab-container-item> -->
		</mt-tab-container>
	</div>
</template>

<script>

export default {
    data () {
        return {
            selected: this.$route.name
        }
    },
    mounted () {
    	//document.getElementsByClassName('mint-tab-item-label')[0].style.color = '#000';
    },
    methods: {
        getList(){}
            
    },
    watch:{
        selected:{
            handler(val,oldval){
                //console.log(oldval+'->'+val)
                this.$router.push({
                    name: val
                })
            },
            deep:true
        },
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.mint-navbar{
	margin-top: 0.2rem;
}


</style>