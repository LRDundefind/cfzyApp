<template>
    <div class="page-content">
        <mt-header fixed title="客 户">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="$router.go(-1)">返回</mt-button>
            </router-link>
            <mt-button @click="handleSave" slot="right" style="color:#333;">保存</mt-button>
        </mt-header>

        <div class="page-main">
            <div class="main-list">
                <p class="clearfix">姓名
                    <input type="text" v-model="nameRead" readonly v-if="namehas">
                    <input type="text" v-model="nameWrite" v-else>
                </p>
                <p class="clearfix">昵称<input type="text" v-model="nicheng"></p>
                <p class="clearfix">电话<input type="text" v-model="phone"></p>
                <p class="clearfix">身份证号
                    <input type="text" v-model="IdcardRead" readonly v-if="idcardhas">
                    <input type="text" v-model="IdcardWrite" v-else>
                </p>
                <p style="border:none;text-align: right;line-height: 0.3rem;font-size:0.22rem;color:#808080;">
                    "身份证号"首次编辑后将无法修改</p>
            </div>

            <div class="main-list">
                <p class="clearfix">公司<input type="text" v-model="gongsi"></p>
                <p class="clearfix">地址<input type="text" v-model="address"></p>
            </div>

            <div class="main-list">
                <p class="clearfix">备注</p>
                <div class="remark">
                    <textarea name="" id="" cols="30" rows="3" placeholder="备注信息" v-model="message"></textarea>
                </div>
            </div>
        </div>
        <div class="footer_btn" v-if="type=='update'">
            <div class="ub ub-pc">
                <div class="ub-f1 blackList" @click="dialoags = true ">加入黑名单</div>
                <div class="ub-f1 bad" @click="badList">设置为坏账</div>
            </div>
        </div>

        <!-- 模态框 -->
        <div class="dialoag" v-show="dialoags">
            <div class="dialoag_cont">
                <h3>黑名单</h3>
                <p>将{{nameWrite}}设置为黑名单</p>
                <div>加入黑名单</div>
                <div>加入黑名单并上报平台</div>
                <div @click="dialoags = false ">取消</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {MessageBox} from 'mint-ui';
    export default {
        data () {
            return {
                value: '',
                nameRead: '王欣宇',
                nameWrite: '',
                namehas: true,
                nicheng: '',
                phone: '',
                IdcardRead: '210781199308300031',
                IdcardWrite: '',
                idcardhas: true,
                gongsi: '',
                address: '',
                message: '我是备注信息',
                dialoags: false,
                id: '',
                type: '',
            }
        },
        mounted () {
            let type = this.$route.params.type || false;
            this.type = type;
            let id = this.$route.params.id || false;
            if (id) {
                this.id = id;
                this.getData();
            }

        },
        methods: {
            getData(){
                console.log(this.id);
                console.log(this.type);
            },
            getList(){
            },
            handleSave(){

            },
            badList(){
                MessageBox({
                    title: '提示',
                    message: '设置该人所有赊账为坏账?',
                    showCancelButton: true
                }).then(action => {
                    alert('接口调取')
                });
            }

        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">

    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.2rem;
        color: #333;
        font-size: 0.28rem;
        line-height: 1rem;
        > p {
            border-top: 1px #f0f0f0 solid;
            > input {
                float: right;
                color: #4c4c4c;
                text-align: right;
                line-height: 1rem;
            }
        }
        > p:nth-child(1) {
            border: none;
        }
        .remark {
            color: #666;
            padding-bottom: 0.8rem;
            textarea {
                border: none;
                width: 100%;
            }
        }
    }

    .footer_btn {
        width: 100%;
        position: fixed;
        z-index: 1000;
        height: 1rem;
        line-height: 1rem;
        bottom: 0;
        color: #fff;
        font-size: 0.3rem;
        text-align: center;
        cursor: pointer;
        .blackList {
            background: #333;
        }
        .bad {
            background: #49c98b;
        }
    }

    .dialoag {
        width: 100%;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 10001;
        .dialoag_cont {
            width: 80%;
            border-radius: 5px;
            margin: 3rem auto 0;
            background: #fff;
            height: 4.7rem;
            text-align: center;
            color: #666;
            h3 {
                font-size: 0.28rem;
                height: 0.5rem;
                padding-top: 0.4rem;
            }
            p {
                font-size: 0.24rem;
                height: 0.8rem;
            }
            div {
                height: 1rem;
                font-size: 0.32rem;
                line-height: 1rem;
                color: #49c98b;
                box-sizing: border-box;
                border-top: 1px solid #dedede;
            }
        }
    }
</style>