<script setup>

import {reactive, ref} from "vue";

import AddMuscleBalance from "./AddMuscleBalance.vue";
import DeleteMuscleBalance from "./DeleteMuscleBalance.vue";

async function getMuscleBalances({page, itemsPerPage}) {
  const offsetPage = page - 1
  loading.value = true
  let response = await fetch(`http://localhost:8080/api/v1/muscleBalance?pageNumber=${offsetPage}&pageSize=${itemsPerPage}`)
  response = await response.json()
  serverItems.value = response.content
  totalItems.value = response.page.totalElements
  loading.value = false
}


const headers = reactive([
  {
    title: 'ID',
    align: 'start',
    sortable: false,
    key: 'id',
  },
  {title: 'Image', key: 'image', align: 'start', sortable: false,},
  {title: 'Name', key: 'name', align: 'start', sortable: false,},
  {title: 'Action', key: 'action', align: 'start', sortable: false,}
]);

const search = ref('');
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);
const pageNumber = ref(1);
const pageSize = ref(10);

</script>

<template>
  <div class="d-flex flex-row-reverse">
    <AddMuscleBalance @add-muscle-balance="() => getMuscleBalances({page: pageNumber, itemsPerPage: pageSize})"/>
  </div>
  <v-data-table-server
      v-model:items-per-page="pageSize"
      v-model:page="pageNumber"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      @update:options="options => getMuscleBalances({ page: options.page, itemsPerPage: options.itemsPerPage })"
  >
    <template v-slot:[`item.image`]="{ item }">
      <div class="d-flex ga-2">
        <v-avatar :image="item.fullPath" size="100"></v-avatar>
      </div>
    </template>
    <template v-slot:[`item.action`]="{ item }">
      <div class="d-flex ga-2">
        <DeleteMuscleBalance :muscle-balance="item"
                             @delete-muscle-balance="() => getMuscleBalances({page: pageNumber, itemsPerPage:pageSize})"/>
      </div>
    </template>
  </v-data-table-server>

</template>

<style scoped>

</style>
