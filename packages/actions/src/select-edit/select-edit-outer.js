import createAction from '@dooksa/create-action'

export default createAction('select-edit-outer', [
  {
    get_dataValue: {
      name: 'component/children',
      query: {
        id: {
          get_contextValue: 'id'
        }
      }
    }
  },
  {
    eval_condition: {
      if: [{
        op: '>',
        from: {
          get_blockValue: {
            value: {
              get_sequenceValue: '0'
            },
            query: 'length'
          }
        },
        to: 0
      }],
      then: [2, 3],
      else: []
    }
  },
  {
    list_forEach: {
      async: true,
      items: {
        get_sequenceValue: '0'
      },
      context: {
        get_contextValue: '$null'
      },
      actionId: 'select-edit-outer-iterate'
    }
  },
  {
    set_dataValue: {
      name: 'component/children',
      value: {
        get_sequenceValue: '2'
      },
      options: {
        id: {
          get_contextValue: 'id'
        }
      }
    }
  }
], ['select-edit-outer-iterate'])
