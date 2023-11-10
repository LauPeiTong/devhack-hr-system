export const state = () => ({
})

export const getters = {
  getScrollClass (state) {
    return {
      height: `${window.innerHeight - 150}px`
    }
  },
  getScrollTopClass (state) {
    return {
      height: `${window.innerHeight - 92}px`
    }
  },
  getScrollYClass (state) {
    return {
      height: `${window.innerHeight - 2}px`
    }
  },
  getMessageClass (state) {
    return {
      height: `${window.innerHeight - 92}px`,
      'min-width': `${window.innerWidth - 2}px`
    }
  },
  getScrollXClass (state) {
    return {
      width: `${window.innerWidth - 2}px`
    }
  },
  getWidthClass (state) {
    return {
      'min-width': `${window.innerWidth - 42}px`
    }
  }
}

export const mutations = {
}

export const actions = {
}
