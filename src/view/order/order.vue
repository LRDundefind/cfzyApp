<template>
	<div class="page-content">
		<mt-header fixed  title="下单">
			<router-link to="/ownerChoice" slot="left">
                <span class="c-3 f-s-16">白云上档A</span>
                <img class="header_img" src="../../assets/index/down_icon.png"/>
            </router-link>
            <router-link to="/creditRules" slot="right">
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
			<div class="order-detail" v-if="trainInfo" id="chooseCustomer">
				<div class="ub ub-ac term right-icon input-choose">
					<input id="kh" type="radio" name="choose" value="Nottemporary" v-model="customerType">
					<label for="kh" class="customer"></label>
					<div class="ub-f1">客户</div>
					<span @click="chooseCustomer()">小李</span>
					<img src="../../assets/my/icon_right.png" class="icon" @click="chooseCustomer()">
				</div>
				<div class="ub ub-ac term no-border input-choose">
					<input id="sk" type="radio" name="choose" value="temporary" v-model="customerType">
					<label for="sk" class="individual"></label>
					<div class="ub-f1">临时客户</div>					
				</div>
			</div>
			
			<!--货品信息-->
			<div class="order-detail item-table" v-if="otherInfo">
				<ul class="table-ul">
					<li class="title">
						<span>品名</span>
						<span>重量</span>
						<span>单价</span>
						<span>件数</span>
						<span>金额</span>
						<span>包装费</span>
					</li>
					<li class="con" v-for=" (goods,index) in goodsInfo" @click="goodsInfoSet(index,goods.goodId, goods.goodName, goods.sellUnit, goods.numUnit, goods.tid, trainsNum)" :key="goods.id">
						<span>{{goods.goodName}}</span>
						<span>{{goods.Weight}}</span>
						<span>{{goods.price}}</span>
						<span>{{goods.goodNum}}</span>
						<span>{{goods.goodAmount}}</span>
						<span>{{goods.packCost}}</span>
					</li>
				</ul>
			</div>
			<div class="order-detail" v-if="otherInfo">
				<div class="ub term" v-if="have_goodsunit"><!--待修改-----------、、、、、、、、、、、-->
					<div class="ub-f1">贷款费用</div>
					<div class="edu">￥{{totalCost.totalAmount}}</div>
				</div>
				<div class="ub term" v-if="have_goodsunit">
					<div class="ub-f1">包装费</div>
					<div class="edu">￥{{totalCost.totalPack}}</div>
				</div>
				<div class="ub term" v-if="have_goodsunit">
					<div class="ub-f1">过磅费</div>
					<div class="edu">￥{{totalCost.totalWeigh}}</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">三轮费</div>
					<div class="edu fare"><input type="text" @click="sanlunfei = true" v-model="totalCost.deliveryCost" placeholder="点击输入三轮费用"></div>
				</div>
				<div class="ub term">
					<div class="ub-f1">车号</div>
					<div class="F26C4c">{{plateNum}}</div>
				</div>
				<div class="ub term no-border" v-if="have_goodsunit">
					<div class="ub-f1">合计金额</div>
					<div class="total">￥{{totalCost.tatol}}</div>
				</div>
			</div>
			<!--付款方式  order_knot现结  order_credit赊账-->
			<div class="order-detail" v-if="otherInfo" id="orderTypes">
				<div class="ub ub-ac term right-icon input-choose">
					<input id="xj" type="radio" name="choosetype" value="order_knot" v-model="orderType">
					<label for="xj" class="individual"></label>
					<div class="ub-f1"></div>					
					<div>现结</div>					
				</div>
				<div class="ub ub-ac term no-border input-choose">
					<input id="sz" type="radio" name="choosetype" value="order_credit" v-model="orderType">
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
					<textarea class="" v-model="beizhu" placeholder="备注信息"></textarea>
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
				<div class="lefts ub-f1" @click="submitOrder('Y')" v-if="orderType == 'order_credit' ">暂存</div>  <!--选择为赊账的时候才展示暂存按钮-->
				<div class="center" v-if="orderType == 'order_credit' "></div>
				<div class="rights ub-f1" @click="submitOrder('N')">下单</div> <!--选择为现结的时候只展示下单按钮-->
			</div>

		</div>
		<!-- 设置价格模态框 -->
		<div class="dialoag" v-if="dialoags">
			<div class="dialoag_cont goods">
				<div class="goods-name ub ub-pc">{{goodName}}</div>
				<div class="goods-info">
					<div class="goods-item ub">
						<div class="ub-f1">单价</div>
						<mt-field label="" placeholder="请输入" type="number" v-model="goodsunit"></mt-field>
						<div>元 / {{goodsUnit}}</div>
					</div>
					<div class="goods-item ub">
						<div class="ub-f1">数量</div>
						<mt-field label="" placeholder="请输入" type="number" v-model="goodsnum"></mt-field>
						<div>{{goodsUnit}}</div>
					</div>
					<div class="goods-item ub">
						<div class="ub-f1">重量</div>
						<mt-field label="" placeholder="请输入" type="number" v-model="goodsweight"></mt-field>
						
						<div v-if="sellUnit == 'unit_pie'">{{goodsUnit}}</div>
						<select v-if="sellUnit != 'unit_pie' ">
							<option selected="false" value="1">斤</option>
							<option selected="true" value="2">公斤</option>
						</select>
						
					</div>
					<div class="goods-item ub">
						<div class="ub-f1">平板重</div>
						<mt-field label="" placeholder="请输入" type="number" v-model="pbweight"></mt-field>
						<div v-if="sellUnit == 'unit_pie'">{{goodsUnit}}</div>
						<select v-if="sellUnit != 'unit_pie' ">
							<option value="1">斤</option>
							<option value="2">公斤</option>
						</select>
					</div>
				</div>
				<mt-button type="primary" size="large" class="submit-btn" @click="submitGoodsInfo">确定</mt-button>
			</div>
		</div>
		<!-- 设置三轮费模态框 -->
		<div class="setSanlunfei" v-if="sanlunfei">
			<div class="dialoag_cont">
				<span>
					<input type="text" v-model="deliveryCost" placeholder="请输入三轮费"/>
				</span>
				<div class="btn ub">
					<div class="lefts" @click="sanlunfei = false ">取消</div>
					<div class="center"></div>
					<div class="rights" @click="setSanlunfei">确定</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
