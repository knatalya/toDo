var app = new Vue({
    el: '.container',
    data: {
        header: 'To do list',
        new_task: '',
        tasks: [],
        tasks_complete: []

    },
    mounted() {
        if (localStorage.getItem('tasks')) {
          try {
            this.tasks = JSON.parse(localStorage.getItem('tasks'));
          } catch(e) {
            localStorage.removeItem('tasks');
          }
        }
        if (localStorage.getItem('tasks_complete')) {
            try {
              this.tasks_complete = JSON.parse(localStorage.getItem('tasks_complete'));
            } catch(e) {
              localStorage.removeItem('tasks_complete');
            }
          }
      },
    methods: {
        delete_tasks: function(array, index) {
            array.splice(index, 1);
            if(array == this.tasks) {
                this.saveTasks();
            } else {
                this.saveTasksComplete();
            }
        },
        add_tasks: function(array) {
            if (!this.new_task) {
                return;
            }
            array.push(this.new_task); 
            this.new_task = '';
            this.saveTasks();
        },
        comlete: function(tasks_start, task, index) {
            if(tasks_start == this.tasks) {
                this.tasks.splice(index, 1);
                this.saveTasks();
                this.tasks_complete.push(task); 
                this.saveTasksComplete();
            } else if (tasks_start == this.tasks_complete) {
                this.tasks_complete.splice(index, 1);
                this.saveTasksComplete();
                this.tasks.push(task);
                this.saveTasks();
            }
        },
        saveTasks() {
            const parsed = JSON.stringify(this.tasks);
            localStorage.setItem('tasks', parsed);
        },
        saveTasksComplete() {
            const parsed = JSON.stringify(this.tasks_complete);
            localStorage.setItem('tasks_complete', parsed);
        }
    }
})

