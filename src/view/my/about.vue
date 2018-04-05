<template>
    <div class="about" >
        <mt-header fixed title="服务协议">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="about_cont">
            {{message}}
        </div>
    </div>
</template>
<style scoped lang='scss'>
    .about_cont{
        font-size: $fons_size_26;
        padding: 0.3rem;
        top: 0.8rem;
        line-height: 0.48rem;
        color: #4c4c4c;
    }
</style>
<script>
    export default {
        name: 'about',
        data () {
            return {
                message:' IT是信息技术的简称，Information Technology,指与信息相关的技术。不同的人和不同的书上对此有不同解释。但一个基本上大家都同意的观点是，IT有以下三部分组成： -----传感技术 这是人的感觉器官的延伸与拓展，最明显的例子是条码阅读器； -----通信技术 这是人的神经系统的延伸与拓展，承担传递信息的功能； -----计算机技术 这是人的大脑功能延伸与拓展，承担对信息进行处理的功能。 所谓信息化是用信息技术来改造其他产业与行业，从而提高企业的效益。在这个过程中信息技术承担了一个得力工具的角色。'
            }
        },
        mounted () {

        },
        methods: {

        }
    }
</script>


