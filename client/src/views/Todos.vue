<template>
  <div class="todos">
    <div v-for="todo in todos" v-bind:key="todo.id" class="todo">
      {{ todo.text }} - {{ todo.completed ? "completed" : "not yet done" }}
    </div>
    <div>
      <input type="text" v-model="todo" />
      <button @click="addTodo">add todo</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Todos extends Vue {
  todo = "";

  get todos() {
    return this.$store.state.todos;
  }

  created() {
    this.$store.dispatch("loadTodos");
  }

  addTodo() {
    this.$store.dispatch("addTodo", { text: this.todo });
    this.todo = "";
  }
}
</script>

<style scoped>
.todo {
  border: solid 1px darkgray;
  margin: 8px;
  background-color: lightyellow;
}
.todo.completed {
  background-color: lightgreen;
}
</style>
