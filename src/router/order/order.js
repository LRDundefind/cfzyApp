// //下单
// import order from '@/view/order/order'
// //车次列表
// import trainList from '@/view/order/trainList'
// //货品信息
// import goodsInformation from '@/view/order/goodsInformation'
// //赊账规则
// import creditRules from '@/view/order/creditRules'


const order = resolve => require([ '@/view/order/order'],resolve)
const trainList = resolve => require([ '@/view/order/trainList'],resolve)
const goodsInformation = resolve => require([ '@/view/order/goodsInformation'],resolve)
const creditRules = resolve => require([ '@/view/order/creditRules'],resolve)




export default [
	{
		path:'order',
		name:'order',
		components: {
			mainView: order
		},
	},{
		path:'trainList',
		name:'trainList',
		components: {
			mainView: trainList
		},
		meta: {
			showFooter: false
		}
	},
//	{
//		path:'goodsInformation/:goodId/:goodName/:sellUnit/:tid/:trainsNum',
//		name:'goodsInformation',
//		components: {
//			mainView: goodsInformation
//		},
//		meta: {
//			showFooter: false
//		}
//	},
	{
		path:'creditRules',
		name:'creditRules',
		components: {
			mainView: creditRules
		},
		meta: {
			showFooter: false
		}
	}
]