<template>
  <div class="container">
    <div class="row">
      <div class="col-12 my-2"><h2>My albums</h2></div>
      <Album v-for="a in myAlbums" :key="a.id" :album="a.album" />
      <div class="col-12 my-2"><h2>Popular albums</h2></div>
      <Album v-for="a in albums" :key="a.id" :album="a" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { albumsService } from '../services/AlbumsService'
import { AppState } from '../AppState'
import Album from '../components/Album.vue'
export default {
  components: { Album },
  setup() {
    onMounted(async () => {
      try {
        await albumsService.getAlbums()
      } catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      albums: computed(() => AppState.albums),
      myAlbums: computed(() => AppState.myAlbums)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
