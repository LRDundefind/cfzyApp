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
                <div>
                     <!-- 接口无数据可编辑 -->
                    <p class="clearfix" v-if="listdata.cusName=='' && xiTdata==''">姓名 <input type="text" v-model="nameRead" placeholder="请输入"> </p>
                    <!-- 接口有数据不可编辑（修改时有此可能） -->
                    <p class="clearfix"  v-else>姓名  <span class="Unchange">{{ nameRead }}</span></p>
                </div>
               

                <p class="clearfix">昵称<input type="text" v-model="nicheng" placeholder="请输入"></p>

               <div>
                   <!-- 增加时电话不可编辑 -->
                   <p class="clearfix" v-if="phoneAdd==''">电话<input type="text" v-model="phone" placeholder="请输入"></p>
                   <!-- 修改时可以 -->
                   <p class="clearfix" v-else>电话<span class="Unchange">{{phone}}</span></p>
               </div>
                
                
                 <div style="border-top:1px #f0f0f0 solid">
                    <!-- 接口无数据可编辑 -->
                    <p class="clearfix"  v-if="listdata.idCard=='' && xiTdata==''">身份证号 <input type="text" v-model="IdcardRead" placeholder="请输入"> </p>
                    <!-- 接口有数据不可编辑（修改时有此可能） -->
                    <p class="clearfix" v-else>身份证号  <span class="Unchange">{{IdcardRead}}</span></p>
                
                </div>
                <p style="border:none;text-align: right;line-height: 0.3rem;font-size:0.22rem;color:#808080;">
                    "身份证号"首次编辑后将无法修改</p>
            </div>

            <div class="main-list">
                <p class="clearfix">公司<input type="text" v-model="gongsi" placeholder="请输入"></p>
                <p class="clearfix">地址<input type="text" v-model="address" placeholder="请输入"></p>
            </div>

            <div class="main-list">
                <p class="clearfix">备注</p>
                <div class="remark">
                    <textarea name="" id="" cols="30" rows="3" placeholder="备注信息" v-model="message"></textarea>
                </div>
            </div>
        </div>
        <div class="footer_btn" v-if="typeW=='update'">
            <div class="ub ub-pc">
                <div class="ub-f1 blackList" @click="dialoags = true ">加入黑名单</div>
                <div class="ub-f1 bad" @click="badList">设置为坏账</div>
            </div>
        </div>

        <!-- 修改的模态框 -->
        <div class="dialoag" v-show="dialoags">
            <div class="dialoag_cont">
                <h3>黑名单</h3>
                <p>将{{nameWrite}}设置为黑名单</p>
                <div>加入黑名单</div>
                <div>加入黑名单并上报平台</div>
                <div @click="dialoags = false ">取消</div>
            </div>
        </div>
        <!-- 新增的模态框 -->
        <div class="dialoag" v-show="addPerson">
            <div class="dialoag_cont">
                <h3>请输入手机号</h3>
                <input type="text" v-model="phoneAdd" class="phonemobil">
                <div @click="tipsQX">取消</div>
                <div @click="showa">确定</div>
            </div>
        </div>

    </div>
</template>

