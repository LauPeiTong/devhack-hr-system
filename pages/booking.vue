<template lang="pug">
.dashboard-page.pa-0.ma-0.fill-width
  v-card.mx-auto.pa-2.rounded-xl(outlined)
    v-card-text
      h2.fw-600.secondary--text.pb-2 Indoor Room Health Index Classification

    v-card-text.pt-0(class="text-center")
      h2.fw-600.secondary--text.mb-2 Accuracy
      .data-container
      h2.fw-600.secondary--text.mb-2 Health Index
      //- h2.fw-600.secondary--text.mb-2 Excellent
      h2.primary--text.mb-4 {{experience}}
      h2.fw-600.secondary--text.mb-2 Recommendations
      //- h2.fw-600.secondary--text.mb-2 Excellent
      h2.primary--text.mb-10 {{ skills }}
      button.styled-button.mb-4(@click="predict()") Predict Health Index
      h2.fw-600.secondary--text.mb-2 Date
      h3.secondary--text {{currentDate}}

</template>

<script>
export default {
  name: 'BookingPage',
  data () {
    return {
      skills: '',
      experiece: '',
      achievements: ''
    }
  },
  mounted () {
  },
  methods: {
    async predict () {
      try {
        const response = await fetch('http://127.0.0.1:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' // Set the content type based on your API
          },
          body: JSON.stringify({}) // Include any request data here
        })
        if (response.ok) {
          const result = await response.json()
          this.skills = result.candidates[0].skills[0]
          this.experience = result.candidates[0].experience[0].title
          this.achievements = result.candidates[0].achievements[0]
        } else {
          this.skills = 'Failed to fetch Data'
        }
      } catch (error) {
        this.skills = error
      }
    }
  }
}
</script>

<style scoped>
.fw-600 {
  font-weight: 600 !important;
}
.styled-button {
  background-color: #FF0000; /* Green background color */
  color: white; /* White text color */
  padding: 10px 20px; /* Padding to increase button size */
  border: none; /* Remove the border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Add a pointer cursor on hover */
  font-size: 16px; /* Font size */
  transition: background-color 0.3s ease; /* Smooth transition on hover */
}

.styled-button:hover {
  background-color: #FF0000; /* Darker green on hover */
}
</style>
