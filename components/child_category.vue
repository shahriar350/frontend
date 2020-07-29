<template>
  <div class="ml-3">
    <div class="bg-gray-100 shadow p-2 my-2" v-for="(child,index) in child_cats">
      <p @click="parentData(child.id,rootparent)"
         class="text-gray-600 hover:text-black cursor-pointer transition duration-100 ease-in-out">
        {{ child.name }}
        <a-icon class="ml-2" v-if="child.children.length" type="arrow-down"/>
        <a-icon class="rounded-full ml-3 border-2 border-gray-500 p-1"
                v-if="select_categories.some(e => e === child.id)" type="check"/>
      </p>
      <div v-if="select_categories.some(e => e === child.id)">
        <childs :select_categories="select_categories" v-on:select_cat_now="parentData($event)"
                v-if="child.children.length"
                :child_cats="child.children"></childs>
      </div>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Collapse } from 'ant-design-vue'

  Vue.use(Collapse)
  export default {
    props: {
      rootparent: '',
      child_cats: '',
      keyparent: '',
      select_categories: ''
    },
    components: {
      childs: () => import('../components/child_category')
    },
    methods: {
      parentData(id,parent) {
        this.$emit('select_cat_now', id,parent)
      }
    }
  }
</script>
