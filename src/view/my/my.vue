<template>
    <div class="my">
        <div class="b-c-f">
            <div class="top ">
                <div  @click="goHome" class="smallIcon" style="" >
                    <span class="leftIcon"></span>
                </div>
                <div class="information">
                    <div class="ub ub-pc">
                        <div @click="goDetails()">
                            <img v-show="personalData.headImg!=''" class="header-img" :src="personalData.headImg"/>
                            <img v-show="personalData.headImg ==''" class="header-img" src="../../assets/my/my_head.png"/>
                        </div>
                    </div>
                    <div class="ub ub-pc">
                        <div class="name  ">
                            <span>{{personalData.selName}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="list f-s-14 c-3">
            <div class="m-t-10 row" @click="goPassword()">
                <div class=" p-re  content ub bd-b">
                    <span class="lock-icon"></span>
                    <div class="title">修改密码</div>
                    <div class="">
                        <img src="../../assets/my/icon_right.png" class="my_icon"/>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class=" p-re  content ub bd-b">
                    <span class="phone-icon"></span>
                    <div class="title">
                        <a href="tel:18236911783" style="display: block;width: 8rem">联系我们</a>
                    </div>
                    <div class="">
                        <img src="../../assets/my/icon_right.png" class="my_icon"/>
                    </div>
                </div>
            </div>

            <div class="row" @click="gofeedBack">
                <div class=" p-re  content ub bd-b">
                    <span class="back-icon" style="width: 0.4rem;top:0.3rem;"></span>
                    <div class="title">意见反馈</div>
                    <div class="">
                        <img src="../../assets/my/icon_right.png" class="my_icon"/>
                    </div>
                </div>
            </div>

            <div class="m-t-10 row">
                <div class=" p-re  content ub bd-b" @click="update">
                    <span class="update-icon" style="width: 0.4rem;top:0.3rem;"></span>
                    <div class="title">系统升级</div>
                    <div class="">
                        <img src="../../assets/my/icon_right.png" class="my_icon"/>
                    </div>
                </div>
            </div>

            <div class="m-b-30 row" @click="goAbout">
                <div class=" p-re  content ub bd-b">
                    <span class="about-icon" style="width: 0.4rem;top:0.3rem;"></span>
                    <div class="title">关于</div>
                    <div class="">
                        <img src="../../assets/my/icon_right.png" class="my_icon"/>
                    </div>
                </div>
            </div>
            <div class="login_cont">
                <div @click="goLogin" class="loginbtn">退出登录</div>
            </div>
        </div>


    </div>

</template>
<style scoped lang='scss'>
    .my {
        width: 100%;
        .img-left {
            width: 0.25rem;
        }

        .top {
            background-image: url("../../assets/my/my_background.png");
            background-repeat: no-repeat;
            height: 4.52rem;
            .smallIcon{
                min-height: 0.32rem;
                width: 0.64rem;
                padding-right: 0.32rem;
                padding-top: 0.22rem
            }
            .information {
                padding-top: 10.2%;
            }
            .leftIcon {
                width: 0.32rem !important;
                height: 0.32rem !important;
                left: 0.3rem !important;
                @include login_input_icon;
                background-image: url(../../assets/index/left_icon.png);
            }
            .header-img {
                width: 1.24rem;
                height: 1.24rem;
                border-radius: 50%;
            }
            .name {
                padding: 0.22rem 0 0.34rem 0;
                color: #ffffff;
                font-size: 0.26rem;
            }
            .name:after{
                content: '';
                position: absolute;
                left: 50%;
                top: 0.9rem;
                display: inline-block;
                width: 0.58rem;
                height: 1px;
                background-color: white;
                transform: translateX(-50%);
            }
        }
        .loginbtn {
            @include login_btn;
            background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
            margin: 0 !important;
        }
        .login_cont {
            width: 5.5rem;
            margin: 1.8rem auto 0;
        }
        .list {
            .row {
                background-color: white;
                padding: 0 0.3rem;
            }

            .lock-icon {
                @include login_input_icon;
                background-image: url(../../assets/my/my_lock.png);
            }

            .phone-icon {
                @include login_input_icon;
                background-image: url(../../assets/my/my_phone.png);
            }

            .back-icon {
                @include login_input_icon;
                background-image: url(../../assets/my/my_feedback.png);
            }

            .update-icon {
                @include login_input_icon;
                background-image: url(../../assets/my/my_update.png);
            }

            .about-icon {
                @include login_input_icon;
                background-image: url(../../assets/my/my_about.png);
            }

            .content {
                line-height: 0.96rem;
                .title {
                    padding-left: 0.87rem;
                    a {
                        color: #333;
                    }
                }
                .my_icon {
                    position: absolute;
                    width: 0.2rem;
                    right: 0.1rem;
                    top: 0.3rem;
                }
            }
        }
    }

</style>
<script>
    import Cookies from 'js-cookie'
    import {Toast} from 'mint-ui';
    import {my} from '@/services/apis/my'
    export default {
        name: 'my',
        data () {
            return {
                black:'',
                phone: '',
                userName: '',
                personalData: {
                    headImg:'',
                },
            }
        },
        created(){
            this.black = this.$route.params.black || false;
        },
        mounted () {
            if (JSON.parse(Cookies.get('gidOwnID_lists')).userName) {
                this.userName = JSON.parse(Cookies.get('gidOwnID_lists')).userName;
            }
            this.info();
        },
        methods: {

            info(){
                let params = {};
                my.getInfo(params).then(response => {
                    if (response.data.status == 'Y') {
                        this.personalData = response.data.results;
                        let doMain = process.env.BASE_PATH;
                        let defaultImg = require('../../assets/my/my_head.png');
                        let headImg = this.personalData.headImg;
                        //返回头像的处理
                        if (headImg == '') {
                            this.personalData.headImg = defaultImg;
                        } else {
                            this.personalData.headImg = doMain + headImg;
                        }
                    } else {

                    }
                })
            },
            //更新升级
            update(){
                if (typeof XDYApp !== 'undefined') {
                    XDYApp.versionDetection();
                }
            },
            //跳转到首页
            goHome(){
                if(this.black == 'nostall'){
                    this.$router.push({name: 'noStalls'})
                }else {
                    this.$router.push({name: 'home'})
                }
            },
            //跳转到修改密码
            goPassword(){
                if(this.black == 'nostall'){
                    Toast({
                        message: '当前档位未上班！',
                        position: 'middle',
                        duration: 5000
                    });
                }else {
                    this.$router.push({name: 'alterPassword'})
                }
            },
            //跳转到意见反馈
            gofeedBack(){
                if(this.black == 'nostall'){
                    Toast({
                        message: '当前档位未上班！',
                        position: 'middle',
                        duration: 5000
                    });
                }else {
                    this.$router.push({name: 'feedBack'})
                }
            },
            //跳转到关于我们
            goAbout(){
                if(this.black == 'nostall'){
                    Toast({
                        message: '当前档位未上班！',
                        position: 'middle',
                        duration: 5000
                    });
                }else{
                    this.$router.push({name: 'about'})
                }
            },
            //退出登录
            goLogin(){
                var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
                if (keys) {
                    var q = keys;
                    q.forEach(function(value){
                        Cookies.remove(value);
                    });
                }
                if (typeof XDYApp !== 'undefined') {
                    XDYApp.appExit()
                }
                this.$router.push({name: 'login'})
            },
            //跳转到个人编辑页
            goDetails(){
                if(this.black == 'nostall'){
                    Toast({
                        message: '当前档位未上班！',
                        position: 'middle',
                        duration: 5000
                    });
                }else {
                    this.$router.push({name: 'personDetails'})
                }
            },
        }
    }
</script>


