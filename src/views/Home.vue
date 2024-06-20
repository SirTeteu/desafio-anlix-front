<template>
    <v-container>
        <search-input class="mb-5" v-model="search" @input="filterPacientes()"/>

        <transition name="slide-fade" mode="out-in">

            <v-layout class="align-loading" v-if="loading">
                <v-progress-circular
                    :size="70"
                    :width="7"
                    color="teal-lighten-1"
                    indeterminate
                ></v-progress-circular>
            </v-layout>

            <v-layout v-else-if="pacientes.length != 0">
                <v-data-table
                    :headers="headers"
                    :items="mPacientes"
                    items-per-page="10"
                    hover
                >
                    <template v-slot:item="{ item }">
                        <tr class="row-value" @click="onShowPaciente(item)">
                            <td>{{ item.id }}</td>
                            <td>{{ item.nome }}</td>
                            <td>{{ item.cpf }}</td>
                            <td>{{ item.idade }}</td>
                            <td>{{ item.peso }}kg</td>
                            <td>{{ item.altura }}m</td>
                            <td>{{ item.latest_cardiaco_indice ? item.latest_cardiaco_indice.ind_card : '-' }}</td>
                            <td>{{ item.latest_pulmonar_indice ? item.latest_pulmonar_indice.ind_pulm : '-' }}</td>
                        </tr>
                    </template>
                </v-data-table>
            </v-layout>

        </transition>
        
        <chart-modal v-model="dlg" :paciente="paciente" />
    </v-container>
</template>
  
<script>
import SearchInput from '../components/SearchInput';
import ChartModal from '../components/ChartModal';

import pacienteProvider from '../api/PacienteProvider';

export default {
    name: 'Home',

    components: {
        ChartModal,
        SearchInput
    },

    data() {
        return {
            loading: false, // variavel auxiliar para exibir o loading

            dlg: false, // variavel que representa o estado do modal/dialog
            paciente: {}, // paciente selecionado para abrir o modal
            
            search: "", // string do input de busca

            headers: [
                { title: 'ID', value: 'id', sortable: true, class: 'my-header-style' },
                { title: 'Nome', value: 'nome', class: 'my-header-style' },
                { title: 'CPF', value: 'cpf', class: 'my-header-style' },
                { title: 'Idade', value: 'idade', class: 'my-header-style' },
                { title: 'Peso', value: 'peso', class: 'my-header-style' },
                { title: 'Altura', value: 'altura', class: 'my-header-style' },
                { title: 'Índice Cardíaco', value: 'ind_card', class: 'my-header-style' },
                { title: 'Índice Pulmonar', value: 'ind_pulm', class: 'my-header-style' }
            ],

            pacientes: [], // lista de pacientes
            mPacientes: [] // copia do array para filtrar os pacientes pesquisados
        }
    },

    mounted() {
        this.fetchPacientes();
    },

    methods: {
        /* faz a requisição da lista de usuários */
        fetchPacientes() {
            this.loading = true;

            let params = {
                "latest-cardiaco-indice": 1,
                "latest-pulmonar-indice": 1
            }

            pacienteProvider.index({
                params,
                success: data => {
                    this.pacientes = data;
                    this.mPacientes = this.pacientes;
                    this.loading = false;
                },
                error: err => {
                    this.loading = false;
                    console.log(err);
                }
            });
        },

        /* filtra a lista de pacientes através do input de procura */
        filterPacientes() {
            this.mPacientes = this.pacientes.filter(paciente => {
                let nomes = paciente.nome.split(' ');
                for(let nome of nomes) {
                    if (nome.toLowerCase().includes(this.search.toLowerCase())) {
                        return true;
                    }
                }

                return false;
            });       
        },

        /* abre o modal para exibir o gráfico */
        onShowPaciente(value) {
            this.paciente = value;
            this.dlg = true;
        }
    }
};
</script>

<style>
/* alinha o loading no centro da tela */
.align-loading {
    height: 100%;
    align-items: center;
    justify-content: center;
}

/* estiliza o header do table */
th {
  font-weight:  800 !important;
  background-color: rgb(38, 166, 154, 0.1);
}

tr.row-value {
    cursor: pointer;
}

/* css transition  */
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
}
</style>