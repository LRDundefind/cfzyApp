<template>

	<div class="page-main page-loadmore-wrapper">
		<mt-field label="费用类型" readonly>
			<select class=" m-l-10" v-model="form.eid">
				<option v-for="item in typeOfCost" :value="item.value" :label="item.label"></option>
				
			</select>

            <img class="jin-right"
                 src="../../assets/index/gray-right-icon.png"/>

		</mt-field>
		<mt-field label="车次" readonly>

            <img class="jin-right"
                 src="../../assets/index/gray-right-icon.png"/>

		</mt-field>

		<mt-field class="order-border" label="收款人电话" placeholder="请输入收款人电话" type="number" v-model="form.payeePhone"></mt-field>
	</div>

</template>

<script>
	import { Cell } from 'mint-ui';
	export default {
        data () {
            return {
            	form:{
            		roleId:'', //角色id
					tfAdvances:'', //是否为垫付
					eid:'选项1', //费用类型
					tid:'', //车次id
					expendType:'', //支付方式
					payeePhone:'', //收款人电话
					payeeName:'', //收款人
					amount:'', //金额
					tieName:'', //结款人
					payeeAccount:'', //收款账号
					remark:'', //备注
            	},
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
        mounted () {},
        methods: {

	    },
	}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.mint-field-other{
		.jin-right{
        position: absolute;
        width: 0.18rem;
        right: 0;
        top: 11px;
    }
    .mint-field-core{
    	text-align: right;
 
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
}

</style>