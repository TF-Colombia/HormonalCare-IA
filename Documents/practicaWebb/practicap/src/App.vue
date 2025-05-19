<template>
  <div>
    <pv-toolbar class="mb-4">
      <template #start>
        <div class="flex align-items-center">
          <img :src="logoUrl" height="40" class="mr-2" alt="Eventify Logo" />
          <span>ISO 27001:2022 certified</span>
        </div>
      </template>

      <template #center>
        <div class="flex gap-2">
          <router-link to="/home" class="p-button p-button-text mr-2">
            {{ $t('toolbar.home') }}
          </router-link>
          <router-link to="/registration/event-check-ins/new" class="p-button p-button-text">
            {{ $t('toolbar.checkIn') }}
          </router-link>
        </div>
      </template>

      <template #end>
        <pv-select-button
          v-model="selectedLanguage"
          :options="languageOptions"
          optionLabel="label"
          optionValue="value"
          @change="changeLanguage"
          aria-label="Select Language"
          class="ml-2"
        />
      </template>
    </pv-toolbar>

    <div class="p-4">
      <router-view />
    </div>
  </div>
</template>

<script>
/**
 * @summary Main application component that contains the toolbar and language selector
 * @author Your Name
 */
export default {
  name: 'App',
  data() {
    return {
      selectedLanguage: 'en',
      languageOptions: [
        { label: 'EN', value: 'en' },
        { label: 'ES', value: 'es' }
      ],
      logoUrl: 'https://logo.clearbit.com/eventify.io'
    }
  },
  methods: {
    changeLanguage() {
      this.$i18n.locale = this.selectedLanguage
    }
  },
  created() {
    // Set the initial language based on browser preference or default to English
    const browserLang = navigator.language.split('-')[0]
    this.selectedLanguage = browserLang === 'es' ? 'es' : 'en'
    this.$i18n.locale = this.selectedLanguage
  }
}
</script>

<style scoped>
.p-button {
  text-decoration: none;
}
</style>