/* 
all facts are:
  simple single layer key val map
  no nested field allowed
each entry is about some certain facts
some facts may need N fact objs to represent it
such obj should be able to represent most of wt lang can represent?
advantages of this form comparing to text form:
  allows extra fields
    hv more/less details still works
  no restrictions on order
  better placing of args, funcs
  easier arg operations
    arg finding poss subs
*/
const facts = [
  {
    id: 1,
    user: 'c1',
    pos: 'room1',
    time: 0,
    wpn: 'kn',
  },
  {
    room: 'room1',
    hasTerm: true,
    time: -1,
  }
]

const rules = [
  {
    // this searchForm only specify which args are of same val. info about relationships like sum(), +1, -1, ... are not included. Those are to be checked in real subbing
    searchForm: {
      lhs: [
        {
          user: '$1',
          pos: '$2',
          time: '$3',
        },
        {
          room: '$2',
          time: '$4',
          hasTerm: true,
        },
      ],
      rhs: [
        {
          user: '$1',
          status: 'terminated',
          time: '$5',
        }
      ]
    },
    // use argConstraints for arg checking instead?
    argConstraints: [
      arg['$3'] == arg['$4'] + 1,
      arg['$3'] == arg['$5'] - 1
    ],
    generator: args => ({
      lhs: [
        {
          user: args.user,
          pos: args.pos,
          time: args.time,
        },
        {
          room: args.pos,
          time: args.time - 1,
          hasTerm: true,
        },
      ],
      rhs: [
        {
          user: args.user,
          status: 'terminated',
          time: args.time + 1,
        },
      ]
    })
  }
]