<template>

	<div class="page-main">
		<ul class="title-remit clearfix">
			<li class="f-l">赊账总金额 ￥{{value | format}}</li>
			<li class="f-l">还款总金额 ￥300</li>
		</ul>
		<div v-for="n in 4" :key='n' class="main-list">
			<h3>汇款日期</h3>
			<ul class="">
				<li class="ub">
					<div class="ub-f2">汇款金额</div>
					<div class="ub-f2">2000</div>
				</li>
				<li class="ub">
					<div class="ub-f2">汇款方式</div>
					<div class="ub-f2">支付宝</div>
				</li>
				<li class="ub">
					<div class="ub-f2">收款账户</div>
					<div class="ub-f2">钱多多</div>
				</li>
				<li class="ub">
					<div class="ub-f2">备注</div>
					<div class="ub-f2">备注</div>
				</li>
			</ul>
		</div>

	</div>

</template>

<script>

export default {
    data () {
        return {
            value:300
        }
    },
    mounted () {

    },
    methods: {
        getList(){}
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
	.page-main{
		width: 100%;
	}
	.title-remit{
		margin-top: 0.2rem;
		padding: 0.2rem;
		font-size: 0.3rem;
		background-color: #fff;
		li{
			width: 50%;
		}
		li:nth-child(2){
			text-align: right;
		}
	}
	.main-list{
		background: #fff;
		margin-top: 0.2rem;
		padding: 0.2rem;
		color: #333;
		h3{
			font-size: 0.4rem;
			border-bottom: 1px #f0f0f0 solid;
			line-height: 0.8rem;
		}
		ul{

			li{
				font-size: 0.3rem;
				margin-top: 0.1rem;
			}
			li .ub-f2:nth-child(2) 
			{
				text-align: right;
			}
		}
	}

</style>