<template>
  <div class="component-input">
    <input
      type="text"
      autocomplete="off"
      class="component-input__input"
      placeholder="text"
      :value="valueInputTask"
      @input="$emit('input', $event.target.value)"
      @keyup.enter="$emit('keyup')"
    >
  </div>
  
</template>


<script>
export default {
  props: {
    valueInputTask: {
      type: String,
      require: false,
      default: ''
    }
  }
}
</script>

<style lang="postcss" scoped>
.component-input {
  @apply
    w-full
    ml-10
  ;
}

.component-input__input {
  @apply
    w-full

    outline-none
    
  ;
}
</style>
