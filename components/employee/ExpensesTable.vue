<template lang="pug">
v-row.justify-center.mx-auto
  v-card.pa-4.rounded-lg
    v-card-title
      p.mb-0 Expenses Record
      v-spacer
    hr.mt-4
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
      :items="startups"
      :search="search"
      multi-sort
      @click:row="onRowClick"
    )

      template(v-slot:body.prepend)
        tr
          td.py-4
            v-text-field(v-model="id" type="text" label="Employee ID" hide-details="auto" dense outlined)
          td.py-4
            v-text-field(v-model="name" type="text" label="Employee Name" hide-details="auto" dense outlined)
          td.py-4
            v-text-field(v-model="description" type="text" label="More than" hide-details="auto" dense outlined)
          td.py-4
            v-text-field(v-model="date" type="text" label="More than" hide-details="auto" dense outlined)
          td.py-4
            v-text-field(v-model="amount" type="number" label="More than" hide-details="auto" dense outlined)
          td.py-4
            v-select.select-category(:items="categoriesList" label="Select a category" v-model="categories" hide-details="auto" multiple chips dense outlined)
              template(v-slot:selection="{ item, index }")
                v-chip(v-if="index <= 1" :color="getColor(item)" outlined)
                  span {{ item }}
                span(
                  v-if="index === 2"
                  class="grey--text text-caption"
                ) (+{{ categories.length - 2 }} others)
          //- td.py-4
          //-   v-text-field(v-model="num_shareholders" type="number" label="More than" hide-details="auto" dense outlined)

          td.py-4
            v-select.select-category(:items="statusList" label="Select a category" v-model="status" hide-details="auto" multiple chips dense outlined)
              template(v-slot:selection="{ item, index }")
                v-chip(:color="item == 'Verified by ML'? '#3d9970' : '#FF6B6C'" outlined)
                  span {{ item }}

      template(v-slot:item.id_c="{ item, index }")
        p.mb-0.font-weight-bold E {{ index + 1}}

      template(v-slot:item.name_c="{ item }")
        p.mb-0 {{ parseInt(item.date_c) }}

      template(v-slot:item.amount_c="{ item }")
        p.mb-0 {{ $formatCurrency(item.amount_c) }}

      //- template(v-slot:item.num_shareholders="{ item }")
      //-   p.mb-0 {{ parseInt(item.num_shareholders) }}

      template(v-slot:item.categories="{ item }")
          v-chip.my-1(
            :color="getColor(item.categories)"
            outlined
            pill
          )
            p.mb-0 {{ item.categories }}
          p(v-if="item.categories == 'Transportation'") yeayy

      template(v-slot:item.predicted_status="{ item }")
        v-chip.my-1(
          :color="item.predicted_status == 'Verification Status'? '#3d9970' : '#FF6B6C'"
          outlined
          pill
        )
          p.mb-0 {{ item.predicted_status }}

      template(v-slot:item.actions="{ item }")
        v-btn.small(@click="showPrintDialog(item)") Show PDF

</template>

