<template>
    <v-container fluid class="my-5">
        <v-row class="mb-3 px-4">
            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn @click="sortBy('title')" text small class="grey--text mr-2" v-on="on">
                        <v-icon left small>mdi-folder</v-icon>
                        <span class="caption text-lowercase">By project name</span>
                    </v-btn>
                </template>
                <span>Sort by project Name</span>
            </v-tooltip>

            <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn @click="sortBy('person')" text small class="grey--text" v-on="on">
                        <v-icon left small>mdi-account</v-icon>
                        <span class="caption text-lowercase">By person</span>
                    </v-btn>
                </template>
                <span>Sort by project Person</span>
            </v-tooltip>
        </v-row>
        <v-card class="px-3" :key="i" v-for="(project, i) in projects" flat>
            <v-row :class="project.status" class="pa-3 project">
                <v-col xs-up="1">
                    <v-icon
                        @click="deleteProject(project.id)"
                        color="warning"
                    >mdi-delete-circle-outline</v-icon>
                </v-col>
                <v-col xs="11" md="5">
                    <div class="caption grey--text">Project title</div>
                    <div>{{ project.title }}</div>
                </v-col>
                <v-col xs="12" sm="4" md="2">
                    <div class="caption grey--text">Person</div>
                    <div>{{ project.person }}</div>
                </v-col>
                <v-col xs="12" sm="4" md="2">
                    <div class="caption grey--text">Due by</div>
                    <div>{{ project.due }}</div>
                </v-col>
                <v-col xs="12" sm="4" md="2">
                    <div class="float-right">
                        <v-chip
                            :color="project_status(project.status)"
                            class="white--text caption my-2"
                            small
                        >{{ project.status }}</v-chip>
                    </div>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>
<script>
import db from "@/fb";

export default {
    data() {
        return {
            projects: []
        };
    },
    methods: {
        deleteProject(id) {
            db.collection("projects")
                .doc(id)
                .delete()
                .then(() => {
                    this.projects = this.projects.filter(obj => {
                        return obj.id !== id;
                    });
                });
        },
        project_status(status) {
            if (status == "complete") return "green";
            else if (status == "ongoing") return "yellow";
            else {
                return "red";
            }
        },
        sortBy(prop) {
            this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
        }
    },
    created() {
        db.collection("projects").onSnapshot(res => {
            const changes = res.docChanges();
            changes.forEach(change => {
                if (change.type === "added") {
                    this.projects.push({
                        ...change.doc.data(),
                        id: change.doc.id
                    });
                }
            });
        });
    }
};
</script>

<style lang="stylus" scoped>
.project {
    border-bottom: 1px solid rgb(228, 226, 226);
}

.project.complete {
    border-left: 6px solid #3cd1c2;
}

.project.ongoing {
    border-left: 6px solid orange;
}

.project.overdue {
    border-left: 6px solid tomato;
}
</style>