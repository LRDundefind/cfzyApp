<template>
    <div class="page-content">
        <mt-header fixed title="平台黑名单">
            <mt-button icon="back" @click="goMy()" slot="left"></mt-button>
        </mt-header>
        <search-box @getSmeage="searchBlack" :msg="msg" ref="search"/>
        <div class="page-main">
            <div v-for="item in blacklistData" :key='item.cid' class="main-list" @click="goDetail(item.cid)">
                <ul class="ub">
                    <li class="ub-f1">
                        <img class="black-img" :src="item.headImg"/>
                    </li>
                    <li class="ub-f2">
                        <div class="name">{{item.cusName}}</div>
                        <div class="reason">{{item.blockingReason}}</div>
                    </li>
                    <li class="ub-f3 ub ub-pe">
                        <div>
                            <div class="date">{{item.createTime}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import searchBox from '@/components/searchBox/search'
    import {home} from '@/services/apis/home.api'

    export default {
        data () {
            return {
                black:'',
                msg: '',
                blacklistParams: {
                    search: '',
                },
                blacklistData: [],

            }
        },
        created(){
            this.black = this.$route.params.black || false;
        },
        mounted () {
            this.getlist()
        },

        components: {
            searchBox
        },

        methods: {
            goMy(){
                if(this.black == 'nostall'){
                    this.$router.push({name: 'noStalls'})
                }else {
                    this.$router.push({name: 'home'});
                }
            },
            searchBlack(msg){
                this.blacklistParams.search = msg;
                this.getlist();
            },
            getlist(){
                home.blacklist(this.blacklistParams).then(response => {
                    this.blacklistData = response.data.results;
                    //console.log(this.blacklistData)
                })
            },

            goDetail(cid){
                this.$router.push({name: 'client_detail', params: {ids: cid, come: 'black'}});
            }

        }
    }
</script>
<style scoped lang="scss">
    .im {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        overflow: hidden;
        background-image: url(../../assets/kehu_gengxinziliao_btn@2x.png)
    }

    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.3rem;
        color: #333;
        .heade {
            font-size: 0.4rem;
            border-bottom: 1px #f0f0f0 solid;
        }
        h3 {
            font-size: 0.4rem;

            line-height: 0.8rem;
        }
        ul {

            li {
                font-size: 0.3rem;
                .black-img {
                    width: 1.06rem;
                }
                .name {
                    font-size: 0.3rem;
                    color: #333333;
                    padding: 0 0 0.22rem 0.26rem;
                }
                .reason {
                    font-size: 0.22rem;
                    color: #808080;
                    padding-left: 0.26rem;
                }
                .date {
                    font-size: 0.22rem;
                    color: #808080;
                    padding-top: 0.16rem;
                }

            }
        }
    }

</style>