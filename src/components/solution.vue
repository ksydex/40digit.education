<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" flat v-on="on">Показать решение</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline primary lighten-2" primary-title>Возможное решение</v-card-title>

        <v-card-text v-html="solution"></v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['task_data'],
  data() {
    return {
      dialog: false,
      solution: this.task_data
    }
  }
}
</script>


