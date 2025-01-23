<script setup>
import {onMounted, ref, watch} from 'vue'


const emit = defineEmits(['editFitnessTest'])

const form = ref(null);
const isActive = ref(false)

const props = defineProps({
  fitnessTest: {
    type: Object,
    required: true
  },
  trainee: {
    type: Object,
    required: true
  }
})

const fitnessTest = ref(null)


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

async function editNewFitnessTest() {
  fitnessTest.value.traineeId = props.trainee.id
  delete fitnessTest.value.trainee
  const response = await fetch(`http://localhost:8080/api/v1/fitnessTest/${props.fitnessTest.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'PUT',
    body: JSON.stringify(fitnessTest.value)
  })
  if (!response.ok) {
    showSnackbar("Failed to edit this fitness Test", "error");
    return
  }
  const newFitnessTest = await response.json()
  fitnessTest.value = newFitnessTest
  isActive.value = false
  emit('editFitnessTest')
  showSnackbar(`${newFitnessTest.exercise} updated successfully!`, 'success');
}

onMounted(() => {
  fitnessTest.value = {...props.fitnessTest}
  fitnessTest.value.traineeId = props.trainee.id
})


</script>

<template>
  <div class="text-center">
    <v-btn
        class="text-white"
        color="yellow-darken-2"
        size="small"
        icon="mdi-pencil"
    >
      <v-icon>
        mdi-pencil
      </v-icon>


        <v-dialog v-model="isActive" activator="parent" max-width="500">
          <template v-slot:default="{ isActive }">
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">
                  Update New FitnessTest
                </div>

                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="isActive.value = false"
                ></v-btn>
              </v-card-title>

              <v-divider class="mb-4"></v-divider>
              <v-form ref="form" @submit.prevent="editNewFitnessTest">
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
                      color="cyan-darken-2"
                      rounded="xl"
                      text="Update"
                      type="submit"
                      variant="flat"
                  ></v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>

    <!-- Snackbar for notifications -->
    <v-snackbar v-model="snackbar.active" :color="snackbar.color" timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>

  </div>
</template>


<style scoped>

</style>
