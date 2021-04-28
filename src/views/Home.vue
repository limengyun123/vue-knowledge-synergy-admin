<template>
	<div class='system-layout'>
		<div id='system-left'>
			<div class='system-title'>LOGO 知识协同管理端</div>
			<el-menu router default-active="$route.path" :collapse="isCollapse">
				<el-menu-item index="/main" route='/main'>
					<i class="el-icon-s-home"></i><span slot="title">主页</span>
				</el-menu-item>
				<el-submenu index="1">
					<template slot="title"><i class="el-icon-set-up"></i><span slot="title">系统管理</span></template>
					<el-menu-item index="/main/system/systemInfo">系统实时信息</el-menu-item>
					<el-menu-item index="/main/system/server">服务器管理</el-menu-item>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title"><i class="el-icon-user"></i><span slot="title">用户管理</span></template>
					<el-menu-item index="/main/user/client">客户管理</el-menu-item>
					<el-menu-item index="/main/user/admin">管理员管理</el-menu-item>
				</el-submenu>
				<el-menu-item index="/main/team">
					<i class="el-icon-coordinate"></i><span slot="title">团队管理</span>
				</el-menu-item>
				<el-menu-item index="/main/resource">
					<i class="el-icon-folder"></i><span slot="title">资源管理</span>
				</el-menu-item>				
			</el-menu>
		</div>
		<div class='system-right'>
			<div class="system-head">
				<span class="menu-fold-button">
					<span v-if="isCollapse">
						<span class='el-icon-s-unfold' @click='reverteNavState'></span>
					</span>
					<span v-else>
						<span class='el-icon-s-fold' @click='reverteNavState'></span>
					</span>
				</span>
				<span class="system-avatar">
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
			</div>
			<div class='system-body'>
				<router-view></router-view>
				<div class="system-footer">
					<p>知识协同管理平台管理端</p>
					<div class="footer-description-detail">
						<p>界面设计者：李梦云</p>
						<p>团队成员：李梦云、詹宁子、刘乾坤、朱淦骏（排名不分先后）</p>
						<p>无备案 练习使用</p>
					</div>
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
import {logoutApi} from '../api/login';

// @ is an alias to /src
export default {
	name: 'Home',
	data(){
		return {
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
			this.isCollapse = !this.isCollapse;
			let elm = document.querySelector('#system-left');
			elm.style.width=264-elm.offsetWidth+'px';
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
					logoutApi().then((result)=>{
						this.$message({
							type: 'success',
							duration: 1000,
							message: result.msg,
							onClose: ()=>{
								this.$store.commit('REMOVE_INFO');
								this.$router.push('/');
							}
						})
					}).catch((reason)=>{
						this.$message.error(reason);
					})
			}
		},
	}
}
</script>

<style lang="less">
@import "../assets/css/common.less";

.system-layout{
	display: flex;
}

#system-left{
	width: 200px;
	transition:width .8s; //收缩动画
}

.system-right{
	flex:1;
}

.system-title{
	height: 4rem;
	background-color: @main-color;
	color: white;
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
	line-height: 4rem;
}

.menu-fold-button{
	line-height: 4rem;
	font-size: 1.5rem;
	color: @support-color-ps;
}

.system-head{
	height: 4rem;
    font-size: 2rem;
}

.system-avatar{
	margin-right: 2rem;
	margin-top: 0.8rem;
	float: right;
}

.system-body{
	background-color: @support-color-bg;
	height: calc(100vh - 4rem);
	overflow: scroll;
}

.system-footer{
	text-align: center;
	color: #aaaaaa;
	border-top: #dddddd solid 0.1rem;
}

.footer-description-detail{
	font-size: 0.8rem;
}

</style>

