<template>
    <div class="rules">
        <mt-header fixed title="赊账规则">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <!-- <mt-button icon="more" slot="right"></mt-button> -->
        </mt-header>
        <div class="">
            <textarea rows="10" cols="30" v-model="value" class="content">
            </textarea>
        </div>
        <div class="update">
            <div  class="loginbtn">更新赊账规则</div>
        </div>
    </div>

</template>
<style scoped lang='scss'>
    .rules{
        .content{
            font-size: 0.2rem;
            width: 100%;
            border: none;
            margin-top: 0.2rem;
            color: #666;
        }
        .loginbtn{
            @include login_btn;
            background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
        }
        .update{
            margin: 5.5rem 1rem;
        }
    }
</style>
<script>
    export default {
        name: 'rules',
        data () {
            return {
                value:'我是一个好人'
            }
        },
        mounted () {

        },
        methods: {

        }
    }
</script>


