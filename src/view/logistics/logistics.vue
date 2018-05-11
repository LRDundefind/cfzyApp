<template>
	<div class="page-content">
		<mt-header fixed  title="物流">
            <router-link to="/storage" slot="left">
                <mt-button v-if="this.$route.params.fromc=='order'" icon="back"></mt-button>
            </router-link>
            <span class="c-3 f-s-16" slot="right" @click="sendXDT">发布货源</span>
		</mt-header>
		<!--物流-->
		<div class="page-main logistics">
			<!-- <div class="not-online">
				<img src="../../assets/wuliu.png">
				<div>敬请期待...</div>
			</div> -->
			<div class="page-main page-loadmore-wrappe" :style="{ height: wrapperHeight + 'px' }" >
            <noDate v-show="Xdtlist.length=='0'"></noDate>  
          
            <!-- <mt-loadmore 
				:auto-fill="false"
				:top-method="loadTop" 
				:bottom-method="loadBottom"
				:bottom-all-loaded="allLoaded"
				ref="loadmore"> -->

                <div v-for="n in Xdtlist" :key='n.id' class="main-list" @click="goDetail(n)">
                    <div class="ub ub-ac heade">
                        <div class='lis-icon'>发货人&nbsp;</div>
                        <!-- {{n.nickname}} -->
                        <div class='ub-f1 ut-s ft28'>{{n.goodOwnerName}}</div>
                        <!-- 正常客户状态 -->
                        <div class='res8 lis-sw col33d547' @click="goBaiMap(n.orderId)">查看位置</div>
                    </div>
                    <ul >
                        <li class="ub ub-pj">
                            <div class="ub-f1">车牌号</div>
                            <div class="ub-f1">{{n.plateNumber}}</div>
                        </li>
                        <li class="ub ub-pj">
                            <div class="ub-f1">司机</div>
                            <div class="ub-f1">{{n.carDriverMan}}</div>
                        </li>
                        <li class="ub ub-pj">
                            <div class="ub-f1">司机电话</div>
                            <div class="ub-f1">{{n.carDriverPhone}}</div>
                        </li>
                    </ul>
                </div>
                <div  style="text-align:center;font-size: 0.18rem;display:none"></div>
		  
			<!-- </mt-loadmore> -->	
        </div>
			
		</div>
	</div>
</template>

<script>
import Cookies from 'js-cookie'
import noDate from '@/components/noData/noDate'
import {logistics} from '@/services/apis/logistics'
export default {
    components:{
        noDate
    },
    data () {
        return {
			  allLoaded: false,
              msg:'',
              Xdtlist:[],
			  wrapperHeight: 0,//容器高度
        }
    },
    mounted () {
        if(this.$route.params.fromc=='order'){
            this.wrapperHeight = document.documentElement.clientHeight - 40;
        }else {
            this.wrapperHeight = document.documentElement.clientHeight - 85;
        }

    },
    created(){
        this.getlist()
    },
    methods: {
            sendXDT(){
                // if(typeOf(XDYApp)!=undefined){
                //     XDYApp.startXDT();
                // }
                XDYApp.startXDT();
                // console.log('请去真机上点击')
            },
			// 跳转区分
			goDetail(item){
				if(this.$route.params.fromc=='order'){
					this.$router.push({name: 'storage',params:{item:item}})
				}
			},
			//查看位置
            goBaiMap(orderId){
				this.$router.push({name: 'baiduMap', params: {orderId:orderId}})
            },
            getlist(){
                let rd=parseInt(100*Math.random());  //需要的随机数
                if(rd>900){
                    rd
                }
                else{
                    rd=rd+100
                }
                let time=new Date().getTime();     //生成时间戳
                let uId= Cookies.get('sid');
                let params = {
                            uId:uId,
                            tokenId:'',
                            time:time,
                            rd:rd,
                            inCode:140021,

                            content:{
                                    mobilePhone:Cookies.get('xdtPhne'),
                                    userId:Cookies.get('xdtuseid'),
                                    page:1,
                                    count:10,
                                    orderState:3,
                            }
                    };
                logistics.auth(params).then(response => {
                    let ss=JSON.parse(response.data.results)
                    this.Xdtlist=ss.content.items;
                    console.log(this.Xdtlist)
                    
                })
            }
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.page-loadmore-wrappe{
   overflow: scroll;
}
.ft28{font-size: 0.36rem;}
.col33d547{color: #33d547;border:1px solid #33d547;padding: 0.05rem 0.25rem;border-radius: 25px;}
    .im {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 0.2rem;
    }
    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.2rem;
        color: #333;
        .heade {
            font-size: 0.32rem;
            border-bottom: 1px #f0f0f0 solid;
            padding-bottom: 0.2rem;
        }
        h3 {
            font-size: 0.32rem;
            line-height: 0.8rem;
        }
        ul {

            li {
                font-size: 0.3rem;
                margin-top: 0.1rem;
                padding-bottom: 0.1rem;
                div:last-child {
                    text-align: right;
                }
            }
        }
    }


</style>