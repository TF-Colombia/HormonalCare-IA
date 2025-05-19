<template>
  <div class="page-not-found">
    <h1>{{ $t('pageNotFound.title') }}</h1>
    <p>{{ $t('pageNotFound.message', { route: $route.path }) }}</p>
    <pv-button @click="$router.push('/home')" class="mt-4">
      {{ $t('pageNotFound.backToHome') }}
    </pv-button>
  </div>
</template>

<script>
/**
 * @summary Component that displays when a route is not found
 * @author Your Name
 */
export default {
  name: 'PageNotFound'
}
</script>

<style scoped>
.page-not-found {
  max-width: 600px;
  margin: 4rem auto;
  text-align: center;
  padding: 1rem;
}
</style> 