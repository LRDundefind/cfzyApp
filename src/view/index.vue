<template>

    <div :class="[showFooter ? 'page_wrap' :'nopage_wrap']">
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
                <img slot="icon" src="../assets/kehu_shouye_icon@2x.png">
                首页
            </mt-tab-item>
            <mt-tab-item id="earning">
                <img slot="icon" src="../assets/kehu_shouru_icon@2x.png">
                收入
            </mt-tab-item>
            <mt-tab-item id="pay">
                <img slot="icon" src="../assets/kehu_zhichu_icon@2x.png">
                支出
            </mt-tab-item>
            <mt-tab-item id="client">
                <img slot="icon" src="../assets/logo.png">
                客户
            </mt-tab-item>
            <mt-tab-item id="owner">
                <img slot="icon" src="../assets/kehu_huozhu_icon@2x.png">
                货主
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
				this.showFooter =
					this.$route.meta.showFooter !== undefined ?
					this.$route.meta.showFooter :
					true;
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
                this.$router.push({
                    name: val
                })
            },
            deep:true
        },
        '$route' (to, from) {
				this.fetchDate()
			}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page_wrap{
    padding: 40px 0 55px 0;
}
.nopage_wrap{
    padding: 40px 0 20px 0;
}
</style>
