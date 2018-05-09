<template>
	<div class="page-content">
		<mt-header fixed  title="暂存订单详情">
			<router-link to="/" slot="left">
			    <mt-button icon="back" @click="goBack()"></mt-button>
			</router-link>
		</mt-header>
		<!--订单列表-->
		<div class="page-main">
			<!--信息一-->
			<div class="order-detail">
				<div class="ub term">
					<div class="ub-f1">订单号&nbsp;&nbsp;{{detailInfo.orderNo}}</div>
					<div class="zt">{{orderStatus}}</div>
				</div>
				<div class="ub ub-ac term customer-head" @click="customerDetail(detailInfo.cid)">
					<div class="ub-f1">客户</div>
					<!--<img src="../../assets/index/shouye_touxiang_img@2x.png" class="head">-->
					<span>{{detailInfo.nickname || '临时客户'}}</span>
					<img v-if="detailInfo.nickname" src="../../assets/my/icon_right.png" class="icon">
				</div>
				<div class="ub term no-border">
					<div class="ub-f1">卖手</div>
					<div>{{detailInfo.selName}}</div>
				</div>
			</div>
			<!--信息二-->
			<div class="order-detail item-two">
				<div class="ub term">
					<div class="ub-f1">合计金额</div>
					<div class="total" v-if = "totalCost.tatol">￥{{totalCost.tatol | keepTwoNum}}</div>
					<div class="total" v-if = "!totalCost.tatol">￥{{detailInfo.salesAmount}}</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">货款</div>
					<div class="edu" v-if = "totalCost.totalAmount">￥{{totalCost.totalAmount | keepTwoNum}}</div>
					<div class="edu" v-if = "!totalCost.totalAmount">￥{{defaultAmount}}</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">包装费</div>
					<div class="edu" v-if = "totalCost.totalPack">￥{{totalCost.totalPack | keepTwoNum}}</div><!--totalCost.totalPack-->
					<div class="edu" v-if = "!totalCost.totalPack">￥{{detailInfo.packCost}}</div><!--totalCost.totalPack-->
				</div>
				<div class="ub term">
					<div class="ub-f1">过磅费</div>
					<div class="edu" v-if = "totalCost.totalWeigh">￥{{totalCost.totalWeigh | keepTwoNum}}</div><!--totalCost.totalWeigh-->
					<div class="edu" v-if = "!totalCost.totalWeigh">￥{{detailInfo.weighCost}}</div><!--totalCost.totalWeigh-->
				</div>
				<div class="ub term">
					<div class="ub-f1">三轮费</div>
					<div class="edu">￥{{detailInfo.deliveryCost}}</div>
				</div>
				<div class="ub term no-border">
					<div class="ub-f1">车号</div>
					<div>{{detailInfo.tricycleNo}}</div>
				</div>
			</div>
			<!--货品信息-->
			<div class="order-detail item-table">
				<div class="ub term no-border">
					<div class="ub-f1 c-3 infor">货品信息</div> 
					<div>{{detailInfo.trainsNum}}</div>					
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
						<tr v-for="(goods,index) in detailInfo.goods">
							<td>{{goods.goodName}}<br />({{goods.goodNum}})</td>
							<td>{{goods.weight}}</td>
							<td class="set-price" @click = "setPrice(index)" v-if="goods.price">{{goodsInfo[index].price || goods.price}}</td>
							<!--<td class="set-price" @click = "setPrice(index)" v-if="!goods.price">{{goodsInfo[index].price || '设置单价'}}</td>-->
							<td class="set-price" @click = "setPrice(index)" v-if="!goods.price && goodsInfo[index].price">{{goodsInfo[index].price}}</td>
							<td class="set-price" @click = "setPrice(index)" v-if="!goods.price && !goodsInfo[index].price"><span>设置单价</span></td>
							<td>{{goods.goodAmount}}</td>
							<td>{{goods.packCost}}</td>
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
					<div class="remarks">{{detailInfo.remark || '暂无~'}}</div>
				</div>
			</div>
			<!--下单时间-->
			<div class="order-detail">
				<div class="ub term no-border m-b-20">
					<div class="ub-f1">下单时间</div>
					<div class="edu">{{detailInfo.placeOrderTime}}</div>
				</div>
			</div>
			<mt-button type="primary" size="large" class="submit-btn" @click="preservation">保&nbsp;存</mt-button>
		</div>
		<!-- 设置单价模态框 -->
		<div class="dialoag" v-if="dialoags">
			<div class="dialoag_cont">
				<span>
					<mt-field label="" placeholder="请设置单价" type="number" v-model="price"></mt-field>
				</span>
				<div class="btn ub">
					<div class="lefts" @click="dialoags = false ">取消</div>
					<div class="center"></div>
					<div class="rights" @click="submitPrice">确定</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { home } from '@/services/apis/home.api'
