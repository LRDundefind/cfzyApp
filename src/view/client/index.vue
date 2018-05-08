<template>
    <div class="page-content">
        <mt-header fixed title="客 户">
            <router-link :to="{name:'order'}" slot="left" v-if="type=='order'">
                <mt-button icon="back"></mt-button>
            </router-link>
            <span @click="addCustomer" style="font-size: 0.32rem" slot="right" v-if="type != 'order'">添加客户</span>
        </mt-header>
        <search-box  @getSmeage="searchstart"  ref="search"/>
        <noDate v-if="counts == 0"></noDate>  
        <div class="page-main page-loadmore-wrappe" :style="{ height: wrapperHeight + 'px' }" >

            <mt-loadmore 
				:auto-fill="false"
				:top-method="loadTop" 
				:bottom-method="loadBottom"
				:bottom-all-loaded="allLoaded"
				ref="loadmore">

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
                    <ul >
                        <li class="ub ub-pj">
                            <div class="ub-f1">消费次数</div>
                            <div class="ub-f1">{{n.consum_num}}次</div>
                        </li>
                        <li class="ub ub-pj">
                            <div class="ub-f1">最后消费时间</div>
                            <div class="ub-f1">{{n.consum_ltime}}</div>
                        </li>
                        <li class="ub ub-pj">
                            <div class="ub-f1">赊账总金额</div>
                            <div class="ub-f1">{{n.notPayAmount}}元</div>
                        </li>
                        <li class="ub ub-pc">
                            <div class="ub-f1">赊账最长时间</div>
                            <div class="ub-f1">{{n.creditTime}}</div>
                        </li>
                    </ul>
                </div>
                <div  style="text-align:center;font-size: 0.18rem;display:none"></div>
		  
			</mt-loadmore>
        </div>

    </div>
</template>

<script>
    import searchBox from '@/components/searchBox/search'
    import noDate from '@/components/noData/noDate'
    import { client } from '@/services/apis/client'
    import Cookies from 'js-cookie' 
    import { Loadmore , Indicator} from 'mint-ui'
    export default {
        data () {
            return {
                allLoaded: false,
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
           
            this.wrapperHeight = document.documentElement.clientHeight - 175;
            
            this.type = this.$route.params.type || false;
        },
        created(){
            this.getList();
        },
        methods: {
            searchstart(msg){
                this.params.search=msg;
                this.listStore = [];
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
                        this.counts = this.listdata.length;
                        if(this.listdata.length==this.params.page_size){  
                            //判断是否应该加载下一页
                            this.params.current_page+=1 ;
                        }else{
                            //禁用上拉加载
                            this.allLoaded = true;
                        }
                        if (this.listdata) {
                            this.listStore.push(...this.listdata)
                        }
                        Indicator.close();
                    })
                    
            },
            //跳转到添加客户
            addCustomer(){
                this.$router.push({name: 'index_change/create', params: {type: 'create'}})
            },
            goDetail(id, nickname){
                if (this.type == 'order') {
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
</script>
<style scoped lang="scss">
.page-loadmore-wrappe{
   overflow: scroll;
}
    .im {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 0.2rem;
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
            border-bottom: 1px #f0f0f0 solid;
            padding-bottom: 0.2rem;
        }
        h3 {
            font-size: 0.4rem;

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