import createAction from '@dooksa/create-action'

export default createAction('select-edit-modal', [
  {
    set_dataValue: {
      name: 'component/items',
      value: {
        id: 'modal-section-edit',
        isTemplate: true
      }
    }
  },
  {
    get_blockValue: {
      value: {
        get_sequenceValue: '0'
      },
      query: 'id'
    }
  },
  {
    set_actionValue: {
      id: {
        get_sequenceValue: '1'
      },
      values: [
        {
          id: 'componentId',
          value: {
            get_actionValue: {
              id: {
                get_contextValue: 'rootId'
              },
              query: 'componentId'
            }
          }
        }
      ]
    }
  },
  {
    set_dataValue: {
      name: 'component/children',
      value: {
        get_sequenceValue: '1'
      },
      options: {
        id: 'root',
        update: {
          method: 'unshift'
        }
      }
    }
  },
  {
    bootstrapModal_create: {
      id: {
        get_sequenceValue: '1'
      }
    }
  },
  {
    bootstrapModal_show: {
      id: {
        get_sequenceValue: '1'
      }
    }
  }
])
