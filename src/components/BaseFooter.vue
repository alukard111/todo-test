<template>
  <div class="base-footer">
    <div class="base-footer__task-count">
      <span>
        {{ countItems }} items
      </span>
    </div>
    <div class="base-footer__btns-center">
      <slot name="all"></slot>
      <slot name="active"></slot>
      <slot name="completed"></slot>
    </div>
    <div class="base-footer__btn-clear">
      <slot name="clearCompleted"></slot>

    </div>
  </div>
</template>


<script>
export default {
  props: {
    countItems: {
      type: Number || String,
      require: false,
      default: ''
    }
  }
}
</script>


<style lang="postcss" scoped>
.base-footer {
  @apply
    w-full
    h-full

    border-t

    text-black
    text-xs
    sm:text-sm

    flex
    justify-between
    items-center
    
    pl-1
    sm:pl-2
  ;
}

.base-footer__btns-center {
  @apply
    flex
  ;
}
</style>