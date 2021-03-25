<template>
	<el-container>
		<el-aside :width="navWidth+'px'">
			<div>LOGO 知识协同管理端</div>
			<el-menu router default-active="$route.path" class="el-menu-vertical-demo"  :collapse="isCollapse">
				<el-menu-item index="/main" route='/main'>
					<i class="el-icon-menu"></i><span slot="title">主页</span>
				</el-menu-item>
				<el-submenu index="1">
					<template slot="title"><i class="el-icon-location"></i><span slot="title">系统管理</span></template>
					<el-menu-item index="/main/system/systemInfo"><i class="el-icon-document"></i>系统实时信息</el-menu-item>
					<el-menu-item index="/main/system/server"><i class="el-icon-setting" disabled></i>服务器管理</el-menu-item>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title"><i class="el-icon-location"></i><span slot="title">用户管理</span></template>
					<el-menu-item index="/main/user/client"><i class="el-icon-document"></i>客户管理</el-menu-item>
					<el-menu-item index="/main/user/admin" disabled><i class="el-icon-setting"></i>管理员管理</el-menu-item>
				</el-submenu>
				<el-menu-item index="/main/team">
					<i class="el-icon-location"></i><span slot="title">团队管理</span>
				</el-menu-item>
				<el-menu-item index="/main/resource">
					<i class="el-icon-document"></i><span slot="title">资源管理</span>
				</el-menu-item>				
			</el-menu>
		</el-aside>
		<el-container>
			<el-header class="admin_end-head">
				<span class="fold-button">
					<span v-if="isCollapse">
						<span class='el-icon-s-unfold' @click='reverteNavState'></span>
					</span>
					<span v-else>
						<span class='el-icon-s-fold' @click='reverteNavState'></span>
					</span>
				</span>
				
				<span class="avatar">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link">
                            <el-avatar :src="require('@/assets/img/avatar_1.png')"></el-avatar>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="personal">个人档案</el-dropdown-item>
                            <el-dropdown-item command="changePassword">更改密码</el-dropdown-item>
                            <el-dropdown-item command="English">English</el-dropdown-item>
                            <el-dropdown-item :divided=true command="exit">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
				</span>
			</el-header>
			<el-main class='admin-end-body'>
				<router-view></router-view>
				<el-footer>Footer</el-footer>	
			</el-main>
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
		},
		handleCommand(command) {
			switch(command){
				case 'personal':
					break;
				case 'changePassword':
					break;
				case 'English':
					break;
				default:
					this.$store.commit('REMOVE_INFO');
					this.$router.push('/');
			}
		},
	}
}
</script>

<style scoped>
.fold-button{
	font-size: 1.5rem;
}

.avatar{
	float: right;
}

.admin_end-head{
	border-bottom: lightblue solid 0.1rem;
    box-shadow: lightblue 0 0 0.5rem 0 ;
    font-size: 2rem;
    padding: 0.6rem 1rem;
	margin-bottom: 0.5rem;
}

.admin-end-body{
	height: calc(99vh - 5rem);
	overflow: scroll;
}
</style>

