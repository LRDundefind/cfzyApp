<template>
    <div class="page-content">
        <div class="page-main">

            <div class="b-c-f">
                <div class="top ">
                    <div class="ub ub-pc p-t-10">
                        <div class="c-f f-s-18 ">完善用户资料</div>
                        <div @click="goMy" >
                            <span class="leftIcon"></span>
                        </div>
                    </div>
                    <div class="ub ub-pc">
                        <div class="sc">
                            <div style="opacity: 0;display: none" class="picture"
                                 :style="'backgroundImage:url('+headerImage+')'"></div>
                            <input type="file" id="upload" accept="image" @change="upload1" style="opacity: 0">
                            <div>
                                <img v-show="personalData.headImg!=''" class="header-img" :src="personalData.headImg"/>
                                <img v-show="personalData.headImg ==''" class="header-img" src="../../assets/my/my_head.png"/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="main-list">
                <p class="clearfix">姓名
                    <input type="text" v-model="personalData.userName">
                    <!--<input type="text" v-model="nameWrite" v-else>-->
                </p>
                <p class="clearfix" @click="goPhone()">手机号<input type="text" v-model="personalData.phone" readonly></p>
            </div>
            <div class="login_cont">
                <div @click="savePersonal" class="loginbtn">保存</div>
            </div>
        </div>

    </div>
</template>

