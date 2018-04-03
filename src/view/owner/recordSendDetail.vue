<template>
	<div class="page-content">
		<mt-header fixed  title="发货记录">
			<router-link to="/" slot="left">
			    <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
			</router-link>
		</mt-header>
		<div class="title-sendDetail">
			<div class="ub">
				<div class="ub-f2">已售出金额</div>
				<div class="ub-f2">￥5000</div>
			</div>
			<mt-button type="default" size="large">查看已售卖订单</mt-button>
		</div>
		<div class="main-list">
			<div>支出信息</div>
			<ul class="clearfix">
				<li class="f-l">车费（2018-03-06）</li>
				<li class="f-l">￥100</li>
			</ul>
			<ul class="clearfix">
				<li class="f-l">卸车费（2018-03-06）</li>
				<li class="f-l">￥100</li>
			</ul>
			<ul class="clearfix">
				<li class="f-l">垫付其他费用（2018-03-06）</li>
				<li class="f-l">￥45</li>
			</ul>
		</div>

		<div class="main-list">
			<div class="clearfix">2018-03-20 里皮 车次89<span class="f-r">待结算</span></div>
		</div>

		<div class="main-list">
			<div class="clearfix">档位<span class="f-r">白云山A档</span></div>
			<ul class="clearfix">
				<li class="f-l">入库员</li>
				<li class="f-l">张三</li>
			</ul>
		</div>

		<div class="main-list">
			<div class="ub">
				<div class="ub-f4">品类</div><div class="ub-f4">入库数量</div><div class="ub-f4">售卖单位</div><div class="ub-f4">品销售均价</div>
			</div>
			<ul class="ub" v-for="n in 2" :key='n'>
				<div class="ub-f4">大白菜A类</div><div class="ub-f4">20</div><div class="ub-f4">斤</div><div class="ub-f4">100</div>
			</ul>
		</div>

		<div class="main-list">
			<div class="clearfix">司机姓名<span class="f-r">皮皮</span></div>
			<ul class="clearfix">
				<li class="f-l">司机电话</li>
				<li class="f-l">15985645789</li>
			</ul>
		</div>

		<div class="main-list">
			<div class="clearfix">备注</div>
			<ul class="clearfix">
				<div>132</div>
			</ul>
		</div>

		<div class="main-list">
			<div class="clearfix">下单时间<span class="f-r">2018-03-03 16:00</span></div>
		</div>
	</div>
</template>
<script>

export default {
    data () {
        return {
            selected: this.$route.name
        }
    },
    mounted () {
    },
    methods: {

            
    },

}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.title-sendDetail{
	font-size: 0.3rem;
	background-color: #fff;
	margin-top: 0.2rem;
	padding: 0.2rem;
	line-height: 0.8rem;
}
.main-list{
	font-size: 0.3rem;
	background-color: #fff;
	margin-top: 0.2rem;
	padding:0 0.2rem;
	line-height: 0.8rem;
	ul{
		border-top:1px #f0f0f0 solid;
		li:nth-child(odd){
			width: 60%
		}
		li:nth-child(even){
			width: 40%;
			text-align: right;
		}
	}
}
.main-list:last-child{
	margin-bottom: 0.2rem
}
</style>