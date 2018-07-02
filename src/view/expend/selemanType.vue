<template>
	<div class="page-content">
		<mt-header fixed  title="费用类型">
			<router-link to="/expend" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
		</mt-header>
		<!-- tab-container -->
		<mt-tab-container>
			<div class="page-main page-loadmore-wrapper">
				<!-- :style="{ height: wrapperHeight + 'px' }" -->
				<noDate v-if="noData"></noDate> 
				<mt-loadmore 
					v-else
					:auto-fill="false"
					:top-method="loadTop" 
					:bottom-method="loadBottom"
					:bottom-all-loaded="allLoaded"
					ref="loadmore">
					<div class="basic-list" >
						<p class="clearfix textCenter" v-for="item in listStore" @click="chooseSelemanType(item.eid,item.expendName)">{{item.expendName}}</p>
					</div>
					<div v-if="allLoaded" class="m-t-10" style="text-align:center;font-size: 0.18rem;display: none;">没有更多数据了</div>
				</mt-loadmore>
			</div>
		</mt-tab-container>
	</div>
</template>

<script>
import {expend} from '@/services/apis/expend.js'
import noDate from '@/components/noData/noDate'
import { Loadmore , Indicator} from 'mint-ui'
import Cookies from 'js-cookie'
export default {
	components: { noDate },
    data () {
        return {
            pagaParams:{
            	page_size:10,
				current_page:1
            },
            loading:false,
            allLoaded: false,
            noData:false,
        	listStore: [],
        	listData:[]
        }
    },
    mounted () {
    	this.getSelemanType();
    	//document.getElementsByClassName('mint-tab-item-label')[0].style.color = '#000';
    },
    methods: {
    	/**
    	 * 选择费用类型
    	 * @return {[type]} [description]
    	 */
        chooseSelemanType(eid,name){
        	Cookies.set('eid',eid);
        	Cookies.set('expendName',name);
        	this.$router.push({
            	name: 'ordinaryExpenditure',
            });
        },  
        getSelemanType(){
        	expend.selemanType(this.pagaParams).then(response => {
                this.listData=response.data.results;
                if(this.listData.length==this.pagaParams.page_size){  
					//判断是否应该加载下一页
					this.pagaParams.current_page+=1 ;
				}else{
					//禁用上拉加载
					this.allLoaded = true;
				}
				if (this.listData) {

					this.listStore.push(...this.listData);
				}
				if (this.listStore == ''){
					this.noData = true;
				}

				Indicator.close();
            })
        },
        loadTop(){
	    	Indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });
	    	this.listStore = [];
	    	this.pagaParams.current_page = 1;
	    	this.getSelemanType();
	    	this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
	    	this.allLoaded = false;//下拉刷新时解除上拉加载的禁用

	    },
	    loadBottom() {
	    	Indicator.open({
                text: 'Loading...',
                spinnerType: 'fading-circle'
            });

	    	this.getSelemanType();
	    	this.$refs.loadmore.onBottomLoaded();
		} 
    },
    watch:{
        
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.page-loadmore-wrapper,.mint-loadmore{
	height: 100%;
}
.page-content {
    height: calc(100vh - 0.8rem);
    top: 0.8rem;
}
.basic-list {
    background: #fff;
    margin-top: 0.2rem;
    padding: 0 0.3rem;
    color: #333;
    font-size: 0.28rem;
    line-height: 0.94rem;
    > p {
        border-top: 1px #f0f0f0 solid;
    }
}

</style>

