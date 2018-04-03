<template>
    <div class="feedBack">
        <mt-header fixed title="意见反馈">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <!-- <mt-button icon="more" slot="right"></mt-button> -->
        </mt-header>
        <div class="">
            <textarea rows="10" cols="30" v-model="value" class="content">
            </textarea>
        </div>
        <div class="">
            <input v-model="phone" placeholder="手机号" class="phone ">
        </div>
        <div class="update">
            <div  class="loginbtn">提交</div>
        </div>
    </div>

</template>
<style scoped lang='scss'>
    .feedBack{
        width: 100%;
        display: block;
        .content{
            padding: 0.3rem;
            font-size: 0.2rem;
            width: 100%;
            border: none;
            margin-top: 0.2rem;
            color: #666;
        }
        .phone{
            width: 100%;
            border: none;
            padding: 0.3rem;
        }
        .loginbtn{
            @include login_btn;
            background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
        }
        .update{
            margin: 4.5rem 1rem 0.5rem 1rem;
        }
    }
</style>
<script>
    export default {
        name: 'feedBack',
        data () {
            return {
                phone:'',
                value:'我是一个好人',
            }
        },
        mounted () {

        },
        methods: {

        }
    }
</script>


