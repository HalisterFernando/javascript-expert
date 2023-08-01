export default class FluentSQLBuilder {
    #data = []
    #limit = 0
    #select = []
    #where = []
    #orderBy = ''
    #count = ''

    constructor({ database }) {
        this.#data = database

    }

    static for(database) {
        return new FluentSQLBuilder({ database })
    }


    limit(max) {
        this.#limit = max
        return this;
    }


    select(props) {
        this.#select = props

        return this;
    }

    where(query) {

        const [[prop, selectValue]] = Object.entries(query)
        const whereFilter = selectValue instanceof RegExp ?
            selectValue :
            new RegExp(selectValue)

        this.#where.push({ prop, filter: whereFilter })

        return this;
    }

    orderBy(field) {
        this.#orderBy = field

        return this;

    }

    countyBy(field) {
        this.#count = field

        return this;
    }
    
    #performWhere(item) {
        for (const { filter, prop } of this.#where) {
            if (!filter.test(item[prop])) return false;
        }

        return true
    }

    #performSelect(item) {
        const currentItem = {}
        const values = Object.entries(item)
        for (const [key, value] of values) {
            if (this.#select.length && !this.#select.includes(key)) continue;

            currentItem[key] = value
        }
        return currentItem
    }

    #performLimit(result) {
        return this.#limit && result.length === this.#limit
    }

    #performOrderBy(projection) {
        if (!this.#orderBy) return projection

        return projection.sort((prev, next) => {
            return prev[this.#orderBy].localeCompare(next[this.#orderBy])
        })
    }

    #performCount(results) {
        if (!this.#count) return results;

        const accumulator = {};

        for (const result of results) {
            const targetField = result[this.#count];

            accumulator[targetField] = accumulator[targetField] ?? 0;

            accumulator[targetField] += 1
        }

        return [accumulator]

    }

    build() {
        const results = []

        for (const item of this.#data) {
            if (!this.#performWhere(item)) continue
            const currentItem = this.#performSelect(item)
            results.push(currentItem)

            if (this.#performLimit(results)) break;
        }
        const groupped = this.#performCount(results)
        const orderedResult = this.#performOrderBy(groupped)
        return orderedResult

    }
}

