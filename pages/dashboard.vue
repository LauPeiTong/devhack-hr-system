<template lang="pug">
.dashboard-page.pa-0.ma-0.fill-width
  upper-title.ma-0(:title="'Dashboard'" :titleClass="'dark-background'" :icon="'bell'" :rightIconColor="$vuetify.theme.themes.light.tertiary")
  v-row.ma-0.pt-8.fill-width
    v-col(cols="12")
      recruitment-step.pt-12.align-center.px-4
    v-col(cols="12")
</template>

<script>
import { mapGetters } from 'vuex'
import RecruitmentStep from '~/components/dashboard/RecruitmentStep.vue'
import StartupTableVue from '~/components/dashboard/startupTable.vue'
import TrendListVue from '~/components/dashboard/trendList.vue'
import UpperTitleVue from '~/components/UpperTitle.vue'

export default {
  name: 'DashboardPage',
  components: {
    UpperTitleVue,
    TrendListVue,
    StartupTableVue,
    RecruitmentStep
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
