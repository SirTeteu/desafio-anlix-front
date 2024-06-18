<template>
	<v-app>
			<side-menu />

			<v-main>
				<router-view></router-view>
			</v-main>
	</v-app>
</template>

<script>
import SideMenu from './components/SideMenu';

export default {
	name: 'App',

	components: {
		SideMenu
	}
}
</script>

<style>
@import '~vuetify/styles';
</style>
