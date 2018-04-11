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
				<div>大白菜</div>
			</div>
			<div class="goods-info">
				<div class="goods-item ub">
					<div class="ub-f1">单价</div>
					<mt-field label="" placeholder="请输入" type="number" v-model="price"></mt-field>
					<div>公斤</div>
				</div>
				<div class="goods-item ub">
					<div class="ub-f1">件数</div>
					<mt-field label="" placeholder="请输入" type="number" v-model="num"></mt-field>
					<div>件</div>
				</div>
				<div class="goods-item ub">
					<div class="ub-f1">重量</div>
					<mt-field label="" placeholder="请输入" type="number" v-model="weight"></mt-field>
					<div>件</div>
				</div>
				<div class="goods-item ub">
					<div class="ub-f1">平板重</div>
					<mt-field label="" placeholder="请输入" type="number" v-model="weight2"></mt-field>
					<div>件</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {

    data () {
        return {
        	price: '',
            num:'',
            weight: '',
            other: '',
            weight2: ''
        }
    },
    mounted () {

    },
    methods: {
            
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
				min-width: 0.65rem;
				padding-left: 0.1rem;
				text-align: right;
			}
			.mint-field{
				width: 2rem;
				.mint-cell-wrapper{
					background: none !important;  /*不生效*/
					
				}
			}
		}
	}
}


</style>