<template>
  <form @submit.prevent="createPicture()" class="text-dark">
    <div class="mb-3">
      <label for="imgUrl" class="form-label">Image URL</label>
      <input
        type="text"
        class="form-control"
        id="imgUrl"
        required
        v-model="editable.imgUrl"
      />
    </div>
    <button class="btn btn-success">Submit</button>
  </form>
</template>


<script>
import { ref } from '@vue/reactivity'
import { picturesService } from '../services/PicturesService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { useRoute } from 'vue-router'
import { Modal } from 'bootstrap'
export default {
  setup() {
    const route = useRoute()
    const editable = ref({ albumId: route.params.id })
    return {
      editable,
      async createPicture() {
        try {
          await picturesService.create(editable.value)
          Modal.getOrCreateInstance('#picture-modal').hide()
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>