<template>
	<div class="page-content">
		<div class="pos-r wxy">
		<mt-header fixed  title="下单">
			<!--<router-link to="/ownerChoice" slot="left">
                <span class="c-3 f-s-16">{{gearName}}</span>
                <img class="header_img" src="../../assets/index/down_icon.png"/>
            </router-link>-->
            <div @click="szRulesDialoags" slot="right" v-if="!showAutograph">
                <span class="c-3 f-s-16">赊账规则</span>
            </div>
		</mt-header>
		</div>
		<!--下单-->
		
		<div class="page-main page-loadmore-wrapper" :class= "[showOrderForm? 'topScroll0' : 'topScroll'] ">
			<order-form v-if="showOrderForm" ref="orderForm" v-bind="post"></order-form>
			<div v-else>
				<div class="order-detail" v-if="trainInfo">
					<div class="ub ub-ac term no-border right-icon" @click="choosetrainNumber()">
						<div class="ub-f1">{{trainsNum}}</div>
						<span class="c-3 F26C4c">{{plateNum}}</span>
						<img src="../../assets/my/icon_right.png" class="icon">
					</div>
				</div>
				<div class="order-detail" v-if=" roleId == 'role_finance_sell'">
					<div class="ub ub-ac term no-border right-icon" @click="chooseSell()">
						<div class="ub-f1">卖手</div>
						<span class="c-3 F26C4c">{{selName}}</span>
						<img src="../../assets/my/icon_right.png" class="icon">
					</div>
				</div>
				<div class="order-detail" v-if="trainInfo" id="chooseCustomer">
					<div class="ub ub-ac term right-icon input-choose">
						<input id="kh" type="radio" name="choose" value="Nottemporary" v-model="customerType">
						<label for="kh" class="customer ub ub-pj">
							<div class="kehu f-l">客户</div>
							<img src="../../assets/my/icon_right.png" class="icon f-r" @click="chooseCustomer()">
							<span @click="chooseCustomer()" class="f-r">{{customerName}}</span>
						</label>
						
					</div>
					<div class="ub ub-ac term no-border input-choose">
						<input id="sk" type="radio" name="choose" value="temporary" v-model="customerType">
						<label for="sk" class="individual"><div class="kehu">临时客户</div></label>				
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
						<li class="con" v-for=" (goods,index) in goodsInfo" @click="goodsInfoSet(index, goods)" :key="goods.id">
							<span>{{goods.goodName}}</span>
							<span v-if="goods.netWeight == null">{{goods.weight}}</span>
							<span v-if="goods.netWeight != null">{{goods.netWeight}}</span>
							<span>{{goods.price || '' | numberRules}}</span>
							<span>{{goods.goodNum || '' | numberRules}}</span>
							<span v-if="goods.goodNum != ''">{{goods.goodAmount}}</span>
							<span v-if="goods.goodNum != ''">{{goods.packCost}}</span>
						</li>
					</ul>
				</div>
				<div class="order-detail" v-if="otherInfo">
					<div class="ub term" v-if="have_goodsunit">
						<div class="ub-f1">货款费用</div>
						<div class="edu"><span v-if="isPrice">--</span><span v-else>{{totalCost.totalAmount | keepTwoNum}}</span></div>
					</div>
					<div class="ub term" v-if="have_goodsunit">
						<div class="ub-f1">包装费</div>
						<div class="edu">{{totalCost.totalPack | keepTwoNum}}</div>
					</div>
					<div class="ub term" v-if="have_goodsunit">
						<div class="ub-f1">过磅费</div>
						<div class="edu">{{totalCost.totalWeigh | keepTwoNum}}</div>
					</div>
					<div class="ub term">
						<div class="ub-f1">三轮费</div>
						<div class="edu fare">
							<input type="text" @click="sanlunfei = true" v-model="totalCost.deliveryCost" readonly="readonly" placeholder="点击输入三轮费用">
						</div>
					</div>
					<div class="ub term no-border">
						<div class="ub-f1">车号</div>
						<input type="text" class="F26C4c trainNum" v-model="trainNumber" placeholder="请输入车号">
					</div>
					<div class="ub term border-top" v-if="have_goodsunit">
						<div class="ub-f1">合计金额</div>
						<div class="total"><span v-if="isPrice">--</span><span v-else>{{totalCost.tatol | keepTwoNum}}</span></div>
					</div>
				</div>
				<!--付款方式  order_knot现结  order_credit赊账-->
				<div class="order-detail" v-if="otherInfo" id="orderTypes">
					<div class="ub ub-ac term no-border right-icon input-choose">
						<input id="xj" type="radio" name="choosetype" value="order_knot" v-model="orderType">
						<label for="xj" class="individual"><div class="f-r">现结</div></label>
											
					</div>
					<div class="ub ub-ac term border-top input-choose" v-if="customerType == 'Nottemporary'"> <!--临时客户不可以赊账-->
						<input id="sz" type="radio" name="choosetype" value="order_credit" v-model="orderType">
						<label for="sz" class="individual"><div class="f-r">赊账</div></label>
											
					</div>
				</div>
				<!--备注信息-->
				<div class="order-detail" v-if="otherInfo">
					<div class="term">
						<div class="">备注</div>
					</div>
					<div class="term no-border">
						<textarea class="" v-model="beizhu" placeholder="备注信息，最多输入420个字符"></textarea>
					</div>
				</div>
				<!--签名-->
				<div class="order-detail" v-if="otherInfo && orderType == 'order_credit'">
					<div class="ub ub-ac term no-border right-icon" @click="goAutograph">
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
		</div>
		<!-- 设置价格模态框 -->
		<div class="dialoag" v-if="dialoags">
			<div class="dialoag_cont goods">
				<div @click="closeInfo" class="closeInfo">关闭</div>
				<div class="goods-name ub ub-pc">{{goodName}}</div>
				<div class="goods-info">
					<div class="goods-item ub ub-ac">
						<div>单价</div>
						<input placeholder="请输入" type="number" v-model="goodsunit" />
						<div>元 / {{goodsUnit}}</div>
					</div>
					<div class="goods-item ub ub-ac">
						<div>件数</div>
						<input :placeholder="surplusPiece || '请输入'" type="number" v-model="goodsnum" />
						<div>件</div><!--{{goodsUnit}}-->
					</div>
					<div class="goods-item ub ub-ac">
						<div>重量</div>
						<input :placeholder="surplusHeavy || '请输入'" type="number" v-model="goodsweight" />
						<div v-if="sellUnit != 'unit_pie'">{{goodsUnit}}</div>
						<select v-if="sellUnit == 'unit_pie' " v-model="sellUnitPie">
							<option>斤</option>
							<option>公斤</option>
						</select>
					</div>
					<div class="goods-item ub ub-ac">
						<div>平板重</div>
						<input placeholder="请输入" type="number" v-model="pbweight" /> <!--@focus="onfocus"-->
						<div v-if="sellUnit != 'unit_pie'">{{goodsUnit}}</div>
						<div v-if="sellUnit == 'unit_pie' ">{{sellUnitPie}}</div>
						<!--平板重单位跟随重量 不单独设置-->
						<!--<select v-if="sellUnit == 'unit_pie' "  v-model="sellUnitPie">
							<option>斤</option>
							<option>公斤</option>
						</select>-->
					</div>
					<div class="goods-item ub ub-ac">
						<div>减水重</div>
						<input readonly="readonly" v-model="slushing" />
						<div>斤 / 件</div>
					</div>
				</div>
				<mt-button type="primary" size="large" class="submit-btn" @click="submitGoodsInfo">确定</mt-button>
			</div>
		</div>
		<!-- 设置三轮费模态框 -->
		<div class="setSanlunfei" v-if="sanlunfei">
			<div class="dialoag_cont">
				<span>
					<input type="number" v-model="deliveryCost" placeholder="请输入三轮费" />
					<!--<mt-field label="" type="number" v-model="deliveryCost" placeholder="请输入三轮费"></mt-field>-->
				</span>
				<div class="btn ub">
					<div class="lefts" @click="sanlunfei = false ">取消</div>
					<div class="center"></div>
					<div class="rights" @click="setSanlunfei">确定</div>
				</div>
			</div>
		</div>
		<!-- 赊账规则模态框 -->
		<div class="setSanlunfei szRules" v-if="showRules">
			<div class="dialoag_cont">
				<div @click="showRules = false" class="close">关闭</div>
				<div class="name">赊账规则</div>
				<div class="content">{{rules.rules}}</div>
			</div>
		</div>
		<div class="autograph-con" v-if="showAutograph">
			<autograph @closeAutographCon = "closeAutograph" @autographInfo = "getAutographInfo" ref="autograph"></autograph>
		</div>
	</div>
