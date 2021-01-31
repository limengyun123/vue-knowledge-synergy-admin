<template>
	<el-container>
		<el-aside :width="navWidth+'px'">
			<div>LOGO 知识协同管理端</div>
			<el-menu router default-active="$route.path" class="el-menu-vertical-demo"  :collapse="isCollapse">
				<el-menu-item index="/main" route='/main'>
					<i class="el-icon-menu"></i><span slot="title">主页</span>
				</el-menu-item>
				<el-submenu index="2">
					<template slot="title"><i class="el-icon-location"></i><span slot="title">用户管理</span></template>
					<el-menu-item index="/main/user/client"><i class="el-icon-document"></i>客户管理</el-menu-item>
					<el-menu-item index="/main/user/admin"><i class="el-icon-setting"></i>管理员管理</el-menu-item>
				</el-submenu>
				<el-menu-item index="3" disabled>
					<i class="el-icon-document"></i><span slot="title">资源管理</span>
				</el-menu-item>
				<el-menu-item index="/main/log">
					<i class="el-icon-setting"></i><span slot="title">日志信息</span>
				</el-menu-item>
			</el-menu>
		</el-aside>
		<el-container>
			<el-header>
				<span v-if="isCollapse">
					<el-button @click='reverteNavState'>展开</el-button>
				</span>
				<span v-else>
					<el-button @click='reverteNavState'>收缩</el-button>
				</span>
				
				<span>
					<span>{{getAdmin}}, 欢迎！</span>
					<el-button @click="exit">退出</el-button>
				</span>
			</el-header>
			<el-main><router-view></router-view></el-main>
			<el-footer>Footer</el-footer>
		</el-container>
	</el-container>
</template>

<script>
// @ is an alias to /src
export default {
	name: 'Home',
	data(){
		return {
			navWidth: 200,
			isCollapse: false,
		}
	},
	computed:{
		getAdmin(){
			return this.$store.state.userInfo.actualName;
		}
	},
	methods:{
		reverteNavState(){
			this.navWidth = 270-this.navWidth;
			this.isCollapse = !this.isCollapse;
		},
		exit(){
			this.$store.commit('REMOVE_INFO');
			this.$router.push('/');
		}
	}
}
</script>

<style scoped>
.router-link-active {     
  text-decoration: none;
}

a {
  text-decoration: none; 
}
</style>
