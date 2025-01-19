<script setup>
import {inject, onBeforeMount, reactive, ref} from 'vue'

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

const trainee = reactive({
  ...props.trainee,
  bodyType: {
    id: null,
    ...props.trainee.bodyType,
  },
  muscleBalance: {
    id: null,
    ...props.trainee.muscleBalance,
  },
});

let muscleBalanceItems = reactive([])
let bodyTypeItems = reactive([])

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

async function getBodyTypes() {
  const response = await fetch('http://localhost:8080/api/v1/bodyType/all')
  if (!response.ok) {
    showSnackbar("Failed to get available body types", "error");
    return
  }
  return await response.json();
}

async function getMuscleBalances() {
  const response = await fetch('http://localhost:8080/api/v1/muscleBalance/all')
  if (!response.ok) {
    showSnackbar("Failed to get available muscle balances", "error");
    return
  }
  return await response.json();
}

async function editTrainee() {
  const response = await fetch(`http://localhost:8080/api/v1/trainee/${props.trainee.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'PUT',
    body: JSON.stringify({
      name: trainee.name,
      phoneNumber: trainee.phoneNumber,
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

async function updateBodyType() {
  if (trainee.bodyType.id === null || trainee.bodyType.id === undefined) {
    showSnackbar("Failed to update body type", "error");
    return
  }
  const response = await fetch(`http://localhost:8080/api/v1/trainee/${props.trainee.id}/updateBodyType`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify({
      bodyTypeId: trainee.bodyType.id
    })
  })
  const updatedTrainee = await response.json()
  trainee.bodyType.id = updatedTrainee.bodyType.id
  emit('editTrainee')
  showSnackbar("Trainee Body Type updated successfully!", "success")
}

async function updateMuscleBalance() {
  if (trainee.muscleBalance.id === null || trainee.muscleBalance.id === undefined) {
    showSnackbar("Failed to update muscle balance", "error");
    return
  }
  const response = await fetch(`http://localhost:8080/api/v1/trainee/${props.trainee.id}/updateMuscleBalance`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify({
      muscleBalanceId: trainee.muscleBalance.id
    })
  })
  const updatedTrainee = await response.json()
  trainee.muscleBalance.id = updatedTrainee.muscleBalance.id
  emit('editTrainee')
  showSnackbar("Trainee Muscle Balance updated successfully!", "success")
}

onBeforeMount(async () => {
  bodyTypeItems = await getBodyTypes()
  muscleBalanceItems = await getMuscleBalances()
})


const questionnaireChecksOptions = ["Smoke?", "Have High Blood pressure?", "Have asthma?", "Have arthritis?",
  "Have heart problem", "Any accidents in your life?", "Have injury", "Have diabetes?", "Have stroke before?"]

async function updateQuestionnaire(questionnaires) {
  const response = await fetch(`http://localhost:8080/api/v1/trainee/${props.trainee.id}/updateQuestionnaireCheck`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify({
      checkNames: trainee.questionnaireChecks
    })
  })
  if (response.status !== 201) {
    showSnackbar("Failed to update questionnaire", "error")
    return
  }
  emit('editTrainee')
  showSnackbar("Updated Successfully", "success")
}

</script>

<template>
  <!-- Snackbar for notifications -->
  <v-snackbar v-model="snackbar.active" :color="snackbar.color" timeout="3000">
    {{ snackbar.message }}
  </v-snackbar>
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
      <v-dialog v-model="isActive" activator="parent" max-width="60vw">
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
            <v-card-text>
              <div class="text-h6">Personal Info:</div>
              <v-form ref="form" @submit.prevent="editTrainee">
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

                <v-text-field
                    v-model="trainee.phoneNumber"
                    label="Trainee Phone Number"
                ></v-text-field>

                <v-card-actions class="mb-2 d-flex justify-end">
                  <v-btn
                      class="text-none"
                      color="cyan-darken-2"
                      rounded="xl"
                      text="Update"
                      type="submit"
                      variant="flat"
                      :block="true"
                  ></v-btn>
                </v-card-actions>
              </v-form>

              <v-divider :thickness="5" class="my-4"></v-divider>

              <div class="text-h6">Body Type & Muscle Balance:</div>
              <v-select v-model="trainee.bodyType.id" :items="bodyTypeItems" item-title="name" item-value="id"
                        label="Body Type" @update:modelValue="updateBodyType">
                <template v-slot:item="{ props, item }">
                  <v-list-item :append-avatar="item.raw.fullPath"
                               :title="item.raw.name"
                               v-bind="props">
                  </v-list-item>
                </template>
              </v-select>

              <v-select v-model="trainee.muscleBalance.id" :items="muscleBalanceItems" item-title="name" item-value="id"
                        label="Muscle Balance" @update:modelValue="updateMuscleBalance">
                <template v-slot:item="{ props, item }">
                  <v-list-item :append-avatar="item.raw.fullPath"
                               :title="item.raw.name"
                               v-bind="props">
                  </v-list-item>
                </template>
              </v-select>


              <v-divider :thickness="5" class="my-4"></v-divider>

              <div class="text-h6">Do {{ trainee.name }} ...</div>
              <v-container fluid>
                <v-row no-gutters>
                  <v-col
                      v-for="check in questionnaireChecksOptions"
                      cols="12"
                      sm="4">
                    <v-sheet class="ma-2 pa-2">

                      <v-checkbox
                          v-model="trainee.questionnaireChecks"
                          :label="check"
                          :value="check"
                          color="info"
                          hide-details
                          @update:modelValue="updateQuestionnaire"
                      ></v-checkbox>

                    </v-sheet>
                  </v-col>
                </v-row>
              </v-container>

            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-btn>
  </div>
</template>


<style scoped>

</style>
