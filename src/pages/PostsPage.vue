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
      @click="showDialog"
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
      @create="createPost"
      />
    </my-dialog>
    <post-list 
    :posts="sortesAndSearchedPosts"
    @remove="removePosts"
    v-if="!isPostLoading"
    />
    <div v-else>Идет загрузка...</div>
    <!-- ref="observer" (без пользовательской директивы)-->
    <div v-intersection="loadingMorePosts" class="observer"></div>
    
    <!-- нужно будет вынести в переиспользуемый компонент -->
    <!-- отображение страниц -->
    <!-- <div class="page__wrapper">
      <div 
      v-for="pageNumber in totalPages" 
      :key="pageNumber"
      class="page"
      :class="{
        'current-page': page === pageNumber
      }"
      @click="changePage(pageNumber)"
      >
      {{ pageNumber }}
    </div>
    </div> -->
  </div>
  </template>
  
  <script>
import PostForm from "@/components/PostForm"
import PostList from '@/components/PostList'
import MyButton from '@/components/UI/MyButton'
import MySelect from '@/components/UI/MySelect'
import axios from 'axios'

  export default {
    components: {
      PostForm, PostList, MySelect
    },
    data() {
      return {
        posts: [],
        dialogVisible: false,
        isPostLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
          {value: 'title', name: 'По названию'},
          {value: 'body', name: 'По описанию'},
        ]
      }
    },
    methods: {
     createPost (post) {
      this.posts.push(post);
      this.dialogVisible = false;
     },
     removePosts(post){
      this.posts = this.posts.filter(el => el.id !== post.id)
     },
     showDialog(){
      this.dialogVisible = true;
     },
    //  отображение страниц
    //  changePage(pageNumber){
    //   this.page = pageNumber
      
    //  },
     async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (error) {
        console.error('error')
      } finally {
        this.isPostLoading = false;
      }
     },
     async isPostsLoading() {
      try {
        this.isPostLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        console.error('Error')
      } finally {
        this.isPostLoading = false;
      }
     },
     async loadingMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        console.error('error')
      }
     }
    },
    mounted(){
      this.fetchPosts();
      console.log(this.$refs.observer)
      // без пользовательских директив
      // const options = {
      // rootMargin: "0px",
      // threshold: 1.0,
      // };

      // const callback = (entries, observer) => {
      //    if(entries[0].isIntersecting && this.page < this.totalPages){
      //     this.loadingMorePosts()
      //    }
      // }

      // const observer = new IntersectionObserver(callback, options);
      // observer.observe(this.$refs.observer);
    },
    computed: {
      sortedPosts(){
        return [...this.posts].sort((el1, el2) => {
          return el1[this.selectedSort]?.localeCompare(el2[this.selectedSort])
        })
      },
      sortesAndSearchedPosts(){
        return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    },
    watch: {


      // отображение страниц
      // page(){
      //   this.fetchPosts()
      // }


      // selectedSort(newValue){
      //   this.posts.sort((el1, el2) => {
      //     return el1[newValue]?.localeCompare(el2[newValue])
      //   })
      // },
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