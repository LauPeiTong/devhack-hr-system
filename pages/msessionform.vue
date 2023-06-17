<template lang="pug">
.dashboard-page.pa-0.ma-0.fill-width
  upper-title.ma-0(:title="'Set Mentoring Session'" :titleClass="'dark-background'" :icon="'bell'" :rightIconColor="$vuetify.theme.themes.light.tertiary")
  v-row.pt-8.fill-width
    v-col(cols="12")
      v-card.pa-4.ma-10.rounded-lg(outlined)
            v-form
                v-container
                  v-row
                    v-col(cols="12")
                     h3.font-weight-medium.primary--text Kim JunKyu
                  v-row
                    v-col(cols="12")
                     v-text-field(v-model="title" label="Title" outlined)

                  v-row
                    v-col(cols="6")
                      v-text-field(v-model="date" label="Date" required outlined)
                    v-col(cols="6")
                      v-text-field(v-model="time" label="Time" required outlined)
                  v-row
                    v-col(cols="12")
                     v-text-field(v-model="message" label="Message" required outlined)
                  .d-flex.justify-end
                        v-btn.mr-5(color="#B8B8D1") Cancel
                        v-btn(color="primary" @click="submitForm") Send email

</template>

<script>
import { mapGetters } from 'vuex'
import StartupTableVue from '~/components/dashboard/startupTable.vue'
import TrendListVue from '~/components/dashboard/trendList.vue'
import UpperTitleVue from '~/components/UpperTitle.vue'

export default {
  name: 'DashboardPage',
  components: {
    UpperTitleVue,
    TrendListVue,
    StartupTableVue
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
