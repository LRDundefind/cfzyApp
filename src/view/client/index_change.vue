<template>
    <div class="page-content" style="top:0;">
        <mt-header title="客户">
            <router-link to="/client" slot="left">
                <mt-button icon="back"> </mt-button>
            </router-link>
            <mt-button @click="handleSave" slot="right" style="color:#333;" :disable="ONbtn">保存</mt-button>
        </mt-header>

        <div class="page-main wrapper"  :style="{ height: wrapperHeight + 'px' }">
            <div class="main-list">
                <div class="">
                    <div class="sc">
                        <div style="opacity: 0" class="picture"
                                :style="'backgroundImage:url('+headerImage+')'"></div>
                        <input type="file" id="upload" accept="image" @change="upload1" style="opacity: 0">
                        
                        <!-- 默认展示无图片 -->
                        <div>
                            <img class="header-img" :src="personalData.headImg"/>
                        </div>

                    </div>
                </div>
                <div>
                     <!-- 接口无数据可编辑 -->
                    <p class="clearfix" v-if="listdata.cusName=='' && xiTdata==''">姓名 <input type="text" v-model="nameRead" placeholder="请输入" maxlength="10"> </p>
                    <!-- 接口有数据不可编辑（修改时有此可能） -->
                    <p class="clearfix"  v-else>姓名  <span class="Unchange">{{ nameRead }}</span></p>
                </div>
               

                <p class="clearfix">昵称<input type="text" v-model="nicheng" placeholder="请输入" maxlength="10"></p>

               <div>
                   <!-- 增加时电话不可编辑 -->
                   <p class="clearfix" v-if="phoneAdd==''">电话<input type="text" v-model="phone" placeholder="请输入" maxlength="11"></p>
                   <!-- 修改时可以 -->
                   <p class="clearfix" v-else>电话<span class="Unchange">{{phone}}</span></p>
               </div>
                
                
                 <div style="border-top:1px #f0f0f0 solid">
                    <!-- 接口无数据可编辑 -->
                    <p class="clearfix"  v-if="listdata.idCard=='' && xiTdata==''">身份证号 <input type="text" v-model="IdcardRead" placeholder="请输入" maxlength="18"> </p>
                    <!-- 接口有数据不可编辑（修改时有此可能） -->
                    <p class="clearfix" v-else>身份证号  <span class="Unchange">{{IdcardRead}}</span></p>
                
                </div>
                <p style="border:none;text-align: right;line-height: 0.3rem;font-size:0.22rem;color:#808080;">
                    "身份证号"首次编辑后将无法修改</p>
            </div>

            <div class="main-list">
                <p class="clearfix">公司<input type="text" v-model="gongsi" placeholder="请输入" maxlength="50"></p>
                <p class="clearfix">地址<input type="text" v-model="address" placeholder="请输入" maxlength="50"></p>
            </div>

            <div class="main-list">
                <p class="clearfix">备注</p>
                <div class="remark">
                    <textarea name="" id="" cols="30" rows="3" placeholder="备注信息" v-model="message" maxlength="420"></textarea>
                </div>
            </div>
        </div>
        <div class="footer_btn" v-if="typeW=='update'">
            <div class="ub ub-pc">
                <!-- <div class="ub-f1 blackList" @click="dialoags = true ">加入黑名单</div> -->
                <div class="ub-f1 bad" @click="badList">设置为坏账</div>
            </div>
        </div>

        <!-- 修改的模态框 -->
        <div class="dialoag" v-show="dialoags">
            <div class="dialoag_cont">
                <h3>黑名单</h3>
                <p>将{{nameWrite}}设置为黑名单</p>
                <div @click="joinB">加入黑名单</div>
                <div @click="joinPB">加入黑名单并上报平台</div>
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
         <!-- 保存时候的遮罩 -->
        <div class="dialoag" v-show="addover">
            <h5 class="wenzi">{{tiopmessage}}</h5>
        </div>
    </div>
</template>

