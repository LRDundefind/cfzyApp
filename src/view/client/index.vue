<template>
    <div class="page-content">
        <mt-header fixed title="客 户">
            <router-link :to="{name:'order'}" slot="left" v-if="type=='order'">
                <mt-button icon="back"></mt-button>
            </router-link>
            <span @click="addCustomer" style="font-size: 0.32rem" slot="right" v-if="type != 'order'">添加客户</span>
        </mt-header>
        <search-box ref="search"/>
        <div class="page-main">
            <div v-for="n in listdata" :key='n.id' class="main-list" @click="goDetail('customer1')">
                <div class="ub ub-ac heade">
                    <div class='lis-icon ub-img im' v-bind:style="{backgroundImage: 'url(' + n.headImg + ')'}"></div>
                    <div class='ub-f1 ut-s'>{{n.nickname}}</div>
                    <!-- 正常客户状态 -->
                    <div class='res8 lis-sw ub-img im2' v-show="n.status=='Y'"></div>
                    <!-- 平台状态 -->
                    <div class='res8 lis-sw ub-img im3' v-show="n.sys_status=='Y'"></div>
                </div>
                <ul class="">
                    <li class="ub ub-pj">
                        <div class="ub-f1">消费次数</div>
                        <div class="ub-f1">{{n.consum_num}}次</div>
                    </li>
                    <li class="ub ub-pj">
                        <div class="ub-f1">最后消费时间</div>
                        <div class="ub-f1">{{n.consum_ltime}}</div>
                    </li>
                    <li class="ub ub-pj">
                        <div class="ub-f1">赊账总金额</div>
                        <div class="ub-f1">{{n.notPayAmount}}元</div>
                    </li>
                    <li class="ub ub-pc">
                        <div class="ub-f1">赊账最长时间</div>
                        <div class="ub-f1">{{n.creditTime}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import searchBox from '@/components/searchBox/search'
    import { client } from '@/services/apis/client'
    export default {
        data () {
            return {
                type: '',
                listdata:null
            }
        },
        components: {
            searchBox
        },
        mounted () {
            this.type = this.$route.params.type || false;
//            console.log(this.type);
        },
        created(){
            this.getList();
        },
        methods: {
            getList(){
                let params = {
                    page_size: 10,
                    current_page: 1,
                };
                client.dataList(params)
                    .then(response => {
                        this.listdata=response.data.results;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //跳转到添加客户
            addCustomer(){
                this.$router.push({name: 'index_change/create', params: {type: 'create'}})
            },
            goDetail(id){
                if (this.type == 'order') {
                    this.$router.push({name: 'order', params: {id: id}});
                } else {
                    this.$router.push({name: 'client_detail', params: {id: id}});
                }
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
        margin-right: 0.2rem;
    }
    .im2 {
      background-image: url(../../assets/client/kehu_zidingyi_img.png);
    }
    .im3 {
      background-image: url(../../assets/client/kehu_pingtai_img.png);
    }
    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.2rem;
        color: #333;
        .heade {
            font-size: 0.4rem;
            border-bottom: 1px #f0f0f0 solid;
            padding-bottom: 0.2rem;
        }
        h3 {
            font-size: 0.4rem;

            line-height: 0.8rem;
        }
        ul {

            li {
                font-size: 0.3rem;
                margin-top: 0.1rem;
                padding-bottom: 0.1rem;
                div:last-child {
                    text-align: right;
                }
            }
        }
    }

</style>