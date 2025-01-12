<script setup>

import {inject, reactive, ref} from "vue";
import AddTrainee from "./AddTrainee.vue";

const swal = inject('$swal')

async function getTrainees({pageNumber, pageSize}) {
  pageNumber = pageNumber || 0
  pageSize = pageSize || 10
  loading.value = true
  let response = await fetch(`http://localhost:8080/api/v1/trainee?pageNumber=${pageNumber}&pageSize=${pageSize}`)
  response = await response.json()
  serverItems.value = response.content
  totalItems.value = response.totalElements
  loading.value = false
}

function openDeleteDialog(item) {
  console.log(item)
  deleteDialog.value = true
  deleteDialogTrainee.value = item
}

function closeDeleteDialog() {
  deleteDialog.value = false
  deleteDialogTrainee.value = null
}


async function deleteTrainee() {
  const response = await fetch(`http://localhost:8080/api/v1/trainee/${deleteDialogTrainee.value.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      })
  if (!response.ok) {
    swal({
      title: "Error Happened!",
      text: `Error happened while deleteing ${deleteDialogTrainee.value.name}`,
      icon: "error"
    })
    return
  }
  deleteDialog.value = false
  swal({
    title: "Deleted!",
    text: `${deleteDialogTrainee.value.name} deleted successfully!`,
    icon: "success"
  })
  deleteDialogTrainee.value = null
  getTrainees(0, itemsPerPage.value)
}

const deleteDialog = ref(false)
const deleteDialogTrainee = ref(null)
const itemsPerPage = ref(10);
const headers = reactive([
  {
    title: 'ID',
    align: 'start',
    sortable: false,
    key: 'id',
  },
  {title: 'Name', key: 'name', align: 'start', sortable: false,},
  {title: 'Age', key: 'age', align: 'start', sortable: false,},
  {title: 'Action', key: 'action', align: 'start', sortable: false,},
]);

const search = ref('');
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

</script>

<template>
  <div class="d-flex flex-row-reverse">
    <AddTrainee @add-trainee="() => getTrainees({pageNumber:0, pageSize:itemsPerPage.value})"/>
  </div>
  <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      item-value="name"
      @update:options="getTrainees"
  >
    <template v-slot:[`item.action`]="{ item }">
      <v-col cols="auto">
        <v-btn color="red-darken-1" icon="mdi-trash-can" size="small" @click="() => openDeleteDialog(item)">
        </v-btn>
      </v-col>
    </template>
  </v-data-table-server>

  <v-dialog
      v-model="deleteDialog"
      width="auto"
  >
    <v-card
        max-width="400"
        prepend-icon="mdi-update"
        text="Are you sure you want to delete this trainee?"
        title="Delete Trainee"
    >
      <template v-slot:actions>
        <v-btn
            class="ms-auto"
            text="cancel"
            @click="closeDeleteDialog"
        ></v-btn>
        <v-btn
            class="ms-auto"
            color="red-darken-1"
            text="Ok"
            @click="deleteTrainee"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>

</template>

<style scoped>

</style>
