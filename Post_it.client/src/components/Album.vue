<template>
  <div class="col-md-3">
    <router-link :to="{ name: 'Album', params: { id: album.id } }">
      <div class="bg-success rounded text-light selectable">
        <img :src="album.imgUrl" alt="" class="img-fluid rounded-top" />
        <p class="text-center pt-2">{{ album.title }}</p>
        <p class="text-center pb-2">
          <i class="mdi mdi-heart"></i> {{ album.collaborators.length }}
        </p>
      </div>
    </router-link>
  </div>
</template>


<script>
export default {
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>