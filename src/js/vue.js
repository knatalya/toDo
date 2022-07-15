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
        comlete: function(tasks_start, tasks_end, task, index) {
            if(tasks_start == this.tasks) {
                tasks_start.splice(index, 1);
                this.saveTasks();
                tasks_end.push(task); 
                this.saveTasksComplete();
            } else {
                tasks_start.splice(index, 1);
                this.saveTasksComplete();
                tasks_end.push(task)
                this.saveTasksComplete();
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

