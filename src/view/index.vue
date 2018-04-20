<template>

    <div :class="mainClass">
        <mt-tab-container>
            <router-view name="mainView" />
            <!-- <mt-tab-container-item id="home">
                <home></home>
                <mt-cell v-for="n in 20" :key='n' title="tab-container 1"><h3 style="font-size:0.5rem;margin-top:1rem;">我</h3></mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="earning">
                <mt-cell v-for="n in 5" :key='n' title="tab-container 2"></mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="pay">
                <mt-cell v-for="n in 7" :key='n' title="tab-container 3"></mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="owner">
                <mt-cell v-for="n in 7" :key='n' title="tab-container 4"></mt-cell>
            </mt-tab-container-item>
            <mt-tab-container-item id="client">
                <mt-cell v-for="n in 7" :key='n' title="tab-container 5"></mt-cell>
            </mt-tab-container-item> -->
        </mt-tab-container>
        <mt-tabbar fixed v-model="selected" v-if="showFooter">
            <mt-tab-item id="home">
                <img v-if="selected == 'home'" slot="icon" src="../assets/shouye_shouye_icon@2x.png">
                <img v-else slot="icon" src="../assets/kehu_shouye_icon@2x.png">
                首页
            </mt-tab-item>
            <mt-tab-item id="order">
                <img v-if="selected == 'order'" slot="icon" src="../assets/order_green.png">
                <img v-else slot="icon" src="../assets/order.png">
                下单
            </mt-tab-item>
            <mt-tab-item id="orders">
                <img v-if="selected == 'orders'" slot="icon" src="../assets/shouru_shouru_green_icon@2x.png">
                <img v-else slot="icon" src="../assets/kehu_shouru_icon@2x.png">
                订单
            </mt-tab-item>
            <mt-tab-item id="logistics">
                <img v-if="selected == 'logistics'" slot="icon" src="../assets/wuliuicon_green.png">
                <img v-else slot="icon" src="../assets/wuliuicon.png">
                物流
            </mt-tab-item>
            <mt-tab-item id="client">
                <img v-if="selected == 'client'" slot="icon" src="../assets/kehu_kehu_icon@2x.png">
                <img v-else slot="icon" src="../assets/shouru_kehu_icon@2x.png">
                客户
            </mt-tab-item>
            
        </mt-tabbar>
    </div>

</template>

<script>
import { Toast } from 'mint-ui'
// import "@/styles/index.scss"
export default {
    name: 'application',
    data () {
        return {
            mainClass: 'page_wrap',
            // showHeader: false,
            showFooter: true,
            selected:this.$route.name
        }
    },
    created(){
    },
    mounted () {
        //console.log(this.selected)
        //console.log(document.body.clientWidth)
        this.fetchDate()
    },
    methods: {
        //显示隐藏左侧菜单
			fetchDate() {
                this.mainClass = 'page_wrap';
                this.showFooter = true;
                if (this.$route.meta.showFooter == false) {

                    this.mainClass = 'nopage_wrap';
                    this.showFooter = false;
                }
                if (this.$route.meta.showHeader == false){
                    this.mainClass = 'noHeader_wrap'
                }
				// this.showFooter =
				// 	this.$route.meta.showFooter !== undefined ?
				// 	this.$route.meta.showFooter :
				// 	true;
			},
        getList(){
            // this.$http.post('http://www.runoob.com/try/ajax/getcustomer.php?q=APPLE')
            // .then(function (response) {
            //   console.log(response);
            // })
            // .catch(function (error) {
            //   console.log(error);
            // });
        }
    },
    watch:{
        selected:{
            handler(val,oldval){
                //console.log(oldval+'->'+val)
                if(val=='order'){
                    this.$router.push({name:'order',params:{tid:0,trainsNum:0,plateNum:0}})
                }
                else{
                    this.$router.push({
                        name: val
                    })
                }
                
            },
            deep:true
        },
        '$route' (to, from) {
            this.selected=this.$route.name
			this.fetchDate()
		}
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mint-tabbar{
    box-shadow: -4px -4px 5px #f0f0f0;
}
.mint-tabbar > .mint-tab-item.is-selected {
    background: none;
    color: #33d57c;
}
</style>
