<template>
	<div class="page-content">
		<mt-header fixed  title="还款记录">
			<router-link :to="{ name: 'client_detail', params: { id: 1 }}" slot="left">
			    <mt-button icon="back"></mt-button>
			</router-link>
			<mt-button slot="right">档位切换</mt-button>
			<mt-button>
				<img src="../../assets/login/zhuce_mima_icon@2x.png" height="20" width="20" slot="icon">
			 	带自定义图标
			</mt-button>
		</mt-header>
		<!--还款记录列表-->
		<div class="page-main">
			<ul class="pay-list">
				<li class="pay-total ub ub-pj">
					<div class="ub ub-ac">
						<span class="ub-f1 c-3">赊账总金额</span>
						<i class="c-6">￥30000</i>
					</div>
					<div class="ub ub-ac">
						<span class="ub-f1 c-3">还款总金额</span>
						<i class="c-6">￥30000</i>
					</div>
				</li>
				<li v-for="n in 4">
					<div class="ub list-t">
						<div class="pay">还款金额</div>
						<div class="edu ub-f1">￥30000</div>
						<div class="type">汇款</div>
					</div>
					<div class="ub list-c">
						<div class="data">还款日期</div>
						<div class="datatime">2018-03-31</div>
					</div>
					<div class="ub list-b">
						<div class="remarks c-6">备注</div>
						<div class="info ub-f1 c-6">巴拉巴拉巴拉</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

export default {

    data () {
        return {
            
        }
    },
    mounted () {

    },
    methods: {

            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
i{
	font-style: normal;
}
.pay-list{
	font-size: 0.24rem;
	color: #333;
	.pay-total{
		font-size: 0.26rem;
		span{
			display: block;
			margin-right: 0.36rem;
		}
		i{
			display: block;
			font-size: 0.34rem;
			color: #33d57c;
		}
	}
	li{
		background: #fff;
		margin-bottom: 0.2rem;
		padding: 0.18rem 0.3rem 0.16rem;
		.list-t{
			line-height: 0.5rem;
			.pay{
				font-size: 0.3rem;
				margin-right: 0.36rem;
			}
			.edu{
				font-size: 0.3rem;
				color: #33d57c;
			}
			.type{
				font-size: 0.26rem;
				color: #4c4c4c;
			}

		}
		.list-c{
			line-height: 0.5rem;
			font-size: 0.26rem;
			color: #4c4c4c;
			.data{
				margin-right: 0.15rem;
			}
		}
		.list-b{
			line-height: 0.5rem;
			font-size: 0.24rem;
			line-height: 0.48rem;	
			.remarks{
				margin-right: 0.15rem;
			}		
		}
	}
}



</style>