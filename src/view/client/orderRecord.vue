<template>
	<div class="page-content">
		<mt-header fixed  title="消费记录">
            <mt-button icon="back" @click="goUp()" slot="left"></mt-button>
			<!--<router-link to="/ownerChoice" slot="right">-->
				<!--<span class="c-3 f-s-16 gearname">{{gearName}}</span>-->
                <!--<img class="header_icon" src="../../assets/index/down_icon.png"/>-->
			<!--</router-link>-->
		</mt-header>
		<!--消费记录列表-->
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
				<ul class="order-record">
					<li v-for="list in listStore" @click="orderDetail(list.oid)">
						<div class="ub list-top">
							<span class="ub-f1">订单号&nbsp;{{list.orderNo}}</span>
							<i class="c-6" v-if="list.status == 'status_topay'">待支付</i>
							<i class="c-6" v-if="list.status == 'status_topick'">待提货</i>
							<i class="c-6" v-if="list.status == 'status_complete'">已完成</i>
							<i class="c-6" v-if="list.status == 'status_cancel'">已取消</i>
							<i class="c-6" v-if="list.status == 'status_repay'">待还款</i>
							<i class="c-6" v-if="list.status == 'status_deposit'">暂存</i>
						</div>
						<div class="ub list-bottom">
							<span class="ub-f1 c-6">{{list.placeOrderTime}}</span>
							<i>￥{{list.salesAmount}}</i><!--销售金额-->
						</div>
					</li>
				</ul>
				<div></div>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
import searchBox from '@/components/searchBox/search'
import noDate from '@/components/noData/noDate'
import { client } from '@/services/apis/client'
import { Loadmore , Indicator} from 'mint-ui'
import Cookies from 'js-cookie'
export default {
	components: { searchBox, noDate },
    data () {
        return {
            come:'',
            gearName:'',
            
            placeMessage:'请输入要检索的订单编号',
            allLoaded: false,
            wrapperHeight: 0,//容器高度
            params:{
                current_page: 1,
                page_size: 10,
            },
            listStore: [],
            orderLists: [],//列表数据
			counts: false,
			count: false,
            val: '', //搜索
        }
    },
    mounted () {
		this.wrapperHeight = document.documentElement.clientHeight - 220;
    	
		if(JSON.parse(Cookies.get('gidOwnID_lists')).gearName){
            this.gearName = JSON.parse(Cookies.get('gidOwnID_lists')).gearName;
        }
    },
    created(){
	    this.come = this.$route.params.come;

        this.getOrderLists();
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

		getOrderLists(val){
        	var params = {
        		orderType: 'all',
        		cid: this.$route.params.cid,
        		current_page: this.params.current_page,
        		page_size: this.params.page_size,
        		search: val,//搜索
        	};

            client.getRecordList(params)
                .then(response => {
                    this.orderLists = response.data.results;
                    if(this.orderLists=='' && this.params.current_page == 1){
                		this.count = true;
                    }
                    app.Cwaiting();
                    
					if(this.orderLists.length == this.params.page_size){  
                        //判断是否应该加载下一页
                        this.params.current_page += 1 ;
                    }else{
                        //禁用上拉加载
                        this.allLoaded = true;
                    }
                    if (this.orderLists) {
                        this.listStore.push(...this.orderLists)
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
        //搜索
        searchHandler(value){
        	this.params.current_page = 1 ;
        	this.listStore = [];
        	this.counts = false;
        	this.count = false;
			this.getOrderLists(value);
		},
		
    	//下拉刷新
        loadTop(){
            Indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            this.listStore = [];
            this.params.current_page = 1;
            this.getOrderLists();
            this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
            this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
        },
        //上拉加载
        loadBottom() {
            Indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
            this.getOrderLists();
        },
        
	    //跳转到订单详情
        orderDetail(oid){
            this.$router.push({
                name: 'ordersList/ordersDetail',
                params: {
                    oid:oid
                }
            });
        }
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.topScroll0{
    height: calc(100vh - 100px);
    top: 100px;
    bottom: 0rem;
}
i{
	font-style: normal;
}
.page-main {
	width: 100%;
    position: fixed;
    top: 2.2rem;
    bottom: 0;
}
.gearname{
	text-overflow: ellipsis;
    overflow: hidden;
    width: 4em;
    white-space: nowrap;
    display: inline-block;
}
.searchBox{
	/*margin-bottom: 0.2rem;*/
	top: 0 !important;
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
.order-record{
	font-size: 0.24rem;
	color: #333;
	li{
		background: #fff;
		margin-bottom: 0.2rem;
		padding: 0.18rem 0.3rem;
		.list-top{
			line-height: 0.53rem;
			span,i{
				display: block;
			}
			span{
				font-size: 0.3rem;
			}
		}
		.list-bottom{
			line-height: 0.48rem;			
			span,i{
				display: block;
			}
			i{
				font-size: 0.32rem;
				color: #49c98b;
			}
		}
	}
}



</style>