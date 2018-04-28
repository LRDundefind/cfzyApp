<template>
	<div class="page-content">
		<mt-header fixed  title="车次结算">
			<router-link to="/settlementList" slot="left">
			    <mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<!--车次结算详情-->
		<div class="page-main settlement-detail">
            <div class="ub detail-top">
                <div class="ub-f3">{{trainsNum}}</div>
                <div class="number ub-f2"><span class="carNumber">车牌号</span>{{plateNum}}</div>
            </div>
			<div class="detail-top ub ub-ac">
				<div class="ub-f1 time">入库时间</div>
				<div class="number">{{putStorageTime}}</div>
			</div>
			<div class="table-list">
				<table>
					<thead>
						<tr>
							<th>品名</th>
							<th>库存量</th>
							<th>销售量</th>
							<th>损坏量</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in goodsList" :key='item.tid'>
							<td>{{item.goodName}}</td>
							<td>{{item.surplusNum}}</td>
							<td>{{item.sell_quantity}}</td>
							<td>{{item.lossNum}}</td>
						</tr>
					</tbody>
				</table>
			</div>
            <div class="login_cont">
                <div @click="settlement" class="loginbtn">申请结算</div>
            </div>
		</div>
	</div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import {damage} from '@/services/apis/damage.api'

    export default {
    data () {
        return {
            item:"",
            tid:'',//车次id
            trainsNum:'', //车次信息
            plateNum:'',//车牌号
            putStorageTime:'',//入库时间
            goodsList:'',
        }
    },
    mounted () {
        this.item = this.$route.params.item;
        this.tid = this.item.tid;
        this.trainsNum = this.item.trainsNum;
        this.plateNum = this.item.plateNum;
        this.putStorageTime = this.item.putStorageTime;
        if(this.tid){
            this.getList();
        }
    },
    methods: {
        getList(){
            let data = {
                tid: this.tid
            };
            damage.damageDetails(data)
                .then(response => {
                    this.goodsList = response.data.results;
                    console.log(this.goodsList);
                    console.log(1111);
                })
                .catch(function (response) {
                    console.log(response);
                });
        },

	    //申请结算
        settlement(){
            let data = {
                tid: this.tid
            };
            damage.submitBus(data)
                .then(response => {
                    if(response.data.status == 'Y'){
                        this.$router.push({name: 'settlementList'});
                    }else {
                        Toast({
                            message: response.data.error_msg,
                            position: 'middle',
                            duration: 1000
                        });
                    }

                    console.log(response);
                })
                .catch(function (response) {
                    console.log(response);
                });
        }
            
    }
}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
i{
	font-style: normal;
}
.settlement-detail{
	font-size: 0.26rem;
	color: #4c4c4c;
	margin-top: 0.2rem;
	.detail-top{
		line-height: 0.98rem;
		margin-bottom: 0.2rem;
		padding: 0 0.3rem;
		background: #fff;
        font-size: 0.3rem;
        color: #333333;
        .number{
            font-size: 0.26rem;
            color: #4c4c4c;
            text-align: right;
            .carNumber{
                padding-right: 0.12rem;
            }
        }
	}

	.table-list{
		padding: 0.32rem 0.3rem 0;
		background: #fff;
		table{
			width: 100%;
			border-top: 1px solid #dedede;
			thead{
				background: #f2f2f2;
				line-height: 0.6rem;
				tr{
					th{
						font-weight: normal;
						text-align: left;
					}
					th:first-child{
						padding-left: 0.22rem;
					}			
				}
			}
			tbody{
				tr{
					height: 0.96rem;
					border-bottom: 1px solid #dedede;
					td:first-child{
						padding-left: 0.2rem;
					}
				}
				tr:last-child{
					border-bottom: none;
				}
			}
		}
	}

    .login_cont {
        width: 5.5rem;
        margin: 0 auto;
    }

    .loginbtn {
        width: 80% !important;
        @include login_btn(fixed);
        background-image: url(../../assets/login/dengluzhuce_denglu_img@2x.png);
        margin: 0 !important;
    }
}



</style>
