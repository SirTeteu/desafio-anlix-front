<template>
    <v-dialog 
        max-width="800"
        :model-value="modelValue"
        @update:modelValue="closeModal"
    >
        <v-card
            prepend-icon="mdi-folder-account"
            :title="`${paciente.nome}`"
        >
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-radio-group
                            v-model="chartContent"
                            inline
                        >
                            <v-col>
                                <v-radio
                                    label="Índice Cardíaco"
                                    value="ind_card"
                                ></v-radio>
                            </v-col>

                            <v-col>
                                <v-radio
                                    label="Índice Pulmonar"
                                    value="ind_pulm"
                                ></v-radio>
                            </v-col>
                        </v-radio-group>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'chart-modal',

    props: {
        modelValue: Boolean,
        paciente: Object
    },

    data() {
        return {
            chartContent: ""
        }
    },

    methods: {
        closeModal() {
            this.$emit('update:modelValue', false);
        }
    }
}
</script>