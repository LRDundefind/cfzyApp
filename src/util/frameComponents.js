import {
	Toast, 
	Header, 
	Tabbar,
	TabItem, 
} from 'mint-ui';

export let components = {
	init(Vue) {
		Vue.use(Toast);
		Vue.use(Header);
		Vue.use(Tabbar);
		Vue.use(TabItem);
	}
}