<script>

    import { MessageBox , Toast } from 'mint-ui';
    import { client } from '@/services/apis/client'
    export default {
        data () {
            return {
                addPerson:false,
                value: '',
                nameRead: '',
                nameWrite: '',
                namehas: true,
                nicheng: '',
                phone: '',
                IdcardRead: '',
                IdcardWrite: '',
                idcardhas: true,
                gongsi: '',
                address: '',
                message: '',
                dialoags: false,
                cid: '',    //需要的cid修改信息时使用
                typeW: '',
                phoneAdd:'', //新增客户的时候填写的手机号
                listdata:{
                    cusName:'',
                    idCard:''
                }, //接口获取的数据
                xiTdata:''
            }
        },
        mounted () {
           
            //create添加  update是修改
            this.typeW = this.$route.params.type || false;
            this.cid = this.$route.params.id || false;
            if (this.typeW=='create') {
               
                    // 根据手机号调取资源池数据，新增客户    
                    this.addPerson=true;
            }
            else{
                 // 根据客户ID修改
                    this.getData();
                    this.addPerson=false;
            }

        },
        methods: {
            tipsQX(){
                // 新增的取消按钮
                // if(this.phoneAdd==''){
				// 	Toast({
                //         message: '请输入手机号',
                //         position: 'middle',
                //         duration: 3000
                //         });
                // }
                // else{
                //     Toast({
                //         message: '请点击确定按钮',
                //         position: 'middle',
                //         duration: 3000
                //         });
                // }
                this.$router.push({name: 'client'});
            },
            showa(){
                //新增的确定按钮
                if(this.phoneAdd==''){
					Toast({
                        message: '请输入手机号',
                        position: 'middle',
                        duration: 3000
                        });
                }
                else if(!new RegExp(/^1[3|4|5|7|8][0-9]{9}$/).test(this.phoneAdd)){
                    Toast({
                        message: '手机号格式输入有误',
                        position: 'middle',
                        duration: 3000
                        });
                }
                else{
                    this.getList();
                    this.addPerson = false;
                }
                
                
            },
            getData(){
                let params = {
                    cid:this.cid
                };
                // 获取个人信息需要cid
                client.Listmessage(params)
                    .then(response => {
                        let s=response.data.results
                        this.listdata=response.data.results;


                        this.nameRead=s.cusName;//姓名
                        this.IdcardRead=s.idCard;//身份证号


                        this.message=this.listdata.remark;//备注
                        this.address=this.listdata.address;//地址
                        this.gongsi=this.listdata.company;//公司
                        this.phone=this.listdata.phone;//手机号
                        this.nicheng=this.listdata.nickname;//昵称

                       
                    })
                 
            },
            getList(){
                 let params = {
                    phone:this.phoneAdd
                };
                //获取系统客户详情 只需要手机号
                client.getXTmessage(params)
                    .then(response => {

                        let s=response.data.results
                        
                        if(s==''){
                            this.phone=this.phoneAdd;
                        }
                        else{
                            // this.xiTdata=response.data.results;
                            this.cid=s.cid;//cid
                            this.nameRead=s.cusName;//姓名
                            this.IdcardRead=s.idCard;//身份证号
                            this.address=s.address;//地址
                            this.gongsi=s.company;//公司
                            this.phone=s.phone;//手机号
                        }
                        
                    })
            },
            handleSave(){
                if (this.typeW=='create') {
                        // 新增客户   
                    if(this.nameRead==''){
                         Toast({
                            message: '请填写昵称',
                            position: 'middle',
                            duration: 3000
                            });
                    }
                    else{
                        let params = {
                            cusName:this.nameRead,
                            nickname:this.nicheng,
                            phone:this.phone,
                            idCard:this.IdcardRead,
                            company:this.gongsi,
                            address:this.address,
                            remark:this.message,
                            cid:this.cid
                        };
                        client.addC(params)
                            .then(response => {
                                // this.xiTdata=response.data.results;
                                if(response.data.status=='Y'){
                                     Toast({
                                        message: '客户添加成功',
                                        position: 'middle',
                                        duration: 3000
                                        });
                                        setTimeout(() => {
                                            this.$router.push({name: 'client'});
                                        }, 3000)
                                    
                                }
                                else{
                                     Toast({
                                        message: response.data.error_msg,
                                        position: 'middle',
                                        duration: 3000
                                        });
                                }
                            })
                        }
                }
                else{
                    // 修改信息
                   let params = {
                        cid:this.cid,    //客户id
                        cusName:this.nameRead, //姓名
                        nickname:this.nicheng,
                        phone:this.phone,
                        idCard:this.IdcardRead,
                        company:this.gongsi,
                        address:this.address,
                        remark:this.message
                    };
                    client.Cgemessage(params)
                        .then(response => {
                            if(response.data.status=='Y'){
                                this.$router.push({name: 'client'});
                            }
                        })
                
                    }
                     
                
            },
            send(){
                
            },
            badList(){
                MessageBox({
                    title: '提示',
                    message: '即将推出，敬请期待?',
                    showCancelButton: true
                }).then(action => {
                   
                });
            }

        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .phonemobil{
        border: 1px solid #dedede;
        color: #4c4c4c;
        line-height: 0.8rem;
        margin-bottom: 0.5rem;
        box-sizing: border-box;
        padding-left: 2px;
    }
    .Unchange{
        display: block;
        float: right;
        padding-right: 0.2rem;
        color:  #999;
    }
    .main-list {
        background: #fff;
        margin-top: 0.2rem;
        padding: 0.2rem;
        color: #333;
        font-size: 0.28rem;
        line-height: 1rem;
        div {
            p{
                input{
                     float: right;
                    color: #4c4c4c;
                    text-align: right;
                    line-height: 0.5rem;
                    margin-top: 0.25rem;
                }
            }
        }
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
        z-index: 150;
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