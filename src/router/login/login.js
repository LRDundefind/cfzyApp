//首页
// import login from '@/view/login/login'
const login = resolve => require([ '@/view/login/login'],resolve)
export default [{
	path: 'login',
	name: 'login',
	component: login
}]