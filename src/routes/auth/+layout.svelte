<script lang="ts">
  let { children } = $props()
</script>

<div class="flex flex-col items-center justify-center h-screen">
  {@render children?.()}
</div>