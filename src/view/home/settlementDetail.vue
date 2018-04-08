<template>
	<div class="page-content">
		<mt-header fixed  title="车次结算">
			<router-link to="/" slot="left">
			    <mt-button icon="back" @click="$router.go(-1)"></mt-button>
			</router-link>
		</mt-header>
		<!--车次结算详情-->
		<div class="page-main settlement-detail">
			<div class="ub detail-top">
				<span class="">2018-02-03</span>
				<span class="name">陌上花开</span>
				<span class="ub-f1">车次20</span>
				<span class="number">车号</span>
				<span class="num">京A6565</span>
			</div>
			<div class="detail-center ub ub-ac">
				<div class="ub-f1 time">到达时间</div>
				<div class="">16:50</div>
			</div>
			<div class="table-list">
				<table>
					<thead>
						<tr>
							<th>品名</th>
							<th>库存量</th>
							<th>销售量</th>
							<th>损坏量</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="n in 3">
							<td>大白菜</td>
							<td>100</td>
							<td>60</td>
							<td>20</td>
						</tr>
					</tbody>
				</table>
			</div>
			<mt-button type="primary" size="large" class="submit-btn" @click="settlement">申请结算</mt-button>
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

	    //申请结算
        settlement(){
        	
        }
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
i{
	font-style: normal;
}
.settlement-detail{
	font-size: 0.26rem;
	color: #4c4c4c;
	margin-top: 0.2rem;
	.detail-top{
		line-height: 0.98rem;
		margin-bottom: 0.2rem;
		padding: 0 0.3rem;
		background: #fff;
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
	.detail-center{
		line-height: 0.98rem;
		margin-bottom: 0.2rem;
		padding: 0 0.3rem;
		background: #fff;
		margin-bottom: 0.2rem;
		.time{
			font-size: 0.3rem;
			color: #333;
		}
	}
	.table-list{
		padding: 0.32rem 0.3rem 0;
		background: #fff;
		table{
			width: 100%;
			border-top: 1px solid #dedede;
			thead{
				background: #f2f2f2;
				line-height: 0.6rem;
				tr{
					th{
						font-weight: normal;
						text-align: left;
					}
					th:first-child{
						padding-left: 0.22rem;
					}			
				}
			}
			tbody{
				tr{
					height: 0.96rem;
					border-bottom: 1px solid #dedede;
					td:first-child{
						padding-left: 0.2rem;
					}
				}
				tr:last-child{
					border-bottom: none;
				}
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
