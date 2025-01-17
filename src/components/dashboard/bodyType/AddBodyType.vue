<script setup>
import {ref} from 'vue';

const emit = defineEmits(['addBodyType']);

const form = ref(null);
const isActive = ref(false);

const bodyType = ref({
  name: '',
  image: null
});

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

async function addNewBodyType() {
  if (
      bodyType.value === null ||
      bodyType.value.name === null ||
      bodyType.value.name === undefined ||
      bodyType.value.image === null ||
      bodyType.value.image === undefined
  ) {
    showSnackbar('You must set both body type name and image', 'error');
    return;
  }

  const formData = new FormData();
  formData.append('name', bodyType.value.name);
  formData.append('image', bodyType.value.image);
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  try {
    const response = await fetch('http://localhost:8080/api/v1/bodyType', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      showSnackbar('Failed to add body type', "error");
      return
    }

    const newBodyType = await response.json();
    bodyType.value = {
      name: '',
      image: null,
    };
    isActive.value = false;
    emit('addBodyType');
    showSnackbar(`${newBodyType.name} added successfully!`, 'success');
  } catch (error) {
    showSnackbar('An error occurred while adding the body type', 'error');
    console.error(error);
  }
}
</script>

<template>
  <div class="pa-4 text-center">
    <v-btn-group color="green-darken-2" density="compact" divided>
      <v-btn append-icon="mdi-plus" class="pe-2" variant="flat">
        <div class="text-none font-weight-regular">
          Add New BodyType
        </div>

        <v-dialog v-model="isActive" activator="parent" max-width="500">
          <template v-slot:default="{ isActive }">
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">
                  Add New Body Type
                </div>

                <v-btn
                    icon="mdi-close"
                    variant="text"
                    @click="isActive.value = false"
                ></v-btn>
              </v-card-title>

              <v-divider class="mb-4"></v-divider>
              <v-form ref="form" @submit.prevent="addNewBodyType">
                <v-card-text>
                  <v-text-field
                      v-model="bodyType.name"
                      :rules="[v => !!v || 'Name is required', v => v.trim().length !== 0 || 'Name is required']"
                      label="BodyType Name"
                  ></v-text-field>

                  <v-file-upload
                      clearable
                      density="compact"
                      variant="compact"
                      v-model="bodyType.image"
                      accept="image/*"
                  ></v-file-upload>
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
/* No additional styles needed for snackbar */
</style>