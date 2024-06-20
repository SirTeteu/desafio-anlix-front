<template>
    <div class="bar">
        <input 
            placeholder="Pesquise o paciente" 
            class="searchbar"
            :value="modelValue"
            @input="updateValue" 
            type="text" 
            title="Search"
            >
        <v-icon class="search" icon="mdi-magnify" size="20"></v-icon>
    </div>
</template>

<script>
export default {
    name: "search-input",

    props: {
        modelValue: String
    },

    methods: {
        updateValue(event) {
            this.$emit("update:modelValue", event.target.value);
        }
    }
}
</script>

<style>
.bar {
    padding-left: 25px;
    padding-right: 25px;
    max-width:575px;
    border-radius:30px;
    border:1px solid #dcdcdc;
}

.bar:hover {
    box-shadow: 1px 1px 8px 1px #dcdcdc;
}

.bar:focus-within {
    box-shadow: 1px 1px 8px 1px #dcdcdc;
    outline:none;
}

.searchbar {
    height:45px;
    border:none;
    max-width:500px;
    font-size:16px;
    outline: none; 
}

.search {
    float: right;
    padding-top: 22px;
    opacity: 0.5;
}
</style>