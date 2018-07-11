<template>
    <div class="about">
        <mt-header fixed title="关于">
            <mt-button icon="back" @click="goBack()" slot="left"></mt-button>
        </mt-header>
        <div class="page-main page-loadmore-wrappe topScroll">
            <div class="about_cont">
                {{aboutList.sys_about}}
            </div>
        </div>
    </div>
</template>
<style scoped lang='scss'>
    .topScroll{
        top: 1.1rem;
        bottom: 0.2rem;
    }
    .page-loadmore-wrappe{
        overflow: auto;
        -webkit-overflow-scrolling : touch;
    }
    .about_cont {
        font-size: $fons_size_26;
        padding: 0 0.3rem;
        top: 0.8rem;
        line-height: 0.48rem;
        color: #4c4c4c;
    }
</style>
<script>
    import {Toast} from 'mint-ui';
    import {my} from '@/services/apis/my'
    export default {
        name: 'about',
        data () {
            return {
                aboutList: [],
            }
        },
        mounted () {
            this.info();
        },
        methods: {
            //获取关于及使用协议
            info(){
                let params = {};
                my.abouts(params).then(response => {
                    if (response.data.status == 'Y') {
                        this.aboutList = response.data.results;
                    } else {

                    }
                })
            }

        }
    }
</script>


