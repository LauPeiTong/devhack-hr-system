<template lang="pug">
.candidates-page.pa-0.ma-0.fill-width
  upper-title.ma-0(:title="'Candidates'" :titleClass="'dark-background'" :icon="'bell'" :rightIconColor="$vuetify.theme.themes.light.tertiary")
  v-row.ma-0.pt-8.fill-width
    v-col(cols="12")
      candidate-compare.pt-12.align-center.px-4.pb-8
    v-col(cols="12")
</template>

<script>
import { mapGetters } from 'vuex'
import UpperTitleVue from '~/components/UpperTitle.vue'
import CandidateCompare from '~/components/candidate/CandidateCompare.vue'

export default {
  name: 'CandidatesPage',
  components: {
    UpperTitleVue,
    CandidateCompare
  },
  layout: 'default',
  data () {
    return {
      // search: null
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
