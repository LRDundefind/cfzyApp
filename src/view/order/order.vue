<template>
	<div class="page-content">
		<mt-header fixed  title="下单">
			<router-link to="/ownerChoice" slot="left">
                <span class="c-3 f-s-16">白云上档A</span>
                <img class="header_img" src="../../assets/index/down_icon.png"/>
           </router-link>
           <router-link to="/" slot="right">
                <span class="c-3 f-s-16">赊账规则</span>
           </router-link>
		</mt-header>
		<!--下单-->
		<div class="page-main">
			<div class="order-detail">
				<div class="ub ub-ac term no-border right-icon" @click="chooseLicenseNumber()">
					<div>2018-03-31</div>
					<div class="driver-name">小李</div>
					<div class="ub-f1">车次89</div>
					<span class="c-3 F26C4c">京A 45698</span>
					<img src="../../assets/my/icon_right.png" class="icon">
				</div>
			</div>
			<div class="order-detail">
				<div class="ub ub-ac term right-icon input-choose" @click="chooseCustomer()">
					<input id="kh" type="radio" name="choose" checked="checked">
					<label for="kh" class="customer"></label>
					<div class="ub-f1">客户</div>
					<span>小李</span>
					<img src="../../assets/my/icon_right.png" class="icon">
				</div>
				<div class="ub ub-ac term no-border input-choose">
					<input id="sk" type="radio" name="choose">
					<label for="sk" class="individual"></label>
					<div class="ub-f1">临时客户</div>					
				</div>
			</div>
			<!--货品信息-->
			<div class="order-detail item-table">
				<table>
					<thead>
						<tr>
							<th>品名</th>
							<th>重量</th>
							<th>单价</th>
							<th>金额</th>
							<th>件数</th>
							<th>包装费</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="n in 3">
							<td>大白菜</td>
							<td>100斤</td>
							<td>4.55</td>
							<td>600.00</td>
							<td>20</td>
							<td>20.00</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="order-detail">
				<div class="ub term">
					<div class="ub-f1">贷款费用</div>
					<div class="edu">￥45</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">包装费</div>
					<div class="edu">￥45</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">过磅费</div>
					<div class="edu">￥45</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">三轮费</div>
					<div class="edu">￥45</div>
				</div>
				<div class="ub term">
					<div class="ub-f1">车号</div>
					<div class="F26C4c">京A12356</div>
				</div>
				<div class="ub term no-border">
					<div class="ub-f1">合计金额</div>
					<div class="total">￥330,000</div>
				</div>
			</div>
			<!--付款方式-->
			<div class="order-detail">
				<div class="ub ub-ac term right-icon input-choose">
					<input id="xj" type="radio" name="choosetype" checked="checked">
					<label for="xj" class="individual"></label>
					<div class="ub-f1"></div>					
					<div>现结</div>					
				</div>
				<div class="ub ub-ac term no-border input-choose">
					<input id="sz" type="radio" name="choosetype">
					<label for="sz" class="individual"></label>
					<div class="ub-f1"></div>					
					<div>赊账</div>					
				</div>
			</div>
			<!--备注信息-->
			<div class="order-detail">
				<div class="term">
					<div class="">备注</div>
				</div>
				<div class="term no-border">
					<textarea class="" placeholder="备注信息"></textarea>
				</div>
			</div>
			<div class="order-detail">
				<div class="ub ub-ac term no-border right-icon" @click="autograph()">
					<div class="ub-f1">签名</div>
					<img src="../../assets/my/icon_right.png" class="icon">
				</div>
			</div> 
			<div class="orderBtn ub">
				<div class="lefts" @click="stagingOrder">暂存</div>
				<div class="center"></div>
				<div class="rights" @click="submitOrder">下单</div>
			</div>

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
	    //选择车次
        chooseLicenseNumber(){

        },
        //选择客户
        chooseCustomer(){

        },
        //签名
        autograph(){
        	
        },
        //暂存订单
        stagingOrder(){
        	
        },
        //下单
        submitOrder(){
        	
        },
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
i{
	font-style: normal;
}
.header_img{
    width: 0.32rem;
    padding-top: 0.1rem;
    padding-left: 0.05rem;
}
.order-detail{
	font-size: 0.28rem;
	color: #333;
	background: #fff;
	padding: 0 0.3rem;
	margin-top: 0.2rem;
	.term{
		line-height: 0.96rem;
		border-bottom: 1px solid #dedede;
		div.total{
			font-size: 0.32rem;
			color: #49c98b;
		}
		.driver-name{
			margin: 0 0.15rem;
		}
		.remarks{
			font-size: 0.26rem;
			color: #666;
		    padding-bottom: 0.6rem;
		}
		.edu{
			color: #333;
			font-size: 0.28rem;
		}
		.F26C4c{
			font-size: 0.26rem;
			color: #4c4c4c;
		}
	}
	.input-choose{
		label{
			display: block;
		}	
		input{
			display: none;
		}	
		input[type='radio']+label{
			margin-right: 0.26rem;
			width: 0.42rem;
			height: 0.42rem;
			cursor: pointer;
			border-radius: 50%;
		    background: url(../../assets/xiadan_weixuanzhong_btn@2x.png) no-repeat center;
		    background-size: contain;
		}
		input[type='radio']:checked+label{
		    background: url(../../assets/xiadan_xuanzhong_btn@2x.png) no-repeat center;
		    background-size: contain;
		}
	}
	
	/*备注信息*/
	textarea{
		width: 100%;
		height: 3em;
		border: none;
		padding: 0.2rem 0 0;
		resize: none;
	}
	textarea::-webkit-input-placeholder{
		font-size: 0.26rem;
		color: #666;
	}
	
	.right-icon{
		img.icon{
			width: 0.18rem;
			display: block;
		}
		span{
			margin: 0 .2rem 0 .15rem;
		}
	}
	.term.no-border{
		border-bottom: none;
	}
}
.order-detail.item-table{
	color: #4c4c4c;
	font-size: 0.26rem;
	padding-top: 0.3rem;
	.term{
		color: #4c4c4c;
		.infor{
			font-size: 0.28rem;
		}
	}
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
					padding-left: 0.2rem;
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
.orderBtn{
	padding: 0 0.3rem;
	margin: 0.27rem 0 0.5rem;
    box-sizing: border-box;
	div{
		height: 0.9rem;
		line-height: 0.9rem;
		font-size: 0.3rem;
		text-align: center;
		color: #fff;
		border-radius: 1rem;
	}
	.lefts{
		width: 42%;
		background: #d0fde4;
		color: #33d57c;
		border: 1px solid #b5f1d0;
	}
	.center{
		width: 6%;
	}
	.rights{
		width: 52%;
        background: -webkit-linear-gradient(left, #30b03e 0%,#33d57c 100%);
	}
}

</style>