import {order} from '@/services/apis/order.js' //计算货品价格 6.3
import { Toast } from 'mint-ui'
export default {

    data () {
        return {
            dialoags: false, //设置价格的弹框
            detailInfo: [], //暂存订单详情数据
            orderStatus: '', //订单付款状态
            
            //点击获取索引
            numberNum: null,
            price: null, //填写的单价
            goodsInfo: [], //货品数据json集合
            
			//费用总和
			defaultAmount: null,//未改变单价前的总货款
			totalCost: {
				totalAmount: null,  //货款费用总和-金额总和
				totalPack: null,  //包装费总和
				totalWeigh: null,  //过磅费总和
				tatol: null,  //合计金额
			},
        }
    },
    mounted () {
		this.getTemporaryOrderDetail();
    },
    filters: {
		keepTwoNum: function(value){
			value = Number(value);
			return value.toFixed(2);
		}
	},
    methods: {
		//暂存订单-详情
		getTemporaryOrderDetail(){
			var params = {
				oid: this.$route.params.oid,
			};
			home.temporaryOrderDetail(params)
				.then(response => {
					this.detailInfo = response.data.results;
					this.goodsInfo = this.detailInfo.goods; //货品数据json集合
					this.transforSet();//页面普通数据渲染

                    for(var i = 0, len = this.goodsInfo.length; i < this.goodsInfo.length; i ++){
                    	
        				//未改变单价前的总货款 ， 初始货款 = 货品信息中所有的金额
						this.defaultAmount += this.goodsInfo[i]['goodAmount']; //总货款费用
			
						//提交设定价格所需货品参数 ：订单详情内货品详情的返回数据
						//goodId -- goodId
						//price -- price
						//goodNum -- goodNum
						//weight -- weight
						//weight_util -- weightUnit  不一致，所以 set一项数据到this.goodsInfo中
						//this.$set(this.goodsInfo, this.numberNum, {weight_util: this.goodsInfo[this.numberNum].weightUnit});  -----有问题 待修改
					}
				})
				.catch(function (response) {
					console.log(response);
				});
		},
		//界面数据渲染 部分字段对应文字
		transforSet(){
			switch(this.detailInfo.status){
				case 'status_repay':
					this.orderStatus = '待还款';
					break;
				case 'status_deposit':
					this.orderStatus = '暂存';
					break;
				case 'status_complete':
					this.orderStatus = '已完成';
					break;
			}
		},
		//跳转至客户详情
		customerDetail(cid){
			this.$router.push({name: 'client_detail', params: {ids: cid}});
		},
		
		//设置单价
        setPrice(index){
        	this.dialoags = true;
        	this.numberNum = index;
        	
			//编辑弹框的值 当前暂存订单接口无单价的货品 单价返回的是 0
        	if(this.goodsInfo[index].price != 0){
        		this.price = this.goodsInfo[index].price;
        	}
        },
		//设置单价-确定按钮
        submitPrice(){
        	if(this.price == '' ){
    			Toast({
					message: '请填写单价',
					position: 'middle',
					duration: 1000
    			});
    		}else if(!(new RegExp(/^[0-9]+(.[0-9]+)?$/).test(this.price))){
    			Toast({
					message: '请正确输入单价',
					position: 'middle',
					duration: 1000
    			});
    		}else{
        		this.dialoags = false;

				//设置价格以后重新计算货品的价格（金额、包装费、过磅费）
        		var params = {
					goodId: this.goodsInfo[this.numberNum].goodId,//单个货品id
					price: this.price,//单价
					goodNum: this.goodsInfo[this.numberNum].goodNum,//件数
					weight: this.goodsInfo[this.numberNum].weight,//重量
					weight_util: this.goodsInfo[this.numberNum].weight_util,//重量单位 
					sellUnit: this.goodsInfo[this.numberNum].priceUnit,//售卖单位
					slabWeight: this.goodsInfo[this.numberNum].slabWeight,//平板重
				};
				order.goodsCost(params)
					.then(response => {
						
						//每次重新输入单价重置各项费用总和
						this.totalCost.totalAmount = 0;
						this.totalCost.totalPack = 0;
						this.totalCost.totalWeigh = 0;
						this.totalCost.tatol = this.totalCost.totalAmount + this.totalCost.totalPack + this.totalCost.totalWeigh + this.totalCost.deliveryCost; //合计费用

						this.goodCosts = response.data.results; //计算出 金额goodAmount、包装费packCost、过磅费weighCost
						
						this.$set(this.goodsInfo,this.numberNum,
						    {	
						    	price: this.price,//---界面展示、提交传参所需
						    	//原数据重复set进集合
						    	goodId: this.goodsInfo[this.numberNum].goodId,//-----提交传参所需
						    	goodName: this.goodsInfo[this.numberNum].goodName,//-----提交传参所需
								weight: this.goodsInfo[this.numberNum].weight,//重量-----提交传参所需
								weight_util: this.goodsInfo[this.numberNum].weight_util,//重量单位 -----提交传参所需
								goodNum: this.goodsInfo[this.numberNum].goodNum,//件数-----提交传参所需
								//多次调用此接口所需
								priceUnit: this.goodsInfo[this.numberNum].priceUnit,
								sellUnit: this.goodsInfo[this.numberNum].priceUnit,								
								slabWeight: this.goodsInfo[this.numberNum].slabWeight,
								//接口计算所得
						    	packCost: response.data.results.packCost,//单件包装费------界面展示所需、计算总和所需
						    	goodAmount: response.data.results.goodAmount, //单件金额---界面展示所需、计算总和所需
								weighCost: response.data.results.weighCost,//单件过磅费------计算总和所需
						    });
						//计算
	                    for(var i=0,len = this.goodsInfo.length; i<this.goodsInfo.length;i++){
							this.totalCost.totalAmount += this.goodsInfo[i]['goodAmount']; //总货款费用
							this.totalCost.totalPack += this.goodsInfo[i]['packCost']; //总包装费
							this.totalCost.totalWeigh += Number(this.goodsInfo[i]['weighCost']); //总过磅费
							this.totalCost.tatol = this.totalCost.totalAmount + this.totalCost.totalPack + this.totalCost.totalWeigh + this.detailInfo.deliveryCost; //合计费用
	                    }

	                    //重置弹框单价
						this.price = null;
					})
					.catch(function (response) {
						console.log(response);
					});
    		}
        },

	    //保存
        preservation(){
        	console.log(this.goodsInfo)
            this.goodsInfo.filter(function(item){
            	if(item.price == ''){
					Toast({
						message: '请完善货品单价',
						position: 'middle',
						duration: 1000
	    			});
					return false;
            	}
				return false;
            });
			var params = {
				oid: this.$route.params.oid,
				goods: this.goodsInfo
			};
			home.temporarySetPrice(params)
				.then(response => {
					Toast({
						message: '保存成功',
						position: 'middle',
						duration: 1000
	    			});
					//设置单价保存成功跳转至首页
		            this.$router.push({
		            	name: 'home',
						params: {type: 'home'}
		            });
				})
				.catch(function (response) {
					console.log(response);
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
		div.zt{
			color: #33d570;
			font-size: 0.24rem;
		}
		div.total{
			font-size: 0.32rem;
			color: #49c98b;
		}
		.remarks{
			font-size: 0.26rem;
			color: #666;
		    padding-bottom: 0.6rem;
		    line-height: 0.38rem;
    		margin-top: 0.2rem;
		}
	}
	.customer-head{
		img.head{
			width: 0.62rem;
			display: block;
		}
		span{
			margin: 0 0 0 .15rem;
		}
		img.icon{
			width: 0.18rem;
			display: block;
			margin-left: .2rem;
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
					width: 1.7rem;
					padding-left: 0.2rem;
					text-overflow:ellipsis;
					overflow:hidden;
					white-space:nowrap; 
					display:block;
					margin-top: 0.15rem;
				}
				td.set-price{
					color: #33d570;
					font-size: 0.26rem;
					span{
						display: block;
						width: 0.6rem;
					}
				}
			}
			tr:last-child{
				border-bottom: none;
			}
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
/*设置单价模态框*/
.dialoag{
	font-size: 0.26rem;
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.6);
	z-index: 10001;
	.dialoag_cont{
		width: 80%;
		margin: 3rem auto 0;
		padding: 0.82rem 0;
		background: #fff;
		text-align: center;
		color: #666;
		span{
			display: block;
			margin: 0 auto 0.6rem;
			width: 75%;
			height: 0.7rem;
			font-size: 0.26rem;
		    border-radius: 1rem;
   			overflow: hidden;
			input{
				width: 100%;
				height: 100%;
				background: #e1fcef;
			    border-radius: 1rem;
				text-align: center;
			    box-sizing: border-box;
			}
			input::-webkit-input-placeholder{
				color: #33d57c;
				font-size: 0.26rem;
			}
		}
		.btn{
			padding: 0 0.42rem;
		    box-sizing: border-box;
			div{
				height: 0.7rem;
				line-height: 0.7rem;
				font-size: 0.3rem;
				text-align: center;
				color: #fff;
				border-radius: 1rem;
			}
			.lefts{
				width: 42%;
				background: #d0fde4;
				color: #33d57c;
				border: 1px solid #b5f1d0;
			}
			.center{
				width: 6%;
			}
			.rights{
				width: 52%;
		        background: -webkit-linear-gradient(left, #30b03e 0%,#33d57c 100%);
			}
		}

	}
}

</style>