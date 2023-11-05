<template>
  <button
    :style="{ backgroundColor: buttonColor }"
    @click="sendRequest"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    // initialColor: String,
    // initialText: String
  },
  data () {
    return {
      // buttonColor: this.initialColor,
      // buttonText: this.initialText
      buttonColor: 'blue', // Initial button color
      buttonText: 'Send' // Initial button text
    }
  },
  methods: {
    sendRequest () {
      // Change button color and text
      this.buttonColor = 'green' // Change the background color
      this.buttonText = 'Sent' // Change the button text

      // Perform your specific logic here
    }
  }
}
</script>
