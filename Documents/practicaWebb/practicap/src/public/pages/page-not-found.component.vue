<template>
  <div class="page-not-found flex flex-column align-items-center justify-content-center p-6">
    <h1>{{ $t('pageNotFound.title') }}</h1>

    <p>{{ $t('pageNotFound.message', { route: $route.path }) }}</p>

    <pv-button
        :label="$t('pageNotFound.backToHome')"
        @click="goToHome"
        class="mt-3"
        aria-label="Navigate back to home page"
    />
  </div>
</template>

<script>
/**
 * @summary 404 Page Not Found component
 * @author Your Name
 */
export default {
  name: 'PageNotFound',
  methods: {
    /**
     * Navigate back to home page
     */
    goToHome() {
      this.$router.push('/home');
    }
  }
}
</script>