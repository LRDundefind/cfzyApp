// import orders from '@/view/orders/index'
// import ordersList from '@/view/orders/ordersList'
// import ordersDetail from '@/view/orders/ordersDetail'

const orders = resolve => require([ '@/view/order/index'],resolve)
const ordersList = resolve => require([ '@/view/order/ordersList'],resolve)
const ordersDetail = resolve => require([ '@/view/order/ordersDetail'],resolve)

export default [
	{
		path: 'orders',
		name: 'orders',
		components: {
			mainView: orders
		}
	},{
		path:'orders/ordersList/:tid/:sell_day',
		name:'orders/ordersList',
		components: {
			mainView: ordersList
		},
		meta: {
			showFooter: false
		}
	},{
		path:'ordersList/ordersDetail/:oid',
		name:'ordersList/ordersDetail',
		components: {
			mainView: ordersDetail
		},
		meta: {
			showFooter: false
		}
	}
]