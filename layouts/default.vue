<script setup lang="ts">
  import BaseLayout from '~/components/BaseLayout.vue';
</script>

<template>
  <BaseLayout>
    <Navbar class="print:hidden" />
    <Header class="print:hidden" />
    <div class="my-10 print:m-0"><slot /></div>
    <DefaultFooter class="print:hidden" />
  </BaseLayout>
</template>
