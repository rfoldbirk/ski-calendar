import feathers from '@feathersjs/feathers';
import '@feathersjs/transport-commons';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';

import type { Lang_Days, Lesson, Student, Team } from "../svelte/src/stores/types"

let teams: Team[] = [
    {
      title: "Børn Let øvet 7-14 årige",
      week: 5,
      students: [
        {
          "name": "Bjørk",
          "age": 11,
          "nr": "+4500000000",
        },
        {
          "name": "Johanna",
          "age": 7,
          "nr": "+4500000000",
        },
        {
          "name": "Johannes",
          "age": 9,
          "nr": "+4500000000",
        }
      ],
      lessons: [
        {
          "day": "Søndag",
          "start": "9:30",
          "end": "12:00",
        },
        {
          "day": "Mandag",
          "start": "9:00",
          "end": "11:30",
        },
        {
          "day": "Tirsdag",
          "start": "9:00",
          "end": "11:30",
        },
        {
          "day": "Torsdag",
          "start": "9:00",
          "end": "11:30",
        },
        {
          "day": "Fredag",
          "start": "9:00",
          "end": "11:30",
        }
      ]
    },
    {
      title: "Halv dag 9.00-12.00",
      week: 5,
      students: [
        {
          "name": "Allan Hoffmann",
          "age": 42,
          "nr": "+4500000000",
        },
        {
          "name": "Marie",
          "age": 8,
          "nr": "+4500000000",
        },
      ],
      lessons: [
        {
          "day": "Søndag",
          "start": "13:00",
          "end": "16:30",
        },
        {
          "day": "Mandag",
          "start": "13:00",
          "end": "16:30",
        },
      ]
    },
    {
      title: "Voksen begynder 15+ år",
      week: 6,
      students: [
        {
          "name": "Cindy Sha",
          "age": 37,
          "nr": "+4560557590",
        }
      ],
      lessons: [
        {
          "day": "Søndag",
          "start": "9:30",
          "end": "12:00",
        }
      ]
    },
    {
      title: "Privatlektion â 1 time",
      week: 6,
      students: [
        {
          "name": "Theo Bøgh",
          "age": 17,
          "nr": "+453154133",
        }
      ],
      lessons: [
        {
          "day": "Lørdag",
          "start": "10:00",
          "end": "11:00",
        },
        {
          "day": "Lørdag",
          "start": "13:00",
          "end": "15:00",
        }
      ]
    },
	{
		"title": "Træning",
		"week": 6,
		"students": [
			{
				"name": "Rasmus Foldberg",
				"age": 21,
				"nr": "+4560210409"
			}
		],
		"lessons": [
			{
				"day": "Tirsdag",
				"start": "14:15",
				"end": "16:15",
			},
			{
				"day": "Onsdag",
				"start": "10:00",
				"end": "12:00",
			},
			{
				"day": "Torsdag",
				"start": "13:00",
				"end": "15:00",
			}
		]
	},
  ];



class ScheduleService {
	async find () {
		return teams
	}

	async create (new_team: Team) {
		return 'ok'
	}
}


// Creates an ExpressJS compatible Feathers application
const app = express(feathers());

// Express middleware to parse HTTP JSON bodies
app.use(express.json());
// Express middleware to parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Express middleware to to host static files from the current folder
app.use(express.static(__dirname));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
// Register our messages service
app.use('/schedule', new ScheduleService());
// Express middleware with a nicer error handler
app.use(express.errorHandler());

// Add any new real-time connection to the `everybody` channel
app.on('connection', connection =>
app.channel('everybody').join(connection)
);
// Publish all events to the `everybody` channel
app.publish(data => app.channel('everybody'));

// Start the server
app.listen(3030).on('listening', () =>
	console.log('Feathers server listening on localhost:3030')
);


app.service('schedule').on('created', (team: Team) => {
	console.log('A new team has been created', team.title);
});