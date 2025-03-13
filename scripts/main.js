import { repository } from "./index.js"
import { renderActivities } from "./dom.js"

document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector("#addActivityBtn")

  addButton.addEventListener("click", () => {
    const titleInput = document.querySelector(".input1")
    const descriptionInput = document.querySelector(".input2")
    const imgUrlInput = document.querySelector(".input3")

    const title = titleInput.value
    const description = descriptionInput.value
    const imgUrl = imgUrlInput.value

    if (title === "" || description === "" || imgUrl === "") {
      alert("Todos los campos son requeridos")
      return
    }

    repository.createActivity(title, description, imgUrl)

    titleInput.value = ""
    descriptionInput.value = ""
    imgUrlInput.value = ""

    renderActivities()
  })
})
