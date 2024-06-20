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
                    <transition name="slide-fade" mode="out-in">
                    
                        <v-row class="align-loading" v-if="loading">
                            <v-progress-circular
                                :size="30"
                                :width="3"
                                color="teal-lighten-1"
                                indeterminate
                            ></v-progress-circular>
                        </v-row>

                        <div v-else-if="chartsData">
                            <v-row class="remove-margin">
                                <v-col cols="12" xs="12" sm="8">
                                    <v-text-field 
                                        label="Nome" 
                                        :model-value="paciente.nome" 
                                        readonly
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="12" sm="4">
                                    <v-text-field 
                                        label="Sexo" 
                                        :model-value="paciente.sexo" 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row class="remove-margin">
                                <v-col cols="12" xs="12" sm="4">
                                    <v-text-field 
                                        label="Data de Nascimento" 
                                        :model-value="moment(paciente.data_nasc).format('DD/MM/YYYY')" 
                                        readonly
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="12" sm="4">
                                    <v-text-field 
                                        label="Idade" 
                                        :model-value="paciente.idade" 
                                        suffix="anos" 
                                        readonly
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="12" sm="4">
                                    <v-text-field 
                                        label="RG" 
                                        :model-value="paciente.rg" 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row class="remove-margin">
                                <v-col cols="12" xs="12" sm="4">
                                    <v-text-field 
                                        label="CPF" 
                                        :model-value="paciente.cpf" 
                                        readonly
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="12" sm="8">
                                    <v-text-field 
                                        label="E-mail" 
                                        :model-value="paciente.email" 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row class="remove-margin">
                                <v-col cols="12" xs="12" sm="6">
                                    <v-text-field 
                                        label="Telefone Fixo" 
                                        :model-value="paciente.telefone_fixo" 
                                        readonly
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="12" sm="6">
                                    <v-text-field 
                                        label="Celular" 
                                        :model-value="paciente.celular" 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row class="remove-margin">
                                <v-col cols="12" xs="12" sm="6">
                                    <v-text-field 
                                        label="Nome da mãe" 
                                        :model-value="paciente.mae" 
                                        readonly
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="12" sm="6">
                                    <v-text-field 
                                        label="Nome do pai" 
                                        :model-value="paciente.pai" 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row class="remove-margin">
                                <v-col cols="12" xs="12" sm="4">
                                    <v-text-field 
                                        label="CEP" 
                                        :model-value="paciente.cep" 
                                        readonly
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="12" sm="8">
                                    <v-text-field 
                                        label="Endereço" 
                                        :model-value="paciente.endereco" 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row class="remove-margin">
                                <v-col cols="12" xs="12" sm="2">
                                    <v-text-field 
                                        label="Número" 
                                        :model-value="paciente.numero" 
                                        readonly
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="12" sm="4">
                                    <v-text-field 
                                        label="Bairro" 
                                        :model-value="paciente.bairro" 
                                        readonly
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="12" sm="4">
                                    <v-text-field 
                                        label="Cidade" 
                                        :model-value="paciente.cidade" 
                                        readonly
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="12" sm="2">
                                    <v-text-field 
                                        label="EStado" 
                                        :model-value="paciente.estado" 
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row class="remove-margin">
                                <v-col cols="12" xs="6" sm="4">
                                    <v-text-field 
                                        label="Altura" 
                                        :model-value="paciente.altura"
                                        suffix="m" 
                                        readonly
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="6" sm="4">
                                    <v-text-field 
                                        label="Peso" 
                                        :model-value="paciente.peso"
                                        suffix="kg" 
                                        readonly
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" xs="6" sm="4">
                                    <v-text-field 
                                        label="Tipo sanguíneo" 
                                        :model-value="paciente.tipo_sanguineo"
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-divider class="mt-5 mb-5"/>

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

            chartContent: "", // variavel da opção selecionada
            chartContentOptions: [
                { label: "Índice Cardíaco", value: "ind_card" },
                { label: "Índice Pulmonar", value: "ind_pulm" }
            ],

            loaded: false, /* variável auxiliar para determinar quando
                            / o gráfico está carregado */
            chartsData: {}, // dados do gráfico
            options: {} // configuração do gráfico
        }
    },

    watch: {
        // watcher para acompanhar quando o modal fecha ou abre
        'modelValue': function () {
            if (this.modelValue) {
                this.chartContent = "ind_card";
                this.fetchPacienteDetails();
            }
        }
    },

    methods: {
        // fecha a modal
        closeModal() {
            this.$emit('update:modelValue', false);
        },

        // faz requisição http para pegar os indices cardiaco e pulmonar mais recentes
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

        // inicializa os dados do gráfico
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

        // cria os objetos dos gráficos para serem criados
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