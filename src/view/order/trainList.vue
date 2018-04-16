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
				<li v-for="list in trainList" @click="chooseTrain(list.tid, list.trainsNum, list.plateNum)">
					<div class="ub ub-ac list-top">
						<div>{{list.trainsNum}}</div>
						<!--<div class="list-name">我是谁</div>-->
						<!--<div class="ub-f1">车次05</div>-->
					</div>
					<div class="list-bottom ub ub-ac">
						<div class="list-bl">到达时间</div>
						<div class="ub-f1">{{list.putStorageTime}}</div>
						<div>{{list.plateNum}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import {order} from '@/services/apis/order.js'
export default {
	
    data () {
        return {
        	trainList: [],
        }
    },
    mounted () {
		this.getList();
    },
    methods: {
		//获取支出类型列表
		getList(){
			var params = {
				current_page: '1',
				page_size: '50'
			};
			order.getTrainList(params)
				.then(response => {
					this.trainList = response.data.results;
				})
				.catch(function (response) {
					console.log(response);
				});
		},
		//选择车次
		chooseTrain(tid, trainsNum, plateNum){
            this.$router.push({
            	name: 'order',
				params: {tid: tid, trainsNum: trainsNum, plateNum: plateNum}
            });
		},

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
			/*.list-name{
				margin: 0 0.2rem;
			}*/
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