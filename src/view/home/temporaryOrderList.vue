<template>
	<div class="page-content">
		<mt-header fixed  title="暂存订单">
			<router-link to="/" slot="left">
			    <mt-button icon="back" @click="$router.go(-1)"></mt-button>
			</router-link>
		</mt-header>
		<!--订单列表-->
		<div class="page-main">
			<search-box ref="search"/>
			<ul class="order-list">
				<li v-for="n in 4" @click="orderDetail(1)">
					<div class="ub list-top">
						<span class="ub-f1">订单号 F025689715224</span>
						<i class="">陌上花开</i>
					</div>
					<div class="list-center">海淀区中关村南大街海淀区中关村南大街</div>
					<div class="list-bottom">2018-03-31 16:50</div>
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
        		name: 'temporaryOrderList/detail',
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
.order-list{
	font-size: 0.24rem;
	color: #333;
	li{
		background: #fff;
		margin-top: 0.2rem;
		padding: 0.15rem 0.3rem 0.2rem;
		.list-top{
			line-height: 0.7rem;
			i{
				display: block;
				font-size: 	0.26rem;
				color: #4c4c4c;
			}
			span{
				font-size: 0.3rem;
				display: block;
			}
		}
		.list-center{
			line-height: 0.5rem;
			color: #4c4c4c;
			font-size: 0.26rem;
		}
		.list-bottom{
			color: #666;
			line-height: 0.4rem;			
		}
	}
}



</style>