<template>
    <div class="page-content storage">
        <mt-header fixed title="货品入库" v-if="selected">
            <mt-button icon="back" slot="left" @click="goHome"></mt-button>
            <mt-button slot="right" style="font-size: 0.32rem" @click="confirmStorage" :disabled="confirmDisabled">
                确认入库
            </mt-button>
        </mt-header>

        <mt-header fixed title="车次管理" v-if="tid!=''">
            <mt-button icon="back" slot="left" @click="goHome"></mt-button>
            <mt-button slot="right" style="font-size: 0.32rem" @click="editSubmit" :disabled="confirmDisabled">
                确认修改
            </mt-button>
        </mt-header>

        <mt-header fixed title="货主" v-if="ownerList">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="ownerBack"></mt-button>
            </router-link>
        </mt-header>


        <mt-header fixed title="货品信息" v-if="goodsDetails">
            <router-link to="" slot="left">
                <mt-button icon="back" @click="goodsBack"></mt-button>
            </router-link>
        </mt-header>

        <div class="page-main page-loadmore-wrappe topScroll">

            <mt-navbar v-model="selected" v-if="selected">
                <mt-tab-item id="basic">基本信息</mt-tab-item>
                <mt-tab-item id="goods">货品信息</mt-tab-item>
            </mt-navbar>
            <mt-tab-container>
                <!--基本信息-->
                <div v-if="selected == 'basic'">
                    <div class="">
                        <div class="basic-list" @click="gologistics" v-show="tid">
                            <p class="clearfix"><span class="f-l">{{stall.trainsNum}}</span>
                                <span class="name" v-show="status == 'status_toremit'">待汇款</span>
                                <span class="name" v-show="status == 'status_selling'">售卖中</span>
                                <span class="name" v-show="status == 'status_topay'">待结算</span>
                                <span class="name" v-show="status == 'status_complete'">已完成</span>
                                <span class="name" v-show="status == 'status_not_selling'">未开卖</span>
                            </p>
                        </div>
                        <div class="basic-list" @click="gologistics" v-show="tid == ''">
                            <p class="clearfix">物流
                                <span class="name">{{trainShow}}<img class="right-icon"
                                                                     src="../../assets/index/gray-right-icon.png"/></span>
                            </p>
                        </div>
                        <div class="basic-list" @click="goList" v-show="tid == ''">
                            <p class="clearfix">货主
                                <span class="name">{{stall.name}}<img class="right-icon"
                                                                      src="../../assets/index/gray-right-icon.png"/></span>
                            </p>
                        </div>

                        <div class="basic-list">
                            <p class="clearfix">司机姓名<input type="text" maxlength="12" v-model="stall.driverName"
                                                           :disabled="item.carDriverMan != ''"></p>
                            <p class="clearfix">司机电话<input type="number" v-model="stall.driverPhone"
                                                           :disabled="item.carDriverPhone != ''"></p>
                        </div>

                        <div class="basic-list">
                            <p class="clearfix">车牌号<input type="text" maxlength="8" v-model="stall.plateNum"
                                                          :disabled="item.plateNumber != ''"></p>
                            <p class="clearfix">发货地点<input type="text" maxlength="48" v-model="stall.startAddress"
                                                           :disabled="item.sourceAddr != ''"></p>
                        </div>

                        <div class="basic-list">
                            <p class="clearfix">产地<input type="text" maxlength="48" v-model="stall.origin"
                                                         :disabled="item.productAddr != ''"></p>
                            <p class="clearfix" style="position: relative">产地证明
                                <input type="file" class="upload-picture" accept="image"
                                       @change="upload1($event,'source')"
                                       style="opacity: 0">
                                <span class="upload">
                                <span v-if="stall.originProve == ''">点击上传</span>
                                <span v-if="stall.originProve != ''">已经上传</span>
                                <img class="right-icon"
                                     src="../../assets/index/gray-right-icon.png"/></span>
                            </p>
                            <p class="clearfix" style="position: relative">检验证明
                                <input type="file" class="upload-picture" accept="image"
                                       @change="upload1($event,'detect')"
                                       style="opacity: 0">
                                <span class="upload">
                                <span v-if="stall.checkProve == ''">点击上传</span>
                                <span v-if="stall.checkProve != ''">已经上传</span>
                                <img class="right-icon"
                                     src="../../assets/index/gray-right-icon.png"/></span>
                            </p>
                            <p class="clearfix" style="position: relative" v-if="item.contractBigUrl == ''">承运合同
                                <input type="file" class="upload-picture" accept="image"
                                       @change="upload1($event,'ship')"
                                       style="opacity: 0">
                                <span class="upload">
                                <span v-if="stall.carrierContract == ''">点击上传</span>
                                <span v-if="stall.carrierContract != ''">已经上传</span>
                                <img class="right-icon"
                                     src="../../assets/index/gray-right-icon.png"/></span>
                            </p>

                            <p class="clearfix" style="position: relative" v-if="item.contractBigUrl != ''">承运合同
                                <span class="upload">
                                <span>已经上传</span>
                                <img class="right-icon"
                                     src="../../assets/index/gray-right-icon.png"/></span>
                            </p>


                        </div>

                        <div class="basic-list">
                            <p class="clearfix">备注</p>
                            <div class="remark">
                            <textarea maxlength="420" name="" id="" cols="30" rows="3" placeholder="备注信息"
                                      v-model="stall.remark" :disabled="item.goodsRemark != ''"></textarea>
                            </div>
                        </div>
                    </div>

                </div>
                <!--货品信息-->
                <div v-if="selected == 'goods'">
                    <div v-for="item in goods" :key='item.goodId' class="goods-list">
                        <p @click="editGoods(item)" class="clearfix">{{item.goodName}}
                            <span><img class="right-icon" src="../../assets/index/gray-right-icon.png"/></span>
                            <span>{{item.goodNum}} {{item.numUnit | sellNnit}}</span>
                        </p>
                    </div>
                    <div class="login_pass" v-show="selected == 'goods'">
                        <div v-show="status !='status_topay'">
                            <div v-show="status !='status_selling'" @click="createGoods" class="loginbtn">添加货品</div>
                        </div>
                    </div>

                </div>


                <!--货主列表-->
                <div v-if="ownerList">
                    <owner-list ref="owner" @choiceOwner="oNchoiceOwner"></owner-list>
                </div>
                <!--入库货品信息-->
                <div v-if="goodsDetails">
                    <goods-details :edit="editItem" @addGoods="onAddGoods"></goods-details>

                </div>

            </mt-tab-container>

        </div>

    </div>
