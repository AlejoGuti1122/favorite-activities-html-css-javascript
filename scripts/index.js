export class Repository {
  constructor() {
    this.activities = [] // Inicialización del array
    this.id = 1
  }

  getAllActivities() {
    return this.activities
  }

  createActivity(title, description, imgUrl) {
    const newActivity = new Activity(this.id, title, description, imgUrl)
    this.activities.push(newActivity)
    this.id++
    return newActivity
  }

  deleteActivity(id) {
    this.activities = this.activities.filter((activity) => activity.id !== id)
  }
}

export class Activity {
  constructor(id, title, description, imgUrl) {
    this.id = id
    this.title = title
    this.description = description
    this.imgUrl = imgUrl
  }
}

export const repository = new Repository()
