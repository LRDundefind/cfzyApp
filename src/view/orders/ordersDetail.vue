<template>
	<div class="page-content">
		<mt-header fixed  title="订单详情">
			<router-link to="/" slot="left">
			    <mt-button icon="back" @click="$router.go(-1)"></mt-button>
			</router-link>
		</mt-header>
		<!--订单列表-->
		<div class="page-main">
			<!--信息一-->
			<div class="order-detail">
				<div class="ub term">
					<div class="ub-f1">订单号&nbsp;&nbsp;{{detail.orderNo}}</div>
					<div>已完成??</div><!--已完成展示-->
					<div v-if="false" class="tobepaid">待支付</div><!--未完成展示-->	
				</div>
				<div class="ub ub-ac term customer-head" @click="customerDetail(detail.cid)">
					<div class="ub-f1">客户</div>
					<!--<img src="../../assets/index/shouye_touxiang_img@2x.png" class="head">-->
					<span>{{detail.nickname}}</span>
					<img src="../../assets/my/icon_right.png" class="icon">
				</div>
				<div class="ub term no-border">
					<div class="ub-f1">卖手</div>
					<div>{{detail.selName}}</div>
				</div>
			</div>
			<!--信息二-->
			<div class="order-detail item-two">
				<div class="ub term">
					<div class="ub-f1">合计金额</div>
					<div class="total">￥{{detail.salesAmount}}</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">包装费</div>
					<div class="edu">￥{{detail.packCost}}</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">过磅费</div>
					<div class="edu">￥{{detail.weighCost}}</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">三轮费</div>
					<div class="edu">￥{{detail.deliveryCost}}</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">支付方式</div>
					<div>{{detail.payType}}??</div>
				</div>
				<div class="ub term no-border">
					<div class="ub-f1">车号</div>
					<div>{{detail.tricycleNo}}</div>
				</div>
			</div>
			<!--货品信息-->
			<div class="order-detail item-table">
				<div class="ub term no-border">
					<div class="ub-f1 c-3 infor">货品信息</div>
					<div>{{detail.trainsNum}}</div>
				</div>
				<ul class="table-ul">
					<li class="title">
						<span>品名<em>(件数)</em></span>
						<span>重量</span>
						<span>单价</span>
						<span>金额</span>
						<span>包装费</span>
					</li>
					<li v-for="goods in detail.goods" class="con">
						<span>{{goods.goodName}}<br />({{goods.goodNum}})</span>
						<span>{{goods.weight}}
							<i v-if="goods.weightUnit == 'unit_jin'">斤</i>
							<i v-if="goods.weightUnit == 'unit_kg'">公斤</i>
							<i v-if="goods.weightUnit == 'unit_pie'">件</i>
						</span>
						<span>{{goods.price}}</span>
						<span>{{goods.goodAmount}}</span>
						<span>{{goods.packCost}}</span>
					</li>
				</ul>
			</div>
			<!--备注信息-->
			<div class="order-detail">
				<div class="term">
					<div class="">备注</div>
				</div>
				<div class="term no-border">
					<div class="remarks">{{detail.remark}}</div>
				</div>
			</div>
			<!--下单时间-->
			<div class="order-detail">
				<div class="ub term no-border m-b-20">
					<div class="ub-f1">下单时间</div>
					<div class="edu">{{detail.placeOrderTime}}</div>
				</div>
			</div>
			<!--取消订单-->  <!--未完成时展示-->
			<mt-button type="primary" size="large" class="submit-btn" @click="cancelOrder">取消订单</mt-button>
		</div>
		
	</div>
</template>

<script>
import { orders } from '@/services/apis/orders.js';
export default {
    data () {
        return {
            detail: [],//订单详情数据
        }
    },
    mounted () {
		this.ordersDetail();
    },
    methods: {
    	
    	//车次销售列表数据
        ordersDetail(){
            let params = {
                oid: this.$route.params.oid
            };
            orders.getOrdersDetail(params)
                .then(response => {
                    this.detail = response.data.results;
                })
                .catch(function (response) {
                    console.log(response);
                });
        },
        
        //完成提货 getOrdersTake
        
        //取消订单
        cancelOrder(){
        	
        },
        
        //跳转到客户详情
        customerDetail(cid){
        	this.$router.push({
        		name: 'client_detail',
        		params: {
        			ids: cid
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
.order-detail{
	font-size: 0.28rem;
	color: #333;
	background: #fff;
	padding: 0 0.3rem;
	margin-top: 0.2rem;
	.term{
		line-height: 0.96rem;
		border-bottom: 1px solid #dedede;
		div:nth-child(2){
			color: #4c4c4c;
			font-size: 0.26rem;
		}
		div.total{
			font-size: 0.32rem;
			color: #49c98b;
		}
		div.tobepaid{
			font-size: 0.26rem;
			color: #33d570;
		}
		.remarks{
			font-size: 0.26rem;
			color: #666;
		    padding-bottom: 0.6rem;
		}
	}
	.customer-head{
		img.head{
			width: 0.62rem;
			display: block;
		}
		img.icon{
			width: 0.18rem;
			display: block;
		}
		span{
			margin: 0 .2rem 0 .15rem;
		}
	}
	.term.no-border{
		border-bottom: none;
	}
	
}
.order-detail.item-two{
	.term{
		.edu{
			color: #333;
			font-size: 0.28rem;
		}
		
	}
}
.order-detail.item-table{
	.term{
		font-size: 0.26rem;
		color: #4c4c4c;
		.infor{
			font-size: 0.28rem;
		}
		.driver-name{
			margin: 0 0.15rem;
		}
	}
	.table-ul{
		width: 100%;
		font-size: 0.26rem;
		color: #4c4c4c;
		li{
			overflow: hidden;
			span{
				width: 19%;
				display: block;
				float: left;
			}
			span:first-child{
				padding-left: 0.25rem;
			}
		}
		.title{
			height: 0.6rem;
			line-height: 0.6rem;
			background: #f2f2f2;
			em{
				font-style: normal;
				font-size: 0.22rem;
			}
		}
		.con{
			height: 0.96rem;
			line-height: 0.96rem;
			border-bottom: 1px solid #dedede;
			span{
				height: 0.96rem;
			}
			span:first-child{
				line-height: 0.3rem;
				margin-top: 0.2rem;
			}
		}
		li:last-child{
			border-bottom: none;
		}
	}
}
.submit-btn{
	width: 73%;
	height: 0.9rem;
	border-radius: 1rem;
	background: -webkit-linear-gradient(left, #30b03e 0%,#33d57c 100%);
	color: #fff;
	font-size: 0.3rem;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
	margin: 0.45rem auto 0;
}

</style>