<template>
	<div class="page-content">
		<mt-header fixed  title="货主">
			<router-link to="/" slot="left">
			    <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
			</router-link>
		</mt-header>

		<div class="page-main">
			<div class="main-list">
				<p class="clearfix">姓名<input type="text" v-model="name"></p>
				<p class="clearfix">电话<input type="text" v-model="phone"></p>
			</div>
		
			<div class="main-list">
				<p class="clearfix">供应商名称<input type="text" v-model="name"></p>
				<p class="clearfix">联系地址<input type="text" v-model="name"></p>
			</div>
		
			<div class="main-list">
				<p class="clearfix">开户信息<span></span></p>
				<p class="clearfix">银行名称<input type="text" v-model="name"></p>
				<p class="clearfix">支行<input type="text" v-model="name"></p>
				<p class="clearfix">账号<input type="text" v-model="name"></p>
			</div>
		
			<div class="main-list">
				<p class="clearfix">备注</p>
				<div class="remark">
					<textarea name="" id="" cols="30" rows="3" placeholder="备注信息" v-model="message"></textarea>
				</div>
			</div>
		</div>
		<div class='update clearfix'>
	
			<mt-button type="primary" size="large" class='f-l'>更 新</mt-button>
		</div>
	</div>
</template>

<script>

export default {
    data () {
        return {
            value:''
        }
    },
    mounted () {

    },
    methods: {
        getList(){}
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">

	.main-list{
		background: #fff;
		margin-top: 0.2rem;
		padding:0 0.3rem;
		line-height: 1rem;
		>p{	
			font-size: $fons_size_28;
			color: $main_color333;
			border-top: 1px #f0f0f0 solid;
			>input{
				float: right;
				color: #4c4c4c;
				text-align: right;
				line-height: 1rem;
			}
		}
		>p:nth-child(1){
			border:none;
		}
		.remark{
			font-size: $fons_size_26;
			color: #4c4c4c;
			textarea{
				border: none;
				width: 100%;
			}
		}
	}
	.update{
		margin:0 auto;
		width: 5.5rem;
		padding:0.3rem 0 0.6rem 0;
		.mint-button--primary{
			background: url(../../assets/login/dengluzhuce_denglu_img@2x.png) no-repeat center;
			background-size:contain;
			font-size: 0.3rem !important;
			margin: 0 auto;
			height: 0.9rem;
		}
		

	}

</style>