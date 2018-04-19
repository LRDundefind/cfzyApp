<template>
	<div class="page-content">
		<mt-header fixed  title="订单">
			<router-link to="/ownerChoice" slot="left">
                <span class="c-3 f-s-16">白云上档A</span>
                <img class="header_img" src="../../assets/index/down_icon.png"/>
           </router-link>
		</mt-header>
		<div class="page-main earning">
			<!--筛选title-->
			<div class="choose-title ub ub-pj">
				<div @click="cycleScreens" :class="cycleActive">周期</div>
				<div @click="goodsScreens" :class="goodsActive">货品</div>
				<div @click="ownerScreens" :class="ownerActive">货主</div>
			</div>
			<!--分类筛选 定位-->
			<div class="earing-choose" v-if="isScreen">
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
			</div>
			<!--订单车次列表-->
			<ul 
			    infinite-scroll-disabled="loading"
			    infinite-scroll-distance="10"
			    class="orders-ul"><!--v-infinite-scroll="loadMore"-->
				<li v-for="n in 3" class="orders-li">
			  		<div class="orders-t ub ub-ac" @click="orderList(n)">
			  			<div>2015-08-05</div>
			  			<div>你的名字</div>
			  			<div class="ub-f1">车次65</div>
			  			<div class="status">售卖中</div>
			  		</div>
			  		<div class="orders-c" @click="orderList(n)">京A323544</div>
			  		<div class="orders-b ub ub-ac" @click="orderList(n)">
			  			<div class="ub-f1">2018-05-09</div>
			  			<div>销售总额</div>
			  			<div class="edu">￥330,000</div>
			  		</div>
			  		<table class="orders-table">
						<thead>
							<tr>
								<th>品名</th>
								<th>销售量</th>
								<th>库存量</th>
								<th>销售金额</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="n in 5">
								<td>大白菜</td>
								<td>100斤</td>
								<td>50斤</td>
								<td>￥600.00</td>
							</tr>
						</tbody>
			  		</table>
			  		<div class="slide-btn" @click="sildeDown">展开</div>
				</li>
			</ul>
			
		</div>
	</div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
import { orders } from '@/services/apis/orders.js'
export default {
    data () {
        return {
        	isScreen: false,
        	cycleScreen: false,
        	goodsScreen: false,
        	ownerScreen: false,
        	cycleActive: '',
        	goodsActive: '',
        	ownerActive: '',
			//车次销售列表数据
			listdata: [],
        }
    },
    mounted () {
		this.getList();
    },
	created(){
		
	},
    methods: {
    	//车次销售列表数据
        getList(){
            let params = {
                page_size: 10,
                current_page: 1,
            };
            orders.getTrainSaleList(params)
                .then(response => {
                    this.listdata = response.data.results;
                })
                .catch(function (response) {
                    console.log(response);
                });
        },
        //展开筛选
        cycleScreens: function(){
			this.cycleActive = 'active';
			this.goodsActive = '';
			this.ownerActive = '';
			
        	this.goodsScreen = false;
        	this.ownerScreen = false;
        	this.cycleScreen = !this.cycleScreen;
        	this.isScreen = this.cycleScreen;
        },
        goodsScreens: function(){
			this.cycleActive = '';
			this.goodsActive = 'active';
			this.ownerActive = '';
			
        	this.cycleScreen = false;
        	this.ownerScreen = false;
        	this.goodsScreen = !this.goodsScreen;
        	this.isScreen = this.goodsScreen;
        	
        },
        ownerScreens: function(){
			this.cycleActive = '';
			this.goodsActive = '';
			this.ownerActive = 'active';
			
        	this.cycleScreen = false;
        	this.goodsScreen = false;
        	this.ownerScreen = !this.ownerScreen;
        	this.isScreen = this.ownerScreen;
        	
        },
        //重置选择
        resetBtn: function(){
        	this.cycleActive = '';
			this.goodsActive = '';
			this.ownerActive = '';
			
        	this.cycleScreen = false;
        	this.goodsScreen = false;
        	this.ownerScreen = false;
        	this.isScreen = false;
        },
        //提交筛选
        submitBtn: function(){
        	this.cycleActive = '';
			this.goodsActive = '';
			this.ownerActive = '';
			
        	this.cycleScreen = false;
        	this.goodsScreen = false;
        	this.ownerScreen = false;
        	this.isScreen = false;
        },
        //跳转到订单列表
        orderList(id){
        	this.$router.push({
        		name: 'orders/ordersList',
        		params: {
        			id:id
        		}
        	});
        },
        //展开table表格
        sildeDown(){
        	
        }

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
.orders-ul{
	font-size: 0.26rem;
	color: #4c4c4c;
	padding-top: 1.1rem;
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
		.orders-table{
			margin-top: 0.3rem;
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

						padding-left: 0.3rem;
					}			
				}
			}
			tbody{
				tr{
					height: 0.96rem;
					border-bottom: 1px solid #dedede;
					td:first-child{
						padding-left: 0.3rem;
					}
				}
				tr:last-child{
					border-bottom: none;
				}
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


/*筛选*/
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