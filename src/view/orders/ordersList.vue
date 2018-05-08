<template>
	<div class="page-content">
		<mt-header fixed  title="订单">
		    <mt-button icon="back" @click="goBack()" slot="left"></mt-button>
		</mt-header>
		<search-box ref="search" @getSmeage="searchHandler"/>
		<noDate v-if="counts == 0"></noDate>  
		<!--订单列表-->
		<div class="page-main page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-loadmore 
				:auto-fill="false"
				:top-method="loadTop" 
				:bottom-method="loadBottom"
				:bottom-all-loaded="allLoaded"
				ref="loadmore">
				<ul class="order-list">
					<li @click="ordersDetail(list.oid)" v-for="list in listStore" :key="list.oid">
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
							<!--<i class="c-6" v-if="list.status == 'status_complete'">已完成</i>-->
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
				<div></div>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
import searchBox from '@/components/searchBox/search'
import noDate from '@/components/noData/noDate'
import { orders } from '@/services/apis/orders.js'
import { Loadmore , Indicator} from 'mint-ui'
export default {
	components: { searchBox, noDate },
    data () {
        return {
        	allLoaded: false,
            wrapperHeight: 0,//容器高度
            params:{
                current_page: 1,
                page_size: 2,
            },
                
            listStore: [],
			listdata: [],
			counts: null,
			val: '', //搜索
        }
    },
    mounted () {
		this.getOrders();
		
		this.wrapperHeight = document.documentElement.clientHeight - 140;
    },
    methods: {  
    	//车次销售列表数据
        getOrders(val){
            let params = {
                page_size: this.params.page_size,
                current_page: this.params.current_page,
                tid: this.$route.params.tid,
                sell_day: this.$route.params.sell_day,
                search: val,
            };
            orders.getOrdersList(params)
                .then(response => {
                    this.listdata = response.data.results;
                    this.counts = this.listdata.length;
					if(this.listdata.length == this.params.page_size){  
                        //判断是否应该加载下一页
                        this.params.current_page += 1 ;
                    }else{
                        //禁用上拉加载
                        this.allLoaded = true;
                    }
                    if (this.listdata) {
                        this.listStore.push(...this.listdata)
                    }
                    Indicator.close();
                    
                })
                .catch(function (response) {
                    console.log(response);
                });
        },
        //搜索
        searchHandler(value){
        	this.params.current_page = 1 ;
        	this.listStore = [];
			this.getOrders(value);
		},
		
    	//下拉刷新
        loadTop(){
            Indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            this.listStore = [];
            this.params.current_page = 1;
            this.getOrders();
            this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
            this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
        },
        //上拉加载
        loadBottom() {
            Indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            this.getOrders();
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
.page-loadmore-wrapper{
    overflow: scroll;
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
}
</style>