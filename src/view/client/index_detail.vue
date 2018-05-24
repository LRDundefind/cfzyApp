<template>
    <div class="page-content" id="client_detail">
       
            <div style="height:4rem">
                <mt-header fixed title="客户">
                        <mt-button icon="back" slot="left" @click="goClient"></mt-button>
                </mt-header>
                <div class="blackbg">
                    <div class="headimg">
                        <img v-show="listdata.headImg!=''" :src="imgpath+listdata.headImg" alt="图片" style="height: 1.24rem;width: 1.24rem;border-radius: 50%;">
                        <img v-show="listdata.headImg==''" src="../../assets/my/my_head.png" alt="">
                    </div> 
                    <h2 v-if="listdata.sys_status=='Y'" class="titstyle">已被系统加入黑名单<br>请谨慎合作</h2>
                    <h2 v-else>{{listdata.nickname}}</h2>
                </div>
            </div>
          
             <!-- :style="{ height: wrapperHeight + 'px' }"  ref="wrapper" -->
            <div class="page-main page-loadmore-wrappe wrapper topScroll" :style="{ height: wrapperHeight + 'px' }">
                <!-- <ul class="content">
                    <li> -->
                        <div class="main-list">
                            <p class="clearfix">消费次数<span>{{listdata.consum_num}}</span></p>
                            <p class="clearfix">最后消费时间<span>{{listdata.consum_ltime}}</span></p>
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
                    <!-- </li>
                </ul> -->
                
            </div>
            <div class='update clearfix'>
                <mt-button type="primary" size="large" class='f-l' @click="consumptionRecords(listdata.cid)">查看消费记录</mt-button>
                <mt-button type="primary" size="large" class='f-l' @click="goChange()" :disabled="listdata.sys_status=='Y'">更新资料</mt-button>
            </div>
        </div>
    
</template>

<script>
    import { client } from '@/services/apis/client'
     import { Toast } from 'mint-ui';
    import BScroll from 'better-scroll'
    export default {
        name: 'client_detail',
        data () {
            return {
                value: '',
                listdata:{},
                wrapperHeight: 0,//容器高度
                cid:this.$route.params.ids,
                imgpath:process.env.BASE_PATH,
                showUpdate:''
            }
        },
        mounted () {
           this.showUpdate=this.$route.params.come;
           this.wrapperHeight = document.documentElement.clientHeight - 315;
            // this.$nextTick(() => {
            //    this.scroll = new BScroll(this.$refs.wrapper,{});
            // })
            // this.$nextTick(() => {
            //     this.scroll = new BScroll(this.$refs.wrapper, {})
            // })

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
                        if(response.data.status=='Y'){
                            this.listdata=response.data.results;
                        }
                        else{
                            Toast({
                                message: response.data.error_msg,
                                position: 'middle',
                                duration: 5000
                                });
                                }

                    })

            },
            goClient(){
                if(this.$route.params.come == 'black'){
                    this.$router.push({name: 'blackList'})
                }else{
                	//window.history.go(-1);
                    this.$router.push({name:'client'})
                }
            },

            goChange(n){
                // 跳转到修改
                this.$router.push({name: 'index_change/update', params: {id: this.cid, type: 'update'}});
            },
            //跳转到消费记录
            consumptionRecords(cid){
                console.log(cid);
                console.log(1111);
                if(this.$route.params.come == 'black'){
                    this.$router.push({
                        name: 'orderPay_record',
                        params: {
                            cid: cid,
                            come:'black'
                        }
                    });
                }else {
                    this.$router.push({
                        name: 'orderPay_record',
                        params: {
                            cid: cid,
                            come:'client'
                        }

                    });
                }
            }
        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.update{
    position: fixed;
    bottom: 0.1rem;
    width: 100%;
    background: #f5f5f5;
}
.wrapper{
     height: 100vh;
    //  overflow:hidden;
     -webkit-overflow-scrolling : touch;
}
.content{
    height: 100%;
}
.page-loadmore-wrappe{
   overflow: scroll;
}
    .blackbg{
        height: 4rem;
        background: url(../../assets/client/kehu_kehuxiangqing.png) no-repeat;
        background-size: cover;
        text-align: center;
        font-size: 0.2rem;
        color: #fff;
    }
    .headimg{
        width: 1.24rem;
        height: 1.24rem;
        margin: 0 auto;
        overflow: hidden;
        padding: 1rem 0 0.5rem;
    }
   /* .titstyle{
        
       
    }*/
    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.2rem;
        color: #333;
        font-size: 0.28rem;
        line-height: 1rem;
        > p {
            border-top: 1px #dedede solid;
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
            line-height: 0.4rem;
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