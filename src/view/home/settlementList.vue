<template>
	<div class="page-content">
		<mt-header fixed  title="车次结算">
			<router-link to="/" slot="left">
			    <mt-button icon="back" @click="goBack()"></mt-button>
			</router-link>
		</mt-header>
		<!--车次结算列表-->
		<div class="page-main">
			<ul class="settlement-list">
				<li v-for="item in damageData" :key='item.tid' @click="settlementDetail(item)">
					<div class="ub list-top">
						<div class="ub-f3">{{item.trainsNum}}</div>
						<div class="number ub-f2"><span class="carNumber">车牌号</span>{{item.plateNum}}</div>
					</div>
					<div class="list-bottom  ">
                        <div class="ub-ac ub">
                            <div class="ub-f2">入库时间&nbsp;&nbsp;{{item.putStorageTime}}</div>
                            <div class="btn">申请结算</div>
                        </div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
    import {damage} from '@/services/apis/damage.api'

    export default {
    data () {
        return {
            damageData:[],
        }
    },
    mounted () {
        this.trainList();
    },
    methods: {
        trainList(){
            let data = {
                current_page: 1,
                page_size: 10,
            };
            damage.damageList(data).then(response => {
                this.damageData = response.data.results;
                console.log(response.data.results);
            })
        },

	    //跳转到车次结算详情
        settlementDetail(item){
        	this.$router.push({
        		name: 'settlementList/detail',
        		params: {
        			id:item.tid,item:item,
        		}
        	});
        }
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
i{
	font-style: normal;
}
.settlement-list{
	font-size: 0.24rem;
	color: #666;
	li{
		background: #fff;
		margin-top: 0.2rem;
		padding: 0 0.3rem;
		.list-top{
			line-height: 0.86rem;
			border-bottom:1px solid #dedede;
            font-size: 0.3rem;
            color: #333333;
			.number{
				font-size: 0.24rem;
				color: #4c4c4c;
                text-align: right;
                .carNumber{
                    padding-right: 0.12rem;
                }
			}
		}

		.list-bottom{
			color: #666;
			line-height: 1.32rem;			
			.btn{
				font-size: 0.3rem;
				width: 1.88rem;
				line-height: 0.68rem;
				text-align: center;
				color: #fff;
	            background: -webkit-linear-gradient(left, #30b03e 0%,#33d57c 100%);
				border-radius: 1rem;
			}
		}
	}
}
</style>