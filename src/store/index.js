import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    valueTask: '',
    itemId: null,
    
    itemSample: {
      itemId: null,
      title: null,
      completed: false,
      active: true,
    },
    items: []
  },

  getters: {
    getTaskItems(state) {
      return state.items
    },
    getActiveItems(state) {
      return state.items.filter(item => !item.completed)
    },
    getCompletedItems(state) {
      return state.items.filter(item => item.completed)
    }
  },

  mutations: {
    SET_ITEM_VALUE(state, payload) {
      state.valueTask = payload.valueInputTask
    },
    CLEAR_ITEM_VALUE(state) {
      state.valueTask = ''
    },
    SET_ITEM_ID(state) {
      let id = Math.round(Math.random() * (1000000 - 0) + 0)

      if (state.items.some((item) => { return item.itemId === id })) {
        state.commit({
          type: 'SET_ITEM_ID'
        })
      } else {
        state.itemId = id
      }
    },

    SET_COMPLETED_ITEM_TRUE(state, payload) {
      const task = state.items.find(item => item.itemId === payload.itemId)
      task.completed = true
      task.active = false
    },
    SET_COMPLETED_ITEM_FALSE(state, payload) {
      const task = state.items.find(item => item.itemId === payload.itemId)
      task.completed = false
      task.active = true
    },
    SET_NEW_TASK(state, payload) {
      Object.assign(state.itemSample, { itemId: payload.itemId, title: state.valueTask } )
      state.items.push(Object.assign({}, state.itemSample))
    },
    
    
    SET_ITEMS_FROM_LOCALSTORAGE(state, payload) {
      state.items.push(...payload.storage)
    },

    CLEAR_COMPLETED_TASK(state) {
      state.items = state.items.filter(item => !item.completed)
    }
  },

  actions: {
    async ADD_TASK(context) {
      if (context.state.valueTask) {
        await context.commit({
          type: 'SET_ITEM_ID',
        })
        await context.commit({
          type: 'SET_NEW_TASK',
          itemId: context.state.itemId
        })
        await context.commit({
          type: 'CLEAR_ITEM_VALUE'
        })
      }
      
      
    }
  },
  modules: {
  }
})