<script>

    import { MessageBox , Toast } from 'mint-ui';
    import { client } from '@/services/apis/client'
    import Cookies from 'js-cookie'
     import Exif from 'exif-js';
    export default {
        data () {
            return {
                ONbtn:false,
                tiopmessage:'保存中，请稍后',
                 wrapperHeight: 0,//容器高度
                headerImage: '',     //   头 像
                headerImageUP: '',     //   头 像
                addPerson:false,
                addover:false,
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
                xiTdata:'',
                doMain:process.env.BASE_PATH,
                personalData:{
                    headImg:require('../../assets/my/my_head.png')
                }  //图片存放
            }
        },
        mounted () {
            this.wrapperHeight = document.documentElement.clientHeight - 40;
            //create添加  update是修改
            this.typeW = this.$route.params.type || false;
            this.cid = this.$route.params.id || false;
            if (this.typeW=='create') {
                    //  let defaultImg = require('../../assets/my/my_head.png');
                    //  this.personalData.headImg = defaultImg;
                    // 根据手机号调取资源池数据，新增客户    
                    this.addPerson=true;

            }
            else{
                 // 根据客户ID修改
                    this.getData();
                //  获取客户头像
                    this.getpicmessage();
                    console.log('111111111')
                    this.addPerson=false;
            }

        },
        methods: {
           getpicmessage(){
                let defaultImg = require('../../assets/my/my_head.png');
              
                 let params = {
                    cid:this.cid
                };
                client.Listmessage(params)
                    .then(response => {
                        this.personalData=response.data.results;
                         //返回头像的处理
                        if (this.personalData.headImg == '') {
                            this.personalData.headImg = defaultImg;
                        } else {
                            this.personalData.headImg = this.doMain + response.data.results.headImg;
                        }
                    })
                
               
           },

            upload1 (e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.picValue = files[0];
                this.imgPreview(this.picValue);
            },
            imgPreview (file) {
                var self = this;
                let Orientation;

                //去获取拍照时的信息，解决拍出来的照片旋转问题  
                Exif.getData(file, function () {
                    Orientation = Exif.getTag(this, 'Orientation');
                });

                // 看支持不支持FileReader  
                if (!file || !window.FileReader) return;

                if (/^image/.test(file.type)) {
                    // 创建一个reader  
                    let reader = new FileReader();
                    // 将图片2将转成 base64 格式  
                    reader.readAsDataURL(file);
                    // 读取成功后的回调  
                    reader.onloadend = function () {
                        let result = this.result;

                        let img = new Image();
                        img.src = result;
                        //判断图片是否大于100K,是就直接上传，反之压缩图片  
                        if (result.length <= (100 * 1024)) {
                            self.headerImage = result;
                            self.personalData.headImg = result;
                            self.postImg();
                        } else {
                            img.onload = function () {
                                let data = self.compress(img, Orientation);
                                self.headerImage = data;
                                self.personalData.headImg = data;
                                self.postImg();
                            }
                        }
                    }
                }
            },
            postImg(){
                // console.log(this.headerImage)
            },
            rotateImg (img, direction,canvas) {
                //最小与最大旋转方向，图片旋转4次后回到原方向
                const min_step = 0;
                const max_step = 3;
                if (img == null)return;
                //img的高度和宽度不能在img元素隐藏后获取，否则会出错
                let height = img.height;
                let width = img.width;
                let step = 2;
                if (step == null) {
                step = min_step;
                }
                if (direction == 'right') {
                step++;
                //旋转到原位置，即超过最大值
                step > max_step && (step = min_step);
                } else {
                step--;
                step < min_step && (step = max_step);
                }
                //旋转角度以弧度值为参数
                let degree = step * 90 * Math.PI / 180;
                let ctx = canvas.getContext('2d');
                switch (step) {
                case 0:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0);
                    break;
                case 1:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, 0, -height);
                    break;
                case 2:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, -height);
                    break;
                case 3:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, 0);
                    break;
                }
            },
            compress(img, Orientation) {
                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext('2d');
                //瓦片canvas
                let tCanvas = document.createElement("canvas");
                let tctx = tCanvas.getContext("2d");
                let initSize = img.src.length;
                let width = img.width;
                let height = img.height;
                //如果图片大于四百万像素，计算压缩比并将大小压至400万以下  
                let ratio;
                if ((ratio = width * height / 4000000) > 1) {
                    console.log("大于400万像素")
                    ratio = Math.sqrt(ratio);
                    width /= ratio;
                    height /= ratio;
                } else {
                    ratio = 1;
                }
                canvas.width = width;
                canvas.height = height;
                //        铺底色
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                //如果图片像素大于100万则使用瓦片绘制  
                let count;
                if ((count = width * height / 1000000) > 1) {
                    console.log("超过100W像素");
                    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片  
                    //            计算每块瓦片的宽和高
                    let nw = ~~(width / count);
                    let nh = ~~(height / count);
                    tCanvas.width = nw;
                    tCanvas.height = nh;
                    for (let i = 0; i < count; i++) {
                        for (let j = 0; j < count; j++) {
                            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
                            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                        }
                    }
                } else {
                    ctx.drawImage(img, 0, 0, width, height);
                }
                //修复ios上传图片的时候 被旋转的问题  
                if (Orientation != "" && Orientation != 1) {
                    switch (Orientation) {
                        case 6://需要顺时针（向左）90度旋转
                            this.rotateImg(img, 'left', canvas);
                            break;
                        case 8://需要逆时针（向右）90度旋转
                            this.rotateImg(img, 'right', canvas);
                            break;
                        case 3://需要180度旋转
                            this.rotateImg(img, 'right', canvas);//转两次
                            this.rotateImg(img, 'right', canvas);
                            break;
                    }
                }
                //进行最小压缩  
                let ndata = canvas.toDataURL('image/jpeg', 0.1);
                console.log('压缩前：' + initSize);
                console.log('压缩后：' + ndata.length);
                console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
                tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
                return ndata;
                
            },


            joinPB(){

            },
            joinB(){

            },
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
                else if(!new RegExp(/^1[3|4|5|7|8|9][0-9]{9}$/).test(this.phoneAdd)){
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
                    if(this.nicheng==''){
                         Toast({
                            message: '请填写昵称',
                            position: 'middle',
                            duration: 3000
                            });
                    }
                    else if(this.phone==''){
                        Toast({
                            message: '请输入手机号',
                            position: 'middle',
                            duration: 3000
                            });
                    }
                    else if(this.IdcardRead!=''){
                        if(!new RegExp(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/).test(this.IdcardRead)){
                             Toast({
                            message: '身份证格式输入有误',
                            position: 'middle',
                            duration: 3000
                            });
                            
                        }
                        else{
                        this.ONbtn=true;
                        this.addover=true;
                        let params = {
                            cusName:this.nameRead,
                            nickname:this.nicheng,
                            phone:this.phone,
                            idCard:this.IdcardRead,
                            company:this.gongsi,
                            address:this.address,
                            remark:this.message,
                            cid:this.cid,
                            headImg:this.headerImage
                        };
                        
                        client.addC(params)
                            .then(response => {
                                // this.xiTdata=response.data.results;
                                if(response.data.status=='Y'){
                                   
                                    //  Toast({
                                    //     message: '客户添加成功',
                                    //     position: 'middle',
                                    //     duration: 3000
                                    //     });
                                        this.tiopmessage='客户添加成功'
                                        setTimeout(() => {
                                            if(Cookies.get('froms')=='Y'){
                                               this.$router.push({name: 'client'});
                                                // Cookies.remove('froms');
                                            }
                                            else{
                                                this.$router.push({name: 'client'});
                                            }
                                            
                                            // this.addover=false;
                                        }, 3000)
                                    
                                }
                                else{
                                    //  Toast({
                                    //     message: ,
                                    //     position: 'middle',
                                    //     duration: 3000
                                    //     });
                                    this.tiopmessage=response.data.error_msg;
                                    setTimeout(() => {
                                            this.$router.push({name: 'client'});
                                        }, 3000)
                                }
                            })
                        }
                    }
                    else{
                        this.addover=true;
                        this.ONbtn=true;
                        let params = {
                            cusName:this.nameRead,
                            nickname:this.nicheng,
                            phone:this.phone,
                            idCard:this.IdcardRead,
                            company:this.gongsi,
                            address:this.address,
                            remark:this.message,
                            cid:this.cid,
                            headImg:this.headerImage
                        };
                        client.addC(params)
                            .then(response => {
                                // this.xiTdata=response.data.results;
                                if(response.data.status=='Y'){
                                   
                                    //  Toast({
                                    //     message: '客户添加成功',
                                    //     position: 'middle',
                                    //     duration: 3000
                                    //     });
                                         this.tiopmessage='客户添加成功'
                                        setTimeout(() => {
                                            if(Cookies.get('froms')=='Y'){
                                                 this.$router.push({name: 'client'});
                                                // Cookies.remove('froms');
                                            }
                                            else{
                                                this.$router.push({name: 'client'});
                                            }
                                             this.addover=false;
                                        }, 3000)
                                    
                                }
                                else{
                                    //  Toast({
                                    //     message: response.data.error_msg,
                                    //     position: 'middle',
                                    //     duration: 3000
                                    //     });
                                    this.tiopmessage=response.data.error_msg;
                                    setTimeout(() => {
                                            this.$router.push({name: 'client'});
                                        }, 3000)
                                }
                            })
                        }
                    
                }
                else{
                    // 修改信息
                   this.addover=true;
                   let params = {
                        cid:this.cid,    //客户id
                        cusName:this.nameRead, //姓名
                        nickname:this.nicheng,
                        phone:this.phone,
                        idCard:this.IdcardRead,
                        company:this.gongsi,
                        address:this.address,
                        remark:this.message,
                        headImg:this.headerImage
                    };
                    client.Cgemessage(params)
                        .then(response => {
                            if(response.data.status=='Y'){
                                // Toast({
                                //         message: '更新成功',
                                //         position: 'middle',
                                //         duration: 3000
                                //         });
                                this.tiopmessage='更新成功'
                                setTimeout(() => {
                                    this.addover=false;
                                    this.$router.push({name: 'client'});
                                }, 3000)
                                
                            }
                        })
                
                    }
                     
                
            },
            send(){
                
            },
            badList(){
                MessageBox({
                    title: '提示',
                    message: '即将推出，敬请期待',
                    showCancelButton: true
                }).then(action => {
                   
                });
            }

        }
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
.sc {
        position: relative;
    }

    #upload {
        position: absolute;
        width: 1.24rem;
        height: 1.24rem;
        left: 50%;
        top: 35.5%;
        margin-left: -0.62rem;
    }

    .picture {
        height: 1.24rem;
        width: 1.24rem;
        border-radius: 50%;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .sc {
        background-image: url("../../assets/my/my_background.png");
        background-repeat: no-repeat;
        background-size: cover;
        height: 3.52rem;
        .header-img {
            width: 1.24rem;
            height: 1.24rem;
            border-radius: 50%;
            margin:0 auto;
            display: block;
        }
    }

    .wenzi{
        text-align: center;
        color: #fff;
        line-height: 10rem;
        font-size: 0.4rem;
    }
    .phonemobil{
        border: 1px solid #dedede;
        color: #4c4c4c;
        padding: 0.2rem 0;
        line-height: 0.5rem;
        margin-bottom: 0.5rem;
        box-sizing: border-box;
        padding-left: 2px;
        box-sizing: border-box;
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
                    line-height: 0.4rem;
                    margin-top: 0.35rem;
                }
            }
        }
        > p {
            border-top: 1px #f0f0f0 solid;
            > input {
                float: right;
                color: #4c4c4c;
                text-align: right;
                line-height: 0.4rem;
                margin-top: 0.35rem;
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