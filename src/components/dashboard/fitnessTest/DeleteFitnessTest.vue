<script setup>
import {ref} from 'vue'


const props = defineProps(
    {
      fitnessTest: {
        type: Object,
        required: true
      }
    })
const emit = defineEmits(['deleteFitnessTest'])

const isActive = ref(false)

// Snackbar state
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
    timeout: 3000, // Ensure there's a valid timeout value
  };
}


async function deleteFitnessTest() {
  const response = await fetch(`http://localhost:8080/api/v1/fitnessTest/${props.fitnessTest.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'DELETE'
  })
  isActive.value = false
  if (response.status !== 204) {
    showSnackbar(`Error happened while deleteing ${props.fitnessTest.exercise}`, 'error')
    return
  }
  emit('deleteFitnessTest')
}


</script>

<template>
  <div class="text-center text-white">
    <v-btn
        class="text-white"
        color="red-darken-1"
        size="small"
        icon=""
    >

      <v-icon>
        mdi-trash-can
      </v-icon>
      <v-dialog v-model="isActive" activator="parent" max-width="500">
        <template v-slot:default="{ isActive }">
          <v-card rounded="lg">
            <v-card-title class="d-flex justify-space-between align-center">
              <div class="text-h5 text-medium-emphasis ps-2 text-wrap">
                Are you sure you want to delete {{ props.fitnessTest.exercise }}?
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
                  @click="deleteFitnessTest"
                  variant="flat"
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
