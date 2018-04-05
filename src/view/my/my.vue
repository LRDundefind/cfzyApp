<template>
    <div class="my">
        <div class="b-c-f">
            <div class="top p-10 ">
                <div class="leftIcon" @click="$router.go(-1)">
                </div>
                <div class="ub ub-pc">
                    <div>
                        <img class="header-img" src="../../assets/my/my_head.png"/>
                    </div>
                </div>
                <div class="ub ub-pc">
                    <div class="name border-bottom p-re">
                        <span>档位</span>&nbsp;
                        <span>小鑫鑫0506</span>
                    </div>
                    <div class="rightIcon" @click="goDetails()">
                    </div>
                </div>

                <div class=" member">
                    <div class="ub ub-fc">
                        <div class="number ub-f1">50</div>
                        <div class="number ub-f1">50</div>
                        <div class="number ub-f1">50</div>
                    </div>
                    <div class="ub ub-fc">
                        <div class="classify ub-f1">会员数量</div>
                        <div class="classify ub-f1">货主数量</div>
                        <div class="classify ub-f1">货品分类</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="list f-s-14 c-3">
            <div class="row" @click="goRules">
                <div class="m-t-20  b-c-f p-re  content ub">
                    <span class="debt-icon"></span>
                    <div class="title">赊账规则</div>
                    <div class="">
                        <img src="../../assets/my/icon_right.png" class="my_icon"/>
                    </div>
                </div>
            </div>

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
                    <div class="title">联系我们</div>
                    <div class="">
                        <img src="../../assets/my/icon_right.png" class="my_icon"/>
                    </div>
                </div>
            </div>

            <div class="row" @click="gofeedBack">
                <div class=" p-re  content ub bd-b">
                    <span class="debt-icon"></span>
                    <div class="title">意见反馈</div>
                    <div class="">
                        <img src="../../assets/my/icon_right.png" class="my_icon"/>
                    </div>
                </div>
            </div>

            <div class="m-t-10 row">
                <div class=" p-re  content ub bd-b">
                    <span class="debt-icon"></span>
                    <div class="title">系统升级</div>
                    <div class="">
                        <img src="../../assets/my/icon_right.png" class="my_icon"/>
                    </div>
                </div>
            </div>

            <div class="m-b-30 row" @click="goAbout">
                <div class=" p-re  content ub bd-b">
                    <span class="debt-icon"></span>
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
            background-image: url("../../assets/my/my_top.png");
            background-repeat: no-repeat;

            .member{
                color: white;
                padding: 0 8.2%;
            }
            .rightIcon{
                width: 0.32rem !important;
                left: 6.7rem!important;
                @include login_input_icon;
                background-image: url(../../assets/index/right_icon.png);
            }
            .leftIcon{
                width: 0.32rem !important;
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
            .number{
                font-size: 0.36rem;
                margin-left: 0.67rem;
                margin-top: 0.62rem;
            }
            .classify{
                font-size: 0.22rem;
                margin-left: 0.4rem;
                margin-top: 0.1rem;
            }
            .number-space{
                padding: 0.24rem 1.46rem 0.24rem;
            }
            .classify-space{
                padding: 0 1.25rem;
            }
            .number-center{
                padding: 0 1.7rem;
            }

        }
        .loginbtn{
            @include login_btn;
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
                padding:0 0.2rem;
            }
            .debt-icon{
                @include login_input_icon;
                background-image: url(../../assets/my/my_debt.png);
            }

            .lock-icon{
                @include login_input_icon;
                background-image: url(../../assets/my/my_lock.png);
            }

            .phone-icon{
                @include login_input_icon;
                background-image: url(../../assets/my/my_phone.png);
            }
            .content{
                line-height: 0.96rem;
                .title{
                    padding-left: 0.87rem
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
            //跳转到赊账规则
            goRules(){
                this.$router.push({ name: 'rules'})
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


