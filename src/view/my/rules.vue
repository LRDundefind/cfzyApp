<template>
    <div class="rules">
        <mt-header fixed title="赊账规则">
            <router-link to="/my" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
            <!-- <mt-button icon="more" slot="right"></mt-button> -->
        </mt-header>

        <div class="main-list">
            <div class="remark">
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入赊账规则" v-model="message"></textarea>
            </div>
        </div>

        <div class="findbtn">更新赊账规则</div>

    </div>

</template>
<style scoped lang='scss'>
    .rules{
        .main-list{
            background: #fff;
            margin-top: 0.2rem;
            padding: 0.2rem;
            color: #333;
            font-size: 0.28rem;
            line-height: 1rem;
            .remark{
                color: #666;
                textarea{
                    border: none;
                    width: 100%;
                }
            }
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
        name: 'rules',
        data () {
            return {
                message:''
            }
        },
        mounted () {

        },
        methods: {

        }
    }
</script>


