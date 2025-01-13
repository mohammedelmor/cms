<script setup>
import {inject, reactive, ref} from 'vue'

const swal = inject('$swal')

const props = defineProps(
    {
      trainee: {
        type: Object,
        required: true
      }
    })
const emit = defineEmits(['editTrainee'])

const form = ref(null);
const isActive = ref(false)

const trainee = reactive({ ...props.trainee });

async function editTrainee() {
  console.log(trainee)
  const response = await fetch(`http://localhost:8080/api/v1/trainee/${props.trainee.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'PUT',
    body: JSON.stringify({
      name: trainee.name,
      age: trainee.age,
    })
  })
  const updatedTrainee = await response.json()
  isActive.value = false
  emit('editTrainee')
  swal({
    title: `Trainee ${updatedTrainee.name} Updated!`,
    text: `Updated successfully!`,
    icon: "success"
  })
}

</script>

<template>
  <div class="text-center text-white">

      <v-btn
          class="text-white"
          color="yellow-darken-2"
          icon="mdi-trash-can"
          size="small"
      >
        <v-icon>
          mdi-pencil
        </v-icon>
        <v-dialog v-model="isActive" activator="parent" max-width="500">
          <template v-slot:default="{ isActive }">
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">
                  Update Trainee: {{ trainee.name }}
                </div>

                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="isActive.value = false"
                ></v-btn>
              </v-card-title>

              <v-divider class="mb-4"></v-divider>
              <v-form ref="form" @submit.prevent="editTrainee">
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
  </div>
</template>


<style scoped>

</style>
