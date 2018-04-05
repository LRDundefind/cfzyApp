<template>
	<div class="page-content">
		<mt-header fixed  title="货主">
			<router-link to="/" slot="left">
			    <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
			</router-link>
		</mt-header>

		<div class="page-main">
			<div class="main-list">
				<p class="clearfix">姓名<span>李</span></p>
				<p class="clearfix">电话<span>17656987845</span></p>
			</div>
		
			<div class="main-list">
				<p class="clearfix">供应商名称<span>无</span></p>
				<p class="clearfix">联系地址<span>无</span></p>
			</div>
		
			<div class="main-list">
				<p class="clearfix">开户信息<span></span></p>
				<p class="clearfix">银行名称<span>无</span></p>
				<p class="clearfix">支行<span>无</span></p>
				<p class="clearfix">账号<span>无</span></p>
			</div>
		
			<div class="main-list">
				<p class="clearfix">备注</p>
				<div class="remark">备注信息</div>
			</div>
		</div>
		<div class='update clearfix'>
			<router-link :to="{ name: 'owner/record',params: {}}">
			<mt-button type="primary" size="large" class='f-l'>往来记录</mt-button>
			</router-link>
			<mt-button type="primary" size="large" class='f-l' @click="update">更新资料</mt-button>
		</div>
	</div>
</template>

<script>

export default {
    data () {
        return {
            value:''
        }
    },
    mounted () {

    },
    methods: {
        getList(){},
        update(){
        	this.$router.push({
                name: 'owner/ownerUpdate',
                params: {}
            })
        }    
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">

	.main-list{
		background: #fff;
		margin-top: 0.2rem;
		padding:0 0.3rem;
		line-height: 1rem;
		>p{	
			font-size: $fons_size_28;
			color: $main_color333;
			border-top: 1px #f0f0f0 solid;
			>span{
				font-size: $fons_size_26;
				float: right;
				color: #4c4c4c;
			}
		}
		>p:nth-child(1){
			border:none;
		}
		.remark{
			font-size: $fons_size_26;
			color: #4c4c4c;
		}
	}
	.update{
		.mint-button--primary:nth-child(1){
			background: url(../../assets/kehu_chakanxiaofeijilu_btn@2x.png) no-repeat center;
			background-size:contain;
			width: 41%;
			color:#0f0;
			margin:0 3%;
			font-size: 0.3rem !important;
		}
		.mint-button--primary:nth-child(2){
			background: url(../../assets/kehu_gengxinziliao_btn@2x.png) no-repeat center;
			background-size:contain;
			width: 50%;
			font-size: 0.3rem !important;
		}
		padding:0.3rem 0 0.6rem 0;
		button{
			margin: 0 auto;
			height: 1rem;
		}
	}

</style>