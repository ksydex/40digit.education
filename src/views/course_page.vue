<template>
<div>
  <v-parallax
    dark
    :src="data.card.img"
    height="250"
  >
    <v-layout 
      align-center
      column
      justify-center
    >
      <h1 class="display-2 font-weight-thin mb-3">{{data.card.title}}</h1>
      <h4 class="subheading" v-html="data.card.desc"></h4>
      <div class="course_info" >
        <span class="course_info__item">
          <v-icon>book</v-icon>
          {{data.lessons.length + " урока"}}
        </span>
        <span class="course_info__item">
          <v-icon>view_headline</v-icon>
          {{data.card.level}}
        </span>
        
      </div>
    </v-layout>
  </v-parallax>
  <h1 style="text-align: center">Уроки</h1>
  <v-layout align-start mt-3 justify-center row fill-height>
      <v-card align-content-space-around  height="300"
      :to="lesson.status ? {name: 'lesson', params: {id: index}} : ''"
      fill-height width="250" class="mr-3 topic_card" light 
      v-for="(lesson,index) in data.lessons" :key="index">
        <!-- <v-img :src="card.img" aspect-ratio="1.7"></v-img> -->
        <v-card-title class="pb-0">
          <div>
            <h3 class="headline">{{(index+1)+'. '+lesson.title}}</h3>
            <div class="my-2 ml-2" v-html="lesson.text.substr(0,170) + '...'"></div>
          </div>
        </v-card-title>
        <div class="bottom_acts">
          <v-divider light></v-divider>
        <v-card-actions class="ml-2" style="font-weight: 500">
          {{'Заданий: '+lesson.tasks.length}}
          <v-spacer></v-spacer>
          <v-btn flat color="#E20B3F" :disabled="!lesson.status">{{lesson.status ? 'Начать' : 'скоро'}}</v-btn>
        </v-card-actions>
        </div>
      </v-card>
    </v-layout>

</div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    };
  },
  created() {
    this.data = this.$store.getters.getCourse(this.$route.params.lang);
  }
};
</script>

<style lang="scss">
  .v-parallax {
    * {
      user-select: none;
    }
    img, .v-parallax__image {
      filter: brightness(0.3) !important;
    }
  }
  .bottom_acts {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .course_info {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    .course_info__item {
      display: flex;
      align-items: center;
      font-weight: 500;
      margin-left: 10px;
      &:first-of-type {
        margin-left: 0;
      }
    }
  }
</style>
