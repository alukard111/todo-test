<template>
  <div class="home">
    <div class="home__wrapper">
      <div
        class="home__spoiler spoiler"
        :class="{ 'spoiler_active': spoilerActive }"
      >
        <header
          @click="toggleSpoiler()" 
          class="spoiler__title"
        >
          <i 
            class="spoiler__arrow"
            :class="{'spoiler__arrow_active' : spoilerActive }"
          ></i> 
          <span class="spoiler__description">What needs to be done?</span>
        </header>
        <div
          v-if="spoilerActive" 
          class="spoiler__items"
        >
          <ul class="spoiler__list">
            <li 
              class="spoiler__list-item"
              v-for="item in getTasks"
              :key="item.itemId"
            >
              <BaseItemTask 
                :titleTask="item.title"
                :stateCompletedTask="item.completed"
                @click="toggleCompletedTask(item.itemId, item.completed)"
              />
            </li>
          </ul>
        </div>
        <div class="spoiler__input">
          <BaseInput 
            v-model="setValueTask"
            :valueInputTask="this.$store.state.valueTask"
            @keyup="addTask()"
          />
        </div>
        <footer class="spoiler__footer">
          <base-footer
            :countItems="countItems"
          >
            <template slot="all">
              <BaseBtn 
                :btnName="btnAll"
                :activeBtn="showAllTask"
                @click="toggleAllTasks()"
              />
            </template>
            <template slot="active">
              <BaseBtn 
                :btnName="btnActive"
                :activeBtn="showActiveTask"
                @click="toggleActiveTasks()"
              />
            </template>
            <template slot="completed">
              <BaseBtn 
                :btnName="btnCompleted"
                :activeBtn="showCompletedTask"
                @click="toggleCompletedTasks()"
              />
            </template>
            <template 
              v-if="getAllTasks.some(item => item.itemId)"
              slot="clearCompleted"
            >
              <BaseBtn 
                :btnName="btnClear"
                @click="clearCompletedTask()"
              />
            </template>
          </base-footer>
        </footer>
      </div>
    </div>
  </div>
</template>


<script>
import BaseItemTask from '@/components/BaseItemTask.vue'
import BaseInput  from '@/components/BaseInput.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import BaseBtn from '@/components/BaseBtn.vue'


export default {
  name: 'Home',

  components: {
    BaseItemTask,
    BaseInput,
    BaseFooter,
    BaseBtn
},

  data: () => ({
    spoilerActive: true,

    showAllTask: true,
    showActiveTask: false,
    showCompletedTask: false,


    btnAll: 'All',
    btnActive: 'Active',
    btnCompleted: 'Completed',
    btnClear: 'clear completed',
  }),

  mounted() {
    this.$store.commit({
      type: 'SET_ITEMS_FROM_LOCALSTORAGE',
      storage:JSON.parse(localStorage.getItem('myTasks'))
    })
  },
 

  computed: {
    countItems() {
      return this.getTasks.length
    },

    getTasks() {
      if (this.showAllTask) {
        return this.getAllTasks
      } else if (this.showActiveTask) {
        return this.getActiveTasks
      } else {
        return this.getCompletedTasks
      }
    },

    getAllTasks() {
      return this.$store.getters.getTaskItems
    },

    getActiveTasks() {
      return this.$store.getters.getActiveItems
    },

    getCompletedTasks() {
      return this.$store.getters.getCompletedItems
    },


    setValueTask: {
      get() {
        return this.$store.state.valueTask
      },
      set(value) {
        this.$store.commit({
          type: 'SET_ITEM_VALUE',
          valueInputTask: value
        })
      }
    }
  },

  methods: {
    toggleSpoiler() {
      this.spoilerActive = !this.spoilerActive
    },

    toggleCompletedTask(taskId, completedTask) {
      if (!completedTask) {
        this.$store.commit({
          type: 'SET_COMPLETED_ITEM_TRUE',
          itemId: taskId
        })
      } else {
        this.$store.commit({
          type: 'SET_COMPLETED_ITEM_FALSE',
          itemId: taskId
        })
      }

      localStorage.setItem('myTasks', JSON.stringify(this.$store.getters.getTaskItems))
    },

    toggleAllTasks() {
      this.showAllTask = true
      this.showActiveTask = false
      this.showCompletedTask = false
    },
    toggleActiveTasks() {
      this.showAllTask = false
      this.showActiveTask = true
      this.showCompletedTask = false
    },
    toggleCompletedTasks() {
      this.showAllTask = false
      this.showCompletedTask = true
      this.showActiveTask = false
    },

    addTask() {
      this.$store.dispatch({
        type: 'ADD_TASK'
      })
      localStorage.setItem('myTasks', JSON.stringify(this.$store.getters.getTaskItems))
    },

    clearCompletedTask() {
      this.$store.commit({
        type: 'CLEAR_COMPLETED_TASK'
      })
      localStorage.setItem('myTasks', JSON.stringify(this.$store.getters.getTaskItems))
    }
  }

}
</script>


<style lang="postcss" scoped>
.home {
  @apply
    w-full
    h-full

    flex
    justify-center

    my-10
    m-auto
  ;
}
.home__wrapper {
  @apply
    w-11/12
    sm:w-8/12
    lg:w-1/3

    m-0
    sm:m-10
    sm:m-0

    h-full
  ;
}
.spoiler {
  @apply
    w-full
    h-full

    text-black
    italic
    cursor-pointer
    select-none

    border
  ;
}
.spoiler_active {
  @apply
    text-opacity-25
  ;
}
.spoiler__title {
  @apply
    flex
    justify-center
    items-center

    border
  ;
}
.spoiler__arrow {
  @apply
    inline-block

    border-black
    border-b-2
    border-r-2

    w-2
    h-2

    transform
    mx-2
    -rotate-45
  ;
}
.spoiler__arrow_active {
  @apply
    border-opacity-50
    rotate-45
  ;
}
.spoiler__items {
  @apply
    not-italic
    text-black

    transition-all
    ease-in-out
    duration-200
  ;
}
.spoiler__list-item {
  @apply
    border-b
  ;
}
.spoiler__input {
  @apply
    flex
    justify-end

    text-black
    text-opacity-100
  ;
}
</style>