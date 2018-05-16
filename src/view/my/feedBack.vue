<template>
    <div class="feedBack">
        <mt-header fixed title="意见反馈">
            <mt-button icon="back" @click="goBack()" slot="left"></mt-button>
        </mt-header>
        <div class="page-main page-loadmore-wrappe topScroll">

            <div class="main-list">
                <div class="remark c-9">
                    <textarea name="" id="" cols="30" rows="10" placeholder="请输入您的宝贵意见" v-model="ideaInfo"></textarea>
                </div>
            </div>

            <div class="contact">
                <input v-model="phone" placeholder="请输入您的联系方式" class="phone ">
            </div>

            <div @click="submit" class="findbtn">提交</div>
        </div>
    </div>

</template>
<style scoped lang='scss'>
    .feedBack {
        width: 100%;
        display: block;
        .topScroll{
            top: 0.9rem;
            bottom: 0.2rem;
        }
        .page-loadmore-wrappe{
            overflow: auto;
            -webkit-overflow-scrolling : touch;
        }
        .main-list {
            background: #fff;
            margin-top: 0.2rem;
            padding: 0.3rem;
            font-size: 0.28rem;
            height: 4.32rem;
            .remark {
                textarea {
                    color: #999999;
                    border: none;
                    width: 100%;
                }
            }
        }

        .contact{
            background: #fff;
            margin-top: 0.2rem;
            padding: 0 0.3rem;
            color: #999;
            font-size: 0.28rem;
            line-height: 0.96rem;
            .phone {
                width: 100%;
                color: #999999;
                border: none;
            }
        }


        .findbtn {
            width: 80% !important;
            @include login_btn(fixed);
            background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
        }
    }
</style>
<script>
    import {Toast} from 'mint-ui';
    import {my} from '@/services/apis/my'
    export default {
        name: 'feedBack',
        data () {
            return {
                phone: '',
                ideaInfo: '',

            }
        },
        mounted () {

        },
        methods: {
            submit(){
                let data = {
                    ideaInfo: this.ideaInfo,
                    phone: this.phone
                };
                if (data.ideaInfo == '') {
                    Toast({
                        message: '请输入反馈意见',
                        position: 'middle',
                        duration: 5000
                    });
                    return false;
                } else {
                    if (data.phone != '') {
                        if (!(new RegExp(/^1[3|4|5|7|8][0-9]{9}$/).test(data.phone))) {
                            Toast({
                                message: '手机号输入有误',
                                position: 'middle',
                                duration: 1000
                            });
                            return false;
                        }
                    }
                    my.feedBack(data).then(response => {
                        if (response.data.status == 'Y') {
                            Toast({
                                message:'意见反馈提交成功！' ,
                                position: 'middle',
                                duration: 2000
                            });
                            this.$router.push({name: 'my'});
                        } else {
                            Toast({
                                message: response.data.results,
                                position: 'middle',
                                duration: 2000
                            });
                        }
                    })
                }
            }

        }
    }
</script>


