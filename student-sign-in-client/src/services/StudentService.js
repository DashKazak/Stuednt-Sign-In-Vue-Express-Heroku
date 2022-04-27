import axios from 'axios'


let base_url = '/api/students'

//in App.vue I wrote db queries to work with data. Here I am replacing those queries with API call usign axios library
export default{
    getAllStudents(){
        return axios.get(base_url).then(response => {
            return response.data
        })
    }, 

    addStudents(student){
        return axios.post(base_url, student).then(response => {
            return response.data
        })
    },

    updateStudent(student){
        return axios.patch(`${base_url}/${student.id}`,student).then(response =>{
            return response.data
        })
    },
    deleteStudent(id){
        return axios.delete(`${base_url}/${id}`).then(response => {
            return response.data
        })
    }
}
