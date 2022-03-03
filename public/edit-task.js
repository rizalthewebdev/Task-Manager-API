const taskIDDOM = document.querySelector('.task-edit-id')
const taskTitleDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempTitle

const showTask = async () => {
  try {
    const {
      data: { task },
    } = await axios.get(`/api/v1/tasks/${id}`)
    const { _id: taskID, isComplete, title } = task

    taskIDDOM.textContent = taskID
    taskTitleDOM.value = title
    tempTitle = title
    if (isComplete) {
      taskCompletedDOM.checked = true
    }
  } catch (error) {
    console.log({message: error.message})
  }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const taskTitle = taskTitleDOM.value
    const taskCompleted = taskCompletedDOM.checked

    const {
      data: { task },
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      title: taskTitle,
      isComplete: taskCompleted,
    })

    const { _id: taskID, isComplete, title } = task

    taskIDDOM.textContent = taskID
    taskTitleDOM.value = title
    tempTitle = title
    if (isComplete) {
      taskCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error({message: error.message})
    taskTitleDOM.value = tempTitle
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})