<template>
  <div class="col-md-3">
    <router-link :to="{ name: 'Album', params: { id: album.id } }">
      <div class="bg-success rounded text-light selectable">
        <img :src="album.imgUrl" alt="" class="img-fluid rounded-top" />
        <p class="text-center py-2">{{ album.title }}</p>
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
img {
  height: 30vh;
  object-fit: cover;
  width: 100%;
}
</style>