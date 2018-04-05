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
					<div class="ub-f1">订单号 1236548965</div>
					<div>已完成</div>
				</div>
				<div class="ub ub-ac term customer-head" @click="customerDetail(1)">
					<div class="ub-f1">客户</div>
					<img src="../../assets/index/shouye_touxiang_img@2x.png" class="head">
					<span>小李</span>
					<img src="../../assets/my/icon_right.png" class="icon">
				</div>
				<div class="ub term no-border">
					<div class="ub-f1">卖手</div>
					<div>小李</div>
				</div>
			</div>
			<!--信息二-->
			<div class="order-detail item-two">
				<div class="ub term">
					<div class="ub-f1">合计金额</div>
					<div class="total">￥330,000</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">包装费</div>
					<div class="edu">￥45</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">过磅费</div>
					<div class="edu">￥45</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">三轮费</div>
					<div class="edu">￥45</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">支付方式</div>
					<div>POS机</div>
				</div>
				<div class="ub term no-border">
					<div class="ub-f1">车号</div>
					<div>京A12356</div>
				</div>
			</div>
			<!--货品信息-->
			<div class="order-detail item-table">
				<div class="ub term no-border">
					<div class="ub-f1 c-3 infor">货品信息</div>
					<div>2018-03-31</div>
					<div class="driver-name">小李</div>
					<div>车次89</div>
				</div>
				<table>
					<thead>
						<tr>
							<th>品名<span>(件数)</span></th>
							<th>重量</th>
							<th>单价</th>
							<th>金额</th>
							<th>包装费</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="n in 5">
							<td>大白菜<br />(1500)</td>
							<td>100斤</td>
							<td>4.55</td>
							<td>600.00</td>
							<td>20.00</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--备注信息-->
			<div class="order-detail">
				<div class="term">
					<div class="">备注</div>
				</div>
				<div class="term no-border">
					<div class="remarks">请准时送达，谢谢</div>
				</div>
			</div>
			<!--下单时间-->
			<div class="order-detail">
				<div class="ub term no-border m-b-20">
					<div class="ub-f1">下单时间</div>
					<div class="edu">2018-02-06 15:00</div>
				</div>
			</div>
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

	    //跳转到客户详情
        customerDetail(id){
        	this.$router.push({
        		name: 'client_detail',
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
	table{
		width: 100%;
		border-top: 1px solid #dedede;
		thead{
			background: #f2f2f2;
			line-height: 0.6rem;
			tr{
				th{
					font-weight: normal;
					text-align: left;
				}
				th:first-child{
					width: 1.7rem;
					padding-left: 0.2rem;
					span{
						font-size: 0.24rem;
					}
				}			
			}
		}
		tbody{
			tr{
				height: 0.96rem;
				border-bottom: 1px solid #dedede;
				td:first-child{
					padding-left: 0.2rem;
				}
			}
		}
	}
}


</style>