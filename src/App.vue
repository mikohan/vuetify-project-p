<template>
    <v-app id="inspire">
        <navbar></navbar>
        <v-content class="grey lighten-4">
            <v-container class="fill-height">
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
    props: {
        source: String
    },
    components: {
        Navbar
    },
    data: () => ({}),
    created() {
        //this.$vuetify.theme.dark = false
    }
};
</script>