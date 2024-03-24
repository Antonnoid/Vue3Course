<template>
  <div v-if="posts.length > 0">
    <h2>Список постов</h2>
    <transition-group name="post-list">
      <post-item 
      v-for="post in posts"
      :post="post"
      :key="post.id"
      @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>
  <h2 v-else style="color: blue;">
  Посты отсутствуют
  </h2>
</template>

<script>
import PostItem from './PostItem.vue';

export default {
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped>
  .post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
  }
  .list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move {
  transition: transform 0.5s ease;
} 
</style>