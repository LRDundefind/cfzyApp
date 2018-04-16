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
					<span class="c-3 F26C4c">{{plateNum}}</span>
					<img src="../../assets/my/icon_right.png" class="icon">
				</div>
			</div>
			<div class="order-detail" v-if="trainInfo">
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
						<tr v-for="goods in goodsInfo" @click="goodsInfoSet(goods.goodId, goods.goodName, goods.sellUnit, goods.tid, trainsNum)">
							<td>{{goods.goodName}}</td>
							<td>{{goodsweight}}</td>
							<td>{{goodsunit}}</td>
							<td>{{goodsnum}}</td>
							<td>0</td>
							<td>0</td>
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
import Cookies from 'js-cookie'
//import Router from 'vue-router'
export default {

    data () {
        return {
			trainInfo: true,//车次模块
			otherInfo: false,//其他模块
			autographInfo: false,//签名
			goodsInfo: [], //货品信息
			goodsid: '',
			
			trainsNum: '点击选择车次', //车次信息展示
			plateNum: '获取车牌号',
			tid:'',//车次id
			//手动输入的每项货品的信息
			goodsunit: '', //单价
			goodsnum: '',  //数量
			goodsweight: '',  //重量
			pbweight: '',  //平板重
			
			goodsCosts: [], //货品价格计算返回数据
			goodsid_1:'',
			numUnit_1:'',
			sellUnit_1:'',
			
			goodsData: [
				{goodsunit: '', goodsnum: '', goodsweight: '', pbweight: ''}
			],
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
        
        //选择完车次后获取车次货品详细信息
        getTrainInfor(){ 
        	this.tid = this.$route.params.tid //车次id
        	if(this.tid){
        		this.trainsNum = this.$route.params.trainsNum;
        		this.plateNum = this.$route.params.plateNum;
        		this.otherInfo = true;//其他信息
				this.autographInfo = true;//签名
				this.getTrain(this.tid);
				
				this.getGoodsInformation(); //-----------------------------暂且在此处获取cookie 获得所设置的货品的信息
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
					//单个货品id
					this.goodsid_1 = response.data.results[0].goodId;
					//重量单位
					this.numUnit_1 = response.data.results[0].numUnit;
					//售卖单位
					this.sellUnit_1 = response.data.results[0].sellUnit;
					
					
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

		//跳转至设置货品重量件数信息页面
        goodsInfoSet(id, name, unit, tid, trainsNum){
        	this.$router.push({
        		name: 'goodsInformation',
        		params: {goodId: id, goodName: name, sellUnit:unit, tid:tid, trainsNum:trainsNum}
        	});
        },
        //获取cookie 获得所设置的货品的信息
        getGoodsInformation(){
        	this.goodsunit = Cookies.get('goodsunit') || ''; //获得单价
        	this.goodsnum = Cookies.get('goodsnum') || '';  //获得数量
        	this.goodsweight = Cookies.get('goodsweight') || '';  //获得重量
        	this.pbweight = Cookies.get('pbweight') || '';  //获得平板重
        	console.log(this.goodsunit+','+this.goodsnum+','+this.goodsweight+','+this.pbweight);
        	console.log(this.goodsid_1+','+this.numUnit_1+','+this.sellUnit_1)
        	
        	//计算货品价格的接口
			var params = {
				goodId: '1921111qwe124er',//单个货品id 测试
				price: this.goodsunit,
				goodNum: this.goodsnum,
				weight: this.goodsweight,
				weight_util: 'unit_jin',//重量单位 numUnit 若按重量售卖，则重量单位为售卖单位
				sellUnit: 'unit_jin',//售卖单位 sellUnit
				slabWeight: this.pbweight,//平板重
			};
			order.goodsCost(params)
				.then(response => {
					//货品价格计算返回数据
					this.goodsCosts = response.data.results;
					console.log(this.goodsCosts)
				})
				.catch(function (response) {
					console.log(response);
				});
        },
        
        
		//选择客户
        chooseCustomer(){
            this.$router.push({
            	name: 'client',
				params: {type: 'order'}
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
    },
    watch: {
        '$route'(to, from) {
			console.log(to)
		}
    },
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