<script>
export default {
  name: 'ExpensesTable',
  data () {
    return {
      search: '',
      id: '',
      name: '',
      description: '',
      date: '',
      amount: '',
      categories: [],
      status: [],
      num_shareholders: '',
      statusList: [
        'Verified',
        'Not Verified'
      ],
      categoriesList: [
        'All',
        'Transportation',
        'Parking',
        'Taxi',
        'Accommodation',
        'Medical',
        'Travelling Airfare',
        'Travelling Mileage',
        'Entertainment',
        'Others'
      ],
      colors: [
        { name: 'Transportation', color: '#003f5c' },
        { name: 'Parking', color: '#ef5675' },
        { name: 'Taxi', color: '#ffa600' },
        { name: 'Accommodation', color: '#3d9970' },
        { name: 'Medical', color: '#f95d6a' },
        { name: 'Travelling Airfare', color: '#665191' },
        { name: 'Travelling Mileage', color: '#a05195' },
        { name: 'Entertainment', color: '#f95d6a' },
        { name: 'Others', color: '#ff7c43' }
        // { name: 'Software', color: '#ffa600' },
        // { name: 'Data and Analytics', color: '#00cc66' },
        // { name: 'Health Care', color: '#3d9970' },
        // { name: 'Lending and Investments', color: '#ef5675' },
        // { name: 'Agriculture and Farming', color: '#7a5195' },
        // { name: 'Other', color: '#003f5c' },
        // { name: 'Travel and Tourism', color: '#a05195' },
        // { name: 'Internet Services', color: '#ff7c43' },
        // { name: 'Apps', color: '#665191' },
        // { name: 'Information Technology', color: '#2f4b7c' },
        // { name: 'Media and Entertainment', color: '#f95d6a' },
        // { name: 'Video', color: '#00cc66' },
        // { name: 'Community and Lifestyle', color: '#3d9970' },
        // { name: 'Science and Engineering', color: '#ef5675' },
        // { name: 'Biotechnology', color: '#7a5195' },
        // { name: 'Administrative Services', color: '#003f5c' },
        // { name: 'Food and Beverage', color: '#a05195' },
        // { name: 'Government and Military', color: '#ff7c43' },
        // { name: 'Sports', color: '#665191' },
        // { name: 'Energy', color: '#2f4b7c' },
        // { name: 'Natural Resources', color: '#f95d6a' },
        // { name: 'Education', color: '#ef5675' },
        // { name: 'Events', color: '#3d9970' },
        // { name: 'Real Estate', color: '#00cc66' },
        // { name: 'Content and Publishing', color: '#7a5195' },
        // { name: 'Manufacturing', color: '#003f5c' },
        // { name: 'Artificial Intelligence', color: '#a05195' },
        // { name: 'Professional Services', color: '#ff7c43' },
        // { name: 'Gaming', color: '#665191' },
        // { name: 'Privacy and Security', color: '#2f4b7c' },
        // { name: 'Music and Audio', color: '#f95d6a' },
        // { name: 'Navigation and Mapping', color: '#42f5aa' },
        // { name: 'Platforms', color: '#f542b6' },
        // { name: 'Messaging and Telecommunications', color: '#42f5d2' }
      ],
      headers: [
        {
          text: 'Employee',
          align: 'start',
          value: 'id_c',
          filter: (f) => { return (f + '').toLowerCase().includes(this.id.toLowerCase()) }
        },
        {
          text: 'Employee Name',
          align: 'start',
          value: 'name_c',
          filter: (f) => { return (f + '').toLowerCase().includes(this.name.toLowerCase()) }
        },
        {
          text: 'Date',
          align: 'center',
          value: 'date_c',
          filter: (value) => {
            if (!this.date) { return true }
            return value > parseInt(this.date)
          }
        },
        {
          text: 'Description',
          align: 'start',
          value: 'description_c',
          filter: (f) => { return (f + '').toLowerCase().includes(this.description.toLowerCase()) }
        },
        {
          text: 'Amount',
          align: 'end',
          value: 'amount_c',
          filter: (value) => {
            if (!this.amount) { return true }
            return value > parseInt(this.amount)
          }
        },
        {
          text: 'Categories',
          sortable: false,
          value: 'categories',
          filter: (f) => {
            if (f !== '') {
              if (this.categories.length === 0 || this.categories.includes('All')) {
                return true
              }
              const result = this.categories.filter(value => f.includes(value))
              if (result.length > 0) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          }
        },
        // {
        //   text: 'Number of Shareholders',
        //   value: 'num_shareholders',
        //   align: 'center',
        //   filter: (value) => {
        //     if (!this.num_shareholders) { return true }
        //     return value > parseInt(this.num_shareholders)
        //   }
        // },
        {
          text: 'Prediction',
          align: 'center',
          value: 'predicted_status',
          filter: (value) => {
            if (this.status.length === 0) { return true }
            return this.status.includes(value)
          }
        },
        { text: 'Actions', value: 'actions' }

      ],
      // startups: require('../../assets/data/data.json')
      startups: require('../../assets/data/expenses.json')

    }
  },
  computed: {
  },
  methods: {
    getColor (category) {
      const result = this.colors.find((c) => { return c.id === category })
      if (result) {
        return result.color
      } else {
        return this.$vuetify.theme.themes.primary
      }
    },
    onRowClick (item) {
      this.$router.push('/employee')
    },
    sortNames () {
      this.names.sort()
    },
    showPrintDialog (item) {
      // Logic to prepare the content for printing
      // You can format the content as needed, such as creating a separate printable view or modifying the existing content

      // Add CSS media query for print styles
      const printStyles = `
        <style>
          @media print {
            /* Add your print-specific styles here */
          }
        </style>
      `

      // Combine the content and print styles
      const contentToPrint = printStyles + '<h1>Printable Content</h1>' // Replace with your actual content

      // Open a new window and set the content to be printed
      const printWindow = window.open('', '_blank')
      printWindow.document.write(contentToPrint)
      printWindow.document.close()

      // Show confirmation dialog to print or cancel
      if (confirm('Do you want to print the content?')) {
        // Call the print function on the opened window if user confirms
        printWindow.print()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
