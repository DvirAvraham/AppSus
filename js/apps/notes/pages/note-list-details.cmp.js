import { utilService } from '../../../services/util-service.js';

export default {
  props: ['note'],
  template: `
          <section class="note-txt-details" :style="{'background-color': note.bgColor}" >
              <input :style="{'background-color': note.bgColor}"  type="text" class="note-title-input" @input="updateNote" v-model="updatedNote.title" placeholder="Edit Title">
              
              <div class="add-todo-container">
                   <input class="new-todo-input" placeholder="Add Todo" type="text" v-model="newTodoTxt" :style="{'background-color': note.bgColor}">
                   <button  class="add-todo-btn" @click="addTodo">
                        <i class="fa-solid fa-plus"></i>
                   </button>
               </div>         
              <ul>
                <li v-for="(todo,idx) in updatedNote.info.todos" >
                    <input type="text" @change="updateNote" :class="{'done':todo.doneAt}" class="todo-input" v-model="todo.txt" :style="{'background-color': note.bgColor}">
                    <input  @click="done(todo)" :checked="todo.doneAt" type="checkbox" name="" :id="todo.txt">
                    <button class="remove-todo-btn" @click="removeTodo(todo.id,idx)">
                         <i class="fa-solid fa-xmark"></i>
                    </button> 
                </li>
              </ul>
          
            </section>
      `,
  components: {},
  created() {
    this.updatedNote = this.note;
  },
  data() {
    return {
      updatedNote: null,
      newTodoTxt: null,
    };
  },
  methods: {
    updateNote() {
      this.$emit('updateNote', this.updatedNote);
    },
    done(todo) {
      todo.doneAt ? (todo.doneAt = null) : (todo.doneAt = Date.now());
      this.updateNote();
    },
    removeTodo(id, idx) {
      console.log(id, idx);
      this.updatedNote.info.todos.splice(idx, 1);
      this.updateNote();
    },
    addTodo() {
      if (!this.newTodoTxt) return;
      var todo = {
        txt: this.newTodoTxt,
        doneAt: null,
        id: utilService.makeId(),
      };
      this.updatedNote.info.todos.push(todo);
      this.updateNote();
      this.newTodoTxt = null;
    },
  },
  computed: {},
  unmounted() {},
};
