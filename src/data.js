export const response = {
    parent: {
      child: [
        {inner: [{field: 'valid_field1'}, {field: 'bad_field2'}, {field: 'valid_field3'}, false]},
        {inner: [{field: 'valid_field4'}, {field: 'valid_field5'}, {field: null}, {}]},
        {inner: [{field: 'valid_field7'}, {field: 'valid_field8'}, {field: 'valid_notfield9'}, true]},
        {},
        undefined,
        null,
        false
      ],
      child2: {
        child: [{field: 'valid_field11111'}, {field: 'valid22_field22222'}]
      },
      // flights: [],
      flights: [
        [{flightRPH: '1', selected: true},  {flightRPH: '2', selected: true},  {flightRPH: '3', selected: true}, null],
        [{flightRPH: '5', selected: true},  {flightRPH: '6', selected: true},  {flightRPH: '7', selected: true}],
        [{flightRPH: '8', selected: false}, {flightRPH: '9', selected: false}, {flightRPH: '10', selected: false}],
        [{flightRPH: '11', selected: true},  {flightRPH: '12', selected: null},  {flightRPH: '13', selected: true}],
        [{flightRPH: '14', selected: true},  {flightRPH: '15', selected: true},  {flightRPH: '16', selected: true}],
        null,
        false,
        [{flightRPH: '17', selected: false}, {flightRPH: '18', selected: false}, {flightRPH: '19', selected: false}],
        [{flightRPH: '20', selected: true},  {flightRPH: '21', selected: true},  {flightRPH: '22', selected: true}],
        [{flightRPH: '23', selected: false}, {flightRPH: '24', selected: false}, {flightRPH: '25', selected: false}],
        []
      ]
    }
  };