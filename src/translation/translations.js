import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: {
    WELCOME: 'Welcome to Localization',
    BUTTON: 'b en',
    title: 'Title',
    local: 'Local',
    desc: 'Description',
    date: 'Date',
    delete: 'Delete',
    delnote: 'Delete a note',
    edit: 'Edit',
    noteslist: 'Note Lists',
    loaddata: 'Load data',
    alertitem: 'You a pressed a note',
    yes: 'Yes',
    no: 'No',
    cancel: 'Cancel',
    failid: 'Failed to delete note with id =',
    dialogup: 'Update Note',
    dialogadd: 'Add note',
    dialogalerttitle: 'Please enter note Title',
    dialogalertlocal: 'Please enter note Local',
    dialogalertdesc: 'Please enter note description',
    fillFields: 'Fill all fields before continuing!',
    personalNotes: 'Personal Notes'
  },
  pt: {
    WELCOME: 'Bem-vindo à multi-lingua',
    BUTTON: 'b pt',
    title: 'Título',
    local: 'Local',
    desc: 'Descrição',
    date: 'Data',
    delete: 'Apagar',
    delnote: 'Apagar nota',
    edit: 'Editar',
    noteslist: 'Lista de Notas',
    loaddata: 'Carregar dados',
    alertitem: 'Selecionaste uma nota',
    yes: 'Sim',
    no: 'Não',
    cancel: 'Cancelar',
    failid: 'Erro ao apagar note com id =',
    dialogup: 'Editar nota',
    dialogadd: 'Adicionar nota',
    dialogalerttitle: 'Introduza título da nota',
    dialogalertlocal: 'Introduza local da nota',
    dialogalertdesc: 'Introduza descrição da nota',
    fillFields: 'Preencha todos os campos para continuar!',
    personalNotes: 'Notas Pessoais'
  }
};
export default new LocalizedStrings(translations);
