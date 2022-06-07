<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-4">
        <div class="row">
          <div class="col-6">
            <img :src="album.imgUrl" alt="" class="img-fluid rounded" />
          </div>
          <div class="col-6">
            <div class="bg-warning rounded p-2">
              <p class="text-white mt-1">{{ album.title }}</p>
              <p>by {{ album.creator?.name }}</p>
            </div>
            <button class="btn btn-danger mt-3 text-light">
              <i class="mdi mdi-plus-box-outline me-1"></i> add Picture
            </button>
          </div>
          <div class="col-12 mt-3 d-flex justify-content-around">
            <div class="bg-info rounded p-2 align-self-center text-white">
              {{ collaborators.length }} collaborator{{
                collaborators.length > 1 ? "s" : ""
              }}
            </div>
            <button class="btn btn-success text-white">
              <i class="mdi mdi-heart"></i> Collaborate
            </button>
          </div>
        </div>
      </div>
      <div class="col-8"></div>
    </div>
  </div>
</template>


<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { albumsService } from '../services/AlbumsService'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      if (route.params.id) {
        try {
          await albumsService.getById(route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    })
    return {
      album: computed(() => AppState.album),
      collaborators: computed(() => AppState.album.collaborators)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>