<template lang="pug">
v-row.py-4.pl-4.upper-title(dense :class="titleClass")
    v-col(:cols="10")
      h3.font-weight-medium(:class="textColor") {{ title }}
    v-col.text-right.pr-4(:cols="2")
      f-icon.notification.pt-10.pr-8(
        :icon-name="icon"
        :icon-fill="rightIconColor ?? iconColor"
        :border="border"
        @click="emitClick()"
      )

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FIcon from './fincare-components/FIcon.vue'

export default {
  name: 'UpperTitle',
  components: {
    FIcon
  },
  props: {
    title: {
      type: String,
      default: null
    },
    titleClass: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    back: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    rightIconColor: {
      type: String,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
    }),
    textColor () {
      if (this.titleClass === 'dark-background') {
        return 'white--text'
      } else {
        return 'secondary--text'
      }
    },
    iconColor () {
      if (this.titleClass === 'dark-background') {
        return 'white'
      } else {
        return 'primary'
      }
    }
  },
  methods: {
    ...mapActions({
    }),
    emitBack () {
      this.$emit('goBack')
    },
    emitClick () {
      this.$emit('clicked')
    }
  }
}
</script>

<style lang="scss" scoped>
.upper-title {
  position: fixed !important;
  top: 0;
  width: 100%;
  border-radius: 0px 0px 12px 12px;
  z-index: 100;
}

.dark-background {
  background-color: #4C5175;
}

.notification {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
