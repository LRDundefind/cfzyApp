<template>
	<div class="page-content">
		
		<div class="page-main">
			
			<mt-field label="货品名称" readonly disableClear v-model="form.goodName"></mt-field>
			<mt-field class="form.sellUnit" label="售卖单位" readonly>
				<select class="sellUnitSel m-l-10" v-model="form.sellUnit">
					<option value="unit_jin">斤</option>
					<option value="unit_kg">公斤</option>
					<option value="unit_pie">件</option>
				</select>
			</mt-field>
			<mt-field label="单价" placeholder="请输入单价" v-model="form.price"></mt-field>
			<mt-field label="件数" :placeholder="surplus" type="number" v-model="form.goodNum"><span class="m-l-10">件</span></mt-field>
			<mt-field label="重量" placeholder="请输入重量" type="number" v-model="form.weight">
				<select v-model="form.weight_util" class="m-l-10">
					<option value="unit_jin">斤</option>
					<option value="unit_kg">公斤</option>
				</select>
			</mt-field>
			<mt-field label="平板重" placeholder="请输入平板重" type="number" v-model="form.slabWeight">
				<span class="m-l-10">{{form.weight_util | sellNnit}}</span>
			</mt-field>
			<mt-field label="减水重" placeholder="" type="number" v-model="form.slushing">
				<select v-model="form.slushingUnit" class="m-l-10">
					<option value="unit_jin">斤/件</option>
					<option value="unit_kg">公斤/件</option>
				</select>
			</mt-field>
			<mt-field label="包装费" placeholder="" type="number" v-model="form.packCoef">
				<select v-model="form.packCoefUnit" class="m-l-10">
					<option value="unit_jin">元/斤</option>
					<option value="unit_kg">元/公斤</option>
					<option value="unit_pie">元/件</option>
				</select>
			</mt-field>
			<mt-field label="过磅费" placeholder="" type="number" v-model="form.poundCoef">
				<select v-model="form.poundCoefUnit " class="m-l-10">
					<option value="unit_jin">元/斤</option>
					<option value="unit_kg">元/公斤</option>
					<option value="unit_cbd">元/公担</option>
				</select>
			</mt-field>
			<div class='update clearfix'>
				<mt-button type="primary" size="large" class='f-l' @click="sure">确定</mt-button>
				<mt-button type="primary" size="large" class='f-l' @click="cancel">取消</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
