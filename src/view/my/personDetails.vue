<template>
    <div class="page-content">
        <div class="page-main">

            <div class="b-c-f">
                <div class="top ">
                    <div class="ub ub-pc p-t-10">
                        <div class="c-f f-s-18 ">完善用户资料</div>
                        <div @click="goMy" class="leftIcon"></div>
                    </div>
                    <div class="ub ub-pc">
                        <div class="sc">
                            <div style="opacity: 0.5" class="picture"
                                 :style="'backgroundImage:url('+headerImage+')'"></div>
                            <input type="file" id="upload" accept="image" @change="upload1" style="opacity: 0">
                            <img v-if="personalData.headImg == ''" class="header-img"
                                 src="../../assets/my/my_head.png"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-list">
                <p class="clearfix">姓名
                    <input type="text" v-model="personalData.selName">
                    <!--<input type="text" v-model="nameWrite" v-else>-->
                </p>
                <p class="clearfix" @click="goPhone()">手机号<input type="text" v-model="personalData.phone" readonly></p>
            </div>

        </div>
        <div class="login_cont">
            <div @click="savePersonal" class="loginbtn">保存</div>
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
                personalData: [],
                phone: this.$route.params.phone,
                yanNumber: this.$route.params.yanNumber,
                headerImage: '',
                selName:this.$route.params.selName,
                headImg:this.$route.params.headImg,
            }
        },
        mounted () {
            if (this.$route.params.phone) {
                this.phone = this.$route.params.phone;
            }
            if (this.$route.params.yanNumber) {
                this.yanNumber = this.$route.params.yanNumber;
            }

            this.info();
        },
        methods: {
            goMy(){
                this.$router.push({name: 'my'});
            },
            info(){
                let params = {};
                my.getInfo(params).then(response => {
                    if (response.data.status == 'Y') {
                        this.personalData = response.data.results;
                        if (this.phone) {this.personalData.phone = this.phone;}
                        if (this.selName) {this.personalData.selName = this.selName;}
                        if (this.headImg) {this.personalData.headImg = this.headImg;}
                    } else {

                    }
                })
            },
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
                Exif.getData(file, function () {
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
                        } else {
                            img.onload = function () {
                                let data = self.compress(img, Orientation);
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
                this.$router.push({
                    name: 'replacePhone',
                    params: {selName: this.personalData.selName, headImg: this.personalData.headImg}
                });
            },
            savePersonal(){
                let data = this.personalData;
                delete data.createTime;
                delete data.password;
                delete data.salt;
                delete data.sid;
                if(this.yanNumber){
                    data.code = this.yanNumber;
                }
                //console.log(data);
                my.alterPersonal(data).then(response => {
                    if (response.data.status == 'Y') {
                        Toast({
                            message: '保存成功',
                            position: 'middle',
                            duration: 1000
                        });
                        this.$router.push({ name: 'my'})
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
        background-image: url("../../assets/my/my_top.png");
        background-repeat: no-repeat;
        height: 4.52rem;
        .leftIcon {
            width: 0.22rem !important;
            left: 0.3rem !important;
            @include login_input_icon;
            background-image: url(../../assets/index/left_icon.png);
        }
        .header-img {
            width: 1.24rem;
            height: 1.24rem;
            padding: 0.9rem 0 0;
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
                float: right;
                color: #4c4c4c;
                text-align: right;
                line-height: 1rem;
            }
        }
        > p:nth-child(1) {
            border: none;
        }
    }

    .loginbtn {
        width: 80% !important;
        @include login_btn(fixed);
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
        margin: 0 !important;
    }

    .login_cont {
        width: 5.5rem;
        margin: 0 auto;
    }

</style>