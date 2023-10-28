<template lang="pug">
v-calendar(
    v-model="selectedDate"
    :events="events"
    class="custom-calendar"
  )
</template>
<script>
export default {
  data () {
    return {
      selectedDate: new Date(),
      events: [
        {
          name: 'Interview 1',
          start: new Date('2023-10-23T09:00:00'),
          end: new Date('2023-10-23T12:00:00')
        },
        {
          name: 'Interview 2',
          start: new Date('2023-10-25T09:00:00'),
          end: new Date('2023-10-25T12:00:00'),
          color: '#00008B'
        }
        // Add more events as needed
      ]
    }
  }
}
</script>

<style scoped>
.custom-calendar {
  height: 1000px; /* Set the desired height */
}
</style>
