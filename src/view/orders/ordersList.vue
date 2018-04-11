<template>
	<div class="page-content">
		<mt-header fixed  title="订单">
			<router-link to="/" slot="left">
			    <mt-button icon="back" @click="$router.go(-1)"></mt-button>
			</router-link>
		</mt-header>
		<!--订单列表-->
		<div class="page-main">
			<search-box ref="search"/>
			<ul class="order-list">
				<li @click="ordersDetail(1)">
					<div class="ub list-top">
						<span class="ub-f1">订单号 F025689715224</span>
						<i class="c-6">已完成</i>  <!--------------需要合并的标注 状态--------------------->
					</div>
					<div class="ub list-bottom">
						<span class="ub-f1 c-6">2018-03-31 16:50</span>
						<i>￥330,000</i>   <!--------------需要合并的标注  总价已还未设置--------------------->
					</div>
				</li>
				<li @click="ordersDetail(1)">
					<div class="ub list-top">
						<span class="ub-f1">订单号 F025689715224</span>
						<i class="c-6">待支付</i>
					</div>
					<div class="ub list-bottom">
						<span class="ub-f1 c-6">2018-03-31 16:50</span>
						<i>￥330,000</i>
					</div>
				</li>
				<li @click="ordersDetail(1)">
					<div class="ub list-top">
						<span class="ub-f1">订单号 F025689715224</span>
						<i class="c-6">待支付</i>
					</div>
					<div class="ub list-bottom">
						<span class="ub-f1 c-6">2018-03-31 16:50</span>
						<em>总价</em>
						<i>￥330,000</i>
						<em class="repaid">已还</em>
						<em>￥0</em>
					</div>
				</li>
				<li @click="ordersDetail(1)">
					<div class="ub list-top">
						<span class="ub-f1">订单号 F025689715224</span>
						<i class="c-6">待支付</i>
					</div>
					<div class="ub list-bottom">
						<span class="ub-f1 c-6">2018-03-31 16:50</span>
						<i class="noset">未设置</i>
					</div>
				</li>
				<li @click="ordersDetail(1)">
					<div class="ub list-top">
						<span class="ub-f1">订单号 F025689715224</span>
						<i class="c-6">已取消</i>
					</div>
					<div class="ub list-bottom">
						<span class="ub-f1 c-6">2018-03-31 16:50</span>
						<i>￥330,000</i>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import searchBox from '@/components/searchBox/search'
export default {
	components: { searchBox },
    data () {
        return {
            
        }
    },
    mounted () {

    },
    methods: {

	    //跳转到订单详情
        ordersDetail(id){
        	this.$router.push({
        		name: 'ordersList/ordersDetail',
        		params: {
        			id:id
        		}
        	});
        }
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
i,em{
	font-style: normal;
}
.order-list{
	font-size: 0.24rem;
	color: #333;
	li{
		background: #fff;
		margin-top: 0.2rem;
		padding: 0.18rem 0.3rem;
		.list-top{
			line-height: 0.53rem;
			span,i{
				display: block;
			}
			span{
				font-size: 0.3rem;
			}
		}
		.list-bottom{
			line-height: 0.48rem;			
			span,i,em{
				display: block;
			}
			i{
				font-size: 0.32rem;
				color: #49c98b;
			}
			i.noset{
				font-size: 0.24rem;
				color: #333;
			}
			em{
				color: #333;
			}
			em.repaid{
				margin-left:0.2rem ;
			}
		}
	}
}



</style>