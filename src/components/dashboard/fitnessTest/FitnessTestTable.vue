<script setup>

import {reactive, ref} from "vue";

import AddFitnessTest from "./AddFitnessTest.vue";
import DeleteFitnessTest from "./DeleteFitnessTest.vue";
import EditFitnessTest from "./EditFitnessTest.vue";


const props = defineProps({
  trainee: {
    type: Object,
    required: true
  }
})

async function getFitnessTests() {
  let response = await fetch(`http://localhost:8080/api/v1/fitnessTest/trainee/${props.trainee.id}`)
  response = await response.json()
  serverItems.value = response.length > 0 ? response : []
  totalItems.value = response.length > 0 ? response.length : 0
  loading.value = false
}


const headers = reactive([
  {
    title: 'ID',
    align: 'start',
    sortable: false,
    key: 'id',
  },
  {title: 'Exercise', key: 'exercise', align: 'start', sortable: false,},
  {title: 'Weight', key: 'weight', align: 'start', sortable: false,},
  {title: 'Repetition', key: 'repetition', align: 'start', sortable: false,},
  {title: 'Duration', key: 'duration', align: 'start', sortable: false,},
  {title: 'Comment', key: 'comment', align: 'start', sortable: false,},
  {title: 'Actions', key: 'action', align: 'start', sortable: false,},
]);

const search = ref('');
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

async function deleteFitnessTestHandler() {
  await getFitnessTests()
  showSnackbar('Fitness test deleted successfully', 'success')
}

const snackbar = ref({
  active: false,
  message: '',
  color: 'success',
});

// Function to show snackbar
function showSnackbar(message, color = 'success') {
  snackbar.value = {
    active: true,
    message,
    color,
  };
}

</script>

<template>
  <div class="d-flex flex-row-reverse">
    <AddFitnessTest @add-fitness-test="() => getFitnessTests()" :trainee="props.trainee"/>
  </div>
  <v-data-table-server
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      @update:options="() => getFitnessTests()"
  >

    <template v-slot:[`item.action`]="{ item }">
      <div class="d-flex ga-2">
        <EditFitnessTest :trainee="props.trainee" :fitness-test="item" @edit-fitness-test="() => getFitnessTests()"/>
        <DeleteFitnessTest :fitness-test="item" @delete-fitness-test="deleteFitnessTestHandler"/>
      </div>
    </template>

  </v-data-table-server>

  <!-- Snackbar for notifications -->
  <v-snackbar v-model="snackbar.active" :color="snackbar.color" timeout="3000">
    {{ snackbar.message }}
  </v-snackbar>

</template>

<style scoped>

</style>
