export default class Marketing {
    update({ id, username}) {
        // update é responsável por gerenciar seus erros
        // não deve-se ter await no notify porque a responsabilidade do notify é só emitir eventos
        // só notificar todo mundo
        console.log(`[${id}]: [marketing] will send an welcome e-mail to ${username}`)
    }
}