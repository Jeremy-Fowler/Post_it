<template>
  <nav class="navbar navbar-expand-lg px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center">
        <img alt="logo" src="../assets/img/Camera roll.png" height="40" />
        <h1 class="mx-3 mb-0 text-white">Post_it</h1>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <button
            v-if="account.id"
            class="btn btn-success text-white"
            data-bs-toggle="modal"
            data-bs-target="#album-modal"
          >
            <i class="mdi mdi-plus-box-outline me-1"></i> new album
          </button>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
  <Modal id="album-modal">
    <template #modal-title-slot>
      <h3 class="text-dark">Create a new Album!</h3>
    </template>
    <template #modal-body-slot>
      <AlbumForm />
    </template>
  </Modal>
</template>

<script>
import { computed } from '@vue/reactivity';
import { albumsService } from '../services/AlbumsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
