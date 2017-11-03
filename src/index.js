import './global.css';
import R from 'ramda';
import component from './components/main/main.component';

let element = component();
document.body.appendChild(element);

// alert('works')
const response = {
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

const debug = val => (console.log(val), val);
// const identity = x => x;
// const constant = x => y => x;
const compose = f => g => x => f(g(x));// B - combinator
const flip = f => a => b => f(b)(a);// C - combinator
// const apply = f => x => f(x);
// const substitution = f => x => z => f(z)(x(z));
// const cond = x => t => f => x ? t : f;
// const identity = substitution(constant)(constant);
// const identity = constant => constant => z => constant(z)(constant(z));
// identity(2) = constant => constant => 2 => constant(2)(constant(2));
// const W = f => x => f(f(x));
// Y = F => F(x => Y(F)(x));// Y - combinator

const scope = {
	errors: [],
	fields: []
};

//-------------- Object -------------------------------------
const arrayM = arr => arr && Array.isArray(arr) ? arr : [];
const objM = obj => Object(obj) === obj ? obj : {};

const getter = fb => prop => obj => obj && obj[prop] ? obj[prop] : fb;

const fieldGetter = fb => prop => obj => {
	const maybe = getter(fb)(prop)(obj);
	return !maybe.error && maybe.includes('valid_field') ? maybe : R.assoc('val', obj[prop], fb);
};
const selectedFlightGetter = fb => prop => obj => {
	const maybe = getter(fb)(prop)(obj);
	return !maybe.error ? obj : R.assoc('text', `flight isn\'t ${obj ? 'selected' : 'exists'}`, R.assoc('flight', obj, maybe));
};
//----------------------------------------------------------

const arrLensF = field => R.lens(getter([])(field), R.assoc(field));// fold
const objLensF = field => R.lens(getter({})(field), R.assoc(field));// fold


const parentLens = objLensF('parent');
const childLens = arrLensF('child');
const innerLens = arrLensF('inner');
const flightsLens = arrLensF('flights');
const fieldLens = R.lens(fieldGetter({error: true, text: 'bad data', field: 'field'})('field'), R.assoc('field'));
const selectedLens = R.lens(selectedFlightGetter({error: true, field: 'selected'})('selected'), R.assoc('selected'));

const childPath = R.compose(parentLens, childLens);
const flightsPath = R.compose(parentLens, flightsLens);

const childsGet = R.view(childPath);
const innersGet = R.view(innerLens);
const fieldGet = R.view(fieldLens);
const flightsGet = R.view(flightsPath);
const selectedGet = R.view(selectedLens);
//---------------------------------------------------------------------------------------------
// const getfieldsM = obj => R.flatten(R.map(compose(R.map(fieldGet))(innersGet))(childsGet(obj)));
// const getfieldsM = obj => compose(R.flatten)(R.map(compose(R.map(fieldGet))(innersGet)))(childsGet(obj));
// const getfieldsM = obj => compose(compose(R.flatten)(R.map(compose(R.map(fieldGet))(innersGet))))(childsGet)(obj);

// scope.parent.flights.
const getfieldsM = compose(compose(R.flatten)(R.map(compose(R.map(fieldGet))(innersGet))))(childsGet);
const fieldsM = getfieldsM(response);

childsGet(response).map(child => {
	innersGet(child).map(inner => {
		const maybe = fieldGet(inner); 
		maybe.error ? scope.errors.push(maybe) : scope.fields.push(maybe);
	});
});
//---------------------------------------------------------------------------------------------

// const childs = R.flatten(childsGet(obj).map(child => innersGet(child).map(field => fieldGet(field))));
// const childs = R.flatten(childsGet(obj).map(child => innersGet(child).map(fieldGet)));

// const childs = R.flatten(R.map(child => R.map(inner => fieldGet(inner), innersGet(child)), childsGet(obj)));
// const childs = R.flatten(R.map(child => R.map(inner => fieldGet(inner))(innersGet(child)))(childsGet(obj)));
// const childs = R.flatten(R.map(child => R.map(fieldGet)(innersGet(child)))(childsGet(obj)));
// const childs = R.flatten(R.map(child => compose(R.map(fieldGet))(innersGet)(child))(childsGet(obj)));
// chids -> inner -> fields
// R.flatten(R.map())
// const flights = R.flatten(R.map(R.map(R.map(selectedGet), arrayM), flightsGet(response)));
// // const childs = obj => R.flatten(compose(R.map(compose(R.map(fieldGet))(innersGet)))(childsGet)(obj));
scope.fieldsErrors = fieldsM.filter(data => data.error);
scope.fields = fieldsM.filter(data => !data.error);
// scope.flightsNotSelected = fieldsM.filter(data => data.error);
// scope.flights = flights.filter(data => !data.error);



console.dir(scope);
//-----------------------------------|IF EXAMPLE|----------------------------------------------------------

// const getVal = R.curry(R.view);
    // const DepartureDateGetter = R.lensPath(['flights', '0', 'flightSegmentInfo', '0', 'departureDate'];
    // const getDepartureDate = obj => R.curry(R.view)(R.lensPath(['flights', '0', 'flightSegmentInfo', '0', 'departureDate'])(obj);
    // const getDepartureDate = R.curry(R.view)(R.lensPath(['flights', '0', 'flightSegmentInfo', '0', 'departureDate']);
    // const getDepartureDate = getVal(DepartureDateGetter);
    // const departureDate = getDepartureDate(scope);

    // function getDepartureDate() {
    //   return scope.flights && scope.flights.length > 0 && scope.flights[0].flightSegmentInfo && scope.flights[0].flightSegmentInfo.length > 0 ?
    //     scope.flights[0].flightSegmentInfo[0].departureDate : null;
    // }

    // scope.departureDate = getDepartureDate();
    // scope.departureDate = getDepartureDate(scope.flights);
//--------------------------------------------------------------------------------
    // var temp = {...}

    // f() {
    // 	temp.map(...)
    // }

    // scope.g() {
    // 	...
    // 	if(...)f();
    // }

    // z() {
    // 	temp.field ? ...
    // }

    // scope.x() {
    // 	if(...)z()
    // }

//-----------------------------------------------------------------------------------

// if (isNeedSplitFlights()) {
//   var flights = [];

//   forEach(scope.flights, function (flight) {
//     if (isNeedSplitSoS(flight)) {
//       forEach(flight.flightSegmentInfo, function (flightSegmentInfo) {
//         if (flightSegmentInfo.selected) {
//           flights.push({
//             flightSegmentInfo: [flightSegmentInfo]
//           });
//         }
//       });
//     } else {
//       flights.push(flight);
//     }

//     scope.flights = flights;
//   });
// } else {
//   var mergedFlight = {
//     flightSegmentInfo: []
//   };

//   forEach(scope.flights, function (flight) {
//     forEach(flight.flightSegmentInfo, function (flightSegmentInfo) {
//       if (flightSegmentInfo.selected) {
//         mergedFlight.flightSegmentInfo.push(flightSegmentInfo);
//       }
//     });
//   });

//   scope.flights = [mergedFlight];
// }

// const rebuildFlights = flights => flights.map(flight => ({ flightSegmentInfo: flight.flightSegmentInfo.filter(segment => segment.selected)}));
// const rebuildFlights = flights => flights.map(flight => ({ flightSegmentInfo: _.filter(flight.flightSegmentInfo, segment => segment.selected)}));
// const rebuildFlights = flights => _.map(flights, flight => ({ flightSegmentInfo: _.filter(flight.flightSegmentInfo, segment => segment.selected)}));
const flippedMap = _flip(_.curry(_.map));
// const rebuildFlights = flights => map(flights)(flight => ({ flightSegmentInfo: _.filter(flight.flightSegmentInfo, segment => segment.selected)}));
// const rebuildFlights = flights => mapF(flight => ({ flightSegmentInfo: _.filter(flight.flightSegmentInfo, segment => segment.selected)}))(flights);
const rebuildFlights = flippedMap(flight => ({ flightSegmentInfo: _.filter(flight.flightSegmentInfo, segment => segment.selected)}));
const result = rebuildFlights(orig);