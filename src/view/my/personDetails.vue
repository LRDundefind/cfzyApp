<template>
    <div class="page-content">
        <div class="page-main">

            <div class="b-c-f">
                <div class="top ">
                    <div class="ub ub-pc p-t-10">
                        <div class="c-f f-s-18 ">完善用户资料</div>
                        <div @click="$router.go(-1)" class="leftIcon"></div>
                    </div>
                    <div class="ub ub-pc">
                        <div class="sc">
                            <div style="opacity: 0" class="picture" :style="'backgroundImage:url('+headerImage+')'"></div>
                            <input type="file" id="upload" accept="image" @change="upload1" style="opacity: 0">
                            <img class="header-img" src="../../assets/my/my_head.png"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-list">
                <p class="clearfix">姓名
                    <input type="text" v-model="name">
                    <!--<input type="text" v-model="nameWrite" v-else>-->
                </p>
                <p class="clearfix" @click="goPhone()">手机号<input type="text" v-model="phone" readonly></p>
            </div>

        </div>
        <div class="login_cont">
            <div @click="goLogin" class="loginbtn">保存</div>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import Exif from 'exif-js'
    export default {
        data () {
            return {
                name:'小马云',
                phone:'18236911784',
                company:'阿里巴巴',
                business:'',
                duty:'1111111',
                scope:'支付宝',
                publicity:'',
                headerImage:'',
                picValue:''
            }
        },
        mounted () {

        },
        methods: {
            upload1 (e) {  
            let files = e.target.files || e.dataTransfer.files;  
            if (!files.length) return;  
            this.picValue = files[0];  
            this.imgPreview(this.picValue);  
            }, 
            imgPreview (file) {  
                let self = this;  
                let Orientation;  
                //去获取拍照时的信息，解决拍出来的照片旋转问题  
                Exif.getData(file, function(){  
                    Orientation = Exif.getTag(this, 'Orientation');  
                });  
                // 看支持不支持FileReader  
                if (!file || !window.FileReader) return;  
            
                if (/^image/.test(file.type)) {  
                    // 创建一个reader  
                    let reader = new FileReader();  
                    // 将图片2将转成 base64 格式  
                    reader.readAsDataURL(file);  
                    // 读取成功后的回调  
                    reader.onloadend = function () {  
                        let result = this.result;  
                        let img = new Image();  
                        img.src = result;  
                        //判断图片是否大于100K,是就直接上传，反之压缩图片  
                        if (this.result.length <= (100 * 1024)) {  
                        self.headerImage = this.result;  
                        self.postImg();  
                        }else {  
                        img.onload = function () {  
                            let data = self.compress(img,Orientation);  
                            self.headerImage = data;  
                            console.log(self.headerImage)
                            self.postImg();  
                        }  
                        }  
                    }   
                    }  
            },
            postImg(){
                console.log(this.headerImage)
            },
            goPhone(){
                this.$router.push({ name: 'replacePhone'})

            },
            goLogin(){},
            getList(){},
            handleSave(){

            },
        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.sc{
    position: relative;
}
#upload{
    position: absolute;
    width: 1.24rem;
    height: 1.24rem;
    left: 50%;
    top: 50%;
    margin-left: -0.62rem;
}
.picture {  
  width: 2rem;  
  height: 2rem;  
  overflow: hidden;  
  background-position: center center;  
  background-repeat: no-repeat;  
  background-size: cover;   
} 
    .top{
        background-image: url("../../assets/my/my_top.png");
        background-repeat: no-repeat;
        height: 4.52rem;
        .leftIcon{
            width: 0.22rem !important;
            left: 0.3rem !important;
            @include login_input_icon;
            background-image: url(../../assets/index/left_icon.png);
        }
        .header-img{
            width: 1.24rem;
            height: 1.24rem;
            padding: 0 0 1.4rem 0;
        }
    }
    .main-list{
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.2rem;
        color: #333;
        font-size: 0.28rem;
        line-height: 1rem;
        >p{
            border-top: 1px #f0f0f0 solid;
            >input{
                float: right;
                color: #4c4c4c;
                text-align: right;
                line-height: 1rem;
            }
        }
        >p:nth-child(1){
            border:none;
        }
    }
    .loginbtn{
        width: 80% !important;
        @include login_btn(fixed);
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
        margin: 0!important;
    }
    .login_cont{
        width: 5.5rem;
        margin: 0 auto;
    }
    
</style>