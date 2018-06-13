<template>

	<div style="background: #f5f5f5;height: 100%;">
		
		<mt-field label="货品名称" readonly disableClear v-model="form.goodName" class="order-p-120 order-border"></mt-field>
		<mt-field class="form.sellUnit order-border" label="售卖单位" readonly>
			<select class=" m-l-10 jin-select" v-model="form.sellUnit">
				<option value="unit_jin">斤</option>
				<option value="unit_kg">公斤</option>
				<option value="unit_pie">件</option>
			</select>

            <img class="jin-right"
                 src="../../assets/index/gray-right-icon.png"/>

		</mt-field>
		<mt-field class=" order-p-120 order-border" label="单价" placeholder="请输入单价" type="number" v-model="form.price"></mt-field>
		<mt-field class="order-border" label="件数" :placeholder="surplus" type="number" v-model="form.goodNum"><span class="f-s-15 m-l-10 c-6">件</span></mt-field>
		<mt-field label="重量" placeholder="请输入重量" type="number" v-model="form.weight">
			<select v-model="form.weight_util" class="m-l-10 jin-select">
				<option value="unit_jin">斤</option>
				<option value="unit_kg">公斤</option>
			</select>
            <img class="jin-right"
                 src="../../assets/index/gray-right-icon.png"/>

		</mt-field>
		<mt-field class="order-m-20 order-border" label="平板重" placeholder="请输入平板重" type="number" v-model="form.slabWeight">
			<span class="m-l-10 c-6 f-s-15">{{form.weight_util | sellNnit}}</span>
		</mt-field>
		<mt-field class="order-border" label="减水重" placeholder="" type="number" v-model="form.slushing">
			<select v-model="form.slushingUnit" class="m-l-10">
				<option value="unit_jin">斤/件</option>
				<option value="unit_kg">公斤/件</option>
			</select>

            <img class="jin-right"
                 src="../../assets/index/gray-right-icon.png"/>

		</mt-field>
		<mt-field class="order-border" label="包装费" placeholder="" type="number" v-model="form.packCoef">
			<select v-model="form.packCoefUnit" class="m-l-10">
				<option value="unit_jin">元/斤</option>
				<option value="unit_kg">元/公斤</option>
				<option value="unit_pie">元/件</option>
			</select>
            <img class="jin-right"
                 src="../../assets/index/gray-right-icon.png"/>

		</mt-field>
		<mt-field label="过磅费" placeholder="" type="number" v-model="form.poundCoef">
			<select v-model="form.poundCoefUnit " class="m-l-10">
				<option value="unit_jin">元/斤</option>
				<option value="unit_kg">元/公斤</option>
				<option value="unit_cbd">元/公担</option>
			</select>
            <img class="jin-right"
                 src="../../assets/index/gray-right-icon.png"/>
		</mt-field>
		<div class='update clearfix'>
			<mt-button type="primary" size="large" class='f-l' @click="sure">确定</mt-button>
			<mt-button type="primary" size="large" class='f-l' @click="cancel">取消</mt-button>
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
	    				this.$parent.isPrice = false;
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
				parent.sellUnit = this.form.sellUnit
				parent.weight = this.form.weight
				parent.slabWeight = this.form.slabWeight
				parent.weight_util = this.form.weight_util
				parent.slushing = this.form.slushing
				parent.slushingUnit = this.form.slushingUnit
				parent.packCoef = this.form.packCoef
				parent.packCoefUnit = this.form.packCoefUnit
				parent.poundCoef = this.form.poundCoef
				parent.poundCoefUnit = this.form.poundCoefUnit

				//根据返回数据计算总和
                for(var i=0;i<this.$parent.goodsInfo.length;i++){
                	
                	if (this.$parent.goodsInfo[i].goodNum !='' && this.$parent.goodsInfo[i].price == '') {
                		//console.log(this.$parent.goodsInfo[i])
						this.$parent.isPrice = true
					}
                	if(this.$parent.goodsInfo[i]['goodAmount'] == '') this.$parent.goodsInfo[i]['goodAmount'] = 0
                	if(this.$parent.goodsInfo[i]['packCost'] == '') this.$parent.goodsInfo[i]['packCost'] = 0
                	if(this.$parent.goodsInfo[i]['weighCost'] == '') this.$parent.goodsInfo[i]['weighCost'] = 0

					this.$parent.totalCost.totalAmount += parseInt(this.$parent.goodsInfo[i]['goodAmount']); //总货款费用
					this.$parent.totalCost.totalPack += parseInt(this.$parent.goodsInfo[i]['packCost']); //总包装费
					this.$parent.totalCost.totalWeigh += parseInt(this.$parent.goodsInfo[i]['weighCost']); //总过磅费
					this.$parent.totalCost.tatol = this.$parent.totalCost.totalAmount + this.$parent.totalCost.totalPack + this.$parent.totalCost.totalWeigh + this.$parent.totalCost.deliveryCost;
                }
                //console.log(parent.packCost)
			})
		},
		cancel(){
			this.$parent.showOrderForm = false;
		}
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">

    .order-border{
        border-bottom: 1px #f0f0f0 solid!important;
    }



     .mint-cell-wrapper{
         padding: 10px 0 0 !important;
         border-bottom: 1px #f0f0f0 solid!important;

     }

     .order-p-120{
         padding-right: 1.05rem;
     }
     .order-m-20{
         margin-top: 0.2rem;
     }
.mint-field-other{
    .jin-right{
        position: absolute;
        width: 0.18rem;
        right: 0;
        top: 11px;
    }

    .jin-select{
        width: 0.85rem;
    }
	select{
        font-size: 0.30rem;
        position: relative;
		margin-left: 10px;
		width: 1.3rem;
		height: 40px;
		line-height: 40px;
        border: none;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background-size: 0.9rem 0.9rem;
        color: #666666;
        outline: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        background-color: #fff;
	}
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