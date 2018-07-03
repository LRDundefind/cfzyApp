import {
	Button,
	Toast, 
	Header, 
	Navbar,
	Tabbar,
	TabItem,
	TabContainer,
	TabContainerItem,
	Loadmore  
} from 'mint-ui';

export let components = {
	init(Vue) {
		Vue.component(Button.name, Button);
		Vue.component(Toast.name, Toast);
		Vue.component(Header.name, Header);
		Vue.component(Navbar.name, Navbar);
		Vue.component(Tabbar.name, Tabbar);
		Vue.component(TabItem.name, TabItem);
		Vue.component(TabContainer.name, TabContainer);
		Vue.component(TabContainerItem.name, TabContainerItem);
		Vue.component(Loadmore.name, Loadmore);
	}
}