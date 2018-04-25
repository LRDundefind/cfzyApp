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
			<div class="submit" @click="submitAutograph">保存</div>
		</div>
	</div>
</template>

<script>
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
				var myCanvas = document.getElementById('myCanvas');
				this.ctx = myCanvas.getContext('2d');
				this.ctx.lineWidth = 1;
			}
			this.clientX = $event.changedTouches[0].clientX;
			this.clientY = $event.changedTouches[0].clientY-44;
			console.log(this.clientX,this.clientY)
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
		
		//保存签名
		submitAutograph(){
			let images = myCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
//			window.location.href = images;
			console.log(images)
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
	.submit{
        background: -webkit-linear-gradient(left, #30b03e 0%,#33d57c 100%);
		@include login_btn(fixed);
		bottom: 1rem;
		left: 0.3rem;
		width: 92%;
	}
}


</style>