import {order} from '@/services/apis/order.js'
import { Field } from 'mint-ui'
import { Toast } from 'mint-ui'
export default {
	name:'order-form',
    data () {
        return {

        	form:{
        		goodName:'',
        		goodId:'',
        		id:'',
        		price:'',
	        	goodNum:'',
	        	sellUnit:'斤',
	        	weight:'',
	        	weight_util:'斤',
	        	slabWeight: '',
	        	slushing:'',
	        	slushingUnit:'斤/件',
	        	packCoef:'',
	        	packCoefUnit:'元/斤',
	        	poundCoef:'',
	        	poundCoefUnit:'元/斤',
        	}
        	
        }
    },
    mounted () {
    	for (var Key1 in this.form){
    		for (var Key2 in this.$parent.post){
    			if (Key1 == Key2) this.form[Key1] = this.$parent.post[Key2]
    		}	
	    }
	    if(!this.form.slabWeight) this.form.slabWeight = '0';
    },
    computed: {
    	surplus:function(){
    		if (this.form.numUnit == 'unit_pie' && this.form.surplusNum) {
    			return this.form.surplusNum.toString();
    		}else{
    			return "请输入件数";
    		}
    	}
    },
    methods: {
    	//赊账规则
		getGoodInfo(){
			
		},
		sure(){
			if(this.form.goodNum == '' ){
    			Toast({
					message: '请完善购买信息（件数）',
					position: 'middle',
					duration: 1000
    			});
    		}else if(!(new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(this.form.goodNum)) || this.form.goodNum > 9999.99){
    			Toast({
					message: '请正确输入件数',
					position: 'middle',
					duration: 1000
    			});
    		}else if(this.form.weight == ''){
    			Toast({
					message: '请完善购买信息（重量）',
					position: 'middle',
					duration: 1000
    			});
    		}else if(!(new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(this.form.weight)) || this.form.weight > 9999.99){
    			Toast({
					message: '请正确输入重量',
					position: 'middle',
					duration: 1000
    			});
    		}else if(this.form.slabWeight == ''){
    			debugger
    			Toast({
					message: '请完善购买信息（平板重）',
					position: 'middle',
					duration: 1000
    			});
    		}else if(!(new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(this.form.slabWeight)) || this.form.slabWeight > 9999.99){
    			Toast({
					message: '请正确输入平板重',
					position: 'middle',
					duration: 1000
    			});
    		}else if(this.form.slushing == '' || !(new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(this.form.slabWeight)) || this.form.slabWeight > 999.99){
    			Toast({
					message: '请正确输入减水重',
					position: 'middle',
					duration: 1000
    			});
    		}else if(this.form.packCoef == '' || !(new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(this.form.packCoef)) || this.form.packCoef > 999.99){
    			Toast({
					message: '请正确输入包装费',
					position: 'middle',
					duration: 1000
    			});
    		}else if(this.form.poundCoef == '' || !(new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(this.form.poundCoef)) || this.form.poundCoef > 999.99){

    			Toast({
					message: '请正确输入过磅费',
					position: 'middle',
					duration: 1000
    			});
    		}else{
    			if(this.form.price != ''){
	    			if(!(new RegExp(/^[0-9]+(.[0-9]{1,2})?$/).test(this.form.price))|| this.form.price > 9999.99){
		    			Toast({
							message: '请正确输入单价',
							position: 'middle',
							duration: 1000
		    			});
	    			}else{
	    				this.getGoodsInformation();
	    			}
	    		}else{
    				this.getGoodsInformation();
	    		}
    			
    		}
		},
		getGoodsInformation(){
			this.$parent.totalCost.totalAmount = 0; //总货款费用
			this.$parent.totalCost.totalPack = 0; //总包装费
			this.$parent.totalCost.totalWeigh = 0; //总过磅费
			this.$parent.totalCost.tatol = 0
			order.goodsCost(this.form).then(response => {
				// console.log(this.$parent.goodsInfo)
				// console.log(this.$parent.numberNum)
				//通过是否写入单价的情况 判断是否显示总货款、包装、过磅、合计金额费用
				this.$parent.have_goodsunit = true;
				this.$parent.showOrderForm = false;


                var parent = this.$parent.goodsInfo[this.$parent.numberNum];
            	for (var n = 0; n < this.$parent.dataArray.length; n++) {
                	if (this.$parent.dataArray[n].id == this.form.id) {
                		this.$parent.dataArray[n] = this.form

                	}
                } this.$parent.dataArray.push(this.form)

                for (var j = 0; j < this.$parent.dataArray.length; j++) {
                	if (this.$parent.dataArray[j].id == parent.id) {}
                	parent.price = this.$parent.dataArray[j].price
                	parent.goodNum = this.$parent.dataArray[j].goodNum
                }
                
				parent.packCost = response.data.results.packCost
				parent.goodAmount = response.data.results.goodAmount
				parent.netWeight = response.data.results.netWeight
				parent.weighCost = response.data.results.weighCost
				parent.weight = this.form.weight
				parent.slabWeight = this.form.slabWeight
				

				//根据返回数据计算总和
                for(var i=0;i<this.$parent.goodsInfo.length;i++){
                	console.log(this.$parent.totalCost.totalAmount)
                	toNumber(this.$parent.goodsInfo[i]['goodAmount'])
                	toNumber(this.$parent.goodsInfo[i]['packCost'])
                	toNumber(this.$parent.goodsInfo[i]['weighCost'])
					this.$parent.totalCost.totalAmount += parseInt(this.$parent.goodsInfo[i]['goodAmount']); //总货款费用
					this.$parent.totalCost.totalPack += parseInt(this.$parent.goodsInfo[i]['packCost']); //总包装费
					this.$parent.totalCost.totalWeigh += parseInt(this.$parent.goodsInfo[i]['weighCost']); //总过磅费
					this.$parent.totalCost.tatol = this.$parent.totalCost.totalAmount + this.$parent.totalCost.totalPack + this.$parent.totalCost.totalWeigh + this.$parent.totalCost.deliveryCost;
                }
                
			})
		},
		cancel(){
			this.$parent.showOrderForm = false;
		},
		//判断数组中是否有某值
		inArray(arr,element){
			for (var i = 0; i < arr.length; i++) { 
			　　if (arr[i] == element) { 
			　　return true; 
			    } 
			} return false; 
		},
		//空字符串时转为0
		toNumber(str){
			if (str == '') {
				str = 0
			}
			return str
		}
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">

.mint-field-other{

	select{
		margin-left: 10px;
		width: 80px;
		height: 25px;
		line-height: 25px;
	}
}
.sellUnitSel{
	width: 200px;
}
.page-main{
	top: 0.8rem;
	bottom: 60px;
	overflow: scroll;
}
.update{
	background: #f5f5f5;
	width: 100%;
	.mint-button--primary:nth-child(2){
		background: url(../../assets/kehu_chakanxiaofeijilu_btn@2x.png) no-repeat center;
		background-size:contain;
		width: 46%;
		color:#33d57c;
		
		font-size: 0.3rem !important;
	}
	.mint-button--primary:nth-child(1){
		background: url(../../assets/kehu_gengxinziliao_btn@2x.png) no-repeat center;
		background-size:contain;
		width: 46%;
		margin:0 4%;
		font-size: 0.3rem !important;
	}
	padding:0.4rem 0 0.4rem 0;
	button{
		margin: 0 auto;
		height: 0.9rem;
	}
}
</style>