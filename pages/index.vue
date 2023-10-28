<template lang="pug">

</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'default',
  data () {
    return {
      // logoPath: require('../assets/logo/FincareLogo2.png')
    }
  },
  created () {
    setTimeout(() => this.$router.push({ path: '/booking' }), 1000)
  },
  methods: {

  }
}
</script>