import Bus from '@/components/bus.js'
import {order} from '@/services/apis/order.js'
import Cookies from 'js-cookie'

//import Router from 'vue-router'
export default {

    data () {
        return {
        	numberNum:null,   //点击获取索引
			trainInfo: true,//车次模块--是否展示
			otherInfo: false,//其他模块--是否展示
			autographInfo: false,//签名--是否展示
			
			goodsInfo: [], //当前车次下的货品信息
			goodsInfoLength: null, //当前车次下的货品件数

			trainsNum: '点击选择车次', //车次信息展示
			plateNum: '获取车牌号',
			tid:'',//车次id
			
			//设置价格弹框
			dialoags: false,
			goodName: '',//显示货品信息-货品名称
            sellUnit: '', //显示货品信息-货品售卖单位, 提交订单所需,,
			goodsUnit: '', //显示货品信息-货品售卖单位转换

			//手动输入的每项货品的信息
			goodsunit: '', //设置货品价格-单价
			goodsnum: '',  //设置货品价格-数量
			goodsweight: '',  //设置货品价格-重量
			pbweight: '',  //设置货品价格-平板重, 提交订单所需
			goodId: '',//货品id, 提交订单所需
			numUnit: '',//重量单位, 提交订单所需
			have_goodsunit: true, //默认为false,用来判断每项货品是否填写了单价  -------------待修改
			
			//当前所设置货品的金额和包装费 
			goodsCosts: [], //货品价格计算返回数据
			
			//设置三轮费弹框
			sanlunfei: false,
			deliveryCost: null,
			
			//费用总和
			totalCost: {
				totalAmount: 0,  //贷款费用总和-金额总和
				totalPack: 0,  //包装费总和
				totalWeigh: 0,  //过磅费总和
				deliveryCost: null, //三轮费--手动输入
				tatol: 0,  //合计金额
			},
			
			//选择客户
			customerType: 'Nottemporary', //客户类型  默认为非临时客户
			customerId: null, //客户id 
			
			//判断现结、暂存订单
			orderType: 'order_knot', //默认为现结
			
			//备注信息
			beizhu: '',

        }
    },
    mounted () {
		this.getTrainInfor();
	},
	created(){
		
	},
    methods: {
		//重置单件货品下单数量和其他数据
		resetPriceNum(){
			this.goodsunit = '';
			this.goodsnum = '';
			this.goodsweight = '';
			this.pbweight = '';
		},
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
        		this.otherInfo = true;//其他信息展示
				this.autographInfo = true;//签名展示
				this.getTrain(this.tid);
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
					this.goodsInfoLength = response.data.results.length;
                    for(var i = 0, len = this.goodsInfo.length; i < this.goodsInfo.length; i ++){
                    	//列表中展示的项 非设置全部goodsInfo，部分题啊交订单所需项在货品设置弹框关闭后set添加
						this.goodsInfo[i]['price'] = 0; 
						this.goodsInfo[i]['goodNum'] = 0; 
						this.goodsInfo[i]['Weight'] = 0; 
						this.goodsInfo[i]['goodAmount'] = 0;
                        this.goodsInfo[i]['packCost'] = 0;
						this.goodsInfo[i]['weighCost'] = 0; //过磅费，表格里不展示，下方列表展示
                    }
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

		//设置货品重量件数信息的弹框
        goodsInfoSet(i,id, name, unit, numUnit, tid, trainsNum){
			this.numberNum=i;
        	this.dialoags = true;
        	this.goodId = id;//货品id 提交订单传参所需
        	this.goodName = name;
        	this.sellUnit = unit;//提交订单传参所需 售卖单位
        	this.numUnit = numUnit;//提交订单传参所需  重量单位
			if(this.sellUnit == 'unit_jin'){
				this.goodsUnit = '斤';
			}else if(this.sellUnit == 'unit_kg'){
				this.goodsUnit = '公斤';
			}else{
				//unit_pie 件
				this.goodsUnit = '件';
			};
        },
        
    	//单件货品信息录入验证和提交
    	// 保留小数点后两位数字/([0-9]+\.[0-9]{2})[0-9]*/  保留小数点后两位数字且为正 /^(([1-9]+)|([0-9]+\.[0-9]{1,2}))$/
    	submitGoodsInfo(){
    		if(this.goodsnum == '' ){
    			Toast({
					message: '请完善购买信息',
					position: 'middle',
					duration: 1000
    			});
    		}else if(!(new RegExp(/([0-9]+\.[0-9]{2})[0-9]*/).test(this.goodsnum))){
    			Toast({
					message: '请保留小数点后两位数字',
					position: 'middle',
					duration: 1000
    			});
    		}else if(this.goodsweight == '' ){
    			Toast({
					message: '请完善购买信息',
					position: 'middle',
					duration: 1000
    			});
    		}else if(!(new RegExp(/([0-9]+\.[0-9]{2})[0-9]*/).test(this.goodsweight))){
    			Toast({
					message: '请保留小数点后两位数字',
					position: 'middle',
					duration: 1000
    			});
    		}else if(this.pbweight == '' ){
    			Toast({
					message: '请完善购买信息',
					position: 'middle',
					duration: 1000
    			});
    		}else if(!(new RegExp(/([0-9]+\.[0-9]{2})[0-9]*/).test(this.pbweight))){
    			Toast({
					message: '请保留小数点后两位数字',
					position: 'middle',
					duration: 1000
    			});
    		}else{
    			if(this.goodsunit != ''){
	    			if(!(new RegExp(/([0-9]+\.[0-9]{2})[0-9]*/).test(this.goodsunit))){
		    			Toast({
							message: '请保留小数点后两位数字',
							position: 'middle',
							duration: 1000
		    			});
	    			}else{
						this.dialoags = false;
	    				this.getGoodsInformation();
	    			}
	    		}else{
	    			this.dialoags = false;
    				this.getGoodsInformation();
	    		}
    			
    		}
    	},
        
        //单件货品信息录入提交 
        getGoodsInformation(){
        	
			if(this.goodsunit == '' ){ 
				this.have_goodsunit = true; //false未填写单价则隐藏总贷款、包装、过磅、合计金额费用----------------待修改，逻辑不太对，只能判定最后一个
				
				//未填写单价则不调6.3接口（计算总贷款费用 和 合计费用的）,但是还要 
				this.$set(this.goodsInfo,this.numberNum,
					    {	goodName:this.goodName,
					     	Weight:this.goodsweight,
					     	price:this.goodsunit,
					     	goodNum:this.goodsnum,
					     	slabWeight:this.pbweight, //提交订单所需，列表不展示
					     	goodId:this.goodId, //提交订单所需，列表不展示
					     	weight_util:this.numUnit,
					     	sellUnit:this.sellUnit,//提交订单所需，列表不展示
					     	goodAmount: 0, //货品金额
					     	packCost: 0, //货品打包费
					     	weighCost: 0, //货品过磅费
					    });
			    this.resetPriceNum();
			}else{
				this.have_goodsunit = true;
	        	//获取当前所设置货品的金额和包装费的接口
				var params = {
					goodId: this.goodId,//单个货品id
					price: this.goodsunit,//单价
					goodNum: this.goodsnum,//件数
					weight: this.goodsweight,//重量
					weight_util: this.numUnit,//重量单位 
					sellUnit: this.sellUnit,//售卖单位 
					slabWeight: this.pbweight,//平板重
				};
				order.goodsCost(params)
					.then(response => {
						//货品价格计算返回数据
						this.goodsCosts = response.data.results;
						//console.log('包装费：'+this.goodsCosts.packCost+'， '+'金额：'+this.goodsCosts.goodAmount+'， '+' 过磅费：' + this.goodsCosts.weighCost);
						
						//		this.goodsInfo中下单所需货品参数 左：获取 ，右： 传参名
						//		this.goodId  货品id  goodId
						//		this.goodName 货品名称 goodName 
						//		this.goodsunit 货品单价 price
						//		this.goodsnum 货品件数 goodNum
						//		this.goodsweight 货品重量 Weight
						//		this.numUnit  重量单位 weight_util
						//		this.sellUnit  售卖单位  sellUnit
						//		this.pbweight 平板重  slabWeight						
						
						this.$set(this.goodsInfo,this.numberNum,
							    {	goodName:this.goodName,
							     	Weight:this.goodsweight,
							     	price:this.goodsunit,
							     	goodNum:this.goodsnum,
							     	slabWeight:this.pbweight, //提交订单所需，列表不展示
							     	goodId:this.goodId, //提交订单所需，列表不展示
							     	weight_util:this.numUnit,
							     	sellUnit:this.sellUnit,//提交订单所需，列表不展示
							     	goodAmount:response.data.results.goodAmount, //货品金额
							     	packCost:response.data.results.packCost, //货品打包费
							     	weighCost:response.data.results.weighCost, //货品过磅费
							    });
		    			//根据返回数据计算总和
	                    for(var i=0,len = this.goodsInfo.length; i<this.goodsInfo.length;i++){
							this.totalCost.totalAmount += this.goodsInfo[i]['goodAmount']; //总贷款费用
							this.totalCost.totalPack += this.goodsInfo[i]['packCost']; //总包装费
							this.totalCost.totalWeigh += this.goodsInfo[i]['weighCost']; //总过磅费
							this.totalCost.tatol = this.totalCost.totalAmount + this.totalCost.totalPack + this.totalCost.totalWeigh + this.totalCost.deliveryCost; //合计费用
	                    }
	                    console.log(this.goodsInfo)
						this.resetPriceNum();
					})
					.catch(function (response) {
						console.log(response);
					});
			}
        },
        
        //设置三轮费-确定按钮
        setSanlunfei(){
    		if(!(new RegExp(/^[0-9]*$/).test(this.deliveryCost))){
				Toast({
					message: '请输入数字',  //这里弹框的层级有问题  -------待修改
					position: 'middle',
					duration: 1000
    			});
    			return false;
    		}
        	this.sanlunfei = false;
        	this.totalCost.deliveryCost = Number(this.deliveryCost);
			this.totalCost.tatol = this.totalCost.totalAmount + this.totalCost.totalPack + this.totalCost.totalWeigh + this.totalCost.deliveryCost;
        },
        
		//选择客户
        chooseCustomer(){
        	Cookies.remove('chooseCustomer'); //应该写在选择客户不做选择直接返回时候的方法里-------------------------待修改
            this.$router.push({
            	name: 'client_order',
				params: {type: 'order'}
            });
        },
        //签名
        autograph(){
            this.$router.push({name: 'autograph'});
        },
		
        //下单
        submitOrder(szType){
        	if(this.customerType == 'Nottemporary'){
        		//非临时客户，赋值客户id 路由获取
        		this.customerId = Cookies.get('chooseCustomer');
        	}else if(this.customerType == 'temporary'){
        		//客户id为''
        		this.customerId = ''
        	}
        	//现结（下单）和赊账（暂存、下单）验证三轮车费
			if(this.totalCost.deliveryCost == '' || this.totalCost.deliveryCost == null){
    			Toast({
					message: '请输入三轮车费',  //输入的时候做是否为数字的验证，此处不需要了
					position: 'middle',
					duration: 1000
    			});
    			return false;
    		}
			
			
            this.goodsInfo.forEach(function (value, index) {
            	console.log(value)
            });
			//现结+赊账 至少有一项货品填写了下单信息
			if('判断整个表格是否都为空'){
				Toast({
					message: '请完善货品购买量信息',
					position: 'middle',
					duration: 1000
    			});
			}else{
    			//非 赊账暂存(szType != 'Y')时，判断填写了购买量的货品都填写了单价
    			if(szType != 'Y'){
    				if('判断 填过的货品都输入了价格'){
    					Toast({
							message: '请完善货品单价',
							position: 'middle',
							duration: 1000
		    			});
    				}
					
    			}
			}

        	var params = {
    			tid: this.tid,//车次if
    			cid: this.customerId,//客户id
    			deliveryCost: this.totalCost.deliveryCost,//三轮车费
    			tricycleNo: this.plateNum,//车号
    			orderType: this.orderType,//订单类型  order_knot：现结订单 order_credit：赊账订单
    			remark: this.beizhu,//备注
    			deposit: '',//赊账订单传入此参数  Y暂存 N普通
    			goods: this.goodsInfo,//货品信息
    			signature_name: 'qianming',//电子签名图片名称
    			signImg: 'qianming',//电子签名图片
        	};
        	if(this.orderType == 'order_knot'){
        		delete params.deposit; //现结-下单 不传deposit
			}else if(this.orderType == 'order_credit'){
	        	//赊账-下单  【deposit 赊账订单传入此参数  Y暂存, N普通】
        		params.deposit = szType;
        	};
        	order.submitorder(params)
        		.then(response => {
					console.log(response.data.results);
        		})
        		.catch(function (response) {
        			console.log(response);
        		});
        }
        
    },
    watch: {
        '$route'(to, from) {
			alert('..')
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
		.edu.fare{
			input{
				color: #333;
				font-size: 0.28rem;
				text-align: right;
			}
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
	.table-ul{
		width: 100%;
		font-size: 0.26rem;
		color: #4c4c4c;
		li{
			overflow: hidden;
			span{
				width: 16%;
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
		}
		.con{
			height: 0.7rem;
			line-height: 0.7rem;
			border-bottom: 1px solid #dedede;
			span{
				height: 0.7rem;
			}
		}
		li:last-child{
			border-bottom: none;
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

/*设置价格模态框*/
.dialoag{
	font-size: 0.26rem;
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	background: rgba(0, 0, 0, 0.6);
	z-index: 99;
	
	.dialoag_cont.goods{
		width: 80%;
		margin: 3rem auto 0;
		padding: 0.22rem 0 0.82rem;
		background: #fff;
		text-align: center;
		color: #666;
		font-size: 0.28rem;
		
		.goods-name{
			padding: 0 0.3rem;
			margin: 0.2rem 0;
			line-height: 0.95rem;
			background: #fff;
		}
		.goods-info{
			background: #fff;
			padding: 0 0.3rem;
			.goods-item{
				line-height: 0.95rem;
				border-bottom: 1px solid #dedede;
				div:last-child{
					min-width: 1.05rem;
					padding-left: 0.1rem;
					text-align: right;
				}
				.mint-field{
					width: 2rem;
					.mint-cell-wrapper{
						background: none !important;  /*不生效*/
					}
				}
				select{
					border: none;
					font-size: 0.28rem;
	    			color: #333;
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
	}
}
/*设置三轮费模态框*/
.setSanlunfei{
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