<template>
    <v-dialog v-model="dialog" max-width="600px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" outlined color="grey lighten5" v-on="on">Click me</v-btn>
        </template>
        <v-card>
            <v-card-title class="text-center pa-4">
                <h2>Add a New Project</h2>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" class="px-3">
                    <v-text-field
                        label="Title"
                        v-model="title"
                        prepend-icon="mdi-folder"
                        :rules="inputRules"
                    ></v-text-field>
                    <v-textarea
                        label="Information"
                        v-model="content"
                        prepend-icon="mdi-lead-pencil"
                    ></v-textarea>
                    <v-menu
                        :close-on-content-click="true"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                max-width="290px"
                                v-model="dateFormatted"
                                label="Date"
                                hint="MM/DD/YYYY format"
                                persistent-hint
                                prepend-icon="mdi-calendar-range"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="date"></v-date-picker>
                    </v-menu>
                    <v-row class="text-right">
                        <v-col>
                            
                        </v-col>
                        <v-col>
                            <v-btn
                                :loading="loading3"
                                :disabled="loading3"
                                color="indigo"
                                class="ma-2 white--text"
                                v-on:click="sendForm"
                            >
                                Upload
                                <v-icon right dark>mdi-cloud-upload</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import db from "@/fb";

export default {
    data() {
        return {
            max: 30,
            min: 3,
            title: "",
            content: "",
            date: null,
            inputRules: [
                v => (v || '').length <= this.max ||
              `A maximum of ${this.max} characters is allowed`,
              v => (v || '').length >= this.min ||
              `A minimum of ${this.min} characters is allowed`
            ],
            loading3: false,
            dialog: false
        };
    },
    methods: {
        sendForm() {
            if (this.$refs.form.validate()) {
                this.loading3 = true;
                const project = {
                    title: this.title,
                    content: this.content,
                    due: this.date,
                    person: "Vladimir Vostrikov",
                    status: "complete"
                };
                db.collection("projects")
                    .add(project)
                    .then(() => {
                        this.loading3 = false;
                        this.dialog = false;
                        this.$emit('projectAdded');
                        this.title = null;
                        this.content = '';
                        this.due = null;
                        this.person = null;
                        this.status = null;
                    });
            }
        }
    },
    computed: {
        dateFormatted() {
            return this.date;
        }
    }
};
</script>