<script setup>

import {reactive, ref} from "vue";

import AddTrainee from "./AddTrainee.vue";
import EditTrainee from "./EditTrainee.vue";
import DeleteTrainee from "./DeleteTrainee.vue";
import FitnessTestDialogIcon from "../fitnessTest/FitnessTestDialogIcon.vue";

async function getTrainees({page, itemsPerPage}) {
  const offsetPage = page - 1
  loading.value = true
  let response = await fetch(`http://localhost:8080/api/v1/trainee?pageNumber=${offsetPage}&pageSize=${itemsPerPage}`)
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
  {title: 'Name', key: 'name', align: 'start', sortable: false,},
  {title: 'Age', key: 'age', align: 'start', sortable: false,},
  {title: 'Phone Number', key: 'phoneNumber', align: 'start', sortable: false,},
  {title: 'Action', key: 'action', align: 'start', sortable: false,},
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
    <AddTrainee @add-trainee="() => getTrainees({page: pageNumber, itemsPerPage: pageSize})"/>
  </div>
  <v-data-table-server
      v-model:items-per-page="pageSize"
      v-model:page="pageNumber"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      @update:options="options => getTrainees({ page: options.page, itemsPerPage: options.itemsPerPage })"
  >
    <template v-slot:[`item.action`]="{ item }">
      <div class="d-flex ga-2">
        <EditTrainee :trainee="item" @edit-trainee="() => getTrainees({page: pageNumber, itemsPerPage:pageSize})"/>
        <DeleteTrainee :trainee="item" @delete-trainee="() => getTrainees({page: pageNumber, itemsPerPage:pageSize})"/>
        <FitnessTestDialogIcon :trainee="item" />
      </div>
    </template>
  </v-data-table-server>

</template>

<style scoped>

</style>
