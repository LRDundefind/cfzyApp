<template>

	<div class="page-main page-loadmore-wrapper">
        <div class="basic-list" >
            <p class="clearfix pos-r payment" @click="form.tfAdvances = !form.tfAdvances">
            <img v-if="form.tfAdvances" src="../../assets/xiadan_xuanzhong_btn@2x.png" class="radioSelect pos-a">
            <img v-else src="../../assets/xiadan_weixuanzhong_btn@2x.png" class="radioSelect pos-a">
             该费用为货主垫付</p>
        </div>
        <div class="basic-list" >

            <p class="clearfix">费用类型
                <span class="name">
                <select class=" m-l-10 jin-select" v-model="form.eid">
					<option v-for="item in typeOfCost" :label="item.label" :value="item.value"></option>
				</select>
				<img class="right-icon" src="../../assets/index/gray-right-icon.png"/></span>
            </p>
			<p class="clearfix" @click="choosetrainNumber">车次
                <span class="name">{{trainsNum}}
				<img class="right-icon" src="../../assets/index/gray-right-icon.png"/></span>
            </p>
            <p class="clearfix">支付方式
                <span class="name">
				<select class=" m-l-10 jin-select" v-model="form.expendType">
					<option v-for="item in typeOfPay" :label="item.label" :value="item.value"></option>
				</select>
                <img class="right-icon" src="../../assets/index/gray-right-icon.png"/></span>
            </p>
            <p class="clearfix">收款人电话<input type="number" v-model="form.payeePhone" placeholder="请输入收款人电话"></p>
            <p class="clearfix">收款人<input v-model="form.payeeName" placeholder="请输入收款人名称"></p>
			<p class="clearfix">金额<input v-model="form.amount" type="number" placeholder="请输入金额"></p>
			<p class="clearfix">结款人<input v-model="form.tieName" placeholder="请输入收款人名称"></p>
			<p class="clearfix">收款账号<input v-model="form.payeeAccount" placeholder="请输入收款账号"></p>
        </div>
        <div class="basic-list" >
            <p class="clearfix">备注</p>
            <div class="remark">
                <textarea name="" id="" cols="30" rows="4" placeholder="备注信息" v-model="form.remark" maxlength="420"></textarea>
            </div>
        </div>
		<div class="update">
        <mt-button class="sure" type="primary" size="large" @click="submit">确 定</mt-button>
        </div>
	</div>

</template>

<script>
	import { Toast } from 'mint-ui'
	import Cookies from 'js-cookie'
	export default {
        data () {
            return {
            	form:{
            		roleId:'', //角色id
					tfAdvances:false, //是否为垫付
					eid:'选项1', //费用类型
					tid:'', //车次id
					expendType:'type_alipay', //支付方式
					payeePhone:'', //收款人电话
					payeeName:'', //收款人
					amount:'', //金额
					tieName:'', //结款人
					payeeAccount:'', //收款账号
					remark:'', //备注
            	},
            	trainsNum:'',  // 车次
            	typeOfPay:[{
            		value:'type_alipay',
            		label:'支付宝'
            	},{
            		value:'type_wechat',
            		label:'微信'
            	},{
            		value:'type_cash',
            		label:'现金'
            	},{
            		value:'type_card',
            		label:'银行卡'
            	}],
            	typeOfCost:[{
		          	value: '选项1',
		          	label: '卸妆费'
		        }, {
			        value: '选项2',
			        label: '车费'
		        }, {
		            value: '选项3',
		            label: '路费'
		        }, {
		            value: '选项4',
		            label: '其他'
		        }]  //费用类型
            }
        },
        created () {},
        mounted () {
        	//获取车次信息
    		this.form.tid = Cookies.get('trainTid') || '';
    		this.trainsNum = Cookies.get('trainsNum') || '点击选择车次';
        
        },

        methods: {
        	//选择车次
	        choosetrainNumber(){
	        	Cookies.remove('trainTid');
	        	Cookies.remove('trainsNum');
	        	Cookies.remove('plateNum');
	            this.$router.push({
	            	name: 'trainList',
	            	params:{
	            		to:'toExpend'
	            	} 
	            });
	        },
	        submit(){
	        	if (this.form.eid == '') {
        			Toast({
						message: '请选择费用类型',
						position: 'middle',
						duration: 1000
	    			});
        		}else if(this.form.tid == '' && this.form.tfAdvances) {
        			Toast({
						message: '请选择车次',
						position: 'middle',
						duration: 1000
	    			});
        		}else if (!new RegExp(/^1[3|4|5|7|8|9][0-9]{9}$/).test(this.form.payeePhone) || this.form.payeePhone == '') {
        			Toast({
						message: '请输入正确的手机号',
						position: 'middle',
						duration: 1000
	    			});
        		}else if(this.form.payeeName == ''){
        			Toast({
						message: '请输入收款人名称',
						position: 'middle',
						duration: 1000
	    			});
        		}else if(this.form.amount == ''){
        			Toast({
						message: '请输入金额',
						position: 'middle',
						duration: 1000
	    			});
        		}else if(this.form.tieName == ''){
        			Toast({
						message: '请输入结款人名称',
						position: 'middle',
						duration: 1000
	    			});
        		}else{
                    expend.selemanPay(this.form).then(response => {
                        if (response.data.status == 'Y') {
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            });
                        } 
                    })
        		}
	        }
	    },
	}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
	.page-main{		
		top: 100px;
		bottom: 0;
		height: calc(100vh - 90px);
	}
    .basic-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0 0.3rem;
        color: #333;
        font-size: 0.28rem;
        line-height: 0.94rem;
        > p {
            border-top: 1px #f0f0f0 solid;
            .name {
                float: right;
            }
            .right-icon {
                width: 0.18rem;
                padding-top: 0.3294rem;
                padding-left: 0.24rem;
            }
            > input {
                font-size: 0.26rem;
                float: right;
                color: #4c4c4c;
                text-align: right;
                line-height: 0.4rem;
                margin-top: 0.3rem
            }
            .mintui-field-success{
		 		color: $main_colorNumber;
		 		font-size: 20px;
		 	}
            .upload {
                color: #33d570;
                float: right;
            }
        }
        > p:nth-child(1) {
            border: none;
        }
        .remark {
            color: #666;
            textarea {
                border: none;
                width: 100%;
                font-size: 0.26rem;
                color: #4c4c4c;
            }
        }
    }

	select{
        font-size: 0.30rem;
        position: relative;
		margin-left: 10px;
		width: 1.4rem;
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
	.update{
		margin:0 auto;
		padding:0.5rem 0;
		.mint-button--primary{
			background: url(../../assets/login/dengluzhuce_denglu_img@2x.png) no-repeat center;
			background-size:contain;
			font-size: 0.3rem !important;
			margin: 0 auto;
			height: 0.9rem;
		}
	}
	.payment{
		/*background: url(../../assets/xiadan_weixuanzhong_btn@2x.png) no-repeat 0 center;
		background-size: auto 0.42rem;*/
		padding-left: 0.6rem;
	}
	.radioSelect{
		width: 0.42rem;
		left: 0;
		top: 50%;
		margin-top:-0.21rem;
	}
</style>