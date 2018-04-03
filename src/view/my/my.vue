<template>
    <div class="my">
        <!--<mt-header fixed>-->
            <!--<router-link to="/login" slot="left">-->
                <!--<mt-button icon="back"></mt-button>-->
            <!--</router-link>-->
        <!--</mt-header>-->

        <div class="b-c-f">
            <div class="top p-10">
                <div class="ub ub-pc p-t-10">
                    <div>
                        <img src="../../assets/my/my_head.png"/>
                        <div class=" name f-s-16 m-t-20 c-f p-b-10">
                            <span>档位</span>&nbsp;
                            <span>小鑫鑫0506</span>
                        </div>
                    </div>
                </div>

                <div class="ub p-b-10 c-f p-t-10">
                    <div class="ub-f1 ub  ub-pc">
                        <div>
                            <div class="f-s-38 c-f">50</div>
                            <div class="f-s-10 c-f">会员数量</div>
                        </div>
                    </div>
                    <div class="ub-f1 ub ub-pc" >
                        <div class="">
                            <div class="f-s-38 c-f">50</div>
                            <div class="f-s-10 c-f">货主数量</div>
                        </div>
                    </div>
                    <div class="ub-f1 ub ub-pc">
                        <div>
                            <div class="f-s-38 c-f">50</div>
                            <div class="f-s-10 c-f">货品分类</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="list f-s-16">
            <div class="p-l-10 p-r-10 b-c-f">
                <div class="m-t-20  b-c-f p-re  content ub">
                    <span class="p-l-20 debt-icon"></span>
                    <div class=" p-l-20 title">赊账规则</div>
                    <div class="p-r-20">
                        <img src="../../assets/my/icon_right.png" class="my_icon"/>
                    </div>
                </div>
            </div>

            <div class="p-l-10 p-r-10 b-c-f m-t-10">
                <div class=" p-re  content ub bd-b">
                    <span class="p-l-20 lock-icon"></span>
                    <div class=" p-l-20 title">修改密码</div>
                    <div class="p-r-20">
                        <img src="../../assets/my/icon_right.png" class="my_icon"/>
                    </div>
                </div>
            </div>

            <div class="p-l-10 p-r-10 b-c-f">
                <div class=" p-re  content ub bd-b">
                    <span class="p-l-20 phone-icon"></span>
                    <div class=" p-l-20 title">联系我们</div>
                    <div class="p-r-20">
                        <img src="../../assets/my/icon_right.png" class="my_icon"/>
                    </div>
                </div>
            </div>

            <div class="p-l-10 p-r-10 b-c-f">
                <div class=" p-re  content ub bd-b">
                    <span class="p-l-20 debt-icon"></span>
                    <div class=" p-l-20 title">意见反馈</div>
                    <div class="p-r-20">
                        <img src="../../assets/my/icon_right.png" class="my_icon"/>
                    </div>
                </div>
            </div>

            <div class="m-t-10 p-l-10 p-r-10 b-c-f">
                <div class=" p-re  content ub bd-b">
                    <span class="p-l-20 debt-icon"></span>
                    <div class=" p-l-20 title">系统升级</div>
                    <div class="p-r-20">
                        <img src="../../assets/my/icon_right.png" class="my_icon"/>
                    </div>
                </div>
            </div>

            <div class=" p-l-10 p-r-10 b-c-f m-b-30">
                <div class=" p-re  content ub bd-b">
                    <span class="p-l-20 debt-icon"></span>
                    <div class=" p-l-20 title">关于</div>
                    <div class="p-r-20">
                        <img src="../../assets/my/icon_right.png" class="my_icon"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped lang='scss'>

    .my{
        width: 100%;
        .top{
            background-image: url("../../assets/my/my_top.png");
            background-repeat: no-repeat;
        }
        .list{
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
                line-height: 1rem;
                .title{
                    padding-left: 1.1rem
                }
                .my_icon{
                    position: absolute;
                    right: 0.1rem;
                    top:0.13rem;
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

        }
    }
</script>


