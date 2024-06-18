<template>
    <v-navigation-drawer 
        color="teal-lighten-1"
        permanent
    >
        <v-list density="compact" nav>
            <v-list-item
                v-for="page in pages"
                :active="routeActive == page.name"
                :prepend-icon="page.icon"
                :title="page.name"
                :value="page.name"
            ></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "side-menu",

    data() {
        return {
            pages: [
                { name: 'Home', icon: 'mdi-home-city' }
            ]
        }
    },

    computed: {
        routeActive() {
            return this.$router.currentRoute.value.name;
        }
    }

}
</script>