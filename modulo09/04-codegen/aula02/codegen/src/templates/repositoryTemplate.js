import Util from "../util.js"
const componentNameAnchor = '$$componentName'

const template = `
export default class $$componentNameRepository {
    constructor() {}

    create() {
        return Promise.reject("method not implemented yet")
    }

    read() {
        return Promise.reject("method not implemented yet")
    }

    update() {
        return Promise.reject("method not implemented yet")
    }

    delete() {
        return Promise.reject("method not implemented yet")
    }
}`

export function repositoryTemplate(componentName) {
    return {
        fileName: `${componentName}Repository`,
        template: template.replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    }
}