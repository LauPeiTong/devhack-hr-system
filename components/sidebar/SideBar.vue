<template lang="pug">
sidebar-menu-akahon(
  :menuItems="menus"
  :isUsedVueRouter="true"
  :menuTitle="'Seedify'"
  :menuLogo="require(`../../assets/seedify.png`)"
  :bgColor="'white'"
  :secondaryColor="$vuetify.theme.themes.light.primary"
  :logoTitleColor="$vuetify.theme.themes.light.primary"
  :iconsColor="$vuetify.theme.themes.light.primary"
  :searchInputTextColor="$vuetify.theme.themes.light.secondary"
  :menuItemsHoverColor="$vuetify.theme.themes.light.primary"
  :menuItemsTextColor="$vuetify.theme.themes.light.secondary"
  )
</template>

<script>
import SidebarMenuAkahon from './SidebarManuAkahon.vue'

export default {
  name: 'SideBar',
  components: { SidebarMenuAkahon },
  data () {
    return {
      menus: [
        {
          link: '/dashboard',
          name: 'Dashboard',
          tooltip: 'Dashboard',
          icon: 'bx-grid-alt'
        },
        {
          link: '/',
          name: 'Employees',
          tooltip: 'Employees',
          icon: 'bx-bar-chart-square'
        },
        {
          link: '/',
          name: 'Performance',
          tooltip: 'Performance',
          icon: 'bx-wallet-alt'
        },
        {
          link: '/',
          name: 'Setting',
          tooltip: 'Setting',
          icon: 'bx-cog'
        }
      ]
    }
  },
  computed: {

  },
  methods: {
    goToPath (link) {
      this.$router.push({
        path: link
      })
    }
  }
}
</script>
