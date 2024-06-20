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
                                    <v-col v-for="option in chartContentOptions">
                                        <v-radio
                                            :label="option.label"
                                            :value="option.value"
                                        ></v-radio>
                                    </v-col>
                                </v-radio-group>
                            </v-row>

                            Exibindo dados das últimas 30 coletas:

                            <v-row v-for="option in chartContentOptions">
                                <Line 
                                    class="mb-5" 
                                    v-if="loaded && chartContent == option.value" 
                                    :data="chartsData[option.value]" 
                                    :options="options"
                                />
                            </v-row>
                        </div>
                    </transition>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import moment from 'moment';

import pacienteProvider from '../api/PacienteProvider';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
    name: 'chart-modal',

    props: {
        modelValue: Boolean,
        paciente: Object
    },

    components: {
        Line
    },

    data() {
        return {
            moment, 

            loading: false,

            chartContent: "",
            chartContentOptions: [
                { label: "Índice Cardíaco", value: "ind_card" },
                { label: "Índice Pulmonar", value: "ind_pulm" }
            ],

            loaded: false,
            chartsData: {},
            options: {}
        }
    },

    watch: {
        'modelValue': function () {
            if (this.modelValue) {
                this.chartContent = "ind_card";
                this.fetchPacienteDetails();
            }
        }
    },

    methods: {
        closeModal() {
            this.$emit('update:modelValue', false);
        },

        fetchPacienteDetails() {
            this.loading = true;

            pacienteProvider.detailLastIndices(this.paciente.id, {
                success: data => {
                    this.createCharts([
                        { label: 'Índice Cardíaco', name: 'ind_card', data: data[0].cardiaco_indices.reverse() },
                        { label: 'Índice Pulmonar', name: 'ind_pulm', data: data[0].pulmonar_indices.reverse() }
                    ]);
                    this.loading = false;
                },
                error: err => {
                    this.loading = false;
                    console.log(err);
                }
            });
        },

        initChartData(label, data, valueProp) {
            let chart = {
                labels: [],
                datasets: [{
                    label: label,
                    borderColor: '#26A69A',
                    backgroundColor: '#26A69A',
                    data: [],
                    borderWidth: 3
                }]
            };

            for (let xy of data) {
                chart.labels.push(moment(xy.data).format('DD/MM/YYYY'));
                chart.datasets[0].data.push(xy[valueProp]);
                
            }

            return chart;
        },

        createCharts(dataArray) {
            for (let data of dataArray) {
                this.chartsData[data.name] = this.initChartData(data.label, data.data, data.name);
            }
            
            this.options =  {
                responsive: true,
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            const title = data.labels[tooltipItem.index];
                            const dataset = data.datasets[tooltipItem.datasetIndex];
                            const value = dataset.data[tooltipItem.index] * 1; 

                            return `${title}: ${value}`; 
                        }
                    }
                }
            }

            this.loaded = true;
        }
    }
}
</script>

<style>
.v-row.remove-margin {
    margin-bottom: -40px;
}
</style>