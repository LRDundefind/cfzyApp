<template>
	<div class="page-content">
		<mt-header fixed  title="收入">
			<router-link to="/" slot="left">

			</router-link>

		</mt-header>
		<div class="page-main earning">
			<!--筛选title-->
			<div class="choose-title ub ub-pj">
				<div @click="data">周期</div>
				<div>货品</div>
				<div>货主</div>
			</div>
			<!--分类筛选 定位-->
			<div class="earing-choose" v-if="isShow">
				<!--货主筛选-->
				<div class="type-owner">
					<ul v-if="false">
						<li v-for="n in 15">这里不对</li>
					</ul>
					<ul>
						<li v-for="n in 15">苹果果</li>
					</ul>
					<ul v-if="false">
						<li v-for="n in 15">货主一</li>
					</ul>
					<div class="choose-btn">
						<div class="reset" @click="resetBtn">重置</div>
						<div class="submit" @click="submitBtn">确定</div>
					</div>
				</div>
			</div>
			<!--收入列表-->
			<ul 
				
			    infinite-scroll-disabled="loading"
			    infinite-scroll-distance="10"
			    class="earing-ul"><!--v-infinite-scroll="loadMore"-->
				<li v-for="item in list" class="earing-li">
			  		<p>{{item.name}}</p>
			  		<div class="ub term">
			  			<div class="ub-f1"><i>贷款</i><b>{{item.daikuan}}</b></div>
			  			<div class=""><i>包装费</i><b>{{item.bz}}</b></div>
			  		</div>
		  			<div class="ub term">
			  			<div class="ub-f1"><i>过磅费</i><b>{{item.gb}}</b></div>
			  			<div class=""><i>三轮费</i><b>{{item.slf}}</b></div>
			  		</div>
			  		<div class="ub total">
			  			<div class="ub-f1"><i>合计</i></div>
			  			<div class="total-r">{{item.heji}}</div>
			  		</div>
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
        	isShow: false,
			//列表数据
            list: [
        		{
        			id: '0',
        			name: '我是谁',
        			daikuan: '￥265000',
        			bz: '￥800',
        			gb: '￥10',
        			slf: '￥200',
        			heji: '￥33000'
        		},{
        			id: '2',
        			name: '我是谁',
        			daikuan: '￥265000',
        			bz: '￥8000',
        			gb: '￥10',
        			slf: '￥200',
        			heji: '￥33000'
        		},{
        			id: '3',
        			name: '我是谁',
        			daikuan: '￥265000',
        			bz: '￥800',
        			gb: '￥10',
        			slf: '￥2000',
        			heji: '￥33000'
        		},
        		//筛选
        		this.options = [
        			{
        				label:'货主1',
        				value:'1'
        			},{
        				label:'货主1',
        				value:'2'
        			}
        		]
        	],
        	
        }
    },
    mounted () {

    },
    methods: {
        getList(){},
        //展开筛选
        data: function(){
        	this.isShow = !this.isShow;
        },
        //重置选择
        resetBtn: function(){
        	this.isShow = false;
        },
        //提交筛选
        submitBtn: function(){
        	this.isShow = false;
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
.choose-title{
	font-size: 0.28rem;
	color: #333;
	margin: 0.2rem 0;
	background: #fff;
	line-height: 0.7rem;
	padding: 0 0.3rem;
	/*position: fixed;*/
	/*top: 1.8rem;*/
	div{
		width: 1rem;
		background: url(../../assets/index/shouye_unfold_btn@2x.png) no-repeat 0.7rem center;
		background-size: 0.25rem;
	}
}
/*筛选*/
.earing-choose{
	font-size: 0.32rem;
	height: 100%;
    position: fixed;
    /*top: 1.63rem;*/
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
/*收入列表*/
.earning{
	.earing-ul{
		color:#666;
		.earing-li{
			padding: 0.1rem 0.3rem;
			background: #fff;
			margin-bottom: 0.2rem;
			p{
				color: #333;
				line-height: 0.7rem;
				font-size: 0.3rem;	
				border-bottom: 1px solid #dedede;
			}
			.term{
				margin: 0.09rem 0;
				font-size: 0.24rem;
				div{
					line-height: 0.40rem;
					i{
						width: 0.96rem;
						display: inline-block;
					}
					b{
						font-size: 0.28rem;
						width: 1rem;
						display: inline-block;
					}
				}
			}
			.total{
				font-size: 0.24rem;
				line-height: 0.43rem;
				line-height: 0.7rem;
				border-top: 1px solid #dedede;
				.total-r{
					color:#49c98b;
					font-size: 0.32rem;
					font-weight: 700;
				}
			}
		}
	}

}

</style>