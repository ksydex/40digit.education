<template>
  <v-container class="fluid ma-0 pa-2">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tonsky/FiraCode@1.206/distr/fira_code.css">
    <v-layout wrap column>
      <v-layout row>
        <v-flex  xs6 id="code">
          <cm :codee="code" @update="updateCode"></cm>
        </v-flex>
        <v-flex id="output" xs6 class="ml-3">
          <div v-html="code"></div>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs6 class="mt-3" id="theory">
          <v-card class="lesson_text" >
            <v-card-title primary-title class="pt-2">
              <div>
                <div class="my-0" style="display: flex; flex-direction: row; align-items: center">
                    <h3 class="sans-serif headline mb-0">{{lesson.title}}</h3>
                    <v-spacer></v-spacer>
                    <v-btn flat icon v-if="this.$route.params.id !=0">back</v-btn>
                    <v-btn flat class="mx-0" disabled>Следующий урок</v-btn>
                  </div>
                

                <div class="lesson_text__content" style="height: 400px;"
                  v-html="$options.filters.coder(lesson.text)"
                ></div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex xs6 class="ml-3 mt-3" id="tasks">
          <v-card 
          class="task mb-2"
            :color="task.status==1 ? 'green':'primary'"
            v-for="(task,index) in lesson.tasks"
            :key="index"
          >
            <v-card-title class="pa-0">
              <div style="width: 100%">
                <div class="task_top ml-2">
                  <v-icon>{{ task.status ? 'check' : 'subject' }}</v-icon>
                  <h3 class="sans-serif task_top__title mb-0 ml-2">{{task.title}}</h3>
                  <v-spacer></v-spacer>
                  <solution v-show="!task.status" :task_data="$options.filters.coder(task.solution)"></solution>
                </div>
                
                <div class="mx-3 mb-3" v-html="$options.filters.coder(task.text)"></div>
              </div>
            </v-card-title>
          </v-card>
          
        </v-flex>
      </v-layout>
    </v-layout>
     <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn flat
          style="position: fixed; right: 10px; bottom: 10px;"
          fab @click="guide_('start')" v-on="on" v-show="$route.name.indexOf('lesson') != -1">
            <v-icon>help</v-icon>
          </v-btn>
        </template>
        <span>Гайд по интерфейсу</span>
      </v-tooltip>
      <div v-show="guide.guide_active" class="guide_wrapper"></div>
      <guidepopup
      :iterator="guide.guide_i"
      @next="guide_('next')" 
      @back="guide_('back')"
      @close="guide_('close')"
      :style="guide.popup_style" 
      id="guide_popup" 
      v-if="guide.guide_active">
      </guidepopup>
  </v-container>
</template>

<script>
import cm from "./cm.vue";
import solution from "./solution.vue"
import { setTimeout } from 'timers'
import guidepopup from './guide_popup.vue'

export default {
  components: {
    cm,
    solution,
    guidepopup
  },
  data() {
    return {
      code: '<h1 class="serif">Вы можете писать весь код прямо здесь!</h1>',
      i: 0,
      lesson: null,
      dialog: false,
      guide: {
        guide_active: false,
        guide_i: 0,
        targets: ['code','output','theory','tasks'],
        popup_style: {}
      },
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
            break;
          }
      }
    },
    updateCode(value) {
      this.code = value;
    },//доделать
    guide_(func){
      let v = this;
      let target;
      switch (func) {
        case 'start':
          v.guide.guide_active = true;
          target = document.querySelector('#'+v.guide.targets[v.guide.guide_i]);
          target.classList.add('guide');
          this.popup_style();
          break;
        case 'next':
          target = document.querySelector('#'+v.guide.targets[v.guide.guide_i]);
          target.classList.remove('guide');
          v.guide.guide_i++;
          target = document.querySelector('#'+v.guide.targets[v.guide.guide_i]);
          target.classList.add('guide');
          this.popup_style();
          break;
        case 'back':
          target = document.querySelector('#'+v.guide.targets[v.guide.guide_i]);
          target.classList.remove('guide');
          v.guide.guide_i--;
          target = document.querySelector('#'+v.guide.targets[v.guide.guide_i]);
          target.classList.add('guide');
          this.popup_style();
          break;
        case 'close':
          v.guide.guide_active = false;
          target = document.querySelector('#'+v.guide.targets[v.guide.guide_i]);
          target.classList.remove('guide');
          v.guide.guide_i=0;
        default:
          break;
      }
      
    },
    popup_style(){
      let target = document.querySelector('.guide');
      let target_pos = target.getBoundingClientRect();
      let y = (target_pos.y + (target_pos.height)/2)-145;
      let x = (target_pos.x + (target_pos.width)/2)-125;
      this.guide.popup_style = {
        top: y+'px',
        left: x+'px'
      }
    }
  },
  watch: {
    code() {
      //tasks checking
      this.isTaskDone();
    }
  },
  computed: {},
  created() {
    let language = this.$route.path.split('/')[1];
    var params = {id: this.$route.params.id, lang: language}
    this.lesson = this.$store.getters.getLesson(params);
    this.isTaskDone();
  },
  filters: {
    coder: function(value) {
      let def = value;
      var regex;
      let regexp = /<code>(.*?)<\/code>/gi;
      while ((regex = regexp.exec(value))) {
        //let parsed = regex[1].replace(/</g, "&lt;").replace(/>/g, "&gt;");
        let parsed = regex[1].replace(/<(.+?)>/g, (s, r) => {
          return r === "br" ? s : "&lt;" + r + "&gt;";
        });
        def = def.replace(regex[1], parsed);
      }
      return def;
    }
  }
};
</script>

<style lang="scss">
.guide {
  z-index: 1000;
  border: 2px solid #ffff00;
  border-radius: 2px;
  box-shadow: 0 0 20px #ffff004f;
}

#guide_popup {
  z-index: 1001;
  position: absolute !important;
}

.guide_wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: #000000bb;
}

#editor_window {
  width: 100% !important;
  height: 100% !important;
}

#output {
  overflow: auto;
}

.task {
  .task_top{
    display: flex; 
    flex-direction: row; 
    align-items: center; 
    justify-content: space-beetween;
    height: 50px;
    .task_top__title {
      font-weight: 400;
      font-size: 18px;
    }
  }

  .tip {
    margin: 5px -10px 5px -10px;
    padding: 5px 10px 5px 10px;
    background-color: #0000001e;
    border-radius: 2px;
    font-style: italic;
    border-left: 5px solid #ffffffc0;
  }

}

.lesson_text {
  .lesson_text__content{
    height: 500px;
    overflow: auto;
    h1,h2,h3,h4,h5,h6 {
      font-family: 'Playfair Display', serif !important;
      font-weight: 500;
    }
  }
}
</style>
