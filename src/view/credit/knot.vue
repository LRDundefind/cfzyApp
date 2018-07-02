<template>
    <div class="page-content">
        <mt-header fixed  title="订单">
            <router-link to="/home" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <mt-navbar v-model="selected">
            <mt-tab-item id="orderKnot">现结订单</mt-tab-item>
            <mt-tab-item id="creditKnot">赊账订单</mt-tab-item>
        </mt-navbar>

        <!-- tab-container -->
        <mt-tab-container>
            <router-view name="orderRouteView" />
            <!-- <mt-tab-container-item id="1">
              <mt-cell v-for="n in 10" :title="'内容 ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
              <mt-cell v-for="n in 4" :title="'测试 ' + n" />
            </mt-tab-container-item> -->
        </mt-tab-container>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                selected: this.$route.name
            }
        },
        mounted () {
            //document.getElementsByClassName('mint-tab-item-label')[0].style.color = '#000';
        },
        methods: {

        },
        watch:{
            selected:{
                handler(val,oldval){
                    //console.log(oldval+'->'+val)
                    this.$router.push({
                        name: val
                    })
                },
                deep:true
            },
        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .page-content {
        height: calc(100vh - 150px);
        top: 0.8rem;
    }
    .mint-navbar{
        margin-top: 12px;
        .mint-tab-item{
            color: #4c4c4c;
            font-size: 0.28rem;  /*没有生效*/
            .mint-tab-item-label{
                font-size: 0.28rem;
            }
        }
        .mint-tab-item.is-selected{
            border-bottom: none;
            color: #33d57c;
            background: url(../../assets/huankuanjilu_line_btn@2x.png) no-repeat center 80%;
            background-size: 1.4rem;
        }
    }

</style>

