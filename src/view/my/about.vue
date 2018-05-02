<template>
    <div class="about" >
        <mt-header fixed title="关于">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="$router.go(-1)"></mt-button>
            </router-link>
        </mt-header>
        <div class="about_cont">
            {{aboutList.sell_protocol}}
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
    import {Toast} from 'mint-ui';
    import {my} from '@/services/apis/my'
    export default {
        name: 'about',
        data () {
            return {
                aboutList:[],
            }
        },
        mounted () {
            this.info();
        },
        methods: {
            info(){
                let params={};
                my.abouts(params).then(response => {
                    if(response.data.status == 'Y'){
                        this.aboutList = response.data.results;
                    }else {

                    }
                })
            }

        }
    }
</script>


