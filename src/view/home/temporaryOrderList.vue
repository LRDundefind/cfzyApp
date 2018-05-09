<template>
	<div class="page-content">
		<mt-header fixed  title="暂存订单">
			<router-link to="/home" slot="left">
			    <mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<!--子emit发送触发事件this.$emit('getSmeage',this.searchValue)  父监听getSmeage，并接收值-->
		<search-box ref="search" @getSmeage="searchHandler"/>
        <noDate v-if="counts == null"></noDate>  
		<!--订单列表-->
		<div class="page-main">
			<ul class="order-list">
				<li v-for="temporary in temporaryList" @click="orderDetail(temporary.oid)" :key="temporary.oid">
					<div class="ub list-top">
						<span class="ub-f1">订单号&nbsp;&nbsp;{{temporary.orderNo}}</span>
						<i class="">{{temporary.nickname}}</i>
					</div>
					<div class="list-center">{{temporary.address}}</div>
					<div class="list-bottom">{{temporary.placeOrderTime}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import searchBox from '@/components/searchBox/search'
import noDate from '@/components/noData/noDate'
import { home } from '@/services/apis/home.api'
export default {
	components: { searchBox, noDate },
    data () {
        return {
            temporaryList: [],
            val: '', //搜索
            counts: null,
        }
    },
    mounted () {
		this.getTemporaryList();
    },
    methods: {
		//获取暂存订单列表
		getTemporaryList(val){
			var params = {
				search: val
			};
			home.temporaryOrderList(params)
				.then(response => {
					this.temporaryList = response.data.results;
					this.counts = this.temporaryList.length;
				})
				.catch(function (response) {
					console.log(response);
				});
		},
		searchHandler(value){
			this.temporaryList = [],
			this.getTemporaryList(value);
		},
	    //跳转到订单详情
        orderDetail(oid){
        	this.$router.push({
        		name: 'temporaryOrderList/detail',
        		params: {
        			oid:oid
        		}
        	});
        },
            
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