<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-4">
        <div class="row">
          <div class="col-7">
            <img :src="album.imgUrl" alt="" class="img-fluid rounded" />
          </div>
          <div class="col-5">
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
            <button
              v-if="account.id"
              @click="createCollab()"
              class="btn btn-success text-white"
            >
              <i class="mdi mdi-heart"></i> Collaborate
            </button>
          </div>
        </div>
        <div class="row mt-3">
          <div v-for="c in collaborators" :key="c.id" class="col-4">
            <img
              :src="c.account?.picture"
              alt=""
              class="img-fluid rounded"
              :title="c.account?.name"
            />
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="row">
          <div v-for="p in pictures" :key="p.id" class="col-md-4">
            <img
              :src="p.imgUrl"
              alt=""
              class="img-fluid rounded"
              :title="'Uploaded by ' + p.creator?.name"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import { albumsService } from '../services/AlbumsService'
import { collaboratorsService } from '../services/CollaboratorsService'
import { picturesService } from '../services/PicturesService'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      if (route.params.id) {
        try {
          AppState.album = {}
          AppState.collaborators = []
          AppState.pictures = []
          await albumsService.getById(route.params.id)
          await collaboratorsService.getCollaborators(route.params.id)
          await picturesService.getPictures(route.params.id)
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    })
    return {
      album: computed(() => AppState.album),
      account: computed(() => AppState.account),
      collaborators: computed(() => AppState.collaborators),
      pictures: computed(() => AppState.pictures),
      async createCollab() {
        try {
          await collaboratorsService.create(route.params.id)
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