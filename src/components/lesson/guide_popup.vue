<template>
  <v-card style="box-shadow: 0 3px 20px #1a1c3370" light width="250px">
        <v-card-title class="px-2 pt-0" primary-title>
          <div class="top">
            <div>
              <h3 class="top__title pl-2">{{text[iterator].title}}</h3>
              <v-spacer/>
              <v-btn class="top_close mr-0" @click="close()" flat icon color="pink">
                <v-icon>clear</v-icon>
              </v-btn>
            </div>
            <div class="top__desc pl-2">{{text[iterator].desc}}</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer/>
          <v-btn v-if="iterator!=0" @click="back()" flat color="#E20B3F">Назад</v-btn>
          <v-btn v-if="iterator!=text.length-1" @click="next()" flat color="#E20B3F">Далее</v-btn>
          <v-btn v-if="iterator==text.length-1" flat color="#E20B3F" @click="close()">Завершить</v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
export default {
  props: ['iterator'],
  data() {
    return {
      text: [
        {
          title: 'Текстовый редактор',
          desc: 'В этом окне вы пишите и редактируете код. Для удобства в редакторе включена подсветка синтаксиса.'
        },
        {
          title: 'Окно вывода',
          desc: 'Это окно является результатом работы вашего кода.'
        },
        {
          title: 'Теория',
          desc: 'Здесь вы наполняетесь знаниями, чтобы потом написать что то крутое в окне выше:)'
        },
        {
          title: 'Задания',
          desc: 'Для закрепления теории вы должны выполнить задания, которые открывают доступ к следующему уроку.'
        }
      ]
    }
  },
  methods:{
    next() {
      this.$emit('next');
    },
    back() {
      this.$emit('back');
    },
    close(){
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss">
.top{
  width: 100%;
  .top__title {
    font-weight: 500;
    font-size: 17px;
  }
  .top__close {
    margin-left: auto;
  }
  .top__desc {
    font-size: 15px;
  }
  div {
    display: flex;
    align-items: center;

  }
}
</style>
