import { IRegisterMessages } from '../interfaces/register-messages.interface';

export const USER_MESSAGES: IRegisterMessages = {
    create: {
        failure: { error: true,  message: 'Erro ao criar Usuário' },
        success: { error: false, message: 'Usuário criado com sucesso' },
    },
    update: {
        failure: { error: true,  message: 'Erro ao atualizar Usuário' },
        success: { error: false, message: 'Usuário atualizado com sucesso' },
    },
    delete: {
        failure: { error: true,  message: 'Erro ao excluir Usuário' },
        success: { error: false, message: 'Usuário excluído com sucesso' },
    },
    invalidID:      { error: true, message: 'ID inválido' },
    incompleteData: { error: true, message: 'Dados incompletos' },
    alreadyExists:  { error: true, message: 'Usuário já cadastrado' },
    notFound:       { error: true, message: 'Usuário não encontrado' },
    noRecords:      { error: true, message: 'Sem registros na base de dados' },
};