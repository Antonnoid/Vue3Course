import axios from "axios"

export const postModule = {
  state: () => ({
    posts: [],
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
  }),
  getters: {
    sortedPosts(state){
      return [...state.posts].sort((el1, el2) => {
        return el1[state.selectedSort]?.localeCompare(el2[state.selectedSort])
      })
    },
    sortesAndSearchedPosts(state, getters){
      return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    }
  },
  mutations: {
    setPosts(state, posts){
      state.posts = posts;
    },
    setLoading(state, Boolean){
      state.isPostLoading = Boolean
    },
    setPage(state, page){
      state.page = page
    },
    setSelectedSort(state, selectedSort){
      state.selectedSort = selectedSort
    },
    setTotalPages(state, totalPages){
      state.totalPages = totalPages
    },
    setSearchQuery(state, searchQuery){
      state.searchQuery = searchQuery
    },

  },
  actions: {
    async fetchPosts({state, commit}) {
      try {
        commit('setLoading', true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit,
          }
        });
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', [...state.posts, ...response.data])
      } catch (error) {
        console.error('error')
      } finally {
        commit('setLoading', false);
      }
     },
    //  async isPostsLoading() {
    //   try {
    //     this.isPostLoading = true;
    //     const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
    //       params: {
    //         _page: this.page,
    //         _limit: this.limit,
    //       }
    //     });
    //     this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
    //     this.posts = [...this.posts, ...response.data];
    //   } catch (error) {
    //     alert('Ошибка')
    //   } finally {
    //     this.isPostLoading = false;
    //   }
    //  },
     async loadingMorePosts() {
      try {
        commit('setPage', state.page += 1);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit,
          }
        });
        commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit));
        commit('setPosts', [...this.posts, ...response.data]);
      } catch (error) {
        console.error('error')
      }
     }
  },
  namespaced: true
}