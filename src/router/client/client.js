import client from '@/view/client/index'
import client_detail from '@/view/client/index_detail'
import index_change from '@/view/client/index_change'
export default [{
	path: 'client',
	name: 'client',
	components: {
		mainView: client
	}
	},{
	path: 'client_detail/:id',
	name: 'client_detail',
	components: {
		mainView: client_detail
	},
	meta: {
		showFooter: false
	}
	},{
		path: 'index_change/:id',
		name: 'index_change',
		components: {
			mainView: index_change
		},
		meta: {
			showFooter: false
		}
	}
]
