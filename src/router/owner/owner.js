import owner from '@/view/owner/index'
import ownerDetail from '@/view/owner/ownerDetail'
import ownerUpdate from '@/view/owner/ownerUpdate'
import record from '@/view/owner/record'
import recordSend from '@/view/owner/recordSend'
import recordRemit from '@/view/owner/recordRemit'
import recordSendDetail from '@/view/owner/recordSendDetail'

export default [{
	path: 'owner',
	name: 'owner',
	components: {
		mainView: owner
	}
},{
	path:'owner/ownerDetail',
	name:'owner/ownerDetail',
	components: {
		mainView: ownerDetail
	}
},{
	path:'owner/ownerUpdate',
	name:'owner/ownerUpdate',
	components: {
		mainView: ownerUpdate
	}
},{
	path:'owner/record',
	name:'owner/record',
	components: {
		mainView: record
	},
	redirect: 'owner/record/send',
	children:[{
		path:'send',
		name:'send',
		components: {
			recordRouteView: recordSend
		},
	},{
		path:'remit',
		name:'remit',
		components: {
			recordRouteView: recordRemit
		},
	}]

},{
	path:'owner/record/send/sendDetail/:sendId',
	name:'send/sendDetail',
	components: {
		mainView: recordSendDetail
	}
}]