<template>
	<v-app>
		<nav-bars />

		<v-main>
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
import NavBars from './components/NavBars';

export default {
	name: 'App',

	components: {
		NavBars
	}
}
</script>

<style>
@import '~vuetify/styles';
</style>
