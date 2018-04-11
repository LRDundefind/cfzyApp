<template>
	<div class="page-content">
		<mt-header fixed  title="物流">
		</mt-header>
		<!--物流-->
		<div class="page-main logistics">
			<div class="not-online">
				<img src="../../assets/wuliu.png">
				<div>敬请期待...</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {

    data () {
        return {
        }
    },
    mounted () {

    },
    methods: {
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">

.not-online{
	position: fixed;
	width: 100%;
	height: 100%;
	margin-top: 0.2rem;
	background: #fff;
	padding-top: 2.14rem;
	img{
		width: 4.18rem;
		height: 4.18rem;
		display: block;
		margin: 0 auto;
	}
	div{
		font-size: 0.28rem;
		color: #333;
		margin: 0.42rem 0 0;
		text-align: center;
	}
}


</style>