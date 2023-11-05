<template lang="pug">
v-row.justify-center.mx-auto
    v-card.py-4.px-6.rounded-lg(outlined)
      //- .chat-messages
      //-   .message(v-for="message in messages" :key="message.id")
      //-     .user-message(v-if="message.isUser") {{ message.text }}
      //-     .bot-message(v-else) {{ message.text }}
      .d-flex.align-center.mb-2
        input(v-model="newMessage", @keyup.enter="sendMessage", placeholder="Type job description",style="width: 800px; height: 140px; font-size: 16px;")
        button(@click="sendMessage") Send
      //- .search-results(v-if="showTable")
      //-   table
      //-     thead
      //-       tr
      //-         th Name
      //-         th Job
      //-         th Similarity
      //-         th Request
      //-     tbody
      //-       tr(v-for="(result, index) in searchResults" :key="index")
      //-         td {{ result.name }}
      //-         td {{ result.job }}
      //-         td {{ result.similarity }}
      //-         td
      //-           button(@click="requestJob(index)") Request
      //-           v-card.py-4.px-6.rounded-lg(outlined)
      v-card-title.px-0.pb-0(v-if="showTable")
        p.mb-0 Candidate List
        v-spacer
      //- .d-flex.align-center
      //-   p.mb-1.mr-2.primary--text 1 June 2023 - 1 July 2023
      //-   eva-icon(name="calendar" :fill="$vuetify.theme.themes.light.primary" width="18" height="18")
      hr.mt-4(v-if="showTable")
        //- v-text-field(
        //-   v-model="search"
        //-   append-icon="mdi-magnify"
        //-   label="Search"
        //-   single-line
        //-   hide-details
        //- )

      //- Datatable
      v-data-table.mt-18(
        :headers="headers"
        :items="candidate"
        :search="search"
        multi-sort
        v-if="showTable"
      )

        //- template(v-slot:body.prepend)
        //-   tr
        //-     td.py-4
        //-       v-text-field(v-model="name" type="text" label="Employee Name" hide-details="auto" dense outlined)
        //-     td.py-4
        //-       v-text-field(v-model="total_sales" type="number" label="More than" hide-details="auto" dense outlined)
        //-     td.py-4
        //-       v-text-field(v-model="net_sales" type="number" label="More than" hide-details="auto" dense outlined)
        //-     td.py-4
        //-       v-text-field(v-model="total_commission" type="number" label="More than" hide-details="auto" dense outlined)
        //-     td.py-4
        //-       v-text-field(v-model="sales_growth" type="number" label="More than" hide-details="auto" dense outlined)
        //-     td.py-4
        //-       v-text-field(v-model="customer_reviews" type="number" label="More than" hide-details="auto" dense outlined)

        //-     td.py-4
        //-       v-select.select-category(:items="statusList" label="Select a status" v-model="performance_status" hide-details="auto" multiple chips dense outlined)
        //-         template(v-slot:selection="{ item, index }")
        //-           v-chip(:color="getColor(item)" outlined)
        //-             span {{ item }}

        template(v-slot:item.name="{ item }")
          .d-flex.align-center
            VueAvatar(:username="item.name" :size="24" :colors="avatarColor" :customStyles="{'color': 'white'}")
            span.ml-2.body-2 {{item.name}}

        template(v-slot:item.occupation="{ item }")
          //- p.mb-0 {{ $formatCurrency(item.occupation) }}
          span.ml-2.body-2 {{item.occupation}}

        //- template(v-slot:item.similarity="{ item }")
        //-   p.mb-0 {{ $formatCurrency(item.similarity) }}

        //- template(v-slot:item.total_commission="{ item }")
        //-   p.mb-0 {{ $formatCurrency(item.total_commission) }}

        //- template(v-slot:item.sales_growth="{ item }")
        //-   p.mb-0.danger--text(v-if="item.sales_growth < 0") {{ parseFloat(item.sales_growth * 100).toFixed (2) }}%
        //-   p.mb-0.green--text(v-else) +{{ parseFloat(item.sales_growth * 100).toFixed (2) }}%

        //- template(v-slot:item.customer_reviews="{ item }")
        //-   .d-flex.align-center.justify-center
        //-     p.mb-1.orange--text {{ item.customer_reviews }}/10
        //-     eva-icon(name="star" :height="16" :fill="$vuetify.theme.themes.light.orange")

        template(v-slot:item.similarity="{ item }")
          .d-flex.align-center.justify-center
            span.ml-2.body-2 {{item.similarity}}%
            //- p.mb-1.orange--text {{ item.similarity }}%
            //- eva-icon(name="star" :height="16" :fill="$vuetify.theme.themes.light.orange")

        template(v-slot:item.performance_status="{ item }")
          //- v-chip.my-1(
          //-   :color="getColor(item.performance_status)"
          //-   outlined
          //-   pill
          //- )
          //-   p.mb-0 {{ item.performance_status }}
          //- button(@click="sendRequest",:style="{ backgroundColor: buttonColor }") {{ buttonText }}
          send-button
