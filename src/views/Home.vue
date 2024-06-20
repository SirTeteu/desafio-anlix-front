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
                >
                    <template v-slot:item="{ item }">
                        <tr>
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
    </v-container>
</template>
  
<script>
import SearchInput from '../components/SearchInput';

import pacienteProvider from '../api/PacienteProvider';

export default {
    name: 'Home',

    components: {
        SearchInput
    },

    data() {
        return {
            loading: false,

            search: "",

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

            pacientes: [],
            mPacientes: []
        }
    },

    mounted() {
        this.fetchPacientes();
    },

    methods: {
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
        }
    }
};
</script>

<style>
.my-header-style {
    color: #666fff;
}

.align-loading {
    height: 100%;
    align-items: center;
    justify-content: center;
}

th {
  font-weight:  800 !important;
  background-color: rgb(38, 166, 154, 0.1);
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