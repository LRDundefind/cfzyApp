<template>
	<div class="page-content">
		<mt-header fixed  title="签名">
			<router-link to="/" slot="left">
			    <mt-button icon="back" @click="$router.go(-1)"></mt-button>
			</router-link>
		</mt-header>
		<!--签名-->
		<div class="page-main autograph">
			<canvas style="background: #dedede;" @touchstart="onTouchstart($event)" @touchmove="onTouchmove($event)" @touchend="onTouchend($event)" @touchcancel="onTouchend($event)" id="myCanvas"></canvas>
			<div class="canvasBtn ub">
				<div class="lefts ub-f1" @click="clear">清空</div>
				<div class="center"></div>
				<div class="rights ub-f1" @click="submitAutograph">保存</div>
			</div>
			
		</div>
	</div>
</template>
<script>
import Cookies from 'js-cookie'
import Bus from '@/components/bus.js'
export default {
    data () {
        return {
			isDown: false,
			ctx: undefined,
			clientX: 0,
			clientY: 0
        }
    },
    mounted () {
		var myCanvas = document.getElementById('myCanvas');
		myCanvas.setAttribute("width", window.innerWidth);
		myCanvas.setAttribute("height", window.innerHeight - 98);
    },
    methods: {
		//监听按下
		onTouchstart: function($event) {
			this.isDown = true;
			if(!this.ctx) {
				this.ctx = myCanvas.getContext('2d');
				this.ctx.lineWidth = 1;
			}
			this.clientX = $event.changedTouches[0].clientX;
			this.clientY = $event.changedTouches[0].clientY-44;
		},
		onTouchmove: function($event) {
			if(this.isDown) {
				var clientX = $event.changedTouches[0].clientX;
				var clientY = $event.changedTouches[0].clientY-44;
				//								if(Math.abs(clientX - this.clientX) <= 3 && Math.abs(clientY - this.clientY) <= 3) {
				//									this.ctx.fillRect($event.clientX, $event.clientY, 3, 3);
				//								} else {　
				this.ctx.moveTo(this.clientX, this.clientY);
				this.ctx.lineTo(clientX, clientY);
				this.ctx.stroke();
				//								}
				this.clientX = clientX;
				this.clientY = clientY;
			}
		},
		onTouchend: function() {
			this.isDown = false;
		},
		clear(){
//			this.ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
			myCanvas.height = myCanvas.height;
		},
		//保存签名
		submitAutograph(){
			let images = myCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
			window.location.href = images; //在本地保存
			// Cookies.set('autograph',images);
			Bus.$emit('setphoneList',images)
            this.$router.push({
            	name: 'order',
				params: {}
            });
		},
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">

.autograph{
	.canvasBtn{
	    position: fixed;
	    bottom: .8rem;
	    padding: 0 0.3rem;
	    margin: 0.27rem 0 0.5rem;
	    box-sizing: border-box;
	    width: 100%;
		div{
			height: 0.9rem;
			line-height: 0.9rem;
			font-size: 0.3rem;
			text-align: center;
			color: #fff;
			border-radius: 1rem;
		}
		.lefts{
			width: 42%;
			background: #d0fde4;
			color: #33d57c;
			border: 1px solid #b5f1d0;
		}
		.center{
			width: 6%;
		}
		.rights{
			width: 52%;
	        background: -webkit-linear-gradient(left, #30b03e 0%,#33d57c 100%);
		}
	}
}


</style>