<template>
	<div class="page-content">
		<mt-header fixed  title="车次">
			
			    <mt-button icon="back" @click="$router.go(-1)" slot="left"></mt-button>
			
		</mt-header>
		<!--车次列表-->
		<div class="page-main page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-loadmore 
				:auto-fill="false"
				:top-method="loadTop" 
				:bottom-method="loadBottom"
				@top-status-change="handleTopChange" 
				@bottom-status-change="handleBottomChange"
				:bottom-all-loaded="allLoaded"
				ref="loadmore">
			<ul class="order-list">
				<li v-for="list in listStore" @click="chooseTrain(list.tid, list.trainsNum, list.plateNum)" :key="list.id">
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
			<div slot="top" class="mint-loadmore-top">
		        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
		        <span v-show="topStatus === 'loading'">Loading...</span>
		    </div>
		    <div v-if="allLoaded" class="m-t-10" style="text-align:center;font-size: 0.18rem">没有更多数据了</div>
		    <div slot="bottom" class="mint-loadmore-bottom">
	          	<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
	          	<span v-show="bottomStatus === 'loading'">
	            	<mt-spinner v-show="bottomStatus == 'loading'" color="#26a2ff"></mt-spinner>
	          	</span>
	        </div>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>

import Bus from '@/components/bus.js'
import {order} from '@/services/apis/order.js'
import { Loadmore } from 'mint-ui'
import { InfiniteScroll } from 'mint-ui'
import Cookies from 'js-cookie'
export default {
    data () {
        return {
        	topStatus: '',
			bottomStatus: '',
        	allLoaded: false,
        	wrapperHeight: 0,//容器高度
        	listStore: [],
        	trainList: [],
        	params:{
        		current_page: 1,
				page_size: 10
			}
        }
    },
    mounted () {
    	let windowWidth = document.documentElement.clientWidth;//获取屏幕高度
    	if(windowWidth>768){//这里根据自己的实际情况设置容器的高度
        	this.wrapperHeight = document.documentElement.clientHeight - 130;
	    }else{
	        this.wrapperHeight = document.documentElement.clientHeight - 40;
	    }
		this.getList();
    },
    methods: {
		
		//获取支出类型列表
		getList(){
			
			order.getTrainList(this.params)
				.then(response => {
					this.trainList = response.data.results;
					if(this.trainList.length==this.params.page_size){  
						//判断是否应该加载下一页
						this.params.current_page+=1 ;
					}else{
						//禁用上拉加载
						this.allLoaded = true;
					}
					if (this.trainList) {
						this.listStore.push(...this.trainList)
					}
				})
				.catch(function (response) {
					console.log(response);
				});
		},
		//选择车次
		chooseTrain(tid, trainsNum, plateNum){

			Cookies.set('trainTid',tid);
			Cookies.set('trainsNum',trainsNum);
            Cookies.set('plateNum',plateNum);
            
            this.$router.push({
            	name: 'order',
				params: {}
            });
		},
		handleTopChange(status) {
	        this.topStatus = status;
	    },
	    handleBottomChange(status) {
	        this.bottomStatus = status;
	    },
	    loadTop(){
	    	this.listStore = [];
	    	this.params.current_page = 1;
	    	this.getList();
	    	this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
	    	this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
	    },
	    loadBottom() {
	    	this.getList();
		}
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
.page-loadmore-wrapper {
    overflow: scroll
}


</style>