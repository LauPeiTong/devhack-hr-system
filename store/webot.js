export const state = () => ({
  conversation: [],
  quota: 10,
  suggestedItem: [
    {
      id: 1,
      foods: [
        { id: 1, name: 'Eggs', price: '9.8', file_path: 'https://images.deliveryhero.io/image/nv/Malaysia/FamilyMart-Group-Shops/105838-1.jpg?width=%s' },
        { id: 2, name: 'Hard Cheese', price: '8.7', file_path: 'https://images.deliveryhero.io/image/fd-MY/NV/products/cb0ffaa340c66474ff9e878a04363a1d6c6fc670.jpg?width=%s' }
      ]
    },
    {
      id: 2,
      foods: [
        { id: 3, name: 'Eggs', price: '9.8', file_path: 'https://images.deliveryhero.io/image/nv/Malaysia/FamilyMart-Group-Shops/105838-1.jpg?width=%s' },
        { id: 4, name: 'Jasmine Rice Sunwhite 5kg', price: '8.7', file_path: 'https://images.deliveryhero.io/image/nv/Malaysia/Puteri-Fresh-Food-Market/9556563002834.jpg?width=%s' }
      ]
    }
  ]
})

export const getters = {
  getConversation (state) {
    return state.conversation
  },
  getQuota (state) {
    return state.quota
  },
  getSuggestedItems: state => (id) => {
    console.log(id)
    const item = state.suggestedItem.find(i => i.id === id)
    console.log(item)
    return item ? item.foods : null
  }
}

export const mutations = {
  updateConversation (state, message) {
    state.conversation.push(message)
    console.log(state.conversation)
  },
  updateQuota (state) {
    state.quota = state.quota - 1
    console.log(state.quota)
  }
}

export const actions = {
  addMessage ({ commit }, message) {
    commit('updateConversation', message)
  },
  reduceQuota ({ commit }) {
    commit('updateQuota')
  }
}
