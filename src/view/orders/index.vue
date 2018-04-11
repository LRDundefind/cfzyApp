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
				<li v-for="n in 3" class="orders-li" @click="orderList(n)">
			  		
				</li>
			</ul>
			
		</div>
	</div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';

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
			//列表数据

        }
    },
    mounted () {

    },
    methods: {
        getList(){},
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