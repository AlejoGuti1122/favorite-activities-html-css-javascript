import { repository } from "./index.js"

function createActivityCard(activity) {
  const { id, title, description, imgUrl } = activity

  const card = document.createElement("div")
  card.classList.add("activity-card")

  card.innerHTML = `
    <img src="${imgUrl}" alt="${title}" class="activity-image">
    <h3 class="activity-title">${title}</h3>
    <p class="activity-description">${description}</p>
    <button class="delete-btn">✖</button>
  `

  const deleteBtn = card.querySelector(".delete-btn")
  deleteBtn.addEventListener("click", () => handleDelete(id))

  return card
}

export function renderActivities() {
  const container = document.querySelector(".activities-container")
  if (!container) {
    console.error("Container not found")
    return
  }

  container.innerHTML = ""
  const activities = repository.getAllActivities()

  const activityElements = activities.map((activity) =>
    createActivityCard(activity)
  )

  activityElements.forEach((element) => container.appendChild(element))
}

function handleDelete(id) {
  repository.deleteActivity(id)
  renderActivities()
}

export { createActivityCard }
