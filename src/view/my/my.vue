<template>
    <div class="my">
        <div class="b-c-f">
            <div class="top ">
                <div class="leftIcon" @click="goHome">
                </div>
                <div  class="information">
                    <div class="ub ub-pc">
                        <div @click="goDetails()">
                            <img class="header-img" src="../../assets/my/my_head.png"/>
                        </div>
                    </div>
                    <div class="ub ub-pc" >
                        <div class="name  ">
                            <span>档位</span>&nbsp;
                            <span>小鑫鑫0506</span>
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
                        <a href="tel:18236911783">联系我们</a>
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
                <div class=" p-re  content ub bd-b">
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
        </div>
        <div class="login_cont">
            <div @click="goLogin" class="loginbtn">退出登 录</div>
        </div>

    </div>

</template>
<style scoped lang='scss'>
    .my{
        width: 100%;
        .img-left{
            width: 0.25rem;
        }

        .top{
            background-image: url("../../assets/my/my_background.png");
            background-repeat: no-repeat;
            height: 4.52rem;

            .information{
                padding-top: 13.6%;
            }
            .leftIcon{
                width: 0.22rem !important;
                left: 0.3rem !important;
                @include login_input_icon;
                background-image: url(../../assets/index/left_icon.png);
            }
            .header-img{
                width: 1.24rem;
                height: 1.24rem;
            }
            .name{
                padding: 0.22rem 0 0.34rem 0;
                color: #ffffff;
                font-size: 0.26rem;
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
        .list{
            .row{
                background-color: white;
                padding:0 0.3rem;
            }

            .lock-icon{
                @include login_input_icon;
                background-image: url(../../assets/my/my_lock.png);
            }

            .phone-icon{
                @include login_input_icon;
                background-image: url(../../assets/my/my_phone.png);
            }

            .back-icon{
                @include login_input_icon;
                background-image: url(../../assets/my/my_feedback.png);
            }

            .update-icon{
                @include login_input_icon;
                background-image: url(../../assets/my/my_update.png);
            }

            .about-icon{
                @include login_input_icon;
                background-image: url(../../assets/my/my_about.png);
            }

            .content{
                line-height: 0.96rem;
                .title{
                    padding-left: 0.87rem;
                    a{
                        color: #333;
                    }
                }
                .my_icon{
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
    export default {
        name: 'my',
        data () {
            return {
                phone:''
            }
        },
        mounted () {

        },
        methods: {
            //跳转到首页
            goHome(){
                this.$router.push({ name: 'home'})
            },
            //跳转到修改密码
            goPassword(){
                this.$router.push({ name: 'alterPassword'})
            },
            //跳转到意见反馈
            gofeedBack(){
                this.$router.push({ name: 'feedBack'})
            },
            //跳转到关于我们
            goAbout(){
                this.$router.push({ name: 'about'})
            },
            //退出登录
            goLogin(){
                this.$router.push({ name: 'login'})
            },
            //跳转到个人编辑页
            goDetails(){
                this.$router.push({ name: 'personDetails'})
            },
        }
    }
</script>


