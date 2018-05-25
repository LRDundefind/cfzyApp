<template>
	<div class="page-content">
		<mt-header fixed  title="还款记录">
            <mt-button icon="back" @click="goUp()" slot="left"></mt-button>

			<!--<router-link to="/ownerChoice" slot="right">-->
				<!--<span class="c-3 f-s-16 gearname">{{gearName}}</span>-->
                <!--<img class="header_icon" src="../../assets/index/down_icon.png"/>-->
			<!--</router-link>-->
		</mt-header>
		<!--<ul class="pay-list" v-if="payList!=''">-->
			<!--<li class="pay-total ub ub-pj">-->
				<!--<div class="ub ub-ac">-->
					<!--<span class="ub-f1 c-3">赊账总金额</span>-->
					<!--<i class="c-6">￥{{payList.noPayAmount}}</i>-->
				<!--</div>-->
				<!--<div class="ub ub-ac">-->
					<!--<span class="ub-f1 c-3">还款总金额</span>-->
					<!--<i class="c-6">￥{{payList.creditAmount}}</i>-->
				<!--</div>-->
			<!--</li>-->
		<!--</ul>-->
		<!--还款记录列表-->
		<div class="page-main page-loadmore-wrapper topScroll">
			<noDate v-if="counts || count"></noDate>
			<mt-loadmore 
			v-else
			:auto-fill="false"
			:top-method="loadTop" 
			:bottom-method="loadBottom"
			:bottom-all-loaded="allLoaded"
			ref="loadmore">
				<ul class="pay-list">
					<li v-for="list in listStore">
						<div class="ub list-t">
							<div class="pay">还款金额</div>
							<div class="edu ub-f1">￥{{list.refundAmount}}</div>
							<div class="type" v-if="list.refundType == 'type_alipay'">支付宝</div>
							<div class="type" v-if="list.refundType == 'type_wechat'">微信</div>
							<div class="type" v-if="list.refundType == 'type_cash'">现金</div>
							<div class="type" v-if="list.refundType == 'type_card'">银行卡</div>
						</div>
						<div class="ub list-c">
							<div class="data">还款日期</div>
							<div class="datatime">{{list.refundTime}}</div>
						</div>
						<div class="ub list-b">
							<div class="remarks c-6">备注</div>
							<div class="info ub-f1 c-6">{{list.remark || '...'}}</div>
						</div>
					</li>
				</ul>
				<div></div>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
import { client } from '@/services/apis/client'
import { Loadmore , Indicator} from 'mint-ui'
import noDate from '@/components/noData/noDate'
import Cookies from 'js-cookie'
export default {
	components: { noDate },
    data () {
        return {
            come:'',
            gearName:'',
            
            allLoaded: false,
            wrapperHeight: 0,//容器高度
            params:{
                current_page: 1,
                page_size: 10,
            },
            listStore: [],
            payList: [],//列表数据
			counts: false,
			count: false,
        }
    },
    mounted () {
		this.wrapperHeight = document.documentElement.clientHeight - 170;
    	
		if(JSON.parse(Cookies.get('gidOwnID_lists')).gearName){
            this.gearName = JSON.parse(Cookies.get('gidOwnID_lists')).gearName;
        }
    },
    created(){
        this.come = this.$route.params.come;
    	this.getPayList();
    	app.Vwaiting();
    },
    methods: {
        goUp(){
            if(this.come == 'home'){
                this.$router.push({
                    name: 'home',
                });
            }else if(this.come == 'black'){
                this.$router.push({
                    name: 'client_detail',
                    params: {
                        ids: this.$route.params.cid,
                        come:'black'
                    }
                });
            }else {
                this.$router.push({
                    name: 'client_detail',
                    params: {
                        ids: this.$route.params.cid,
                        come:'client'
                    }
                });
            }
        },
		getPayList(){
        	var params = {
        		cid: this.$route.params.cid,
        		current_page: this.params.current_page,
        		page_size: this.params.page_size,
        	};

            client.getPayList(params)
                .then(response => {
                    this.payList = response.data.results;

                    if(this.payList=='' && this.params.current_page == 1){
                		this.count = true;
                    }
                    app.Cwaiting();
                    
					if(this.payList.length == this.params.page_size){  
                        //判断是否应该加载下一页
                        this.params.current_page += 1 ;
                    }else{
                        //禁用上拉加载
                        this.allLoaded = true;
                    }
                    if (this.payList) {
                        this.listStore.push(...this.payList)
                        if(this.listStore==''){
	                        this.counts = true;
	                        app.Cwaiting();
	                    }
					}
					this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
                    Indicator.close();
                    
                })
                .catch(function (response) {
					console.log(response);
				});
        },
    	//下拉刷新
        loadTop(){
            Indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            this.listStore = [];
            this.params.current_page = 1;
            this.getPayList();
            this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
            this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
        },
        //上拉加载
        loadBottom() {
            Indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            this.getPayList();
            this.$refs.loadmore.onBottomLoaded();
        },
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.topScroll{
    height: calc(100vh - 100px);
    top: 100px;
    bottom: 0rem;
}
i{
	font-style: normal;
}

.gearname{
	text-overflow: ellipsis;
    overflow: hidden;
    width: 4em;
    white-space: nowrap;
    display: inline-block;
}
.header_icon {
    width: 0.32rem;
    padding-top: 0.1rem;
    padding-left: 0.05rem;
}
.mint-header-button.is-right{
	flex: inherit;
}
.page-loadmore-wrapper{
	overflow: scroll;
	-webkit-overflow-scrolling : touch;
}
.pay-list{
	font-size: 0.24rem;
	color: #333;
	.pay-total{
		font-size: 0.26rem;
		span{
			display: block;
			margin-right: 0.36rem;
		}
		i{
			display: block;
			font-size: 0.34rem;
			color: #33d57c;
		}
	}
	li{
		background: #fff;
		margin-bottom: 0.2rem;
		padding: 0.18rem 0.3rem 0.16rem;
		.list-t{
			line-height: 0.5rem;
			.pay{
				font-size: 0.3rem;
				margin-right: 0.36rem;
			}
			.edu{
				font-size: 0.3rem;
				color: #33d57c;
			}
			.type{
				font-size: 0.26rem;
				color: #4c4c4c;
			}

		}
		.list-c{
			line-height: 0.5rem;
			font-size: 0.26rem;
			color: #4c4c4c;
			.data{
				margin-right: 0.15rem;
			}
		}
		.list-b{
			line-height: 0.5rem;
			font-size: 0.24rem;
			line-height: 0.48rem;	
			.remarks{
				margin-right: 0.15rem;
				word-break: break-all;
			}		
		}
	}
}



</style>