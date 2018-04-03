<template>
    <div class="page-content">
        <mt-header fixed title="首页">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <!-- <mt-button icon="more" slot="right"></mt-button> -->
        </mt-header>

        <div class=" b-c-b">
            <div class="home b-c-f p-10">
                <img class="index-picture p-re" src="../../assets/index/shouye_dingbu_img@2x.png"/>
                <div class="p-ab ub ub-pc f-s-16  c-f words p-l-20">
                    当日总收入（元）
                </div>
                <div class="p-ab ub ub-pc f-s-38  c-f number p-l-20">
                    +5758.4
                </div>
                <div class="p-ab ub ub-pc f-s-14  c-f total p-l-20">
                    本月收入（元）215000
                </div>
                <img src="../../assets/index/shouye_touxiang_img@2x.png" class="p-ab head-img ">
                <div class="p-b-20 p-t-10">
                    <div class="black p-re ">
                        <div class="text f-s-16 c-3 p-ab">黑名单</div>
                    </div>
                </div>
            </div>

            <!--总体情况-->
            <div class="m-t-20 payments b-c-f p-10">
                <div class="f-s-16 c-6 p-t-10 p-l-10">当日收支</div>
                <div class="ub p-re bd-b">
                    <div class="ub ub-f1  p-t-20 bd-r p-l-10">
                        <div class=" ">
                            <img src="../../assets/index/sale_icon.png"/></div>
                        <div class="p-l-10">
                            <div class="f-s-16 c-3">15678.0</div>
                            <div class="f-s-13 c-6 p-t-10">当日销售额（元）</div>
                        </div>
                    </div>
                    <div class="ub ub-f1 p-t-20 p-l-10">
                        <div class=" ">
                            <img src="../../assets/index/sale_icon.png"/></div>
                        <div class="p-l-10">
                            <div class="f-s-16 c-3">15678.0</div>
                            <div class="f-s-13 c-6 p-t-10">当日总收入（元）</div>
                        </div>
                    </div>
                </div>
                <div class="ub p-re p-b-10">
                    <div class="ub ub-f1 p-t-20 bd-r p-l-10">
                        <div class=" ">
                            <img src="../../assets/index/sale_icon.png"/></div>
                        <div class="p-l-10">
                            <div class="f-s-16 c-3">15678.0</div>
                            <div class="f-s-13 c-6 p-t-10">当日总支出（元）</div>
                        </div>
                    </div>
                    <div class="ub ub-f1 p-t-20 p-l-10">
                        <div class=" ">
                            <img src="../../assets/index/sale_icon.png"/></div>
                        <div class="p-l-10">
                            <div class="f-s-16 c-3">15678.0</div>
                            <div class="f-s-13 c-6 p-t-10">当日总赊账（元）</div>
                        </div>
                    </div>
                </div>
            </div>
            <!--当日收支    -->
            <div class="m-t-20 situation b-c-f p-10">
                <div class="f-s-16 c-6 p-t-10 p-l-10">总体情况</div>
                <div class="ub p-re bd-b">
                    <div class="ub ub-f1  p-t-20 bd-r p-l-10">
                        <div class=" ">
                            <img src="../../assets/index/sale_icon.png"/></div>
                        <div class="p-l-10">
                            <div class="f-s-16 c-3">15678.0</div>
                            <div class="f-s-13 c-6 p-t-10">总销售额（元）</div>
                        </div>
                    </div>
                    <div class="ub ub-f1 p-t-20 p-l-10">
                        <div class=" ">
                            <img src="../../assets/index/sale_icon.png"/></div>
                        <div class="p-l-10">
                            <div class="f-s-16 c-3">15678.0</div>
                            <div class="f-s-13 c-6 p-t-10">总收入（元）</div>
                        </div>
                    </div>
                </div>
                <div class="ub p-re p-b-10">
                    <div class="ub ub-f1 p-t-20 bd-r p-l-10">
                        <div class=" ">
                            <img src="../../assets/index/sale_icon.png"/></div>
                        <div class="p-l-10">
                            <div class="f-s-16 c-3">15678.0</div>
                            <div class="f-s-13 c-6 p-t-10">支出总金额（元）</div>
                        </div>
                    </div>
                    <div class="ub ub-f1 p-t-20 p-l-10">
                        <div class=" ">
                            <img src="../../assets/index/sale_icon.png"/></div>
                        <div class="p-l-10">
                            <div class="f-s-16 c-3">15678.0</div>
                            <div class="f-s-13 c-6 p-t-10">赊账总金额（元）</div>
                        </div>
                    </div>
                </div>
            </div>
            <!--坏账报警-->
            <div class="m-t-20 b-c-f p-20 p-10">
                <div class="f-s-16 c-6">
                    坏账报警
                </div>
                <div class="ub p-t-20 bd-b">
                    <div class="ub-f1">
                        <img src="../../assets/index/bad_debt_red.png" height="47" width="54"/>
                    </div>
                    <div class="ub-2 p-l-10">
                        <div class="f-s-16 c-3">强东哥哥</div>
                        <div class="f-s-13 c-6 p-t-10">最长时间：7天</div>
                    </div>
                    <div class="ub-f3 ub ub-pe p-r-10">
                        <div class="">
                            <div class="f-s-16 c-red">156698</div>
                            <div class="f-s-10 c-6 p-t-10">赊账总额</div>
                        </div>
                    </div>
                </div>

                <div class="ub p-t-20 bd-b">
                    <div class="ub-f1">
                        <img src="../../assets/index/bad_debt_red.png" height="47" width="54"/>
                    </div>
                    <div class="ub-2 p-l-10">
                        <div class="f-s-16 c-3">强东妈妈</div>
                        <div class="f-s-13 c-6 p-t-10">最长时间：7天</div>
                    </div>
                    <div class="ub-f3 ub ub-pe p-r-10">
                        <div class="">
                            <div class="f-s-16 c-yellow">156698</div>
                            <div class="f-s-10 c-6 p-t-10">赊账总额</div>
                        </div>
                    </div>
                </div>

                <div class="ub p-t-20 bd-b">
                    <div class="ub-f1">
                        <img src="../../assets/index/bad_debt_red.png" height="47" width="54"/>
                    </div>
                    <div class="ub-2 p-l-10">
                        <div class="f-s-16 c-3">强东爸爸</div>
                        <div class="f-s-13 c-6 p-t-10 ">最长时间：7天</div>
                    </div>
                    <div class="ub-f3 ub ub-pe p-r-10">
                        <div class="">
                            <div class="f-s-16 c-orange">156698</div>
                            <div class="f-s-10 c-6 p-t-10">赊账总额</div>
                        </div>
                    </div>
                </div>

                <div class="ub p-t-20 ">
                    <div class="ub-f1">
                        <img src="../../assets/index/bad_debt_red.png" height="47" width="54"/>
                    </div>
                    <div class="ub-2 p-l-10">
                        <div class="f-s-16 c-3">强东姐姐</div>
                        <div class="f-s-13 c-6 p-t-10">最长时间：7天</div>
                    </div>
                    <div class="ub-f3 ub ub-pe p-r-10">
                        <div class="">
                            <div class="f-s-16 c-blue">156698</div>
                            <div class="f-s-10 c-6 p-t-10">赊账总额</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        mounted () {

        },
        methods: {
            getList(){
            }

        }
    }
</script>
<style scoped lang="scss">
    .home {
        .index-picture {
            width: 100%;
        }
        .words {
            top: 0.7rem;
        }
        .number {
            top: 1.5rem;
        }
        .total {
            top: 2.7rem;
        }
        .head-img {
            top: 0.7rem;
            right: 0.5rem;
        }
    }

    .black {
        background-color: rgb(225, 251, 238);
        height: 1.5rem;
        border-radius: 1rem;
        .text {
            top: 0.45rem;
            left: 0.45rem;
        }
    }

    .payments {
        img {
            width: 1rem;
        }
    }

    .situation {
        img {
            width: 1rem;
        }
    }

</style>