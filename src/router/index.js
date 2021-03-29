import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login,
	},
	{
		path: '/main',
		name: 'Home',
		component: ()=> import('../views/Home.vue'),
		redirect: '/main',
		children:[
			{
				path: '/',
				component: ()=> import('../views/main.vue'),
			},
			{
				path: 'system',
				component: ()=> import('../views/system/index.vue'),
				redirect: '/system/systemInfo',
				children:[
					{
						path: 'systemInfo',
						component: ()=> import('../views/system/systemInfo.vue'),
					},
					{
						path: 'server',
						component: ()=> import('../views/system/server.vue'),
					}
				]
			},
			{
				path: 'user',
				component: ()=> import('../views/user/index.vue'),
				redirect: '/user/client',
				children:[
					{
						path: 'client',
						component: ()=> import('../views/user/client.vue'),
					},
					{
						path: 'admin',
						component: ()=> import('../views/user/admin.vue'),
					}
				]
			},
			{
				path: 'team',
				component: ()=> import('../views/team/team.vue'),
			},
			{
				path: 'resource',
				component: ()=> import('../views/resource/resource.vue'),
			},
			

		]
	},
	{ path: '/user/addAdmin', name: 'addAdmin', component: () => import('../views/user/addAdmin.vue') }, 
	{ path: '*', name: 'error', component: () => import('../components/error.vue') }, 
]

	const router = new VueRouter({
		mode: 'history',
		base: process.env.BASE_URL,
		routes
	})

export default router
