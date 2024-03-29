import { NotImplementedException } from "../../util/exceptions.js";

export default class BaseBusiness {
    _validateRequiredFields(data) {
        throw new NotImplementedException(
            this._validateRequiredFields.name
        )
    }
    _create(data) {
      /* 
      Padrão do Martin Fowler
      a proposta é garantir um fluxo de métodos, definindo uma sequência a ser executada

      esse create é a implementação efetiva do Template method
      */
      throw new NotImplementedException(
        this._create.name
      )
    }

    create(data) {
        const isValid = this._validateRequiredFields(data)
        if(!isValid) throw new Error('invalid data')

        return this._create(data)
    }
}