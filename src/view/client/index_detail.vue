<template>
    <div class="page-content" id="client_detail">
        <div style="height:4rem">
            <mt-header fixed title="客 户">
                <router-link :to="{name:'client'}" slot="left">
                    <mt-button icon="back"></mt-button>
                </router-link>
            </mt-header>
            <div class="blackbg">
                <div><img :src="listdata.headImg"></div>
                <h2 v-if="listdata.sys_status=='Y'">已被系统加入黑名单请谨慎合作</h2>
                <h2 v-else>{{listdata.cusName}}</h2>>
            </div>
        </div>
        

        <div class="page-main">
            <div class="main-list">
                <p class="clearfix">消费次数<span>{{listdata.consum_num}}</span></p>
                <p class="clearfix">最后消费时间<span>无</span></p>
            </div>

            <div class="main-list">
                <p class="clearfix">赊账总金额<span>{{listdata.notPayAmount}}</span></p>
                <p class="clearfix">赊账最长时间<span>{{listdata.creditTime}}</span></p>
            </div>

            <div class="main-list">
                <p class="clearfix">姓名<span>{{listdata.cusName}}</span></p>
                <p class="clearfix">昵称<span>{{listdata.nickname}}</span></p>
                <p class="clearfix">电话<span>{{listdata.phone}}</span></p>
                <p class="clearfix">身份证号<span>{{listdata.idCard}}</span></p>
                <p style="border:none;text-align: right;line-height: 0.3rem;font-size:0.22rem;color:#808080;">
                    "身份证号"首次编辑后将无法修改</p>
            </div>

            <div class="main-list">
                <p class="clearfix">公司<span>{{listdata.company}}</span></p>
                <p class="clearfix">地址<span>{{listdata.address}}</span></p>
            </div>

            <div class="main-list">
                <p class="clearfix">备注</p>
                <div class="remark">{{listdata.remark}}</div>
            </div>
        </div>
        <div class='update clearfix'>
            <mt-button type="primary" size="large" class='f-l' @click="consumptionRecords(3)">查看消费记录</mt-button>
            <mt-button type="primary" size="large" class='f-l' @click="goChange(10)">更新资料</mt-button>
        </div>
    </div>
</template>

<script>
    import { client } from '@/services/apis/client'
    export default {
        name: 'client_detail',
        data () {
            return {
                value: '',
                listdata:null,
                cid:this.$route.params.ids
            }
        },
        mounted () {

        }, 
        created(){
            this.getList();
        },
        methods: {
             getList(){
                let params = {
                    cid:this.cid
                };
                client.Listmessage(params)
                    .then(response => {
                        this.listdata=response.data.results;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            goChange(n){
                this.$router.push({name: 'index_change/update', params: {id: n, type: 'update'}});
            },
            //跳转到消费记录
            consumptionRecords(id){
                this.$router.push({
                    name: 'orderPay_record',
//      		params: {
//      			id:id
//      		}
                });
            }
        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .blackbg{
        height: 4rem;
        background: url(../../assets/client/kehu_kehuxiangqing.png) no-repeat;
        background-size: cover;
    }
    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.2rem;
        color: #333;
        font-size: 0.28rem;
        line-height: 1rem;
        > p {
            border-top: 1px #f0f0f0 solid;
            > span {
                float: right;
                color: #4c4c4c;
                text-align: right;
            }
        }
        > p:nth-child(1) {
            border: none;
        }
        .remark {
            color: #666;
            padding-bottom: 0.8rem;
        }
    }

    .update {

        .mint-button--primary:nth-child(1) {
            background: url(../../assets/kehu_chakanxiaofeijilu_btn@2x.png) no-repeat center;
            background-size: contain;
            width: 41%;
            color: #0f0;
            margin: 0 3%;
            font-size: 0.3rem !important;
        }
        .mint-button--primary:nth-child(2) {
            background: url(../../assets/kehu_gengxinziliao_btn@2x.png) no-repeat center;
            background-size: contain;
            width: 50%;
            font-size: 0.3rem !important;
        }
        padding: 0.3rem 0 0rem 0;
        button {
            margin: 0 auto;
            height: 1rem;
        }

    }

</style>