</template>

<script>
import SendButton from './SendButton.vue'
export default {
  components: {
    SendButton
  },
  data () {
    return {
      showTable: false, // Initially, the table is hidden
      searchResults: [], // Data for search results
      search: '',
      name: '',
      occupation: '',
      similarity: '',
      customer_reviews: '',
      net_sales: '',
      total_sales: '',
      total_commission: '',
      sales_growth: '',
      performance_status: [],
      statusList: [
        'All',
        'Excellent',
        'Good',
        'Poor'
      ],
      buttonColor: 'blue', // Initial button color
      buttonText: 'Send', // Initial button text
      avatarColor: [[200, 54, 45], [192, 35, 69], [203, 38, 52], [189, 69, 67], [207, 46, 40], [193, 59, 48], [198, 34, 65], [197, 66, 66], [205, 41, 69], [180, 66, 59]],
      colors: [
        { name: 'Excellent', color: '#3d9970' },
        { name: 'Good', color: '#4C5175' },
        { name: 'Poor', color: '#BB0000' }
      ],
      headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'name',
          filter: (f) => { return (f + '').toLowerCase().includes(this.name.toLowerCase()) }
        },
        {
          text: 'Occupation',
          align: 'center',
          value: 'occupation',
          filter: (f) => { return (f + '').toLowerCase().includes(this.occupation.toLowerCase()) }
          // filter: (value) => {
          //   if (!this.total_sales) { return true }
          //   return value > parseInt(this.total_sales)
          // }
        },
        // {
        //   text: 'Total Net Sales',
        //   align: 'end',
        //   value: 'net_sales',
        //   filter: (value) => {
        //     if (!this.net_sales) { return true }
        //     return value > parseInt(this.net_sales)
        //   }
        // },
        // {
        //   text: 'Total Commission',
        //   align: 'end',
        //   value: 'total_commission',
        //   filter: (value) => {
        //     if (!this.total_commission) { return true }
        //     return value > parseInt(this.total_commission)
        //   }
        // },
        // {
        //   text: 'Sales Growth',
        //   align: 'end',
        //   value: 'sales_growth',
        //   filter: (value) => {
        //     if (!this.sales_growth) { return true }
        //     return value > parseInt(this.sales_growth)
        //   }
        // },
        {
          text: 'Similarity',
          align: 'center',
          value: 'similarity',
          filter: (value) => {
            if (!this.similarity) { return true }
            return value > parseInt(this.similarity)
          }
        },
        {
          text: 'Request',
          align: 'center',
          sortable: false,
          value: 'performance_status',
          filter: (f) => {
            if (f !== '') {
              if (this.performance_status.length === 0 || this.performance_status.includes('All')) {
                return true
              }
              const result = this.performance_status.filter(value => f.includes(value))
              if (result.length > 0) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          }
        }
      ],
      candidate: require('../../assets/data/candidate.json')
    }
  },
  methods: {
    sendMessage () {
      // Handle the message sending logic here
      // You can update this.searchResults with the search results
      // and then set this.showTable to true to display the table.
      this.showTable = true
    },
    requestJob (index) {
      // Handle the job request logic here using the selected index.
    },
    getColor (status) {
      const result = this.colors.find((c) => { return c.name === status })
      if (result) {
        return result.color
      } else {
        return this.$vuetify.theme.themes.primary
      }
    },
    onRowClick (item) {
      // console.log(this.candidate)
      this.$router.push('/employee')
    },
    sendRequest () {
      // Change button color and text
      this.buttonColor = 'green' // Change the background color
      this.buttonText = 'Sent' // Change the button text

      // Perform your search logic here
    }
  }
}
</script>

<style scoped>
.centered {
  /* display: flex; */
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  height: 100vh;
}
.chat-container {
  display: flex;
  flex-direction: column;
  /* border: 1px solid #ccc; */
  border-radius: 5px;
  width: 300px;
}

.chat-messages {
  padding: 10px;
  overflow-y: auto;
  max-height: 300px;
}

.message {
  margin-bottom: 10px;
}

.user-message {
  background-color: #3498db;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
}

.bot-message {
  background-color: #e0e0e0;
  padding: 5px;
  border-radius: 5px;
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 10px;
}

input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

button {
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
}

th {
  background-color: #3498db;
  color: #fff;
  padding: 10px;
  text-align: left;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.request-button {
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.request-button:hover {
  background-color: #2980b9;
}

.width-95 {
  width: 95% !important;
}

:deep(thead)  {
  background-color: rgba(91, 95, 151, .1);
}

:deep(.select-category .v-chip .v-chip__content) {
  font-size: 12px !important;
}

:deep(.select-category .v-chip.v-size--default) {
  height: 20px;
}

.large-search-bar {
  width: 300px; /* Adjust the width as needed */
  height: 40px; /* Adjust the height as needed */
  font-size: 16px; /* Adjust the font size as needed */
  /* Add other styles as desired */
}
</style>
