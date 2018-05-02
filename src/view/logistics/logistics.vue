<template>
	<div class="page-content">
		<mt-header fixed  title="物流">
                <span class="c-3 f-s-16" slot="right">发布货源</span>
		</mt-header>
		<!--物流-->
		<div class="page-main logistics">
			<!-- <div class="not-online">
				<img src="../../assets/wuliu.png">
				<div>敬请期待...</div>
			</div> -->
			<div class="page-main page-loadmore-wrappe" :style="{ height: wrapperHeight + 'px' }" >

          
            <!-- <mt-loadmore 
				:auto-fill="false"
				:top-method="loadTop" 
				:bottom-method="loadBottom"
				:bottom-all-loaded="allLoaded"
				ref="loadmore"> -->

                <div v-for="n in 3" :key='n.id' class="main-list" @click="goDetail()">
                    <div class="ub ub-ac heade">
                        <div class='lis-icon'>发货人&nbsp;</div>
                        <!-- {{n.nickname}} -->
                        <div class='ub-f1 ut-s ft28'> 张三</div>
                        <!-- 正常客户状态 -->
                        <div class='res8 lis-sw col33d547' @click="goBaiMap()">查看位置</div>
                    </div>
                    <ul >
                        <li class="ub ub-pj">
                            <div class="ub-f1">车牌号</div>
                            <div class="ub-f1">888888</div>
                        </li>
                        <li class="ub ub-pj">
                            <div class="ub-f1">司机</div>
                            <div class="ub-f1">小李</div>
                        </li>
                        <li class="ub ub-pj">
                            <div class="ub-f1">司机电话</div>
                            <div class="ub-f1">小李</div>
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

export default {

    data () {
        return {
			  allLoaded: false,
			  msg:'',
			  wrapperHeight: 0,//容器高度
        }
    },
    mounted () {

			this.wrapperHeight = document.documentElement.clientHeight - 160; 
    },
    methods: {
			// 跳转区分
			goDetail(){
				if(this.$route.params.fromc=='order'){
					this.$router.push({name: 'storage'})
				}
			},
			//查看位置
            goBaiMap(){
				this.$router.push({name: 'baiduMap', params: {}})
			}
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.page-loadmore-wrappe{
   overflow: scroll;
}
.ft28{font-size: 0.43rem;}
.col33d547{color: #33d547;border:1px solid #33d547;padding: 0.1rem 0.25rem;border-radius: 25px;}
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