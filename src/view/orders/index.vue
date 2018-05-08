<template>
	<div class="page-content">
		<mt-header fixed  title="订单">
			<router-link to="/ownerChoice" slot="left">
                <span class="c-3 f-s-16">{{gearName}}</span>
                <img class="header_img" src="../../assets/index/down_icon.png"/>
           </router-link>
		</mt-header>
		<search-box ref="search" @getSmeage="searchHandler"/>
        <noDate v-if="counts == 0"></noDate>  
		<div class="page-main earning page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-loadmore 
				:auto-fill="false"
				:top-method="loadTop" 
				:bottom-method="loadBottom"
				:bottom-all-loaded="allLoaded"
				ref="loadmore">
				<!--筛选title-----本期不做select筛选-->
				<!--<div class="choose-title ub ub-pj" v-show="false">
					<div @click="cycleScreens" :class="cycleActive">周期</div>
					<div @click="goodsScreens" :class="goodsActive">货品</div>
					<div @click="ownerScreens" :class="ownerActive">货主</div>
				</div>-->
				<!--分类筛选 定位-----本期不做select筛选-->
				<!--<div class="earing-choose" v-if="isScreen" v-show="false">
					<div class="type-owner">
						<ul v-if="cycleScreen">
							<li v-for="n in 15">这里不对</li>
						</ul>
						<ul v-if="goodsScreen">
							<li v-for="n in 15">苹果果</li>
						</ul>
						<ul v-if="ownerScreen">
							<li v-for="n in 15">货主一</li>
						</ul>
						<div class="choose-btn">
							<div class="reset" @click="resetBtn">重置</div>
							<div class="submit" @click="submitBtn">确定</div>
						</div>
					</div>
				</div>-->
				<!--订单车次列表-->
				<ul 
				    infinite-scroll-disabled="loading"
				    infinite-scroll-distance="10"
				    class="orders-ul"><!--v-infinite-scroll="loadMore"-->
					<li v-for="list in listStore" class="orders-li" :key="list.id" @click="orderList(list.tid, list.sell_day)">
				  		<div class="orders-t ub ub-ac" @click="orderList(list.tid, list.sell_day)">
				  			<div class="ub-f1">{{list.trainsNum}}</div>
				  			<div class="status" v-if="list.settleStatus == 'status_selling'">售卖中</div>
				  			<div class="status" v-if="list.settleStatus == 'status_topay'">售卖中</div>
				  			<div class="status" v-if="list.settleStatus == 'status_toremit'">待汇款</div>
				  			<div class="status" v-if="list.settleStatus == 'status_complete'">已完成</div>
				  		</div>
				  		<div class="orders-c" @click="orderList(list.tid, list.sell_day)">{{list.plateNum}}</div>
				  		<div class="orders-b ub ub-ac" @click="orderList(list.tid, list.sell_day)">
				  			<div class="ub-f1">{{list.sell_day}}</div>
				  			<div>销售总额</div>
				  			<div class="edu">￥{{list.day_salesAmount}}</div>
				  		</div>
						<ul class="table-ul">
							<li class="title">
								<span>品名</span>
								<span>销售量</span>
								<span>库存量</span>
								<span>销售金额</span>
							</li>
							<li v-for="goods in list.goods" class="con">
								<span>{{goods.goodName}}</span>
								<span>{{goods.sell_quantity}}
									<i v-if="goods.priceUnit == 'unit_jin'">斤</i>
									<i v-if="goods.priceUnit == 'unit_kg'">公斤</i>
									<i v-if="goods.priceUnit == 'unit_pie'">件</i>
								</span>
								<span>{{goods.surplusNum}}
									<i v-if="goods.priceUnit == 'unit_jin'">斤</i>
									<i v-if="goods.priceUnit == 'unit_kg'">公斤</i>
									<i v-if="goods.priceUnit == 'unit_pie'">件</i>
								</span>
								<span>￥{{goods.sell_amount}}</span>
							</li>
						</ul>
				  		<div class="slide-btn" v-if="list.goods.length >= 1" @click="sildeDown">展开</div>
					</li>
				</ul>
				<div></div>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
