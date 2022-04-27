<template>

  <div id="app">
    <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
    <student-table
     v-bind:students="students" 
     v-on:student-arrived-or-left="studentArrivedOrLeft"
     v-on:delete-student="studentDeleted">
     </student-table>
    <student-message v-bind:student="mostRecentStudents"></student-message>
  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm.vue'
import StudentMessage from './components/StudentMessage.vue'
import StudentTable from './components/StudentTable.vue'

export default {
  name: 'App',
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable
  },
  data(){
    return{
      students:[],
      mostRecentStudents:{}
    }
  },
  mounted(){
    //load all students-- make request ot API
    this.updateStudents()
  },
  
  methods:{
    updateStudents(){
      this.$student_api.getAllStudents().then(students => {
        this.students = students
      }).catch( () => alert('Unable to fetch a student list'))
    },
    newStudentAdded(student){
      this.$student_api.addStudent(student).then(()=>{
        this.updateStudents()
      }).catch(err => {
        let msg = err.response.data.json(',')
        alert('Error adding student \n'+ msg)
      })
      
    },
    studentArrivedOrLeft(student,present){
      student.present = present //update present value 
      this.$student_api.updateStudent(student).then(()=> {
        this.mostRecentStudents = student //updated student object
        this.updateStudents()
      }).catch( () => alert('Unable to update a student'))
    },
    studentDeleted(student){
      this.$student_api.deleteStudent(student.id).then(() => {
        this.updateStudents()
        this.mostRecentStudents = {} //clear welcome or goodbye messages if we are deleting the most recent student
      }).catch( () => alert('Unable to delete a student'))
    }
  }
}
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css";
</style>
