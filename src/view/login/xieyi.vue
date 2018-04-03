<template>

    <div class="login" >
            <mt-header fixed title="服务协议">
                <router-link to="/zhuce" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
                <!-- <mt-button icon="more" slot="right"></mt-button> -->
            </mt-header>
            <div class="xieyi_cont">
                {{message}}
            </div>
            
        
    </div>

</template>
<style scoped lang='scss'>
   .xieyi_cont{
       font-size: $fons_size_26;
       padding: 0.2rem;
       position: relative;
       top: 0.8rem;
       line-height: 0.48rem;
       color: #4c4c4c;
   }
</style>
<script>
export default {
    name: 'login',
    data () {
        return {
          message:'<router-link> 组件支持用户在具有路由功能的应用中（点击）导航。 通过 to 属性指定目标地址，默认渲染成带有正确链接的 <a> 标签，可以通过配置 tag 属性生成别的标签.。另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名。'
        }
    },
    mounted () {

    },
    methods: {
      
    }
}
</script>


