<template lang="pug">
v-row.justify-center.mx-auto
  v-card.pa-4.rounded-lg
    v-card-title
      p.mb-0 Sales Record
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
    )

      template(v-slot:body.prepend)
        tr
          td.py-4
            v-text-field(v-model="description" type="text" label="More than" hide-details="auto" dense outlined)
          td.py-4
            v-text-field(v-model="date" type="text" label="date" hide-details="auto" dense outlined)
          td.py-4
            v-text-field(v-model="amount" type="number" label="More than" hide-details="auto" dense outlined)
          td.py-4
            v-text-field(v-model="buyer" type="text" label="Buyer Name" hide-details="auto" dense outlined)
          td.py-4
            v-text-field(v-model="location" type="text" label="More than" hide-details="auto" dense outlined)
          td.py-4
            v-select.select-category(:items="categoriesList" label="Select a category" v-model="categories" hide-details="auto" multiple chips dense outlined)
              template(v-slot:selection="{ item, index }")
                v-chip(v-if="index <= 1" :color="getColor(item.categories)" outlined)
                  span {{ item }}
                span(
                  v-if="index === 2"
                  class="grey--text text-caption"
                ) (+{{ categories.length - 2 }} others)
          td.py-4
            v-select.select-category(:items="statusList" label="Select a category" v-model="status" hide-details="auto" multiple chips dense outlined)
              template(v-slot:selection="{ item, index }")
                v-chip(:color="item.status_c == 'Verified'? '#3d9970' : '#FF6B6C'" outlined)
                  span {{ item }}
          td.py-4

      template(v-slot:item.date_c="{ item }")
        p.mb-0 {{ item.date_c }}

      template(v-slot:item.amount_c="{ item }")
        p.mb-0 {{ $formatCurrency(item.amount_c) }}

      template(v-slot:item.categories="{ item }")
          div(v-for="c in $strToList(item.categories)")
           v-chip.my-1(
             :color="getColor(c)"
             outlined
             pill
          )
            p.mb-0 {{ c }}

      template(v-slot:item.status_c="{ item }")
        v-chip.my-1(
          :color="item.status_c == 'Verified'? '#3d9970' : '#FF6B6C'"
          outlined
          pill
        )
          p.mb-0 {{ item.status_c }}

      template(v-slot:item.actions="{ item }")
        v-btn.small.rounded-lg(@click="showPrintDialog(item)" outlined) Invoice

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
      buyer: '',
      location: '',
      categories: '',
      status: [],
      num_shareholders: '',
      statusList: [
        'Verified',
        'Not Verified'
      ],
      categoriesList: [
        'All',
        'Bunglow',
        'Condominium',
        'Serviced Apartment',
        'Flat',
        'Soho',
        'Terraced Home',
        'Sale',
        'Rental',
        'Others'
      ],
      colors: [
        { name: 'Bunglow', color: '#003f5c' },
        { name: 'Condominium', color: '#f95d6a' },
        { name: 'Serviced Apartment', color: '#ffa600' },
        { name: 'Flat', color: '#3d9970' },
        { name: 'Soho', color: '#f95d6a' },
        { name: 'Terraced Home', color: '#665191' },
        { name: 'Sale', color: '#a05195' },
        { name: 'Rental', color: '#2f4b7c' },
        { name: 'Others', color: '#ff7c43' }
      ],
      headers: [
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
          align: 'center',
          value: 'description_c',
          filter: (f) => { return (f + '').toLowerCase().includes(this.description.toLowerCase()) }
        },
        {
          text: 'Amount',
          align: 'center',
          value: 'amount_c',
          filter: (value) => {
            if (!this.amount) { return true }
            return value > parseInt(this.amount)
          }
        },
        {
          text: 'Buyer Name',
          align: 'center',
          value: 'buyer_c',
          filter: (f) => { return (f + '').toLowerCase().includes(this.buyer.toLowerCase()) }
        },
        {
          text: 'Location',
          align: 'center',
          value: 'location_c',
          filter: (f) => { return (f + '').toLowerCase().includes(this.location.toLowerCase()) }
        },
        {
          text: 'Categories',
          sortable: false,
          value: 'categories',
          filter: (f) => {
            if (f !== '') {
              const itemsArray = JSON.parse(f.replace(/'/g, '"').replace(/"\[/g, '[').replace(/\]"/g, ']').toLowerCase())
              if (this.categories.length === 0 || this.categories.includes('All')) {
                return true
              }
              const result = this.categories.filter(value => itemsArray.includes(value.toLowerCase()))
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
        {
          text: 'Verification',
          align: 'center',
          value: 'status_c',
          filter: (value) => {
            if (this.status.length === 0) { return true }
            return this.status.includes(value)
          }
        },
        { text: 'Sales Invoice', value: 'actions' }

      ],
      startups: require('../../assets/data/expenses.json')
    }
  },
  computed: {
  },
  methods: {
    getColor (category) {
      const result = this.colors.find((c) => { return c.name === category })
      if (result) {
        return result.color
      } else {
        return this.$vuetify.theme.themes.primary
      }
    },
    onRowClick (item) {
    },
    sortNames () {
      this.names.sort()
    },
    showPrintDialog (item) {
      // const printStyles = `
      //   <style>
      //   </style>
      // `

      // // Combine the content and print styles
      // const contentToPrint = printStyles + '<h1>Receipt details</h1>' // Replace with your actual content

      // // Open a new window and set the content to be printed
      // const printWindow = window.open('', '_blank')
      // printWindow.document.write(contentToPrint)
      // printWindow.document.close()

      // // Show confirmation dialog to print or cancel
      // if (confirm('Do you want to print the content?')) {
      //   // Call the print function on the opened window if user confirms
      //   printWindow.print()
      // }
      this.$router.push('/invoice')
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

:deep(.select-category .v-chip .v-chip__content) {
  font-size: 12px !important;
}
</style>
