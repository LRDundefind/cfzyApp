<template>

	<div class="page-main">
		<router-link :to="{ name: 'send/sendDetail',params: {sendId:1123}}">
		<div v-for="n in 10" :key='n' class="main-list">
			
			<ul class="clearfix">
				<li class="f-l line-ellipsis-1">2018-03-06 张雄 车次562018-03-06 张雄 车次56</li>
				<li class="f-l">待结算</li>
				<li class="f-l">到达时间 16：40</li>
				<li class="f-l">￥3300</li>
			</ul>
			
		</div>
		</router-link>
	</div>

</template>

<script>

export default {
    data () {
        return {
            value:''
        }
    },
    mounted () {

    },
    methods: {
        getList(){}
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
	.page-main{
		width: 100%;
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