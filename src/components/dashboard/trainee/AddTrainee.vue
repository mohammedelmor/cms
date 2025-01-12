<script setup>
import {inject, ref} from 'vue'

const swal = inject('$swal')

const emit = defineEmits(['addTrainee'])

const form = ref(null);
const isActive = ref(false)

const trainee = ref({
  name: '',
  age: undefined
})

async function addNewTrainee() {
  const response = await fetch('http://localhost:8080/api/v1/trainee', {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(trainee.value)
  })
  const newTrainee = await response.json()
  trainee.value = {
    name: '',
    age: undefined
  }
  swal({
    title: "New Trainee Added!",
    text: `${newTrainee.name} added successfully!`,
    icon: "success"
  })
  isActive.value = false
  emit('addTrainee')
}

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
          Add New Trainee
        </div>

        <v-dialog v-model="isActive" activator="parent" max-width="500">
          <template v-slot:default="{ isActive }">
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">
                  Add New Trainee
                </div>

                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="isActive.value = false"
                ></v-btn>
              </v-card-title>

              <v-divider class="mb-4"></v-divider>
              <v-form ref="form" @submit.prevent="addNewTrainee">
                <v-card-text>


                  <v-text-field
                      v-model="trainee.name"
                      :rules="[v => !!v || 'Name is required', v => v.trim().length !== 0 || 'Name is required']"
                      label="Trainee Name"
                  ></v-text-field>

                  <v-text-field
                      v-model="trainee.age"
                      :rules="[v => !!v || 'Age is required', v => v >= 5|| 'Age less than 5?']"
                      label="Trainee Age"
                      type="number"
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
  </div>
</template>


<style scoped>

</style>
