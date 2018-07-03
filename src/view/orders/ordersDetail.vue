<template>
	<div class="page-content">
		<mt-header fixed  title="订单详情">
		    <mt-button icon="back" @click="goBack()" slot="left"></mt-button>
		</mt-header>
		<!--订单列表-->
		<div class="page-main page-loadmore-wrapper">
			<!--信息一-->
			<div class="order-detail">
				<div class="ub term">
					<div class="ub-f1">订单号&nbsp;&nbsp;{{detail.orderNo}}</div>
					<div class="c-6" :class="{tobepaid: noComplete}">{{status}}</div>
				</div>
				<div v-if="detail.cid" class="ub ub-ac term customer-head" @click="customerDetail(detail.cid)">
					<div class="ub-f1">客户</div>
					<!--<img src="../../assets/index/shouye_touxiang_img@2x.png" class="head">-->
					<span v-show="detail.nickname != ''">{{detail.nickname}}</span>
					<span v-show="detail.nickname == '' && detail.phone == ''  ">临时客户</span>
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
					<div class="total">￥{{detail.salesAmount | keepTwoNum}}</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">包装费</div>
					<div class="edu">￥{{detail.packCost | keepTwoNum}}</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">过磅费</div>
					<div class="edu">￥{{detail.weighCost | keepTwoNum}}</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">三轮费</div>
					<div class="edu">￥{{detail.deliveryCost | keepTwoNum}}</div>
				</div>
				<div class="ub term" v-if="detail.payType">
					<div class="ub-f1">支付方式</div>
					<div>{{pay_type}}</div>
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
						<span>{{goods.goodName}}({{goods.goodNum}})</span>
						<span>{{goods.netWeight}}<!--weight-->
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
					<div class="remarks">{{detail.remark || '暂无~'}}</div>
				</div>
			</div>
			<!--下单时间-->
			<div class="order-detail">
				<div class="ub term no-border">
					<div class="ub-f1">下单时间</div>
					<div class="edu">{{detail.placeOrderTime}}</div>
				</div>
			</div>
			
			<div v-if="status == '待提货'" class="submit-btn m-t-20" @click="takeGood">完成提货</div>
			
		</div>
		
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
import { orders } from '@/services/apis/orders.js';
export default {
    data () {
        return {
        	wrapperHeight: 0,//容器高度
            detail: [],//订单详情数据
            status: '',//订单状态
            pay_type: '',//支付方式
            noComplete: false,
        }
    },
    mounted () {
    	this.wrapperHeight = document.documentElement.clientHeight - 60;
		this.ordersDetail();
    },
    methods: {
    	
    	//订单详情
        ordersDetail(){
            let params = {
                oid: this.$route.params.oid
            };
            orders.getOrdersDetail(params)
                .then(response => {
                    this.detail = response.data.results;
                    this.statusSet();
                })
                .catch(function (response) {
                    console.log(response);
                });
        },
		statusSet(){
			switch(this.detail.status){
				case 'status_topay':
					this.status = '待支付';
					this.noComplete = true;
					break;
				case 'status_topick':
					this.status = '待提货';
					this.noComplete = true;
					break;
				case 'status_complete':
					this.status = '已完成';
					this.noComplete = false;
					break;
				case 'status_cancel':
					this.status = '已取消';
					this.noComplete = false;
					break;
				case 'status_repay':
					this.status = '待还款';
					this.noComplete = true;
					break;
				case 'status_deposit':
					this.status = '暂存';
					this.noComplete = true;
					break;
			}
			switch(this.detail.payType){
				case 'type_alipay':
					this.pay_type = '支付宝';
					break;
				case 'type_wechat':
					this.pay_type = '微信';
					break;
				case 'type_cash':
					this.pay_type = '现金';
					break;
				case 'type_card':
					this.pay_type = '银行卡';
					break;
			}
		},
		//提货
		takeGood(){
            let params = {
                oid: this.$route.params.oid
            };
            orders.getOrdersTake(params)
                .then(response =>{
                	Toast({
						message: '提货成功',
						position: 'middle',
						duration: 1000
	    			});
                	//完成提货刷新页面
                    this.ordersDetail();
                })
                .catch(function (response) {
                    console.log(response);
                });
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
.page-main{
	top: 0.8rem;
	bottom: 0px;
}
.page-loadmore-wrapper{
   overflow: scroll;
   -webkit-overflow-scrolling : touch;
}
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
		    line-height: 0.38rem;
    		margin-top: 0.2rem;
    		word-break: break-all;
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
				width: 18.5%;
				display: block;
				float: left;
				/*text-overflow:ellipsis;
				overflow:hidden;
				white-space:nowrap; 
				display:block;*/
			}
			span:first-child{
				padding-left: 0.2rem;
				width: 21%;
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
			/*min-height: 0.96rem;*/
			border-bottom: 1px solid #dedede;
			span{
				line-height: 0.32rem;
   				margin: 0.2rem 0;
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
	line-height: 0.9rem;
	text-align: center;
	border-radius: 1rem;
	background: -webkit-linear-gradient(left, #30b03e 0%,#33d57c 100%);
	color: #fff;
	font-size: 0.3rem;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
	margin: 0.45rem auto 0.3rem;
}

</style>