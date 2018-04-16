<template>
	<div class="page-content">
		<mt-header fixed  title="货品信息">
			<router-link to="/" slot="left">
			    <mt-button icon="back" @click="$router.go(-1)"></mt-button>
			</router-link>
		</mt-header>
		<!--货品信息-->
		<div class="page-main goods">
			<div class="goods-name ub">
				<div class="ub-f1">货品</div>
				<div>{{goodName}}</div>
			</div>
			<div class="goods-info">
				<div class="goods-item ub">
					<div class="ub-f1">单价（下单必填）</div>
					<mt-field label="" placeholder="请输入" type="number" v-model="goodsunit"></mt-field>
					<div>元 / {{goodsUnit}}</div>
				</div>
				<div class="goods-item ub">
					<div class="ub-f1">数量（必填）</div>
					<mt-field label="" placeholder="请输入" type="number" v-model="goodsnum"></mt-field>
					<div>{{goodsUnit}}</div>
				</div>
				<div class="goods-item ub">
					<div class="ub-f1">重量（必填）</div>
					<mt-field label="" placeholder="请输入" type="number" v-model="goodsweight"></mt-field>
					
					<div v-if="sellUnit == 'unit_pie'">{{goodsUnit}}</div>
					<select v-if="sellUnit != 'unit_pie' ">
						<option selected="false" value="1">斤</option>
						<option selected="true" value="2">公斤</option>
					</select>
					
				</div>
				<div class="goods-item ub">
					<div class="ub-f1">平板重（必填）</div>
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
</template>

<script>
import { Toast } from 'mint-ui'
import Cookies from 'js-cookie'
export default {

    data () {
        return {
        	goodsunit: '',//设置货品单价
            goodsnum:'',//设置货品数量
            goodsweight: '',//设置货品重量
            pbweight: '',//设置平板重
            
            goodName: '',//货品名称
            goodId: '',//货品id
            sellUnit: '', //货品售卖单位
            goodsUnit: '', //货品售卖单位转换
        }
    },
    mounted () {
		this.goodsInformation();
    },
    methods: {
    	goodsInformation(){
    		this.goodName = this.$route.params.goodName; //获取货品名称
			this.goodId = this.$route.params.goodId; //获取货品id
			this.sellUnit = this.$route.params.sellUnit; // 获取货品售卖单位
			if(this.sellUnit == 'unit_jin'){
				this.goodsUnit = '斤';
			}else if(this.sellUnit == 'unit_kg'){
				this.goodsUnit = '公斤';
			}else{
				//unit_pie 件
				this.goodsUnit = '件';
			}
    	},
    	//货品信息录入
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
	    				this.submitInfo();
	    			}
	    		}else{
    				this.submitInfo();
	    		}
    			
    		}
    	},
		//货品信息录入完成提交
		submitInfo(){
			console.log(this.$route.params.tid,  '---'+this.$route.params.trainsNum)
            Cookies.set('goodsunit', this.goodsunit);
            Cookies.set('goodsnum', this.goodsnum);
            Cookies.set('goodsweight', this.goodsweight);
            Cookies.set('pbweight', this.pbweight);

	        this.$router.push({
	        	name: 'order',
	        	params: {tid: this.$route.params.tid, trainsNum: this.$route.params.trainsNum }
	        });
		},
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
i{
	font-style: normal;
}
input::-webkit-input-placeholder{
	color: #4c4c4c; /*不生效*/
}
.goods{
	font-size: 0.28rem;
	color: #333;
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


</style>