<template>
	<div class="page-content">
		<mt-header fixed  title="暂存订单">
			<router-link to="/home" slot="left">
			    <mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<!--子emit发送触发事件this.$emit('getSmeage',this.searchValue)  父监听getSmeage，并接收值-->
		<search-box ref="search" @getSmeage="searchHandler" :message='placeMessage'/>
		<!--订单列表-->
		<div class="page-main page-loadmore-wrapper topScroll">
       		<noDate v-if="counts"></noDate>  
			<ul class="order-list">
				<li v-for="temporary in temporaryList" @click="orderDetail(temporary.oid)" :key="temporary.oid">
					<div class="ub list-top">
						<span class="ub-f1">订单号&nbsp;&nbsp;{{temporary.orderNo}}</span>
						<i class="">{{temporary.nickname}}</i>
					</div>
					<div class="list-center">{{temporary.address}}</div>
					<div class="list-bottom">{{temporary.placeOrderTime}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import searchBox from '@/components/searchBox/search'
import noDate from '@/components/noData/noDate'
import { home } from '@/services/apis/home.api'
export default {
	components: { searchBox, noDate },
    data () {
        return {
        	placeMessage:'请输入要检索的客户地址或昵称',
        	wrapperHeight: 0,//容器高度
            temporaryList: [],
            val: '', //搜索
            counts: false,
        }
    },
    mounted () {
    	this.wrapperHeight = document.documentElement.clientHeight - 140;
    },
    created(){
		this.getTemporaryList();
		app.Vwaiting();
	},
    methods: {
		//获取暂存订单列表
		getTemporaryList(val){
			var params = {
				search: val
			};
			home.temporaryOrderList(params)
				.then(response => {
					this.temporaryList = response.data.results;
					if(this.temporaryList==''){
                        this.counts = true;
                    }
					app.Cwaiting();
				})
				.catch(function (response) {
					console.log(response);
				});
		},
		searchHandler(value){
			this.temporaryList = [],
			this.counts = false;
			this.getTemporaryList(value);
		},
	    //跳转到订单详情
        orderDetail(oid){
        	this.$router.push({
        		name: 'temporaryOrderList/detail',
        		params: {
        			oid:oid
        		}
        	});
        },
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.topScroll{
    height: calc(100vh - 100px);
    top:100px;
    bottom: 0rem;
}
/*.page-main{
	top: 2.2rem;
	bottom: 0px;
}*/
.page-loadmore-wrapper{
   overflow: scroll;
   -webkit-overflow-scrolling : touch;
}
i{
	font-style: normal;
}
.order-list{
	font-size: 0.24rem;
	color: #333;
	li{
		background: #fff;
		margin-top: 0.2rem;
		padding: 0.15rem 0.3rem 0.2rem;
		.list-top{
			line-height: 0.7rem;
			i{
				display: block;
				font-size: 	0.26rem;
				color: #4c4c4c;
			}
			span{
				font-size: 0.3rem;
				display: block;
			}
		}
		.list-center{
			line-height: 0.5rem;
			color: #4c4c4c;
			font-size: 0.26rem;
		}
		.list-bottom{
			color: #666;
			line-height: 0.4rem;			
		}
	}
}



</style>