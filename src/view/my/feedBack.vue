<template>
    <div class="feedBack">
        <mt-header fixed title="意见反馈">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>

        <div class="main-list">
            <div class="remark c-9">
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入您的宝贵意见" v-model="message"></textarea>
            </div>
        </div>

        <div class="">
            <input v-model="phone" placeholder="请输入您的联系方式" class="phone ">
        </div>

        <div  class="findbtn">提交</div>
    </div>

</template>
<style scoped lang='scss'>
    .feedBack{
        width: 100%;
        display: block;
        .main-list{
            background: #fff;
            margin-top: 0.2rem;
            padding: 0.2rem;
            font-size: 0.28rem;
            line-height: 1rem;
            .remark{
                textarea{
                    border: none;
                    width: 100%;
                }
            }
        }
        .phone{
            width: 100%;
            border: none;
            padding: 0.3rem;
            height: 0.48rem;
        }

        .findbtn{
            width: 80% !important;
            @include login_btn(fixed);
            background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
        }
    }
</style>
<script>
    export default {
        name: 'feedBack',
        data () {
            return {
                phone:'',
                message:'',
            }
        },
        mounted () {

        },
        methods: {

        }
    }
</script>


