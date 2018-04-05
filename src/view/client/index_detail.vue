<template>
	<div class="page-content" id="client_detail">
		<mt-header fixed  title="客 户">
			<router-link :to="{name:'client'}" slot="left">
			    <mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>

		<div class="page-main">
			<div class="main-list">
				<p class="clearfix">消费次数<span>15</span></p>
				<p class="clearfix">最后消费时间<span>无</span></p>
			</div>
		
			<div class="main-list">
				<p class="clearfix">赊账总金额<span>无</span></p>
				<p class="clearfix">赊账最长时间<span>无</span></p>
			</div>
		
			<div class="main-list">
				<p class="clearfix">姓名<span></span></p>
				<p class="clearfix">昵称<span>无</span></p>
				<p class="clearfix">电话<span>无</span></p>
				<p class="clearfix">身份证号<span>210781199202120012</span></p>
				<p style="border:none;text-align: right;line-height: 0.3rem;font-size:0.22rem;color:#808080;">"身份证号"首次编辑后将无法修改</p>
			</div>

			<div class="main-list">
				<p class="clearfix">公司<span>无</span></p>
				<p class="clearfix">地址<span>无</span></p>
			</div>

			<div class="main-list">
				<p class="clearfix">备注</p>
				<div class="remark">备注信息</div>
			</div>
		</div>
		<div class='update clearfix'>
			<mt-button type="primary" size="large" class='f-l' @click="consumptionRecords(3)">查看消费记录</mt-button>
			<mt-button type="primary" size="large" class='f-l' @click="goChange(10)">更新资料</mt-button>
		</div>
	</div>
</template>

<script>

export default {
	name:'client_detail',
    data () {
        return {
            value:''
        }
    },
    mounted () {

    },
    methods: {
        getList(){},
        goChange(n){
			this.$router.push({name:'index_change',params: { id: n }});
		},
        //跳转到消费记录
        consumptionRecords(id){
        	this.$router.push({
        		name: 'orderPay_record',
//      		params: {
//      			id:id
//      		}
        	});
        }
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">

	.main-list{
		background: #fff;
		margin-top: 0.2rem;
		padding: 0.2rem;
		color: #333;
		font-size: 0.28rem;
		line-height: 1rem;
		>p{	
			border-top: 1px #f0f0f0 solid;
			>span{
				float: right;
				color: #4c4c4c;
				text-align: right;
			}
		}
		>p:nth-child(1){
			border:none;
		}
		.remark{
			color: #666;
			padding-bottom: 0.8rem;
		}
	}
	.update{
		
		.mint-button--primary:nth-child(1){
			background: url(../../assets/kehu_chakanxiaofeijilu_btn@2x.png) no-repeat center;
			background-size:contain;
			width: 41%;
			color:#0f0;
			margin:0 3%;
			font-size: 0.3rem !important;
		}
		.mint-button--primary:nth-child(2){
			background: url(../../assets/kehu_gengxinziliao_btn@2x.png) no-repeat center;
			background-size:contain;
			width: 50%;
			font-size: 0.3rem !important;
		}
		padding:0.3rem 0 0rem 0;
		button{
			margin: 0 auto;
			height: 1rem;
		}
		
	}

</style>