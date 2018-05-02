<template>
	<div class="page-content">
		<mt-header fixed  title="车次位置">
               
                    <mt-button icon="back" slot="left" @click="golist">返回</mt-button>
            
		</mt-header>
		<!--物流-->
			<!-- <div class="not-online">
				<img src="../../assets/wuliu.png">
				<div>敬请期待...</div>
			</div> -->
			<div class="page-main page-loadmore-wrappe logistics" >
                <div id="XSDFXPage">

			    </div>
		   </div>
	</div>
</template>

<script>

export default {

    data () {
        return {
			longitude:116.404,	//定义经度
　　　　　　 latitude:39.915	//定义纬度
        }
    },
    mounted () {
           // 百度地图API功能
            // 创建Map实例
            var map = new BMap.Map("XSDFXPage",{enableMapClick:true});
            // 初始化地图,设置中心点坐标和地图级别
　　　　　　var point = new BMap.Point(this.longitude,this.latitude);
　　　　　　map.centerAndZoom(point, 11);
　　　　　　var marker = new BMap.Marker(point);// 创建标注
　　　　　　map.addOverlay(marker);

            // 设置地图显示的城市 此项是必须设置的
           map.setCurrentCity("北京"); 
			
			// setTimeout(function(){
            //     map.panTo(new BMap.Point(this.longitude,this.latitude));
            // }, 5000);  
			 
    },
    methods: {
            goDetail(){
                
            },
            golist(){
                window.history.go(-1);
            }

    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.page-loadmore-wrappe{
   overflow: scroll;
}
#XSDFXPage{
	width: 100%;
	height: 100%;
}
.page-main{
	height: calc(100vh - 0.8rem);
}
.not-online{
	position: fixed;
	width: 100%;
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