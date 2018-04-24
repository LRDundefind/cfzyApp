<template>
	<div class="page-content">
		<mt-header fixed  title="订单">
			<router-link to="/" slot="left">
			    <mt-button icon="back" @click="$router.go(-1)"></mt-button>
			</router-link>
		</mt-header>
		<!--订单列表-->
		<div class="page-main">
			<search-box ref="search" @getSmeage="searchHandler"/>
			<ul class="order-list">
				<li @click="ordersDetail(list.oid)" v-for="list in listdata" :key="list.oid">
					<div class="ub list-top">
						<span class="ub-f1">订单号&nbsp;&nbsp;{{list.orderNo}}</span>
						<!--以下四种为现结-->
						<i class="c-6" v-if="list.status == 'status_topay'">待支付</i>
						<i class="c-6" v-if="list.status == 'status_topick'">待提货</i>
						<i class="c-6" v-if="list.status == 'status_complete'">已完成</i>
						<i class="c-6" v-if="list.status == 'status_cancel'">已取消</i>
						<!--以下三种为赊账-->
						<i class="c-6" v-if="list.status == 'status_repay'">待还款</i>
						<i class="c-6" v-if="list.status == 'status_deposit'">暂存</i>
						<i class="c-6" v-if="list.status == 'status_complete'">已完成</i>
					</div>
					<div class="ub list-bottom">
						<span class="ub-f1 c-6">{{list.placeOrderTime}}</span>
						<strong class="ub" v-if="list.orderType == 'order_knot'"><!--现结-->
							<i>￥{{list.salesAmount}}</i>
						</strong>
						<strong class="ub" v-if="list.orderType == 'order_credit' && list.status != 'status_deposit'"><!--赊账 且 设置了单价（非暂存状态即为设置了单价）-->
							<em>总价</em>
							<i>￥{{list.salesAmount}}</i>
							<em class="repaid">已还</em>
							<em>￥{{list.returned}}</em>
						</strong>
						<strong v-if="list.status == 'status_deposit'"><!--赊账 且 未设置单价-->
							<i class="noset">未设置</i>
						</strong>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import searchBox from '@/components/searchBox/search'
import { orders } from '@/services/apis/orders.js';

export default {
	components: { searchBox },
    data () {
        return {
			listdata: [],
			val: '', //搜索
        }
    },
    mounted () {
		this.getOrders();
    },
    methods: {
    	//车次销售列表数据
        getOrders(val){
            let params = {
                page_size: 10,
                current_page: 1,
                tid: this.$route.params.tid,
                sell_day: this.$route.params.sell_day,
                search: val,
            };
            orders.getOrdersList(params)
                .then(response => {
                    this.listdata = response.data.results;
                })
                .catch(function (response) {
                    console.log(response);
                });
        },
        //搜索
        searchHandler(value){
			this.getOrders(value);
		},
	    //跳转到订单详情
        ordersDetail(oid){
        	this.$router.push({
        		name: 'ordersList/ordersDetail',
        		params: {
        			oid:oid
        		}
        	});
        }
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
i,em,strong{
	font-style: normal;
	font-weight: normal;
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