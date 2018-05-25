<template>
    <div class="page-content">
        <mt-header fixed title="客户">
            <router-link :to="{name:'order'}" slot="left" v-if="type=='order'">
                <mt-button icon="back"></mt-button>
            </router-link>
            <span @click="addCustomer" style="font-size: 0.32rem" slot="right">添加客户</span>
        </mt-header>
        <div :class= "[ this.$route.params.type=='order'? 'maintop0' : 'maintop'] ">
            <search-box  @getSmeage='searchstart' :message='placeMessage'></search-box>
            
            <!--  :style="{ height: wrapperHeight + 'px' }"  -->
            <div class="page-main page-loadmore-wrappe heights" :class= "[ this.$route.params.type=='order'? 'topScroll0' : 'topScroll'] " >
             <noDate v-if="noWdata"></noDate>  
            <mt-loadmore 
                v-else
				:auto-fill="false"
				:top-method="loadTop" 
				:bottom-method="loadBottom"
				:bottom-all-loaded="allLoaded"
                :bottomDistance= 50
				ref="loadmore">
                <ul>
                        <li>
                            <div v-for="n in listStore" :key='n.id' class="main-list" @click="goDetail(n.cid, n.nickname)">
                                <div class="ub ub-ac heade">
                                    <div class='lis-icon ub-img im'>
                                        <img v-show="n.headImg!=''" :src="imgpath+n.headImg" >
                                        <img v-show="n.headImg==''" src="../../assets/my/my_head.png" alt="">
                                    </div>
                                    <div class='ub-f1 ut-s'>{{n.nickname}}</div>
                                    <!-- 正常客户状态 -->
                                    <div class=' res8 lis-sw ub-img im2' v-show="n.status=='Y'"></div>
                                    <!-- 平台状态 -->
                                    <div class=' res8 lis-sw ub-img im3' v-show="n.sys_status=='Y'"></div>
                                </div>
                                <div class="listStyle">
                                    <div class="ub ub-pj stylea">
                                        <div class="ub-f1">消费次数</div>
                                        <div class="ub-f1">{{n.consum_num}}次</div>
                                    </div>
                                    <div class="ub ub-pj stylea">
                                        <div class="ub-f1">最后消费时间</div>
                                        <div class="ub-f1">{{n.consum_ltime}}</div>
                                    </div>
                                    <div class="ub ub-pj stylea">
                                        <div class="ub-f1">赊账总金额</div>
                                        <div class="ub-f1">{{n.notPayAmount}}元</div>
                                    </div>
                                    <div class="ub ub-pc stylea">
                                        <div class="ub-f1">赊账最长时间</div>
                                        <div class="ub-f1">{{n.creditTime}}</div>
                                    </div>
                                </div>
                            </div>
                            
                    </li>
                    <!-- <div  style="text-align:center;font-size: 0.18rem;display:none"></div> -->
                </ul> 
                <div></div>
		  
			</mt-loadmore>
        </div>
        </div>
        

    </div>
</template>

<script>
    import { InfiniteScroll } from 'mint-ui';
    import searchBox from '@/components/searchBox/search'
    import noDate from '@/components/noData/noDate'
    import { client } from '@/services/apis/client'
    import Cookies from 'js-cookie' 
    import { Loadmore , Indicator} from 'mint-ui'
    export default {
        data () {
            return {
                comeFrom:true,
                placeMessage:'请输入客户名称、电话或身份证号',
            	heightNum: 40,
                allLoaded: false,
                noWdata:false,
                msg:'',
                wrapperHeight: 0,//容器高度
                type: '',
                listStore: [],
                listdata:null,
                counts: null,
                params:{
                    current_page: 1,
                    page_size: 10,
                    search:''
                },
                imgpath:process.env.BASE_PATH
            }
        },
        components: {
            searchBox,
            noDate
        },
        mounted () {
            if(this.$route.params.type=='order'){
                // this.wrapperHeight = document.documentElement.clientHeight/50 - 2.2;
                 this.wrapperHeight = document.documentElement.clientHeight - this.REM*1.4 -40;
            }
            else{
                 this.wrapperHeight = document.documentElement.clientHeight - this.REM*1.4 -100;
                
            }
            

            this.type = this.$route.params.type || false;
        },
        created(){
            this.getList();
            app.Vwaiting();
        },
        methods: {
            searchstart(msg){
                this.params.search=msg;
                this.listStore = [];
                this.params.current_page=1 ;
                this.noWdata = false;
                this.getList();
            },
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
            loadBottom() {
                Indicator.open({
                    text: 'Loading...',
                    spinnerType: 'fading-circle'
                });
                this.getList();
            },
            getList(){
               
                client.dataList(this.params)
                    .then(response => {
                        
                        this.listdata = response.data.results;
                        if(this.listdata==''&& this.params.current_page == 1){
                            this.noWdata=true;
                        }
                        app.Cwaiting();
                        if(this.listdata.length==this.params.page_size){  
                            //判断是否应该加载下一页
                            this.params.current_page+=1 ;

                        }else{
                            //禁用上拉加载
                            this.allLoaded = true;
                        }
                        if (this.listdata) {
                            this.listStore.push(...this.listdata)
                            if(this.listStore==''){
	                            this.noWdata=true;
	                        	app.Cwaiting();
	                        }
                        }
                       // this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位
                        Indicator.close();
                    })
                
                if(this.$route.params.type == 'order'){
                	this.heightNum = 140;
                }else{
                	this.heightNum = 175;
                }
                    
            },
            //跳转到添加客户
            addCustomer(){
                this.$router.push({name: 'index_change/create', params: {type: 'create'}})
            },
            goDetail(id, nickname){
                // 这是从新增跳转过来的，进入到下单页面
                if(Cookies.get('froms')){
                    Cookies.set('customerId',id);
                    Cookies.set('customerName',nickname);
                    Cookies.remove('froms');
                    this.$router.push({name: 'order'});
                }
                else{
                    if (this.type == 'order') {
                        // 这个直接进入的返回到下单页面
                        Cookies.set('customerId',id);
                        Cookies.set('customerName',nickname);
                        //下单
                        this.$router.push({name: 'order'});
                    } else {
                        // 客户详情
                        this.$router.push({name: 'client_detail', params: {ids: id}});
                    }
                }
                
            }
        }
    }
</script>
<style scoped lang="scss">
.mint-loadmore-bottom{
    display: none !important;
}
.topScroll{
     height: calc(100vh - 150px);
    top: 100px;
    bottom: 1.1rem;
}
.topScroll0{
    height: calc(100vh - 100px);
    top: 100px;
    bottom: 0rem;
}
.page-loadmore-wrappe{
   overflow: scroll;
    -webkit-overflow-scrolling : touch;
}
    .im {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 0.2rem;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .im2 {
      width: 1.2rem;
      height: 0.8rem;
      background-image: url(../../assets/client/kehu_zidingyi_img.png);
    }
    .im3 {
      width: 1.2rem;
      height: 0.8rem;
      background-image: url(../../assets/client/kehu_pingtai_img.png);
    }
    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.2rem;
        color: #333;
        .heade {
            font-size: 0.4rem;
            border-bottom: 1px #dedede solid;
            padding-bottom: 0.2rem;
        }
        h3 {
            font-size: 0.4rem;

            line-height: 0.8rem;
        }
        .listStyle {

            .stylea {
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