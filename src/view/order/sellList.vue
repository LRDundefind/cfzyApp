<template>
	<div class="page-content">
		<mt-header fixed  title="卖手">
		    <mt-button icon="back" @click="goBack()" slot="left"></mt-button>
		</mt-header>
		<!--车次列表-->
		<div class="page-main page-loadmore-wrapper topScroll">
			<noDate v-if="counts || count"></noDate>  
			<mt-loadmore 
				v-else
				:auto-fill="false"
				:top-method="loadTop" 
				:bottom-method="loadBottom"
				:bottom-all-loaded="allLoaded"
				:bottomDistance= 50
				ref="loadmore">
			<ul class="order-list">
				<li v-for="list in listStore" @click="chooseSell(list.sid, list.selName)" :key="list.id">
					<div class="ub ub-ac list-top">
						<div>{{list.selName}}</div>
					</div>
				</li>
			</ul>
		  
			</mt-loadmore>
		</div>
	</div>
</template>

<script>

import Bus from '@/components/bus.js'
import noDate from '@/components/noData/noDate'
import {order} from '@/services/apis/order.js'
import { Loadmore , Indicator } from 'mint-ui'
import { InfiniteScroll } from 'mint-ui'
import Cookies from 'js-cookie'
export default {
	components: { noDate },
    data () {
        return {
        	allLoaded: false,
        	wrapperHeight: 0,//容器高度
        	listStore: [],
        	sellList: [],
        	counts: false,
        	count: false,
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
    },
    created(){
		this.getList();
		app.Vwaiting();
	},
    methods: {
		
		//获取车次列表
		getList(){
			
			order.getSellList(this.params)
				.then(response => {
					this.sellList = response.data.results;
					if(this.sellList=='' && this.params.current_page == 1){
                		this.count = true;
                    }
					app.Cwaiting();
					
					if(this.sellList.length==this.params.page_size){  
						//判断是否应该加载下一页
						this.params.current_page+=1 ;
					}else{
						//禁用上拉加载
						this.allLoaded = true;
					}
					if (this.sellList) {
						this.listStore.push(...this.sellList);
						if(this.listStore==''){
	                        this.counts = true;
	                        app.Cwaiting();
	                    }
					}
					//this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
					Indicator.close();
				})
		},
		//选择车次
		chooseSell(sid, selName){
			Cookies.set('sellId',sid);
            Cookies.set('selName',selName);
        	this.$router.push({
            	name: 'order',
            });
		},
	    loadTop(){
	    	Indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
	    	this.listStore = [];
	    	this.params.current_page = 1;
	    	this.getList();
	    	this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
	    	this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
	    },
	    loadBottom() {
	    	Indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
	    	this.getList();
	    	this.$refs.loadmore.onBottomLoaded();
		}
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
 .topScroll {
    height: calc(100vh - 40px);
    top: 40px;
    bottom: 0rem;
    }
i{
	font-style: normal;
}
.page-main{
	top: 0.8rem;
	bottom: 0px;
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
    overflow: scroll;
    -webkit-overflow-scrolling : touch;
}


</style>