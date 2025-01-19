<script setup>
import {inject, reactive, ref} from 'vue'

const swal = inject('$swal')

const props = defineProps(
    {
      bodyTable: {
        type: Object,
        required: true
      }
    })
const emit = defineEmits(['deleteBodyTable'])

const isActive = ref(false)

const bodyTable = reactive({...props.bodyTable});

async function deleteBodyTable() {
  const response = await fetch(`http://localhost:8080/api/v1/bodyType/${props.bodyTable.id}`, {
    method: "DELETE"
  })
  isActive.value = false
  if (response.status !== 204) {
    swal({
      title: "Error Happened!",
      text: `Error happened while deleting ${bodyTable.name}`,
      icon: "error"
    })
    return
  }
  emit('deleteBodyTable')
  swal({
    title: `Deleted Successfully!`,
    icon: "success"
  })
}

</script>

<template>
  <div class="text-center text-white">

    <v-btn
        class="text-white"
        color="red-darken-1"
        icon=""
        size="small"
    >

      <v-icon>
        mdi-trash-can
      </v-icon>
      <v-dialog v-model="isActive" activator="parent" max-width="500">
        <template v-slot:default="{ isActive }">
          <v-card rounded="lg">
            <v-card-title class="d-flex justify-space-between align-center">
              <div class="text-h5 text-medium-emphasis ps-2 text-wrap">
                Are you sure you want to delete {{ bodyTable.name }}?
              </div>

              <v-btn
                  icon="mdi-close"
                  variant="text"
                  @click="isActive.value = false"
              ></v-btn>
            </v-card-title>
            <v-divider class="mb-4"></v-divider>

            <v-card-actions class="my-2 d-flex justify-end">
              <v-btn
                  class="text-none"
                  rounded="xl"
                  text="Cancel"
                  @click="isActive.value = false"
              ></v-btn>

              <v-btn
                  class="text-none"
                  color="red-darken-2"
                  rounded="xl"
                  text="Delete"
                  variant="flat"
                  @click="deleteBodyTable"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-btn>
  </div>
</template>


<style scoped>

</style>
