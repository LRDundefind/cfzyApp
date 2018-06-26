<template>

	<div class="page-main page-loadmore-wrapper">
        <div>
            <div class="basic-list" >
                <p class="clearfix">货主1
                    <span class="name">123<img class="right-icon"
                                                          src="../../assets/index/gray-right-icon.png"/></span>
                </p>

                <p class="clearfix">货主2
                    <span class="name">123<img class="right-icon"
                                               src="../../assets/index/gray-right-icon.png"/></span>
                </p>
                <p class="clearfix">司机电话<input type="number"></p>

            </div>
            <div class="basic-list" >
                <p class="clearfix">货主3
                    <span class="name">123<img class="right-icon"
                                               src="../../assets/index/gray-right-icon.png"/></span>
                </p>
            </div>

        </div>


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
    .basic-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0 0.3rem;
        color: #333;
        font-size: 0.28rem;
        line-height: 0.98rem;
        > p {
            border-top: 1px #f0f0f0 solid;
            .upload-picture {
                position: absolute;
                width: 2rem;
                height: 0.95rem;
                left: 70%;
                top: 0;
                opacity: 0.1;
            }
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
            padding-bottom: 0.8rem;
            textarea {
                border: none;
                width: 100%;
                font-size: 0.26rem;
                color: #4c4c4c;
            }
        }
    }


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