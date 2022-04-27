<template>
    <tr v-bind:class = "{present: student.present, absent: !student.present}">
        <td>{{student.name}}</td>
        <td>{{student.starID}}</td>
        <td>
            <input type="checkbox" v-bind:checked="student.present" v-on:change="arrivedOrLeft(student, $event.target.checked)">
        </td>
        <td v-show="edit"><img v-on:click="deleteStudent" src="@/assets/icon-delete.png"></td>
    </tr>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'

export default {
    name:'StudentRow',
    props:{
        student:Object,
        edit:Boolean
    },
    methods:{
        arrivedOrLeft(student,present){
            this.$emit('student-arrived-or-left',student,present)
        },
        deleteStudent(){
            if(confirm(`Delete ${this.student.name}?`))
            this.$emit('delete-student',this.student)
        }
    }
}
</script>

<style scoped>
.present{
    color:blueviolet
}
.absent{
    color:yellowgreen;
    font-style: italic;
}
img{
    height:25px;
}
</style>
