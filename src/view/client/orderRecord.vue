<template>
	<div class="page-content">
		<mt-header fixed  title="消费记录">
			<router-link :to="{ name: 'client_detail', params: { id: 1 }}" slot="left">
			    <mt-button icon="back"></mt-button>
			</router-link>
			<mt-button slot="right">档位切换</mt-button>
		</mt-header>
		<!--消费记录列表-->
		<div class="page-main">
			<search-box ref="search"/>
			<ul class="order-record">
				<li v-for="n in 4" @click="orderDetail(1)">
					<div class="ub list-top">
						<span class="ub-f1">订单号 F025689715224</span>
						<i class="c-6">已完成</i>
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
        orderDetail(id){
        	this.$router.push({
        		name: 'orderList/orderDetail',
        		params: {
        			id:id
        		}
        	});
        }
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
i{
	font-style: normal;
}
.searchBox{
	margin-bottom: 0.2rem;
}
.order-record{
	font-size: 0.24rem;
	color: #333;
	li{
		background: #fff;
		margin-bottom: 0.2rem;
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
			span,i{
				display: block;
			}
			i{
				font-size: 0.32rem;
				color: #49c98b;
			}
		}
	}
}



</style>