</template>

<script>
    import ownerList from '@/view/damage/ownerList'
    import goodsDetails from '@/view/goods/goodsDetails'
    import {damage} from '@/services/apis/damage.api'
    import {MessageBox, Toast} from 'mint-ui';
    import Exif from 'exif-js';

    export default {
        data () {
            return {
                confirmDisabled:false,
//                wrapperHeight: 0,//容器高度

                trainShow: '请选择',
                source: '',//产地证明
                detect: '',//检验证明
                ship: '',//乘运证明
                headerImage: '',
                index: '',

                editItem: {},
                goods: [],
                selected: 'basic',
                stall: {
                    name: '请选择',
                    good_sid: '',//货主id
                    driverName: '',//司机姓名
                    driverPhone: '',//司机电话
                    plateNum: '',//车牌号
                    startAddress: '',//发货地点
                    origin: '',//产地

                    originProve: '',//产地证明图片地址

                    checkProve: '',//检验证明图片地址

                    carrierContract: '',//承运合同图片地址

                    remark: '',//备注
                    goods: '',//货品信息
                },

                goodsDetails: false,//货品列表详情
                ownerList: false,//货主列表
                item: [],//物流信息
                trainsNum: '',//车次
                status: '',//状态
                tid:'',//车次id
            }
        },
        components: {
            'owner-list': ownerList,
            'goods-details': goodsDetails,
        },
        mounted () {
            this.tid = this.$route.params.tid || false;
            this.status = this.$route.params.status || false;

            if (this.$route.params.tid) {
                this.editStorage();
                console.log(this.tid);
                console.log(this.status);
                console.log(12345)
            }
            //物流列表传参
            if (this.$route.params.item) {
                this.item = this.$route.params.item;
                if (this.item.orderId) {
//                    this.trainShow = this.item.orderId
                    this.trainShow = '已选择';
                }
                if (this.item.carDriverMan) {
                    this.stall.driverName = this.item.carDriverMan;
                }
                if (this.item.carDriverPhone) {
                    this.stall.driverPhone = this.item.carDriverPhone;
                }
                if (this.item.plateNumber) {
                    this.stall.plateNum = this.item.plateNumber;
                }
                if (this.item.sourceAddr) {
                    this.stall.startAddress = this.item.sourceAddr;
                }
                if (this.item.productAddr) {
                    this.stall.origin = this.item.productAddr;
                }
                if (this.item.goodsRemark) {
                    this.stall.remark = this.item.goodsRemark;
                }
                if (this.item.contractBigUrl) {
                    this.stall.carrierContract = this.item.contractBigUrl;
                }

                console.log(this.item);
            } else {
                this.item = {
                    carDriverMan: '',
                    carDriverPhone: '',
                    plateNumber: '',
                    sourceAddr: '',
                    productAddr: '',
                    goodsRemark: '',
                    contractBigUrl: '',
                }
            }
        },
//        computed:{
//            wrapperHeight:function(){
//                let height = 0
//                if(this.selected == 'goods'){
//                    height = document.documentElement.clientHeight - 120;
//                }else {
//                    height = document.documentElement.clientHeight - 40;
//                }
//                return height;
//            }
//        },
        methods: {
            //获取车次详情
            editStorage(){
                let data ={
                    tid:this.tid
                }
                damage.getTrain(data)
                    .then(response => {
                        this.stall = response.data.results.logistics_info;
                        this.goods = response.data.results.goods_info;
                    })
                    .catch(function (response) {
                        console.log(response);
                    });
            },
            //货主列表返回
            ownerBack(){
                this.ownerList = false;
                this.selected = 'basic';
            },
            //货品信息返回
            goodsBack(){
                this.goodsDetails = false;
                this.selected = 'goods';
            },

            //选择货主
            oNchoiceOwner(item){
                console.log(132);
                console.log(this.$refs.owner.ownerData);
                this.stall.name = item.shipName;
                this.stall.good_sid = item.sid;
                this.ownerList = false;
                this.selected = 'basic';
            },
            //添加货品信息列表
            onAddGoods(goods){
                if (typeof(this.editItem.goodId) != "undefined" && this.editItem.goodId != '') {
                    if (goods.goodName != '') {
                        let q = this.goods;
                        q.forEach(function (value) {
                            console.log(goods);
                            console.log(goods.goodId);
                            if (value.goodId == goods.goodId) {
                                value = goods;
                            }
                        });
                    } else {
                        var s = this.goods;
                        for (var i = 0; i < s.length; i++) {
                            if (goods.goodId == s[i].goodId) {
                                this.index = i;
                            }
                        }
                        s.splice(this.index, 1);
                    }
                } else {
                    this.goods.splice(0, 0, goods);
                }
                this.goodsDetails = false;
                this.selected = 'goods';
            },
            //编辑货品
            editGoods(item){
                if(this.status =='status_selling' || this.status== 'status_topay'){
                    Toast({
                        message: '商品不可修改！',
                        position: 'middle',
                        duration: 2000
                    });
                }else {
                    this.editItem = item;
                    this.selected = false;
                    this.goodsDetails = true;
                }
            },

            //显示货主列表
            goList(){
                this.ownerList = true;
                this.selected = false;
            },
            //跳转到车次
            gologistics(){
                this.$router.push({name: 'logistics/fromc', params: {fromc: 'order'}});
            },

            //跳转到订单详情
            orderDetail(id){
                this.$router.push({
                    name: 'orderList/orderDetail',
                    params: {
                        id: id
                    }
                });
            },

            //添加货品
            createGoods(){
                this.editItem = {};
                this.selected = false;
                this.goodsDetails = true;
            },

            //跳转到首页
            goHome(){
                MessageBox.confirm('确认返回？', '').then(() => {
                    if (this.tid) {
                        this.$router.push({name: 'trainManagement'});
                    } else {
                        this.$router.push({name: 'home'});
                    }
                }, () => {

                });
            },

            //确认入库
            confirmStorage(){
                const data = this.stall;
                data.goods = this.goods;
                if (data.good_sid == '') {
                    Toast({
                        message: '货主不可为空',
                        position: 'middle',
                        duration: 2000
                    });
                } else if (data.driverPhone !='' && !(new RegExp(/^1[3|4|5|6|7|8|9][0-9]{9}$/).test(data.driverPhone))) {
                    Toast({
                        message: '司机电话输入有误',
                        position: 'middle',
                        duration: 2000
                    });
                } else if (data.origin == '') {
                    Toast({
                        message: '产地不能为空',
                        position: 'middle',
                        duration: 2000
                    });
                } else if (data.goods.length == 0) {
                    Toast({
                        message: '请维护车次货品信息',
                        position: 'middle',
                        duration: 2000
                    });
                } else {
                    this.confirmDisabled = true;
                    console.log(data);
                    delete data.name;
                    damage.submitGoods(data).then(response => {
                        if (response.data.status == 'Y') {
                            Toast({
                                message: '已完成入库操作',
                                position: 'middle',
                                duration: 1000
                            });
                            setTimeout(() => {
                                this.confirmDisabled = false;
                                this.$router.push({name: 'home'});
                            }, 1000)
                        } else {
                            this.confirmDisabled = false;
                            Toast({
                                message: response.data.results,
                                position: 'middle',
                                duration: 1000
                            });
                        }
                        console.log(response.data.results);
                    })
                }
            },
            //编辑修改
            editSubmit(){

                if (this.stall.driverPhone != '' && !(new RegExp(/^1[3|4|5|6|7|8|9][0-9]{9}$/).test(this.stall.driverPhone))) {
                    Toast({
                        message: '司机电话输入有误',
                        position: 'middle',
                        duration: 2000
                    });
                } else if (this.stall.origin == '') {
                    Toast({
                        message: '产地不能为空',
                        position: 'middle',
                        duration: 2000
                    });
                } else if (this.goods.length == 0) {
                    Toast({
                        message: '请维护车次货品信息',
                        position: 'middle',
                        duration: 2000
                    });
                } else {
                    this.confirmDisabled = true;
                    var data = {
                        tid:this.tid,
                        logistics_info:this.stall,
                        goods_info:this.goods,
                    };

                    damage.editTrain(data).then(response => {
                        if (response.data.status == 'Y') {
                            Toast({
                                message: '已完成编辑车次操作',
                                position: 'middle',
                                duration: 1000
                            });
                            setTimeout(() => {
                                this.confirmDisabled = false;
                                this.$router.push({name: 'trainManagement'});
                            }, 1000)
                        } else {
                            this.confirmDisabled = false;
                            Toast({
                                message: response.data.results,
                                position: 'middle',
                                duration: 1000
                            });
                        }
                        console.log(response.data.results);
                    })
                }

            },
            //图片上传
            upload1 (e, ty) {
                if (ty == 'source') {
                    this.source = 'source';
                } else if (ty == 'detect') {
                    this.detect = 'detect';
                } else if (ty == 'ship') {
                    this.ship = 'ship';
                }
                console.log(ty);
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
                // if (!file || !window.FileReader) return;

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
                            self.postImg();
                        } else {
                            img.onload = function () {
                                let data = self.compress(img, Orientation);
                                self.headerImage = data;
                                self.postImg();
                            }
                        }
                    }
                }
            },
            postImg(){
                if (this.source) {
                    this.stall.originProve = this.headerImage;
                } else if (this.detect) {
                    this.stall.checkProve = this.headerImage;
                } else if (this.ship) {
                    this.stall.carrierContract = this.headerImage;
                }
                console.log(this.headerImage);
                this.source = '';
                this.detect = '';
                this.ship = '';
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


            getList(){
            },


        },
    }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
    .topScroll{
        height: calc(100vh - 50px);
        top: 40px;
        bottom: 0rem;
    }
    .page-loadmore-wrappe{
        overflow: scroll;
        -webkit-overflow-scrolling : touch;
    }
    .storage {
        input:disabled, textarea:disabled {
            background-color: white !important;
        }
        .mint-navbar {
            margin-top: 0.2rem;
            .mint-tab-item {
                color: #4c4c4c;
                font-size: 0.28rem; /*没有生效*/
                .mint-tab-item-label {
                    font-size: 0.28rem;
                }
            }
            .mint-tab-item.is-selected {
                border-bottom: none;
                color: #33d57c;
                background: url(../../assets/huankuanjilu_line_btn@2x.png) no-repeat center 80%;
                background-size: 1.4rem;
            }
        }
        .basic-list {
            background: #fff;
            margin-top: 0.2rem;
            padding: 0 0.3rem;
            color: #333;
            font-size: 0.28rem;
            line-height: 0.98rem;
            > p {
                border-top: 1px #f0f0f0 solid;
                .upload-picture {
                    position: absolute;
                    width: 2rem;
                    height: 0.95rem;
                    left: 70%;
                    top: 0;
                    opacity: 0.1;
                }
                .name {
                    float: right;
                }
                .right-icon {
                    width: 0.18rem;
                    padding-top: 0.3294rem;
                    padding-left: 0.24rem;
                }
                > input {
                    font-size: 0.26rem;
                    float: right;
                    color: #4c4c4c;
                    text-align: right;
                    line-height: 0.4rem;
                    margin-top: 0.3rem
                }
                .upload {
                    color: #33d570;
                    float: right;
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
                    font-size: 0.26rem;
                    color: #4c4c4c;
                }
            }
        }
        .goods-list {
            background: #fff;
            margin-top: 0.2rem;
            padding: 0 0.3rem;
            color: #333;
            font-size: 0.28rem;
            line-height: 0.98rem;
            > p {
                > span {
                    float: right;
                    color: #4c4c4c;
                    font-size: 0.26rem;
                    text-align: right;
                    line-height: 0.98rem;
                    .right-icon {
                        width: 0.18rem;
                        padding-top: 0.3294rem;
                        padding-left: 0.24rem;
                    }
                }
            }
        }
        .login_pass {
            width: 5.5rem;
            margin: 1.5rem auto 0;
            .loginbtn {
                @include login_btn;
                background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
                margin: 0 !important;
            }
        }

    }

</style>