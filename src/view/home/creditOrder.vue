<template>
	<div class="page-content">
		<mt-header fixed  title="赊账客户">
			<router-link :to="{name: 'home'}" slot="left">
			    <mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<search-box ref="search"/>
		<div class="page-main credit-order">
			<div v-for="n in 2" class="main-list" @click="gocreditOrderList(1)">
				<div class="ub ub-ac header">
					<div class='head-icon'></div>
					<div class="ub-f1 name c-3">我是谁</div>
				</div>
				<ul>
					<li class="ub">
						<div class="ub-f1">消费次数</div>
						<div>8</div>
					</li>
					<li class="ub">
						<div class="ub-f1">最后消费时间</div>
						<div>2018-12-23</div>
					</li>
					<li class="ub">
						<div class="ub-f1">赊账总金额</div>
						<div>1231</div>
					</li>
					<li class="ub">
						<div class="ub-f1">赊账最长时间</div>
						<div>90次</div>
					</li>
				</ul>
			</div>
			<!--自定义黑名单-->
			<div class="main-list" @click="gocreditOrderList(1)">
				<div class="ub ub-ac header">
					<div class='head-icon'></div>
					<div class="ub-f1 name c-3">我是谁</div>
					<div class="posi-icon"></div>
				</div>
				<ul>
					<li class="ub">
						<div class="ub-f1">消费次数</div>
						<div>8</div>
					</li>
					<li class="ub">
						<div class="ub-f1">最后消费时间</div>
						<div>2018-12-23</div>
					</li>
					<li class="ub">
						<div class="ub-f1">赊账总金额</div>
						<div>1231</div>
					</li>
					<li class="ub">
						<div class="ub-f1">赊账最长时间</div>
						<div>90次</div>
					</li>
				</ul>
			</div>
			<!--平台黑名单-->
			<div class="main-list" @click="gocreditOrderList(1)">
				<div class="ub ub-ac header">
					<div class='head-icon'></div>
					<div class="ub-f1 name c-3">我是谁</div>
					<div class="posi-icon ts"></div>
				</div>
				<ul>
					<li class="ub">
						<div class="ub-f1">消费次数</div>
						<div>8</div>
					</li>
					<li class="ub">
						<div class="ub-f1">最后消费时间</div>
						<div>2018-12-23</div>
					</li>
					<li class="ub">
						<div class="ub-f1">赊账总金额</div>
						<div>1231</div>
					</li>
					<li class="ub">
						<div class="ub-f1">赊账最长时间</div>
						<div>90次</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import searchBox from '@/components/searchBox/search'
export default {
    data () {
        return {
            
        }
	},
	components:{
		searchBox
	},
    mounted () {

    },
    methods: {
		getList(){},
		gocreditOrderList(n){
			this.$router.push({name:'creditOrderList',params: { id: n }});
		}
           
    }
}
</script>
<style scoped lang="scss">
	
	.credit-order{
		font-size: 0.24rem;
		color: #666;
		.main-list{
			background: #fff;
			margin-top: 0.2rem;
			padding: 0 0.3rem;
			.header{
				line-height: 1rem;
				border-bottom: 1px solid #dedede;
				padding-top: 0.1rem;
				position: relative;
				.head-icon{
					width: 0.6rem;
					height: 0.6rem;
					border-radius: 50%;
					overflow: hidden;
					background: url(../../assets/index/shouye_touxiang_img@2x.png) no-repeat;
					background-size: 0.6rem;
					margin-right: 0.26rem;
				}
				.name{
					font-size: 0.3rem;
				}
				.posi-icon{
					width: 1.5rem;
					height: 1.05rem;
					background: url(../../assets/index/kehu_hmd_zdy_img@2x.png) no-repeat;
					background-size: 1.5rem;
					position: absolute;
				    right: 0;
				    top: 0;
					
				}
				.posi-icon.ts{
					width: 1.25rem;
					height: 1.05rem;
					background: url(../../assets/index/kehu_hmd_pingtai_img@2x.png) no-repeat;
					background-size: 1.25rem;
				}
			}
			ul{
				padding: 0.1rem 0 0.18rem;
				li{
					line-height: 0.48rem;
				}
			}	
		}
		
	}

</style>