import searchBox from '@/components/searchBox/search';
import noDate from '@/components/noData/noDate'
import { orders } from '@/services/apis/orders.js';
import { Loadmore , Indicator} from 'mint-ui'
import Cookies from 'js-cookie'
export default {
	components: { searchBox, noDate },
    data () {
        return {
        	//isScreen: false, //-----本期不做select筛选-
        	//cycleScreen: false,
        	//goodsScreen: false,
        	//ownerScreen: false,
        	//cycleActive: '',
        	//goodsActive: '',
        	//ownerActive: '',
        	
        	gearName:'',//档位
        	
        	allLoaded: false,
            wrapperHeight: 0,//容器高度
            params:{
                current_page: 1,
                page_size: 5,
            },
            listStore: [],
			//车次销售列表数据
			listdata: [],
			counts: null,
			val: '', //搜索
        }
    },
    mounted () {
    	//档位
    	if(JSON.parse(Cookies.get('gidOwnID_lists')).gearName){
            this.gearName = JSON.parse(Cookies.get('gidOwnID_lists')).gearName;
        }
    	
		this.getList();
		this.wrapperHeight = document.documentElement.clientHeight - 175;
    },
	created(){
		
	},
    methods: {
    	//车次销售列表数据
        getList(val){
            let params = {
                page_size: this.params.page_size,
                current_page: this.params.current_page,
                search: val,
            };
            orders.getTrainSaleList(params)
                .then(response => {
                    this.listdata = response.data.results;
					if(this.listdata.length == this.params.page_size){  
                        //判断是否应该加载下一页
                        this.params.current_page += 1 ;
                    }else{
                        //禁用上拉加载
                        this.allLoaded = true;
                    }
                    if (this.listdata) {
                        this.listStore.push(...this.listdata);
                    	this.counts = this.listStore.length;
                    }
                    Indicator.close();
                    
                })
                .catch(function (response) {
                    console.log(response);
                });
        },
		//搜索
		searchHandler(value){
			this.params.current_page = 1 ;
        	this.listStore = [];
			this.getList(value);
		},
		
    	//下拉刷新
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
        //上拉加载
        loadBottom() {
            Indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            this.getList();
        },
        
        //跳转到订单列表
        orderList(tid, sell_day){
        	this.$router.push({
        		name: 'orders/ordersList',
        		params: {
        			tid: tid,
        			sell_day: sell_day,
        		}
        	});
        },
        //展开table表格
        sildeDown(){
        	
        },
        

        
        //展开筛选-----本期不做select筛选----暂不删除
//      cycleScreens: function(){
//			this.cycleActive = 'active';
//			this.goodsActive = '';
//			this.ownerActive = '';
//			
//      	this.goodsScreen = false;
//      	this.ownerScreen = false;
//      	this.cycleScreen = !this.cycleScreen;
//      	this.isScreen = this.cycleScreen;
//      },
//      goodsScreens: function(){
//			this.cycleActive = '';
//			this.goodsActive = 'active';
//			this.ownerActive = '';
//			
//      	this.cycleScreen = false;
//      	this.ownerScreen = false;
//      	this.goodsScreen = !this.goodsScreen;
//      	this.isScreen = this.goodsScreen;
//      	
//      },
//      ownerScreens: function(){
//			this.cycleActive = '';
//			this.goodsActive = '';
//			this.ownerActive = 'active';
//			
//      	this.cycleScreen = false;
//      	this.goodsScreen = false;
//      	this.ownerScreen = !this.ownerScreen;
//      	this.isScreen = this.ownerScreen;
//      	
//      },
        //重置选择
//      resetBtn: function(){
//      	this.cycleActive = '';
//			this.goodsActive = '';
//			this.ownerActive = '';
//			
//      	this.cycleScreen = false;
//      	this.goodsScreen = false;
//      	this.ownerScreen = false;
//      	this.isScreen = false;
//      },
        //提交筛选
//      submitBtn: function(){
//      	this.cycleActive = '';
//			this.goodsActive = '';
//			this.ownerActive = '';
//			
//      	this.cycleScreen = false;
//      	this.goodsScreen = false;
//      	this.ownerScreen = false;
//      	this.isScreen = false;
//      },
    }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
i,b{
	font-style: normal;
	font-weight: normal;
}
body{
	font-size: 0.3rem;
}
.header_img{
    width: 0.32rem;
    padding-top: 0.1rem;
    padding-left: 0.05rem;
}
/*订单车次列表*/
.page-loadmore-wrapper{
    overflow: scroll;
	.orders-ul{
		font-size: 0.26rem;
		color: #4c4c4c;
		/*padding-top: 1.1rem;*/ /*select搜索本期不做*/
		.orders-li{
			background: #fff;
			margin: 0 0 0.2rem;
			padding: 0 0.3rem 0.3rem;
			.orders-t{
				font-size: 0.3rem;
				color: #333;
				line-height: 0.52rem;
				padding-top: 0.17rem;
				.status{
					font-size: 0.24rem;
					color: #33d570;
				}
			}
			.orders-c{
				line-height: 0.5rem;
				font-size: 0.24rem;
				color: #666;
			}
			.orders-b{
				line-height: 0.5rem;
				font-size: 0.24rem;
				color: #666;
				padding-bottom: 0.19rem;
				border-bottom: 1px solid #dedede;
				.edu{
					font-size: 0.32rem;
					color: #49c98b;
					margin-left: 0.1rem;
				}
			}
			.table-ul{
				width: 100%;
				font-size: 0.26rem;
				color: #4c4c4c;
				li{
					overflow: hidden;
					span{
						width: 24%;
						display: block;
						float: left;
					}
					span:first-child{
						padding-left: 0.25rem;
						text-overflow:ellipsis;
						overflow:hidden;
						white-space:nowrap; 
						display:block;
					}
				}
				.title{
					height: 0.6rem;
					line-height: 0.6rem;
					background: #f2f2f2;
				}
				.con{
					height: 0.96rem;
					line-height: 0.96rem;
					border-bottom: 1px solid #dedede;
					span{
						height: 0.96rem;
					}
				}
				li:last-child{
					border-bottom: none;
				}
			}
			.slide-btn{
				width: 100%;
				height: 0.52rem;
				line-height: 0.52rem;
				text-align: center;
				background: #f2f2f2;
			}
		}
	}
}

/*筛选 --本期不做select筛选*/
.choose-title{
	font-size: 0.28rem;
	color: #333;
	margin: 0.2rem 0;
	background: #fff;
	line-height: 0.7rem;
	padding: 0 0.3rem;
    width: 91.6%;
	position: fixed;
	top: 41px; /*header的height是40px*/
	div{
		width: 1rem;
		background: url(../../assets/index/shouye_unfold_btn@2x.png) no-repeat 0.7rem center;
		background-size: 0.25rem;
	}
	div.active{
		color: #33d57c;
	}
}
.earing-choose{
	font-size: 0.32rem;
	height: 100%;
    position: fixed;
   top: calc(40px + 0.9rem);
    background: rgba(0,0,0,.3);
    z-index: 99;

	.type-owner{
		padding: 0 0.3rem;
		background:#fff;
			ul{
				overflow: hidden;
				font-size: 0.26rem;
				height: 2.8rem;
				padding-top: 0.44rem;
				overflow: scroll;
				li{
					float: left;
					width: 30%;
					height: 0.58rem;
					line-height: 0.58rem;
					text-align: center;
					border: 2px solid #dedede;
					border-radius: .5rem;
					margin-bottom: 0.3rem;
				}
				li:nth-child(3n-1){
					margin-left: 3.2%;
					margin-right: 3.2%;
				}
			}
			.choose-btn{
				overflow: hidden;
				.reset,.submit{
					float: left;
					width: 35%;
					height: 0.7rem;
					line-height: 0.7rem;
					text-align: center;
					border: 2px solid #dedede;
					border-radius: .5rem;
					margin: 0.3rem 0;
				}
				.reset{
					margin-right: 8%;
					margin-left: 5%;
				}
				.submit{
					width: 45%;
				}
			}
		
	}
}


</style>