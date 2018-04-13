<template>
	<div class="page-content">
		<mt-header fixed  title="下单">
			<router-link to="/ownerChoice" slot="left">
                <span class="c-3 f-s-16">白云上档A</span>
                <img class="header_img" src="../../assets/index/down_icon.png"/>
            </router-link>
            <router-link to="/" slot="right">
                <span class="c-3 f-s-16">赊账规则</span>
            </router-link>
		</mt-header>
		<!--下单-->
		<div class="page-main">
			<div class="order-detail" v-if="trainInfo">
				<div class="ub ub-ac term no-border right-icon" @click="choosetrainNumber()">
					<div class="ub-f1">{{trainsNum}}</div>
					<span class="c-3 F26C4c">京A 45698</span>
					<img src="../../assets/my/icon_right.png" class="icon">
				</div>
			</div>
			<div class="order-detail" v-if="otherInfo">
				<div class="ub ub-ac term right-icon input-choose" @click="chooseCustomer()">
					<input id="kh" type="radio" name="choose" checked="checked">
					<label for="kh" class="customer"></label>
					<div class="ub-f1">客户</div>
					<span>小李</span>
					<img src="../../assets/my/icon_right.png" class="icon">
				</div>
				<div class="ub ub-ac term no-border input-choose">
					<input id="sk" type="radio" name="choose">
					<label for="sk" class="individual"></label>
					<div class="ub-f1">临时客户</div>					
				</div>
			</div>
			<!--货品信息-->
			<div class="order-detail item-table" v-if="otherInfo">
				<table>
					<thead>
						<tr>
							<th>品名</th>
							<th>重量</th>
							<th>单价</th>
							<th>件数</th>
							<th>金额</th>
							<th>包装费</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="goods in goodsInfo" @click="goodsInfoSet(goods.goodId, goods.goodName, goods.sellUnit)">
							<td>{{goods.goodName}}</td>
							<td>{{goods.surplusNum}}</td>
							<td>?</td>
							<td>?</td>
							<td>?</td>
							<td>?</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="order-detail" v-if="otherInfo">
				<div class="ub term">
					<div class="ub-f1">贷款费用</div>
					<div class="edu">￥45</div>
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
					<div class="ub-f1">车号</div>
					<div class="F26C4c">京A12356</div>
				</div>
				<div class="ub term no-border">
					<div class="ub-f1">合计金额</div>
					<div class="total">￥330,000</div>
				</div>
			</div>
			<!--付款方式-->
			<div class="order-detail" v-if="otherInfo">
				<div class="ub ub-ac term right-icon input-choose">
					<input id="xj" type="radio" name="choosetype" checked="checked">
					<label for="xj" class="individual"></label>
					<div class="ub-f1"></div>					
					<div>现结</div>					
				</div>
				<div class="ub ub-ac term no-border input-choose">
					<input id="sz" type="radio" name="choosetype">
					<label for="sz" class="individual"></label>
					<div class="ub-f1"></div>					
					<div>赊账</div>					
				</div>
			</div>
			<!--备注信息-->
			<div class="order-detail" v-if="otherInfo">
				<div class="term">
					<div class="">备注</div>
				</div>
				<div class="term no-border">
					<textarea class="" placeholder="备注信息"></textarea>
				</div>
			</div>
			<!--签名-->
			<div class="order-detail" v-if="autographInfo">
				<div class="ub ub-ac term no-border right-icon" @click="autograph()">
					<div class="ub-f1">签名</div>
					<img src="../../assets/my/icon_right.png" class="icon">
				</div>
			</div> 
			<div class="orderBtn ub" v-if="otherInfo">
				<div class="lefts" @click="stagingOrder">暂存</div>
				<div class="center"></div>
				<div class="rights" @click="submitOrder">下单</div>
			</div>

		</div>
		
	</div>
</template>

<script>
import {order} from '@/services/apis/order.js'
export default {

    data () {
        return {
			trainInfo: true,//车次信息
			otherInfo: false,//其他信息
			autographInfo: false,//签名
			goodsInfo: [],
			trainsNum: '点击选择车次'
        }
    },
    mounted () {
    	this.getTrainInfor();
    },
    methods: {
	    //选择车次
        choosetrainNumber(){
            this.$router.push({name: 'trainList'});
        },
        //选择客户
        chooseCustomer(){
            this.$router.push({
            	name: 'client',
				params: {type: 'order'}
            });
        },
        //选择完车次后获取车次货品详细信息
        getTrainInfor(){ 
        	if(this.$route.params.tid){
        		this.trainsNum = this.$route.params.trainsNum;
        		
        		this.otherInfo = true;//其他信息
				this.autographInfo = true;//签名
				this.getTrain(this.$route.params.tid);
        	}else{
        		console.log('没有选择车次')
        	}
        	
        },
		//获取车次货品详细信息
		getTrain(tid){
			var params = {
				tid: tid
			};
			order.getTrainInfo(params)
				.then(response => {
					
					//货品详细信息
					this.goodsInfo = response.data.results;
					
					if(response.data.error_code == '204'){
						this.otherInfo = false;//其他信息
						this.autographInfo = false;//签名
						console.log(response.data.error_msg);
					}
				})
				.catch(function (response) {
					console.log(response);
				});
		},

		//设置货品重量件数信息
        goodsInfoSet(id, name, unit){
        	this.$router.push({
        		name: 'goodsInformation',
        		params: {goodId: id, goodName: name, sellUnit:unit }
        	});
        },
        
        //签名
        autograph(){
            this.$router.push({name: 'autograph'});
        },
        //暂存订单
        stagingOrder(){
        	
        },
        //下单
        submitOrder(){
        	
        },
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
i{
	font-style: normal;
}
.header_img{
    width: 0.32rem;
    padding-top: 0.1rem;
    padding-left: 0.05rem;
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
		div.total{
			font-size: 0.32rem;
			color: #49c98b;
		}
		/*.driver-name{
			margin: 0 0.15rem;
		}*/
		.remarks{
			font-size: 0.26rem;
			color: #666;
		    padding-bottom: 0.6rem;
		}
		.edu{
			color: #333;
			font-size: 0.28rem;
		}
		.F26C4c{
			font-size: 0.26rem;
			color: #4c4c4c;
		}
	}
	.input-choose{
		label{
			display: block;
		}	
		input{
			display: none;
		}	
		input[type='radio']+label{
			margin-right: 0.26rem;
			width: 0.42rem;
			height: 0.42rem;
			cursor: pointer;
			border-radius: 50%;
		    background: url(../../assets/xiadan_weixuanzhong_btn@2x.png) no-repeat center;
		    background-size: contain;
		}
		input[type='radio']:checked+label{
		    background: url(../../assets/xiadan_xuanzhong_btn@2x.png) no-repeat center;
		    background-size: contain;
		}
	}
	
	/*备注信息*/
	textarea{
		width: 100%;
		height: 3em;
		border: none;
		padding: 0.2rem 0 0;
		resize: none;
	}
	textarea::-webkit-input-placeholder{
		font-size: 0.26rem;
		color: #666;
	}
	
	.right-icon{
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
.order-detail.item-table{
	color: #4c4c4c;
	font-size: 0.26rem;
	padding-top: 0.3rem;
	.term{
		color: #4c4c4c;
		.infor{
			font-size: 0.28rem;
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
					padding-left: 0.2rem;
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
			tr:last-child{
				border-bottom: none;
			}
		}
	}
}
.orderBtn{
	padding: 0 0.3rem;
	margin: 0.27rem 0 0.5rem;
    box-sizing: border-box;
	div{
		height: 0.9rem;
		line-height: 0.9rem;
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

</style>