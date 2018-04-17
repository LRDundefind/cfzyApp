//下单
import order from '@/view/order/order'
//车次列表
import trainList from '@/view/order/trainList'
//货品信息
import goodsInformation from '@/view/order/goodsInformation'
//签名
import autograph from '@/view/order/autograph'
//赊账规则
import creditRules from '@/view/order/creditRules'

export default [
	{
		path:'order/:tid/:trainsNum/:plateNum',
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
		path:'autograph',
		name:'autograph',
		components: {
			mainView: autograph
		},
		meta: {
			showFooter: false
		}
	},{
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