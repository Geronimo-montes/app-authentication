/**
 * Listado privilegios por usuario a los recursos del sistema
 */
export const ACCESS_CONTROL = {
  accessControl: {
    admin: {
      control: ['*'],
      view: ['*'],
      create: ['*'],
      edit: ['*'],
      add: ['*'],
      delete: ['*'],
      update_data_list: ['*'],
    }
  }
}