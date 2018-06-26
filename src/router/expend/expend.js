
const expend = resolve => require([ '@/view/expend/expend'],resolve)
const ordinaryExpenditure = resolve => require([ '@/view/expend/ordinaryExpenditure'],resolve)
const ownerLoan = resolve => require([ '@/view/expend/ownerLoan'],resolve)


export default [{
	path:'expend',
	name:'expend',
	components: {
		mainView: expend
	},
	redirect: 'expend/ordinaryExpenditure',
	children:[{
		path:'ordinaryExpenditure',
		name:'ordinaryExpenditure',
		components: {
			expendRouteView: ordinaryExpenditure
		},
		meta: {
			showFooter: false
		}
	},{
		path:'ownerLoan',
		name:'ownerLoan',
		components: {
			expendRouteView: ownerLoan
		},
		meta: {
			showFooter: false
		}
	}]

}]