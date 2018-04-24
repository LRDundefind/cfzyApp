<template>
	<div class="page-content">
		<mt-header fixed  title="车次结算">
			<router-link to="/" slot="left">
			    <mt-button icon="back" @click="$router.go(-1)"></mt-button>
			</router-link>
		</mt-header>
		<!--车次结算列表-->
		<div class="page-main">
			<ul class="settlement-list">
				<li v-for="n in 3" @click="settlementDetail(1)">
					<div class="ub list-top">
						<span class="">2018-02-03</span>
						<span class="name">陌上花开</span>
						<span class="ub-f1">车次20</span>
						<span class="number">车号</span>
						<span class="num">京A6565</span>
					</div>
					<div class="list-bottom ub ub-ac">
						<div class="ub-f1">入库时间&nbsp;&nbsp;16:50</div>
						<div class="btn">申请结算</div>
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

	    //跳转到车次结算详情
        settlementDetail(id){
        	this.$router.push({
        		name: 'settlementList/detail',
        		params: {
        			id:id
        		}
        	});
        }
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
i{
	font-style: normal;
}
.settlement-list{
	font-size: 0.24rem;
	color: #666;
	li{
		background: #fff;
		margin-top: 0.2rem;
		padding: 0 0.3rem;
		.list-top{
			line-height: 0.86rem;
			border-bottom:1px solid #dedede;
			span{
				font-size: 0.3rem;
				color: #333;
				display: block;
			}
			.name{
				margin: 0 0.22rem;
			}
			.number,.num{
				font-size: 0.24rem;
				color: #4c4c4c;
			}
			.number{
				margin-right: 0.12rem;
			}
		}

		.list-bottom{
			color: #666;
			line-height: 1.32rem;			
			.btn{
				font-size: 0.3rem;
				width: 1.88rem;
				line-height: 0.68rem;
				text-align: center;
				color: #fff;
	            background: -webkit-linear-gradient(left, #30b03e 0%,#33d57c 100%);
				border-radius: 1rem;
			}
		}
	}
}
</style>