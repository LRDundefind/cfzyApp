<template>
	<div class="page-content">
		<mt-header fixed  title="货 主">
			<!-- <router-link to="/" slot="left">
			    <mt-button icon="back">返回</mt-button>
			</router-link> -->
			<!-- <mt-button icon="more" slot="right"></mt-button> -->

		</mt-header>

		<div class="page-main">
			<search-box ref="search"/>
			<router-link :to="{ name: 'owner/ownerDetail',params: {}}">
			<div v-for="n in 20" :key='n' class="main-list">
				<h3>名字</h3>
				<ul class="clearfix">
					<li class="f-l">待结算车次 5</li>
					<li class="f-l">发货总数 8</li>
					<li class="f-l">已结款 ￥1000</li>
					<li class="f-l">尚欠款 ￥200</li>
				</ul>
			</div>
			</router-link>
		</div>
	</div>
</template>

<script>
import searchBox from '@/components/searchBox/search'
export default {
	components: { searchBox },
    data () {
        return {
            //searchValue:this.$refs.search.searchValue
        }
    },
    mounted () {

    },
    methods: {
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
	
	.searchBox{
		padding: 0.2rem 0.5rem;
		background: #fff;
		input{
		    display: block;
		    width: 100%;
		    height: 0.9rem;
		    box-sizing: border-box;
		    padding-left: 1rem;
		    border-radius: 2em;
		    font-size:  $fons_size_26;

			background:#e1fcef url(../../assets/kehu_search_icon.png);
			background-position: 0.3rem center;
    		background-repeat: no-repeat;

		}
		.clearSearch{
			top: 0.2rem;
			right: 0.5rem;
			width: 0.9rem;
			height: 0.9rem;
			background: url(../../assets/kehu_del_icon.png) center;
			background-repeat: no-repeat;
		}
	}

	
	.main-list{
		background: #fff;
		margin-top: 0.2rem;
		padding: 0.2rem;
		color: #333;
		h3{
			font-size: 0.4rem;
			border-bottom: 1px #f0f0f0 solid;
			line-height: 0.8rem;
		}
		ul{

			li{
				width: 50%;
				font-size: 0.3rem;
				margin-top: 0.1rem;
			}
			li:nth-child(2), li:nth-child(4)
			{
				text-align: right;
			}
		}
	}

</style>