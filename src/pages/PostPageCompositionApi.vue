<template>
  <div> 
    <h1>Страница с постами</h1>
    <my-input 
    v-focus
    v-model="searchQuery"
    placeholder="Поиск..."
    />
    <div class="app__btns">
      <my-button
      >
      Создать пост
      </my-button>
      <my-select
      v-model="selectedSort"
      :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
      />
    </my-dialog>
    <post-list 
    :posts="sortesAndSearchedPosts"
    v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
  </div>
  </template>
  
  <script>
import PostForm from "@/components/PostForm"
import PostList from '@/components/PostList'
import MyButton from '@/components/UI/MyButton'
import MySelect from '@/components/UI/MySelect'
import { usePosts } from "@/hooks/usePosts"
import {useSortedPosts} from '@/hooks/useSortedPosts'
import {useSortedAndSearchedPosts} from '@/hooks/useSortedAndSearchedPosts'
import axios from 'axios'
import { ref } from "vue"

  export default {
    components: {
      PostForm, PostList, MySelect
    },
    data() {
      return {
        dialogVisible: false,
        sortOptions: [
          {value: 'title', name: 'По названию'},
          {value: 'body', name: 'По описанию'},
        ]
      }
    },

setup(props){
  const {posts, totalPages, isPostLoading} = usePosts(10);
  const {sortedPosts, selectedSort} = useSortedPosts(posts);
  const {searchQuery, sortesAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
  return{
    posts, 
    totalPages, 
    isPostLoading,
    sortedPosts, 
    selectedSort,
    searchQuery, 
    sortesAndSearchedPosts,
  }
}

  }
  </script>
  
  <style >

  .app__btns{
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
  }
  .page__wrapper{
    display: flex;
    margin-top: 15px;
  }
  .page{
    border: 1px solid rgb(54, 54, 54);
    padding: 10px;
  }
  .current-page{
    border: 4px solid teal;
  }
  .observer{
    height: 60px;
    background: green;
  }
  </style>