<template>
    <div>
        <v-snackbar v-model="snackbar" :timeout="3000" top color="cyan darken3">
            <span>Awesome! You added a new Project! Congratulations!</span>
            <v-btn text color="white" @click="snackbar = false">Close</v-btn>
        </v-snackbar>

        <v-navigation-drawer v-model="drawer" app clipped color="indigo" dark>
            <v-row class="text-center py-4">
                <v-col>
                    <v-avatar>
                        <img src="/me.jpg" alt="It is me" />
                    </v-avatar>
                </v-col>
            </v-row>
            <v-row class="text-center px-4">
                <v-col>
                    <Popup @projectAdded="snackbar = true" />
                </v-col>
            </v-row>
            <v-list dense>
                <v-list-item v-for="item in items" :key="item.name" link router :to="item.route">
                    <v-list-item-action >
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app clipped-left color="indigo" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script>
import Popup from './Popup.vue';
export default {
    components: {
        Popup
    },
    props: {
        source: String
    },
    data: () => ({
        drawer: null,
        snackbar: false,
        items: [
            { title: "Home", icon: "mdi-home", route: "/" },
            {
                title: "Dashboard",
                icon: "mdi-view-dashboard",
                route: "/dashboard"
            },
            {
                title: "Projects",
                icon: "mdi-folder-cog-outline",
                route: "/projects"
            },
            { title: "Account", icon: "mdi-account" },
            { title: "Admin", icon: "mdi-account-star" }
        ],
        items2: [
            { picture: 28, text: "Joseph" },
            { picture: 38, text: "Apple" },
            { picture: 48, text: "Xbox Ahoy" },
            { picture: 58, text: "Nokia" },
            { picture: 78, text: "MKBHD" }
        ]
    }),
    created() {
        //this.$vuetify.theme.dark = true
    }
};
</script>