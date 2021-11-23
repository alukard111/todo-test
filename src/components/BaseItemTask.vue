<template>
  <div 
    @click="$emit('click')"
    class="item-task"
    :class="{ 'item-task_completed' : stateCompletedTask }"
  >
    <svg 
      class="item-task_checked"
      :class="{ 'hidden' : !stateCompletedTask }"
      stroke="currentColor" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
      </path>
    </svg>
    <span 
      class="item-task__title"
      :class="{ 'item-task__title_completed' : stateCompletedTask }"
    >
      {{ titleTask }}
    </span>
  </div>
</template>


<script>
export default {
  props: {
    titleTask: {
      type: String || Number,
      require: false,
      default: ''
    },
    stateCompletedTask: {
      type: Boolean,
      require: false,
      default: false
    },

  }
}
</script>


<style lang="postcss" scoped>
.item-task {
  @apply
    flex 
    items-center
    justify-start
    
    py-4
  ;
}
.item-task_completed {
  @apply
    line-through
    text-gray-400
  ;
}
.item-task_checked {
  @apply
    h-6
    w-6 
    mx-2 

    border 
    border-opacity-100 
    rounded-full 
    
    text-green-500
  ;
}

.item-task__title {
  @apply
    w-11/12
    ml-10

    leading-6
    break-all
    text-left
  ;
}
.item-task__title_completed {
  @apply
    ml-0
  ;
}
</style>