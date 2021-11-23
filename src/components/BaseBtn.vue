<template>
  <div class="base-btn__wrapper">
    <button
      @click="$emit('click')" 
      class="base-btn__btn"
      :class="{ 'bg-gray-400' : activeBtn }"
    >
      {{ btnName }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    btnName: {
      type: String,
      require: false,
      default: false
    },
    activeBtn: {
      type: Boolean,
      require: false,
      default: false
    }
  }
}
</script>


<style lang="postcss" scoped>
.base-btn__wrapper {
  @apply
    m-1
    sm:m-2
  ;
}
.base-btn__btn {
  @apply
    w-full
    h-full

    border
    border-opacity-25

    rounded-md
    border-black

    p-1
    
    transition
    ease-in-out
    duration-200

    hover:bg-gray-300
    active:bg-gray-600
  ;
}
</style>