</template>

<script>
import { Toast } from 'mint-ui'
import Bus from '@/components/bus.js'
import {order} from '@/services/apis/order.js'
import Cookies from 'js-cookie'
import Autograph from '@/components/Autograph/autograph'
import orderForm from '@/view/order/orderForm'
//import Router from 'vue-router'
export default {
	components: { Autograph, orderForm},
    data () {
        return {
        	roleId: Cookies.get('roleId'),
        	showOrderForm:false,
        	post:{},  //传递到表单的数据
        	dataArray:[],  //保存修改过数据
        	isPrice:false,  //判断是否有货品没有填写单价

        	gearName:'', //档位
        	
        	numberNum:null,   //点击获取索引
			trainInfo: true,//车次模块--是否展示
			otherInfo: false,//其他模块--是否展示
			
			goodsInfo: [], //当前车次下的货品信息
			goodsInfoLength: null, //当前车次下的货品件数

			trainsNum: '', //车次信息展示
			plateNum: '',
			tid:'',//车次id
			trainNumber: '',
			
			customerName: '', //客户信息
			
			showAutograph: false,//是否展示签名
			autographInfo: '',//客户签名
			
			//设置价格弹框
			dialoags: false,
			goodName: '',//显示货品信息-货品名称
            sellUnit: '', //显示货品信息-货品售卖单位, 提交订单所需,
			goodsUnit: '', //显示货品信息-货品售卖单位转换
			sellUnitPie: '斤',//显示货品信息-售卖单位为件时，设置重量单位和平板重单位
			set_weight_util: 'unit_jin',//售卖单位为件时，设置重量单位和平板重单位，计算货品价格、提交订单所需
			surplusPiece: '',//显示货品剩余量，入库单位为件时
			surplusHeavy: '',//显示货品剩余量，入库单位为斤/公斤时
			
			//手动输入的每项货品的信息
			goodsunit: '', //设置货品价格-单价
			goodsnum: '',  //设置货品价格-件数
			goodsweight: '',  //设置货品价格-重量
			pbweight: '0',  //设置货品价格-平板重, 提交订单所需  //需求：平板重默认为0
			goodId: '',//货品id, 提交订单所需
			id: '',//货品id, 提交订单所需
			slushing: '', //减水重，只作展示
			numUnit: '',//重量单位, 提交订单所需
			have_goodsunit: false, //默认为false,用来判断每项货品是否填写了单价

			
			//当前所设置货品的金额和包装费 
			goodsCosts: [], //货品价格计算返回数据
			
			//设置三轮费弹框
			sanlunfei: false,
			deliveryCost: null,
			
			//赊账规则弹框
			showRules: false,
			rules: [],
			
			//费用总和
			totalCost: {
				totalAmount: 0,  //货款费用总和-金额总和
				totalPack: 0,  //包装费总和
				totalWeigh: 0,  //过磅费总和
				deliveryCost: 0, //三轮费--手动输入 需求：默认为0
				tatol: 0,  //合计金额
			},

			//选择卖手
			sellId:'',
			selName:'',

			//选择客户
			customerType: 'Nottemporary', //客户类型  默认为非临时客户
			customerId: null, //客户id 
			
			//判断现结、暂存订单
			orderType: 'order_knot', //默认为现结
			
			//备注信息
			beizhu: '',
			
			//防止连续下单的变量
			permit: true,
        }
    },
    mounted () {
    	//console.log(this.goodsInfo)
    	//档位
    	if(JSON.parse(Cookies.get('gidOwnID_lists')).gearName){
            this.gearName = JSON.parse(Cookies.get('gidOwnID_lists')).gearName;
        }
		this.getChooseType();
	},
	created(){
		
	},
	updated(){
		
	},
	filters: {
		//输入的数字展示时的规范
		numberRules: function(value){
			//为0、0.1、0.01、 00、00.03、0003、0003.01
			value = value.replace(/^0+([0-9])/,'$1');
			return value;
		}
	},
    methods: {
		//重置单件货品下单件数和其他数据
		resetPriceNum(){
			this.goodsunit = '';
			this.goodsnum = '';
			this.goodsweight = '';
			this.pbweight = '0'; //需求：平板重默认为0
		},
		//重置各项费用总和-关闭弹框调取单项货品接口计算价格时使用
		resetTotalCost(){
			this.totalCost.totalAmount = 0;
			this.totalCost.totalPack = 0;
			this.totalCost.totalWeigh = 0;
			this.totalCost.tatol = this.totalCost.totalAmount + this.totalCost.totalPack + this.totalCost.totalWeigh + this.totalCost.deliveryCost; //合计费用
		},
		
		//赊账规则
		szRulesDialoags(){
			this.showRules = true;
			var params = {};
			order.creditRules(params)
				.then(response => {
					this.rules = response.data.results;
				})
				.catch(function (response) {
					console.log(response);
				});
		},
		
	    //选择车次
        choosetrainNumber(){
        	Cookies.remove('trainTid');//----------------------待修改
        	Cookies.remove('trainsNum');//----------------------待修改
        	Cookies.remove('plateNum');//----------------------待修改
            this.$router.push({name: 'trainList'});
        },
        //选择卖手
        chooseSell(){
        	this.$router.push({name: 'sellList'});
        	Cookies.remove('selName'); //----------------------待修改
			Cookies.remove('sellId'); //-----------------------待修改
        },
		//选择客户
        chooseCustomer(){
        	Cookies.remove('customerName'); //----------------------待修改
			Cookies.remove('customerId'); //-----------------------待修改
			Cookies.set('froms','Y');
            this.$router.push({name: 'client_order', params: {type: 'order'}});
        },
        //选择完车次后获取车次货品详细信息
        getChooseType(){ 
        	//获取车次信息
    		this.tid = Cookies.get('trainTid');
    		this.trainsNum = Cookies.get('trainsNum') || '点击选择车次';
    		this.plateNum = Cookies.get('plateNum') || '获取车牌号';
        	if(this.tid){
        		this.otherInfo = true;//其他信息展示
				this.getTrain(this.tid);
        	}else{
        		console.log('没有选择车次')
        	}
        	//获取卖手信息
        	this.sellId = Cookies.get('sellId')
        	this.selName = Cookies.get('selName') || '点击选择卖手'
        	//获取客户信息
        	this.customerName = Cookies.get('customerName')  || '选择客户';
        	this.customerId = Cookies.get('customerId');
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
                    	//初始不添加goodName,googId
						this.goodsInfo[i]['price'] = ''; 
						this.goodsInfo[i]['goodNum'] = ''; 
						this.goodsInfo[i]['weight'] = ''; 
						this.goodsInfo[i]['goodAmount'] = '';
                        this.goodsInfo[i]['netWeight'] = ''; //净重 用于页面展示
                        this.goodsInfo[i]['slushing'] = this.goodsInfo[i].slushing; //减水重 用于页面展示
                        this.goodsInfo[i]['packCost'] = '';
						this.goodsInfo[i]['weighCost'] = ''; //过磅费，表格里不展示，下方列表展示
						this.goodsInfo[i]['slabWeight'] = ''; //平板重 提交订单所需，列表不展示
						this.goodsInfo[i]['weight_util'] = this.goodsInfo[i].sellUnit; //重量单位，提交订单所需，列表不展示    //若按重量售卖，则重量单位为售卖单位????   待修改
                        this.goodsInfo[i]['sellUnit'] = this.goodsInfo[i].sellUnit ; //售卖单位，列表不展示
                        this.goodsInfo[i]['numUnit'] = this.goodsInfo[i].numUnit; //入库单位，列表不展示
                    }
					if(response.data.error_code == '204'){
						this.otherInfo = false;//其他信息
						console.log(response.data.error_msg);
					}
				})
				.catch(function (response) {
					console.log(response);
				});
		},
		//获取焦点-填写货品信息
		onfocus(){
			
		},
		//设置货品重量件数信息的弹框
        goodsInfoSet(i, goods){
        	
        	//提示优先选择客户--在选中了非临时客户的时候
        	if(this.customerType == 'Nottemporary' && this.customerId == undefined){
				Toast({
					message: '请优先选择客户',
					position: 'middle',
					duration: 3000
    			});
        	}else{
        		if (this.dataArray != []) {
        			for (var j = 0; j < this.dataArray.length; j++) {
	        			if (this.dataArray[j].id == goods.id) {
	        				goods = this.dataArray[j]
	        			
	        			}
	        		} 
        		}
        		

        		this.showOrderForm = true;
        		this.post = goods;
        		this.numberNum = i;
        	}
   //      	this.dialoags = true;
   //      	this.goodId = goodid;//货品id 提交订单传参所需
   //      	this.id = id;//货品id 提交订单传参所需
   //      	this.goodName = name;
   //      	this.sellUnit = sellunit;//提交订单传参所需 售卖单位
   //      	this.numUnit = numUnit;//提交订单传参所需  重量单位
   //      	this.slushing = slushing;//减水重 只作展示，
   //      	if(numUnit == 'unit_pie'){
   //      		this.surplusHeavy = '';
   //      		this.surplusPiece = surplusNum; // 入库单位为件时，在件数位置-显示货品剩余量
   //      	}else{
   //      		this.surplusPiece = '';
   //      		this.surplusHeavy = surplusNum; // 入库单位为斤/公斤时，在重量位置-显示货品剩余量
   //      	}

			// if(this.sellUnit == 'unit_jin'){
			// 	this.goodsUnit = '斤';
			// }else if(this.sellUnit == 'unit_kg'){
			// 	this.goodsUnit = '公斤';
			// }else{
			// 	//unit_pie 件
			// 	this.goodsUnit = '件';
			// 	this.goodsweight = '0'; //入库单位为件时，重量默认输入0  //不需要在resetPriceNum中设置
			// };
			
			// //编辑弹框的值  price 单价 、goodNum 件数、weight 重量、slabWeight 平板重
			// if(this.goodsInfo[i].goodNum != null){
			// 	this.goodsunit = this.goodsInfo[i].price;
			// 	this.goodsnum = this.goodsInfo[i].goodNum;
			// 	this.goodsweight = this.goodsInfo[i].weight;
			// 	this.pbweight = this.goodsInfo[i].slabWeight;
			// 	this.slushing = this.goodsInfo[i].slushing;
				
			// }
		},
        
    	//单件货品信息录入验证和提交
    	submitGoodsInfo(){
    		if(this.goodsnum == '' ){
    			Toast({
					message: '请完善购买信息（件数）',
					position: 'middle',
					duration: 1000
    			});
    		}else if(!(new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(this.goodsnum)) || this.goodsnum > 9999.99){
    			Toast({
					message: '请正确输入件数',
					position: 'middle',
					duration: 1000
    			});
    		}else if(this.goodsweight == ''){
    			Toast({
					message: '请完善购买信息（重量）',
					position: 'middle',
					duration: 1000
    			});
    		}else if(!(new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(this.goodsweight)) || this.goodsweight > 9999.99){
    			Toast({
					message: '请正确输入重量',
					position: 'middle',
					duration: 1000
    			});
    		}else if(this.pbweight == ''){
    			Toast({
					message: '请完善购买信息（平板重）',
					position: 'middle',
					duration: 1000
    			});
    		}else if(!(new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(this.pbweight)) || this.pbweight > 9999.99){
    			Toast({
					message: '请正确输入平板重',
					position: 'middle',
					duration: 1000
    			});
    		}else{
    			if(this.goodsunit != ''){
	    			if(!(new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(this.goodsunit))|| this.goodsunit > 9999.99){
		    			Toast({
							message: '请正确输入单价',
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
        	//通过是否写入单价的情况 判断是否显示总货款、包装、过磅、合计金额费用
			this.have_goodsunit = true;
			
			//售卖单位为件时，设置重量单位和平板重单位
			if(this.sellUnit == 'unit_pie'){
				if(this.sellUnitPie == '斤'){
					this.set_weight_util = 'unit_jin';
				}else if(this.sellUnitPie == '公斤'){
					this.set_weight_util = 'unit_kg';
				}
			}else{
				this.set_weight_util = this.sellUnit;
			}
			
			//未填写单价，不计算当前所设置货品的货款包装过磅费，不计算合计金额
			if(this.goodsunit == '' ){ 
				this.have_goodsunit = false;
				//未填写单价则不调6.3接口（计算总货款费用 和 合计费用的）,但是还是要set 
				this.$set(this.goodsInfo,this.numberNum,
					    {	goodName:this.goodName,
					     	goodId:this.goodId, //提交订单所需，列表不展示
					     	id:this.id, //提交订单所需，列表不展示
					     	price:this.goodsunit,
					     	goodNum:this.goodsnum,
					     	weight:this.goodsweight,
					     	goodAmount: null, //货品金额
					     	netWeight: null, //净重
					     	slushing: this.slushing, //减水重
					     	packCost: null, //货品打包费
					     	weighCost: null, //货品过磅费 下方列表展示
					     	slabWeight:this.pbweight, //提交订单所需，列表不展示
					     	weight_util:this.set_weight_util,  //重量单位，提交订单所需，列表不展示
					     	sellUnit:this.sellUnit,  //售卖单位，提交订单所需，列表不展示
					     	numUnit:this.numUnit,  //入库单位，列表不展示
					    });
					    //console.log(this.goodsInfo)
				//重置弹框数据
			    this.resetPriceNum(); 
			    //重置各项价格总和
			    this.resetTotalCost();
			}else{
	        	//填写单价，计算当前所设置货品的货款包装过磅费， 
				var params = {
					goodId: this.goodId,//单个货品id
					id: this.id,//单个货品id
					price: this.goodsunit,//单价
					goodNum: this.goodsnum,//件数
					weight: this.goodsweight,//重量
					weight_util: this.set_weight_util,//重量单位 
					sellUnit: this.sellUnit,//售卖单位 
					slabWeight: this.pbweight,//平板重
				};
				order.goodsCost(params)
					.then(response => {
						
						//重置各项价格总和
						this.resetTotalCost();
						
						//货品价格计算返回数据
						this.goodsCosts = response.data.results;
						//console.log('包装费：'+this.goodsCosts.packCost+'， '+'金额：'+this.goodsCosts.goodAmount+'， '+' 过磅费：' + this.goodsCosts.weighCost);
						
						//		this.goodsInfo中下单所需货品参数对照表  勿删，，， 左：获取 ，右： 传参名
						//		this.goodId  货品id  goodId
						//		this.id  货品id  id
						//		this.goodName 货品名称 goodName 
						//		this.goodsunit 货品单价 price
						//		this.goodsnum 货品件数 goodNum
						//		this.goodsweight 货品重量 Weight
						//		this.numUnit  重量单位 weight_util
						//		this.sellUnit  售卖单位  sellUnit
						//		this.pbweight 平板重  slabWeight						
						
						this.$set(this.goodsInfo,this.numberNum,
							    {	goodName:this.goodName,
							     	goodId:this.goodId, //提交订单所需，列表不展示
							     	id:this.id, //提交订单所需，列表不展示
							    	price:this.goodsunit,
							     	goodNum:this.goodsnum,
							     	weight:this.goodsweight,
							     	goodAmount:response.data.results.goodAmount, //货品金额
							     	netWeight:response.data.results.netWeight, //净重
					     			slushing: this.slushing, //减水重
							     	packCost:response.data.results.packCost, //货品打包费
							     	weighCost:response.data.results.weighCost, //货品过磅费 下方列表展示
							     	slabWeight:this.pbweight, //提交订单所需，列表不展示
							     	weight_util:this.set_weight_util,  //重量单位，提交订单所需，列表不展示
							     	sellUnit:this.sellUnit,  //售卖单位，提交订单所需，列表不展示
							     	numUnit:this.numUnit,  //入库单位，列表不展示
							    });
		    			//根据返回数据计算总和
	                    for(var i=0,len = this.goodsInfo.length; i<this.goodsInfo.length;i++){
							this.totalCost.totalAmount += this.goodsInfo[i]['goodAmount']; //总货款费用
							this.totalCost.totalPack += this.goodsInfo[i]['packCost']; //总包装费
							this.totalCost.totalWeigh += this.goodsInfo[i]['weighCost']; //总过磅费
							this.totalCost.tatol = this.totalCost.totalAmount + this.totalCost.totalPack + this.totalCost.totalWeigh + this.totalCost.deliveryCost;
	                    }
						
	                    //重置弹框数据
						this.resetPriceNum();
	                    
	                    //判断是否展示合计金额等项
		                for(var i = 0, len = this.goodsInfo.length; i < this.goodsInfo.length; i ++){
		                	if(this.goodsInfo[i].weight != '' && this.goodsInfo[i].price == ''){
								this.have_goodsunit = false;
		                	}else{
		                		this.have_goodsunit = true;
		                	}
		                }

					})
					.catch(function (response) {
						console.log(response);
					});
			}
			
        },
        //关闭输入信息的按钮
        closeInfo(){
        	//重置弹框数据
			this.resetPriceNum();
        	this.dialoags = false;
        },
        //设置三轮费-确定按钮
        setSanlunfei(){
        	if(!(new RegExp(/^(0|[1-9][0-9]*)$/).test(this.deliveryCost)) || this.deliveryCost > 9999){
    			Toast({
					message: '请输入正确整数',
					position: 'middle',
					duration: 1000
    			});
    			return false;
    		}
        	this.sanlunfei = false;
        	this.totalCost.deliveryCost = Number(this.deliveryCost);
			this.totalCost.tatol = this.totalCost.totalAmount + this.totalCost.totalPack + this.totalCost.totalWeigh + this.totalCost.deliveryCost;
        },
        
        //签名
        goAutograph(){
        	this.showAutograph = true;
        },
        //接收事件 ：签名页返回按钮-实质是关闭弹框
        closeAutograph(){
			this.showAutograph = false;    	
        },
		//接收事件 ：关闭弹框 并 获取签名信息
		getAutographInfo(val){
			this.autographInfo = val;
			this.showAutograph = false; 
		},
        //下单
        submitOrder(szType){

        	if(this.customerType == 'Nottemporary'){
        		//非临时客户，赋值客户id 路由获取
        		this.customerId = Cookies.get('customerId');
        		if(this.customerName == '选择客户'){
					Toast({
						message: '请选择客户',
						position: 'middle',
						duration: 1000
	    			});
        			return false;
        		}
        	}else if(this.customerType == 'temporary'){
        		//客户id为''
        		this.customerId = ''
        	}

			//填写的购买货品的总件数 以此判断至少有一项货品填写了下单信息
			var buyNum = false; //件数
			var bugWigth = false; //重量
			for(var index in this.goodsInfo){
				if (this.goodsInfo[index].goodNum != '') buyNum = true
				if (this.goodsInfo[index].weight != '') bugWigth = true
			}

			//现结+赊账 至少填写了一项货品信息
			if(!buyNum && !buyNum){
				Toast({
					message: '请完善货品购买量信息',
					position: 'middle',
					duration: 1000
    			});
    			return false;
			}
			//非 赊账暂存(szType != 'Y')时，判断填写了重量的货品都填写了单价
			if(szType != 'Y'){
                for(var i = 0, len = this.goodsInfo.length; i < this.goodsInfo.length; i ++){
                	if(this.goodsInfo[i].weight != '' && this.goodsInfo[i].price == ''){
						Toast({
							message: '请完善货品单价',
							position: 'middle',
							duration: 1000
		    			});
						return false;
                	}
                }
			}

        	//现结（下单）和赊账（暂存、下单）验证三轮车费
			if(this.totalCost.deliveryCost == null){
				//console.log(this.totalCost.deliveryCost)
    			Toast({
					message: '请输入三轮费',  //输入的时候做是否为数字的验证，此处不需要了
					position: 'middle',
					duration: 1000
    			});
    			return false;
    		}
			
			//非临时客户赊账时，验证是否签名了--2018.5.22暂时设置为非必传
//      	if(this.orderType == 'order_credit' && this.autographInfo == ''){
//      		Toast({
//					message: '请签名',
//					position: 'middle',
//					duration: 1000
//  			});
//      		return false;
//      	}
        	
        	if(this.beizhu.length > 420){
        		Toast({
					message: '备注字数请不要超出规定字数',
					position: 'middle',
					duration: 1000
    			});
        		return false;
        	}
        	if (this.permit == false) return false; //this.permit控制是否下单的变量，防止连续下单
        	var params = {
        		sellId: this.sellId, //卖手id
    			tid: this.tid,//车次if
    			cid: this.customerId,//客户id
    			deliveryCost: this.totalCost.deliveryCost,//三轮车费
    			tricycleNo: this.trainNumber,//车号
    			orderType: this.orderType,//订单类型  order_knot：现结订单 order_credit：赊账订单
    			remark: this.beizhu,//备注
    			deposit: 'N',//是否暂存 Y暂存 N普通
    			goods: this.goodsInfo,//货品信息
    			signImg: this.autographInfo,//电子签名
        	};
        	if(this.orderType == 'order_knot'){
        		delete params.deposit; //现结-下单 不传deposit
        		delete params.signImg; //现结-下单 不签名
			}else if(this.orderType == 'order_credit'){
	        	//赊账-下单  【deposit 赊账订单传入此参数  Y暂存, N普通】
        		params.deposit = szType;
        		params.signImg = this.autographInfo;//赊账签名
        	};

        	this.permit = false;
        	
        	order.submitorder(params)
        		.then(response => {
        			this.permit = true;
        			Toast({
						message: '下单成功',
						position: 'middle',
						duration: 2000
	    			});
					//下单成功跳转至首页
		            this.$router.push({
		            	name: 'home',
						params: {type: 'home'}
		            });
        		})
        }
        
    },
    watch: {
    	//选中临时客户后
    	'customerType': function(newVal, oldVal){
    		if(newVal == 'temporary'){
    			
    			//删掉已选的客户 并清除Cookies
				Cookies.remove('customerId');
        		this.customerName = '选择客户';
        		
        		//确保默认选中现结 而非赊账
        		this.orderType = 'order_knot';
    		}
    		//console.log(this.orderType)
    	},
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
.page-loadmore-wrapper{
   overflow: scroll;
    -webkit-overflow-scrolling : touch;
}
.topScroll{
    height: calc(100vh - 100px);
    top: 40px;
    bottom: 60px;
}
.topScroll0{
    height: calc(100vh - 40px);
    top: 40px;
    bottom: 0rem;
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
		    line-height: 0.38rem;
    		margin-top: 0.2rem;
    		word-break: break-all;
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
		.trainNum{
			color: #333;
		    font-size: 0.28rem;
		    text-align: right;
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
			display: block;
			margin-right: 0.26rem;
			width: 100%;
			cursor: pointer;
		    background: url(../../assets/xiadan_weixuanzhong_btn@2x.png) no-repeat left center;
		    background-size: auto 0.42rem;
		    div{
		    	line-height: 0.96rem;
		    	color: #333;
		    	font-size: 0.28rem;
		    }
		    .kehu{
				padding-left: 0.68rem;
		    }
		}
		input[type='radio']:checked+label{
		    background: url(../../assets/xiadan_xuanzhong_btn@2x.png) no-repeat left center;
		    background-size: auto 0.42rem;
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
			display: inline-block;
			margin-top: 0.3rem;
		}
		span{
			margin: 0 .2rem 0 .15rem;
		}
	}
	.term.no-border{
		border-bottom: none;
	}
	.term.border-top{
		border: none;
		border-top: 1px solid #dedede;
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
			padding: 0.2rem 0;
			overflow: hidden;
			span{
				width: 16%;
				display: block;
				float: left;
			}
			span:first-child{
				padding-left: 0.25rem;
				word-wrap: break-word;
				/*text-overflow:ellipsis;
				overflow:hidden;
				white-space:nowrap;*/ 
				word-break: break-all;
			    text-overflow: ellipsis;
			    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
			    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
			    -webkit-line-clamp: 2; /** 显示的行数 **/
			    overflow: hidden;  /** 隐藏超出的内容 **/
			}
		}
		.title{
			height: 0.6rem;
			line-height: 0.6rem;
			background: #f2f2f2;
		}
		.con{
			/*height: 0.7rem;*/
			/*line-height: 0.7rem;*/
			border-bottom: 1px solid #dedede;
			display: flex;
		    
		    align-items: Center;
		}
		li:last-child{
			border-bottom: none;
		}
	}
}
.orderBtn{
	padding: 0 0.3rem;
	margin: 0.27rem 0 0.3rem;
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
		margin: 1.6rem auto 0;
		padding: 0.02rem 0 0.22rem;
		background: #fff;
		text-align: center;
		color: #666;
		font-size: 0.28rem;
		.closeInfo{
			float: right;
    		margin-right: 0.3rem;
    		margin-top: 0.1rem;
		}
		.goods-name{
			clear: both;
			padding: 0 0.3rem;
			margin: 0.2rem 0;
			line-height: 0.5rem;
			background: #fff;
			font-size: 0.3rem;
			color: #333;
		}
		.goods-info{
			background: #fff;
			padding: 0 0.6rem;
			.goods-item{
				line-height: 0.8rem;
				border-bottom: 1px solid #dedede;
				padding: 0 0.2rem;
				div:first-child{
					width: 30%;
					text-align: left;
					text-indent: 0.15rem;
				}
				div:last-child{
					min-width: 1.05rem;
					padding-left: 0.1rem;
					text-align: right;
				}
				/*.mint-field{
					width: 2rem;
					.mint-cell-wrapper{
						background: none !important;
					}
				}*/
				input{
					font-size: 0.26rem;
					color: #808080;
					color: #666;
					width: 1.8rem;
				}
				select{
				    min-width: 1.05rem;
					border: none;
					font-size: 0.28rem;
	    			color: #666;
				}
			}
		}
		.submit-btn{
			width: 55%;
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
	z-index: 999;
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
				height: 0.7rem;
				font-size: 0.24rem;
				font-family: "microsoft yahei";
				/*font-family: 'SimSun';*//*SimHei NSimSun FangSong*/
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
/*赊账规则*/
.szRules{
	.dialoag_cont{
		box-sizing: border-box;
		margin: 2rem auto 0;
	    padding: 0.3rem;
	    text-align: center;
		font-size: 0.28rem;
		position: relative;
		.close{
			width: 1rem;
			line-height: 0.5rem;
			position: absolute;
			right: 0.1rem;
			top: 0.15rem;
		}
		.name{
			font-size: 0.3rem;
			line-height: 3;
		}
		.content{
			word-break: break-all;
			line-height: 1.5;
			text-align: left;
			height: 5rem;
			overflow: scroll;
		    padding-left: 0.1rem;
		}
	}
}
/*签名*/
.autograph-con{
	font-size: 0.26rem; 
	width: 100%; 
	height: 100%; 
	position: fixed; 
	left: 0; 
	top: 0; 
	background: rgba(0, 0, 0, 0.6); 
	z-index: 99;
}
</style>