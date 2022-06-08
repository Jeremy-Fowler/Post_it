<template>
  <form @submit.prevent="createAlbum()" class="text-dark">
    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <input
        type="text"
        class="form-control"
        id="title"
        required
        v-model="editable.title"
      />
    </div>
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
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { albumsService } from '../services/AlbumsService'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createAlbum() {
        try {
          await albumsService.create(editable.value)
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