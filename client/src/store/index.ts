import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

interface State {
  todos: Array<Todo>;
}

export default new Vuex.Store<State>({
  state: {
    todos: []
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },

    setTodos(state, todos) {
      state.todos = todos;
    }
  },
  actions: {
    addTodo(_, text) {
      fetch("/api/todos", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      }).then(() => this.dispatch("loadTodos"));
    },

    loadTodos({ commit }) {
      fetch("/api/todos", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(todoCollectionResource => todoCollectionResource._embedded.todos)
        .then(todos => commit("setTodos", todos));
    }
  },
  modules: {}
});
