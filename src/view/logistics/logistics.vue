<template>
	<div class="page-content">
		<mt-header fixed  title="物流">
		</mt-header>
		<!--物流-->
		<div class="page-main logistics">
			<!-- <div class="not-online">
				<img src="../../assets/wuliu.png">
				<div>敬请期待...</div>
			</div> -->
			<div id="container">

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
		    // 百度地图API功能
            // 创建Map实例
            var map = new BMap.Map("XSDFXPage",{enableMapClick:true});
            // 初始化地图,设置中心点坐标和地图级别
            map.centerAndZoom(new BMap.Point(116.4035,39.915), 11);
            // 添加地图类型控件
            map.addControl(new BMap.MapTypeControl());  
            // 设置地图显示的城市 此项是必须设置的
            map.setCurrentCity("北京"); 
			
			setTimeout(function(){
                map.panTo(new BMap.Point(113.262232,23.154345));
            }, 2000);  
    },
    methods: {
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
#container{
	width: 100%;
	height: 100%;
}
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