<template>
	<div class="page-content">
		<mt-header fixed  title="车次位置">
               
                    <mt-button icon="back" slot="left" @click="golist"></mt-button>
            
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
import Cookies from 'js-cookie'
import {logistics} from '@/services/apis/logistics'
export default {

    data () {
        return {
			orderId: this.$route.params.orderId,
			longitude:116.404,	//定义经度
　　　　　　 latitude:39.915	//定义纬度
        }
	},
	created(){
	 this.goDetail()
	},
    mounted () {
		 
           
			 
    },
    methods: {
            goDetail(){
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
								inCode:140007,
								content:{
										orderId:this.orderId
								}
						};
					logistics.auth(params).then(response => {
						let ss=JSON.parse(response.data.results)
						if(ss.status==200){
							this.Xdtlist=ss.content;
							this.longitude=this.Xdtlist.eandw;
							this.latitude=this.Xdtlist.nands;
							this.dT()
						}
						
						
					})
            },
			dT(){
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