<template>
<div class="navbar">
<div @click="$router.push('/')">Vue3</div>
<div class="navbar_btns">
  <my-button @click="$router.push('/posts')">Список постов</my-button>
  <my-button @click="$router.push('/about')" style="margin-left: 10px;">О приложении</my-button>
  <my-button @click="$router.push('/store')" style="margin-left: 10px;">STORE</my-button>
  <my-button @click="$router.push('/composition')" style="margin-left: 10px;">Composition</my-button>
</div>
</div>
    </template>
        
    <script>
        export default {
  
        }
    </script>
        
    <style scoped>
    .navbar{
      height: 80px;
      background-color: beige;
      box-shadow: 5px 5px 4px gray;
      display: flex;
      align-items: center;
      padding: 0 15px;
    }
    .navbar_btns{
      margin-left: auto;
    }
    </style>