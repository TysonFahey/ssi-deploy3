import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { mande } from "mande";

const studentAPI = mande("api/students");

export const useStudentStore = defineStore("students", () => {
  const sortedStudents = ref([]);

  const mostRecentStudent = ref({});

  const addNewStudentErrors = ref ( [])

  function getAllStudents() {
    // make api request to get all students and save them in the studentList in store
    studentAPI.get().then((students) => {
      // students is the JSON response from the API
      sortedStudents.value = students;
    }).catch(err => {
        console.log(err)
    })
  }

  function addNewStudent(student) {
    // make api call to add new student
    // call getAllStudents to re request list of students from API server
    studentAPI.post(student).then(() => {
      getAllStudents();
    }).catch(err => {
        // if there is an error, 
        addNewStudentErrors.value = err.body
    })
  }

  function deleteStudent(studentToDelete) {
    const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
    deleteStudentAPI.delete().then(()=>{
        mostRecentStudent.value = {}
        getAllStudents()
    }).catch(err => {
        console.log(err)
    })
  }

  function arrivedOrLeft(student) {
    const editStudentAPI = mande(`/api/students/${student.id}`)
    editStudentAPI.patch(student).then(()=> {
        mostRecentStudent.value = student
        getAllStudents() // once requests are made and completed, call this function
    }).catch(err => {
        console.log(err)
    })
  }

  // const sortedStudents = computed( () => {
  //     return studentList.value.toSorted( (s1, s2) => {
  //         return s1.name.localeCompare(s2.name)
  //     })
  // })

  const studentCount = computed(() => {
    return sortedStudents.value.length;
  });

  return {
    // reactive data
    sortedStudents,
    mostRecentStudent,
    addNewStudentErrors,

    // functions
    getAllStudents,
    addNewStudent,
    deleteStudent,
    arrivedOrLeft,

    // computed properties

    studentCount,
  };
});
