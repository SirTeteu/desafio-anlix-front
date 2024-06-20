<template>
    <div>
        <v-navigation-drawer 
            color="teal-lighten-1"
            :model-value="!$vuetify.display.mobile || drawer"
        >
            <v-list density="compact" nav>
                <v-list-item
                    v-for="page in pages"
                    :active="routeActive == page.name"
                    :prepend-icon="page.icon"
                    :title="page.name"
                    :value="home"
                ></v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            v-if="$vuetify.display.mobile"
            color="teal-lighten-1"
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    name: "nav-bars",

    data() {
        return {
            drawer: false,

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