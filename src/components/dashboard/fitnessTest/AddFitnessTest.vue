<script setup>
import {onBeforeUpdate, onMounted, ref} from 'vue'


const emit = defineEmits(['addFitnessTest'])

const form = ref(null);
const isActive = ref(false)

const props = defineProps({
  trainee: {
    type: Object,
    required: true
  }
})

const fitnessTest = ref({
  exercise: null,
  weight: null,
  repetition: null,
  duration: null,
  comment: null
})


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
  };
}

async function addNewFitnessTest() {
  const response = await fetch('http://localhost:8080/api/v1/fitnessTest', {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(fitnessTest.value)
  })
  if (response.status !== 201) {
    showSnackbar("Failed to add this fitness Test", "error");
    return
  }
  const newFitnessTest = await response.json()
  fitnessTest.value = {
    exercise: null,
    weight: null,
    repetition: null,
    duration: null,
    comment: null,
    traineeId: props.trainee.id
  }
  isActive.value = false
  emit('addFitnessTest')
  showSnackbar(`${newFitnessTest.exercise} added successfully!`, 'success');
}

onMounted(() => {
  fitnessTest.value.traineeId = props.trainee.id
})

</script>

<template>
  <div class="pa-4 text-center">
    <v-btn-group
        color="green-darken-2"
        density="compact"
        divided
    >
      <v-btn
          append-icon="mdi-plus"
          class="pe-2"
          variant="flat"
      >
        <div class="text-none font-weight-regular">
          Add New Fitness Test
        </div>

        <v-dialog v-model="isActive" activator="parent" max-width="500">
          <template v-slot:default="{ isActive }">
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">
                  Add New FitnessTest
                </div>

                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="isActive.value = false"
                ></v-btn>
              </v-card-title>

              <v-divider class="mb-4"></v-divider>
              <v-form ref="form" @submit.prevent="addNewFitnessTest">
                <v-card-text>


                  <v-text-field
                      v-model="fitnessTest.exercise"
                      :rules="[v => !!v || 'Exercise is required', v => v.trim().length !== 0 || 'Exercise is required']"
                      label="Exercise"
                  ></v-text-field>

                  <v-text-field
                      v-model="fitnessTest.weight"
                      :rules="[v => !!v || 'Weight is required', v => v >= 1|| 'Weight less than 1?']"
                      label="Weight"
                      type="number"
                  ></v-text-field>

                  <v-text-field
                      v-model="fitnessTest.repetition"
                      :rules="[v => !!v || 'Repetition is required', v => v >= 1|| 'Repetition less than 1?']"
                      label="Repetition"
                      type="number"
                  ></v-text-field>

                  <v-text-field
                      v-model="fitnessTest.duration"
                      :rules="[v => !!v || 'Duration is required', v => v >= 1|| 'Duration less than 1?']"
                      label="Duration"
                      type="number"
                  ></v-text-field>

                  <v-text-field
                      v-model="fitnessTest.comment"
                      label="Comment"
                  ></v-text-field>

                </v-card-text>

                <v-divider class="mt-2"></v-divider>

                <v-card-actions class="my-2 d-flex justify-end">
                  <v-btn
                      class="text-none"
                      rounded="xl"
                      text="Cancel"
                      @click="isActive.value = false"
                  ></v-btn>

                  <v-btn
                      class="text-none"
                      color="primary"
                      rounded="xl"
                      text="Add"
                      type="submit"
                      variant="flat"
                  ></v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>
    </v-btn-group>

    <!-- Snackbar for notifications -->
    <v-snackbar v-model="snackbar.active" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>

  </div>
</template>


<style scoped>

</style>
