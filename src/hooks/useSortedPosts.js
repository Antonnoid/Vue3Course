import { computed, ref } from "vue";

export function useSortedPosts(posts){
  const selectedSort = ref('')
  const sortedPosts = computed(() => {
    return [...posts.value].sort((el1, el2) => {
      return el1[selectedSort.value]?.localeCompare(el2[selectedSort.value])
    })
  })
  return {
    selectedSort, sortedPosts
  }
}