<script>
    import {MessageBox} from 'mint-ui';
    import Exif from 'exif-js';
    import {Toast} from 'mint-ui';
    import {my} from '@/services/apis/my'
    export default {
        data () {
            return {
                getImage:'',
                personalData: {
                    headImg:'',
                },
                phone: this.$route.params.phone,
                yanNumber: this.$route.params.yanNumber,
                headerImage: '',
                picValue: '',
                userName: this.$route.params.userName,
                headImg: this.$route.params.headImg,
                doMain:process.env.BASE_PATH,
            }
        },
        created () {
            //判断参数是否有手机号
            if (this.$route.params.phone) {
                this.phone = this.$route.params.phone;
            }
            //判断参数是否有验证码
            if (this.$route.params.yanNumber) {
                this.yanNumber = this.$route.params.yanNumber;
            }
            this.info();
        },
        methods: {
            goMy(){
                this.$router.push({name: 'my'});
            },
            //获取个人信息
            info(){
                let params = {};
                my.getInfo(params).then(response => {
                    if (response.data.status == 'Y') {
                        this.personalData = response.data.results;
                        this.getImage = this.personalData.headImg;

                        let doMain = process.env.BASE_PATH;
                        let defaultImg = require('../../assets/my/my_head.png');
                        let headImg = this.personalData.headImg;
                        //返回头像的处理
                        if (headImg == '') {
                            this.personalData.headImg = defaultImg;
                        } else {
                            this.personalData.headImg = this.doMain + headImg;
                        }

                        if (this.phone) {
                            this.personalData.phone = this.phone;
                        }
                        if (this.userName) {
                            this.personalData.userName = this.userName;
                        }
                        if (this.headImg) {
                            this.personalData.headImg = this.headImg;
                        }

                    } else {

                    }
                })
            },
            //图片上传功能
            upload1 (e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                 
                this.picValue = files[0];

                this.imgPreview(this.picValue);
            },
            imgPreview (file) {
                var self = this;
                let Orientation;

                //去获取拍照时的信息，解决拍出来的照片旋转问题  
                // Exif.getData(file, function () {
                //     Orientation = Exif.getTag(this, 'Orientation');
                //     alert(Orientation)
                // });

                // 看支持不支持FileReader  
                // if (!file || !window.FileReader) return;

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
                        if (result.length <= (100 * 1024)) {
                            self.headerImage = result;
                            self.personalData.headImg = result;
                            self.postImg();
                        } else {
                            img.onload = function () {
                                let data = self.compress(img, Orientation);
                                self.headerImage = data;
                                self.personalData.headImg = data;
                                self.postImg();
                            }
                        }
                    }
                }
            },
            postImg(){
                // console.log(this.headerImage)
            },
                rotateImg (img, direction,canvas) {
                //最小与最大旋转方向，图片旋转4次后回到原方向
                const min_step = 0;
                const max_step = 3;
                if (img == null)return;
                //img的高度和宽度不能在img元素隐藏后获取，否则会出错
                let height = img.height;
                let width = img.width;
                let step = 2;
                if (step == null) {
                step = min_step;
                }
                if (direction == 'right') {
                step++;
                //旋转到原位置，即超过最大值
                step > max_step && (step = min_step);
                } else {
                step--;
                step < min_step && (step = max_step);
                }
                //旋转角度以弧度值为参数
                let degree = step * 90 * Math.PI / 180;
                let ctx = canvas.getContext('2d');
                switch (step) {
                case 0:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0);
                    break;
                case 1:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, 0, -height);
                    break;
                case 2:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, -height);
                    break;
                case 3:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, 0);
                    break;
                }
            },
            compress(img, Orientation) {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext('2d');
                //瓦片canvas
                let tCanvas = document.createElement("canvas");
                let tctx = tCanvas.getContext("2d");
                let initSize = img.src.length;
                let width = img.width;
                let height = img.height;
                //如果图片大于四百万像素，计算压缩比并将大小压至400万以下  
                let ratio;
                if ((ratio = width * height / 4000000) > 1) {
                    console.log("大于400万像素")
                    ratio = Math.sqrt(ratio);
                    width /= ratio;
                    height /= ratio;
                } else {
                    ratio = 1;
                }
                canvas.width = width;
                canvas.height = height;
                //        铺底色
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //如果图片像素大于100万则使用瓦片绘制  
                let count;
                if ((count = width * height / 1000000) > 1) {
                    console.log("超过100W像素");
                    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片  
                    //            计算每块瓦片的宽和高
                    let nw = ~~(width / count);
                    let nh = ~~(height / count);
                    tCanvas.width = nw;
                    tCanvas.height = nh;
                    for (let i = 0; i < count; i++) {
                        for (let j = 0; j < count; j++) {
                            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                        }
                    }
                } else {
                    ctx.drawImage(img, 0, 0, width, height);
                }
                //修复ios上传图片的时候 被旋转的问题  
                if (Orientation != "" && Orientation != 1) {
                    switch (Orientation) {
                        case 6://需要顺时针（向左）90度旋转
                            this.rotateImg(img, 'left', canvas);
                            break;
                        case 8://需要逆时针（向右）90度旋转
                            this.rotateImg(img, 'right', canvas);
                            break;
                        case 3://需要180度旋转
                            this.rotateImg(img, 'right', canvas);//转两次
                            this.rotateImg(img, 'right', canvas);
                            break;
                    }
                }
                //进行最小压缩  
                let ndata = canvas.toDataURL('image/jpeg', 0.1);
                console.log('压缩前：' + initSize);
                console.log('压缩后：' + ndata.length);
                console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
                return ndata;
            },
            //修改手机号
            goPhone(){
                this.$router.push({
                    name: 'replacePhone',
                    params: {userName: this.personalData.userName, headImg: this.personalData.headImg}
                });
            },
            //保存用户资料
            savePersonal(){
                let data ={
                    phone:this.personalData.phone,
                    selName:this.personalData.userName,
                    headImg:this.headerImage,
                };
                if (this.yanNumber) {
                    data.code = this.yanNumber;
                }
                my.alterPersonal(data).then(response => {
                    if (response.data.status == 'Y') {
                        Toast({
                            message: '保存成功',
                            position: 'middle',
                            duration: 1000
                        });
                        this.info();
                        setTimeout(() => {
                            this.$router.push({name: 'my'})
                        }, 500)

                    } else {
                        Toast({
                            message: response.data.error_msg,
                            position: 'middle',
                            duration: 3000
                        });
                    }
                })
            },
        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .sc {
        position: relative;
    }

    #upload {
        position: absolute;
        width: 1.24rem;
        height: 1.24rem;
        left: 50%;
        top: 42.5%;
        margin-left: -0.62rem;
    }

    .picture {
        height: 1.24rem;
        width: 1.24rem;
        border-radius: 50%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .top {
        background-image: url("../../assets/my/my_background.png");
        background-repeat: no-repeat;
        height: 4.52rem;
        .leftIcon {
            width: 0.32rem !important;
            height: 0.32rem !important;
            left: 0.3rem !important;
            padding-right: 0.32rem;
            @include login_input_icon;
            background-image: url(../../assets/index/left_icon.png);
        }
        .header-img {
            width: 1.24rem;
            height: 1.24rem;
            border-radius: 50%;
            margin-top: 0.9rem;
        }
    }

    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.2rem 0.3rem;
        color: #333;
        font-size: 0.28rem;
        line-height: 1rem;
        > p {
            border-top: 1px #f0f0f0 solid;
            > input {
                font-size: 0.26rem;
                float: right;
                color: #4c4c4c;
                text-align: right;
                line-height: 0.4rem;
                margin-top: 0.35rem;
            }
        }
        > p:nth-child(1) {
            border: none;
        }
    }

    .loginbtn {
        @include login_btn;
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
        margin: 0 !important;
    }

    .login_cont {
        width: 5.5rem;
        margin: 4rem auto 0;
    }

</style>