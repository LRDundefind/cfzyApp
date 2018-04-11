<template>
	<div class="page-content">
		<mt-header fixed  title="车次">
			<router-link to="/" slot="left">
			    <mt-button icon="back" @click="$router.go(-1)"></mt-button>
			</router-link>
		</mt-header>
		<!--车次列表-->
		<div class="page-main">

			<ul class="order-list">
				<li v-for="n in 4">
					<div class="ub ub-ac list-top">
						<div>2018-06-05</div>
						<div class="list-name">我是谁</div>
						<div class="ub-f1">车次05</div>
					</div>
					<div class="list-bottom ub ub-ac">
						<div class="list-bl">到达时间</div>
						<div class="ub-f1">16:50</div>
						<div>京A45662</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

export default {

    data () {
        return {
            
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
.order-list{
	font-size: 0.24rem;
	color: #333;
	li{
		background: #fff;
		margin-top: 0.2rem;
		padding: 0.22rem 0.3rem 0.2rem;
		.list-top{
			font-size: 0.3rem;
			line-height: 0.55rem;
			.list-name{
				margin: 0 0.2rem;
			}
		}
		.list-bottom{
			color: #666;
			line-height: 0.5rem;
			.list-bl{
				margin: 0 0.15rem 0 0;
			}			
		}
	}
}



</style>