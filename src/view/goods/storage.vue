<template>
    <div class="page-content storage">
        <mt-navbar v-model="selected">
            <mt-tab-item id="basic">基本信息</mt-tab-item>
            <mt-tab-item id="goods">货品信息</mt-tab-item>
        </mt-navbar>
        <mt-tab-container>
            <router-view name="storageRouteView" />
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

        },
        methods: {
            getList(){}

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
    .storage{
        .mint-navbar{
            margin-top: 0.2rem;
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

    }

</style>