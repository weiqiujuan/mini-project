<template>
  <div>
    <ActivityDialog/>
    <ActivityTable/>
  </div>
</template>

<script>
  import ActivityDialog from './Activity-dialog'
  import ActivityTable from './ActivityTable'

  export default {
    name: "ActivityBack",
    components: {
      ActivityDialog,
      ActivityTable
    }
  }
</script>

<style scoped>
  div {

  }
</style>
