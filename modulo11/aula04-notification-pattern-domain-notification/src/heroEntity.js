import NotificationContext from "./notificationContext.js"

export default class HeroEntity extends NotificationContext{
    constructor({ name, age }) {
        super()
        this.name = name
        this.age = age
    }

    isValid() {
        if (this.age < 20) {
            this.addNotification('age must be above 20!')
        }
        if (this.name?.length < 4) {
            this.addNotification("name length must be above 4 characters")
        }

        return !this.haveNotifications()
    }
}


function validateHero(hero) {
    //simulando erro do banco de dados
  

}