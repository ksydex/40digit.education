<template>
  <v-container fluid>
    <v-layout wrap column>
      <v-layout row>
        <v-flex  height="500" xs6>
          <v-textarea
            fill-width
            name="input-7-1"
            box
            label="Code"
            auto-grow
            id="editor_window"
            placeholder="Yout code here!"
            v-model="code"
          ></v-textarea>
        </v-flex>
        <v-flex xs6 class="ml-3">
          <div v-html="code"></div>
        </v-flex>
      </v-layout>
      <v-flex>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{lesson.title}}</h3>
              <div v-html="$options.filters.coder(lesson.text)"></div>
            </div>
          </v-card-title>
        </v-card>
        <v-card
          class="mt-2"
          :color="task.status==1 ? 'green':'primary'"
          v-for="(task,index) in lesson.tasks"
          :key="index"
        >
          <v-card-title>
            <div>
              <v-icon>subject</v-icon>
              <h3 class="headline mb-0 ml-2">{{task.title}}</h3>
              <div v-html="$options.filters.coder(task.text)"></div>
            </div>
          </v-card-title>
        </v-card>
        <v-btn v-if="this.$route.params.id !=0">previous</v-btn>
        <v-btn>next</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      code: "<h4>Вы можете писать весь код прямо здесь!</h4>",
      i: 0,
      lesson: null
    };
  },
  methods: {
    isTaskDone() {
      let v = this;
      for (var i = 0; i < v.lesson.tasks.length; i++) {
        for (var j = 0; j < v.lesson.tasks[i].exp.length; j++)
          if (v.code.search(v.lesson.tasks[i].exp[j]) != -1) {
            if (j === v.lesson.tasks[i].exp.length - 1)
              v.lesson.tasks[i].status = 1;
            else v.lesson.tasks[i].status = 0;
          } else {
              v.lesson.tasks[i].status = 0;
                break
            };
      }
    }
  },
  watch: {
    code() { //tasks checking
      this.isTaskDone();
    }
  },
  computed: {},
  created() {
    this.lesson = this.$store.getters.getLesson(this.$route.params.id);
  },
  filters: {
    coder: function(value) {
      let def = value;
      var regex;
      let regexp = /<code>(.*?)<\/code>/gi;
      while ((regex = regexp.exec(value))) {
        //let parsed = regex[1].replace(/</g, "&lt;").replace(/>/g, "&gt;");
        let parsed = regex[1].replace(/<(.+?)>/g, (s, r) => {
          return r === 'br' ? s : '&lt;' + r + '&gt;';
        });
        def = def.replace(regex[1], parsed);
      }
      return def;
    }
  }
};
</script>

<style>
#editor_window {
  width: 100% !important;
  height: 100% !important;
}
</style>
