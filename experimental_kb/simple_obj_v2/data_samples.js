const facts = {
  // type 1 facts
  userPosInfo: [
    {
      userID: 1,
      position: 'room1',
      time: 1,
    },
  ],
  // type 2 facts
  userItemsInfo: [
    {
      userID: 1,
      items: [
        {
          itemId: 1,
          name: 'key1',
        },
      ],
      time: 1,
    }
  ],
  speedInfo: [
    {
      userID: 1,
      speed: 1,
      time: 1,
    }
  ]
  // ...
}
/*
hv diff types
  each type hv diff set of attrs/fields
    equivalent to tables?
    hv joiner attr/cols that can connect / relate records of diff types?
*/

/*
gRule records / data are for gRule handling functions to use and try sub/instantiate on facts data
*/

// gRules with type info
const gRules = [
  {
    lhs: [
      {
        type: 'userPosInfo',
        data: {
          userID: '$1',
          position: '$2',
          time: '$3',
        }
      },
      {
        type: 'userItemsInfo',
        data: {
          userID: '$1',
          position: '$4',
          time: '$6',
        }
      },
    ],
    rhs: [
      {
        type: 'userPosInfo',
        data: {
          userID: '$1',
          items: [],
          time: '$3',
        }
      },
    ],
    argConstraints: [
      args => args['$5'] > args['$3']
    ],
    argDeterm: {
      $6: args => args['$5'] + 10,
      // args: args map obj
    }
    /*
      generator is not needed as after argMap is all filled (must be all filled in order to pass arg constraints checking), can already instantiate the gRule and obtained the RHS
      argDeterm is needed as some args, e.g. args in rhs, may not hv argMap filled
      
      args may not only exist in obj vals, may also exist in obj keys?
        this is done properly in simple text v4
    */
  }
]