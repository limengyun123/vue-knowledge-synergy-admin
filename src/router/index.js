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
				path: 'log',
				component: ()=> import('../views/log.vue'),
			},
		]
	}
]

	const router = new VueRouter({
		mode: 'history',
		base: process.env.BASE_URL,
		routes
	})

export default router
