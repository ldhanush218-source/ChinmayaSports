const Team = require('../models/Team');

const DEFAULT_TEAMS = {
  football: [
    {
      name: 'Gandhi',
      players: [
        { number: 1, name: 'Rohan Mehta', role: 'GK', captain: true, viceCaptain: false },
        { number: 2, name: 'Varun Bose', role: 'RB', captain: false, viceCaptain: true },
        { number: 3, name: 'Dev Gupta', role: 'CB', captain: false, viceCaptain: false },
        { number: 4, name: 'Amit Roy', role: 'LB', captain: false, viceCaptain: false },
        { number: 5, name: 'Rohit Menon', role: 'CDM', captain: false, viceCaptain: false },
        { number: 6, name: 'Vivek Sharma', role: 'CM', captain: false, viceCaptain: false },
        { number: 7, name: 'Subodh Rao', role: 'CAM', captain: false, viceCaptain: false },
        { number: 8, name: 'Manoj Vyas', role: 'LW', captain: false, viceCaptain: false },
        { number: 9, name: 'Sujith Lal', role: 'RW', captain: false, viceCaptain: false },
        { number: 10, name: 'Karthik Raja', role: 'ST', captain: false, viceCaptain: false },
        { number: 11, name: 'Anand Kumar', role: 'ST', captain: false, viceCaptain: false }
      ]
    },
    {
      name: 'Nehru',
      players: [
        { number: 1, name: 'Kabir Saxena', role: 'GK', captain: true, viceCaptain: false },
        { number: 2, name: 'Kunal Verma', role: 'RB', captain: false, viceCaptain: true },
        { number: 3, name: 'Sanjay Patel', role: 'CB', captain: false, viceCaptain: false },
        { number: 4, name: 'Deepak Nair', role: 'LB', captain: false, viceCaptain: false },
        { number: 5, name: 'Piyush Pal', role: 'CDM', captain: false, viceCaptain: false },
        { number: 6, name: 'Ajay Jose', role: 'CM', captain: false, viceCaptain: false },
        { number: 7, name: 'Vikram Singh', role: 'CAM', captain: false, viceCaptain: false },
        { number: 8, name: 'Suraj Joshi', role: 'LW', captain: false, viceCaptain: false },
        { number: 9, name: 'Rahul Sen', role: 'RW', captain: false, viceCaptain: false },
        { number: 10, name: 'Arjun Das', role: 'ST', captain: false, viceCaptain: false },
        { number: 11, name: 'Nikhil Iyer', role: 'ST', captain: false, viceCaptain: false }
      ]
    },
    {
      name: 'Tagore',
      players: [
        { number: 1, name: 'Yash Vardhan', role: 'GK', captain: true, viceCaptain: false },
        { number: 2, name: 'Sameer Khan', role: 'RB', captain: false, viceCaptain: true },
        { number: 3, name: 'Aditya Varma', role: 'CB', captain: false, viceCaptain: false },
        { number: 4, name: 'Harsh Chhabra', role: 'LB', captain: false, viceCaptain: false },
        { number: 5, name: 'Rahul Dravid', role: 'CDM', captain: false, viceCaptain: false },
        { number: 6, name: 'Ishan Kishan', role: 'CM', captain: false, viceCaptain: false },
        { number: 7, name: 'Shreyas Iyer', role: 'CAM', captain: false, viceCaptain: false },
        { number: 8, name: 'Rinku Singh', role: 'LW', captain: false, viceCaptain: false },
        { number: 9, name: 'Jasprit Bumrah', role: 'RW', captain: false, viceCaptain: false },
        { number: 10, name: 'Mohammed Siraj', role: 'ST', captain: false, viceCaptain: false },
        { number: 11, name: 'Yuzvendra Chahal', role: 'ST', captain: false, viceCaptain: false }
      ]
    },
    {
      name: 'Bose',
      players: [
        { number: 1, name: 'Chetan Kumar', role: 'GK', captain: true, viceCaptain: false },
        { number: 2, name: 'Tarun Malhotra', role: 'RB', captain: false, viceCaptain: true },
        { number: 3, name: 'Abhinav Bindra', role: 'CB', captain: false, viceCaptain: false },
        { number: 4, name: 'Neeraj Chopra', role: 'LB', captain: false, viceCaptain: false },
        { number: 5, name: 'Sunil Chhetri', role: 'CDM', captain: false, viceCaptain: false },
        { number: 6, name: 'Gurpreet Singh', role: 'CM', captain: false, viceCaptain: false },
        { number: 7, name: 'Sandesh Jhingan', role: 'CAM', captain: false, viceCaptain: false },
        { number: 8, name: 'Anirudh Thapa', role: 'LW', captain: false, viceCaptain: false },
        { number: 9, name: 'Lallianzuala Chhangte', role: 'RW', captain: false, viceCaptain: false },
        { number: 10, name: 'Sahal Samad', role: 'ST', captain: false, viceCaptain: false },
        { number: 11, name: 'Liston Colaco', role: 'ST', captain: false, viceCaptain: false }
      ]
    }
  ],

  cricket: [
    {
      name: 'Gandhi',
      players: [
        { number: 1, name: 'Rohan Mehta', role: 'Batsman', captain: true, viceCaptain: false },
        { number: 2, name: 'Varun Bose', role: 'Wicket-keeper', captain: false, viceCaptain: true },
        { number: 3, name: 'Dev Gupta', role: 'All-rounder', captain: false, viceCaptain: false },
        { number: 4, name: 'Amit Roy', role: 'Batsman', captain: false, viceCaptain: false },
        { number: 5, name: 'Rohit Menon', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 6, name: 'Vivek Sharma', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 7, name: 'Subodh Rao', role: 'Batsman', captain: false, viceCaptain: false },
        { number: 8, name: 'Manoj Vyas', role: 'All-rounder', captain: false, viceCaptain: false },
        { number: 9, name: 'Sujith Lal', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 10, name: 'Karthik Raja', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 11, name: 'Anand Kumar', role: 'Batsman', captain: false, viceCaptain: false }
      ]
    },
    {
      name: 'Nehru',
      players: [
        { number: 1, name: 'Kabir Saxena', role: 'Batsman', captain: true, viceCaptain: false },
        { number: 2, name: 'Kunal Verma', role: 'Wicket-keeper', captain: false, viceCaptain: true },
        { number: 3, name: 'Sanjay Patel', role: 'All-rounder', captain: false, viceCaptain: false },
        { number: 4, name: 'Deepak Nair', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 5, name: 'Piyush Pal', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 6, name: 'Ajay Jose', role: 'Batsman', captain: false, viceCaptain: false },
        { number: 7, name: 'Vikram Singh', role: 'All-rounder', captain: false, viceCaptain: false },
        { number: 8, name: 'Suraj Joshi', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 9, name: 'Rahul Sen', role: 'Batsman', captain: false, viceCaptain: false },
        { number: 10, name: 'Arjun Das', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 11, name: 'Nikhil Iyer', role: 'Batsman', captain: false, viceCaptain: false }
      ]
    },
    {
      name: 'Tagore',
      players: [
        { number: 1, name: 'Yash Vardhan', role: 'Batsman', captain: true, viceCaptain: false },
        { number: 2, name: 'Sameer Khan', role: 'Wicket-keeper', captain: false, viceCaptain: true },
        { number: 3, name: 'Aditya Varma', role: 'All-rounder', captain: false, viceCaptain: false },
        { number: 4, name: 'Harsh Chhabra', role: 'Batsman', captain: false, viceCaptain: false },
        { number: 5, name: 'Rahul Dravid', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 6, name: 'Ishan Kishan', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 7, name: 'Shreyas Iyer', role: 'Batsman', captain: false, viceCaptain: false },
        { number: 8, name: 'Rinku Singh', role: 'All-rounder', captain: false, viceCaptain: false },
        { number: 9, name: 'Jasprit Bumrah', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 10, name: 'Mohammed Siraj', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 11, name: 'Yuzvendra Chahal', role: 'Batsman', captain: false, viceCaptain: false }
      ]
    },
    {
      name: 'Bose',
      players: [
        { number: 1, name: 'Chetan Kumar', role: 'Batsman', captain: true, viceCaptain: false },
        { number: 2, name: 'Tarun Malhotra', role: 'Wicket-keeper', captain: false, viceCaptain: true },
        { number: 3, name: 'Abhinav Bindra', role: 'All-rounder', captain: false, viceCaptain: false },
        { number: 4, name: 'Neeraj Chopra', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 5, name: 'Sunil Chhetri', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 6, name: 'Gurpreet Singh', role: 'Batsman', captain: false, viceCaptain: false },
        { number: 7, name: 'Sandesh Jhingan', role: 'All-rounder', captain: false, viceCaptain: false },
        { number: 8, name: 'Anirudh Thapa', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 9, name: 'Lallianzuala Chhangte', role: 'Batsman', captain: false, viceCaptain: false },
        { number: 10, name: 'Sahal Samad', role: 'Bowler', captain: false, viceCaptain: false },
        { number: 11, name: 'Liston Colaco', role: 'Batsman', captain: false, viceCaptain: false }
      ]
    }
  ],

  hockey: [
    {
      name: 'Gandhi',
      players: [
        { number: 1, name: 'Rohan Mehta', role: 'Goalkeeper', captain: true, viceCaptain: false },
        { number: 2, name: 'Varun Bose', role: 'Defender', captain: false, viceCaptain: true },
        { number: 3, name: 'Dev Gupta', role: 'Defender', captain: false, viceCaptain: false },
        { number: 4, name: 'Amit Roy', role: 'Midfielder', captain: false, viceCaptain: false },
        { number: 5, name: 'Rohit Menon', role: 'Midfielder', captain: false, viceCaptain: false },
        { number: 6, name: 'Vivek Sharma', role: 'Forward', captain: false, viceCaptain: false },
        { number: 7, name: 'Subodh Rao', role: 'Forward', captain: false, viceCaptain: false },
        { number: 8, name: 'Manoj Vyas', role: 'Defender', captain: false, viceCaptain: false },
        { number: 9, name: 'Sujith Lal', role: 'Midfielder', captain: false, viceCaptain: false },
        { number: 10, name: 'Karthik Raja', role: 'Forward', captain: false, viceCaptain: false },
        { number: 11, name: 'Anand Kumar', role: 'Forward', captain: false, viceCaptain: false }
      ]
    },
    {
      name: 'Nehru',
      players: [
        { number: 1, name: 'Kabir Saxena', role: 'Goalkeeper', captain: true, viceCaptain: false },
        { number: 2, name: 'Kunal Verma', role: 'Defender', captain: false, viceCaptain: true },
        { number: 3, name: 'Sanjay Patel', role: 'Defender', captain: false, viceCaptain: false },
        { number: 4, name: 'Deepak Nair', role: 'Midfielder', captain: false, viceCaptain: false },
        { number: 5, name: 'Piyush Pal', role: 'Midfielder', captain: false, viceCaptain: false },
        { number: 6, name: 'Ajay Jose', role: 'Forward', captain: false, viceCaptain: false },
        { number: 7, name: 'Vikram Singh', role: 'Forward', captain: false, viceCaptain: false },
        { number: 8, name: 'Suraj Joshi', role: 'Defender', captain: false, viceCaptain: false },
        { number: 9, name: 'Rahul Sen', role: 'Midfielder', captain: false, viceCaptain: false },
        { number: 10, name: 'Arjun Das', role: 'Forward', captain: false, viceCaptain: false },
        { number: 11, name: 'Nikhil Iyer', role: 'Forward', captain: false, viceCaptain: false }
      ]
    },
    {
      name: 'Tagore',
      players: [
        { number: 1, name: 'Yash Vardhan', role: 'Goalkeeper', captain: true, viceCaptain: false },
        { number: 2, name: 'Sameer Khan', role: 'Defender', captain: false, viceCaptain: true },
        { number: 3, name: 'Aditya Varma', role: 'Defender', captain: false, viceCaptain: false },
        { number: 4, name: 'Harsh Chhabra', role: 'Midfielder', captain: false, viceCaptain: false },
        { number: 5, name: 'Rahul Dravid', role: 'Midfielder', captain: false, viceCaptain: false },
        { number: 6, name: 'Ishan Kishan', role: 'Forward', captain: false, viceCaptain: false },
        { number: 7, name: 'Shreyas Iyer', role: 'Forward', captain: false, viceCaptain: false },
        { number: 8, name: 'Rinku Singh', role: 'Defender', captain: false, viceCaptain: false },
        { number: 9, name: 'Jasprit Bumrah', role: 'Midfielder', captain: false, viceCaptain: false },
        { number: 10, name: 'Mohammed Siraj', role: 'Forward', captain: false, viceCaptain: false },
        { number: 11, name: 'Yuzvendra Chahal', role: 'Forward', captain: false, viceCaptain: false }
      ]
    },
    {
      name: 'Bose',
      players: [
        { number: 1, name: 'Chetan Kumar', role: 'Goalkeeper', captain: true, viceCaptain: false },
        { number: 2, name: 'Tarun Malhotra', role: 'Defender', captain: false, viceCaptain: true },
        { number: 3, name: 'Abhinav Bindra', role: 'Defender', captain: false, viceCaptain: false },
        { number: 4, name: 'Neeraj Chopra', role: 'Midfielder', captain: false, viceCaptain: false },
        { number: 5, name: 'Sunil Chhetri', role: 'Midfielder', captain: false, viceCaptain: false },
        { number: 6, name: 'Gurpreet Singh', role: 'Forward', captain: false, viceCaptain: false },
        { number: 7, name: 'Sandesh Jhingan', role: 'Forward', captain: false, viceCaptain: false },
        { number: 8, name: 'Anirudh Thapa', role: 'Defender', captain: false, viceCaptain: false },
        { number: 9, name: 'Lallianzuala Chhangte', role: 'Midfielder', captain: false, viceCaptain: false },
        { number: 10, name: 'Sahal Samad', role: 'Forward', captain: false, viceCaptain: false },
        { number: 11, name: 'Liston Colaco', role: 'Forward', captain: false, viceCaptain: false }
      ]
    }
  ],

  volleyball: [
    {
      name: 'Gandhi',
      players: [
        { number: 1, name: 'Rohan Mehta', role: 'Setter', captain: true, viceCaptain: false },
        { number: 2, name: 'Varun Bose', role: 'Outside Hitter', captain: false, viceCaptain: true },
        { number: 3, name: 'Dev Gupta', role: 'Opposite Hitter', captain: false, viceCaptain: false },
        { number: 4, name: 'Amit Roy', role: 'Middle Blocker', captain: false, viceCaptain: false },
        { number: 5, name: 'Rohit Menon', role: 'Middle Blocker', captain: false, viceCaptain: false },
        { number: 6, name: 'Vivek Sharma', role: 'Libero', captain: false, viceCaptain: false }
      ]
    },
    {
      name: 'Nehru',
      players: [
        { number: 1, name: 'Kabir Saxena', role: 'Setter', captain: true, viceCaptain: false },
        { number: 2, name: 'Kunal Verma', role: 'Outside Hitter', captain: false, viceCaptain: true },
        { number: 3, name: 'Sanjay Patel', role: 'Opposite Hitter', captain: false, viceCaptain: false },
        { number: 4, name: 'Deepak Nair', role: 'Middle Blocker', captain: false, viceCaptain: false },
        { number: 5, name: 'Piyush Pal', role: 'Middle Blocker', captain: false, viceCaptain: false },
        { number: 6, name: 'Ajay Jose', role: 'Libero', captain: false, viceCaptain: false }
      ]
    },
    {
      name: 'Tagore',
      players: [
        { number: 1, name: 'Yash Vardhan', role: 'Setter', captain: true, viceCaptain: false },
        { number: 2, name: 'Sameer Khan', role: 'Outside Hitter', captain: false, viceCaptain: true },
        { number: 3, name: 'Aditya Varma', role: 'Opposite Hitter', captain: false, viceCaptain: false },
        { number: 4, name: 'Harsh Chhabra', role: 'Middle Blocker', captain: false, viceCaptain: false },
        { number: 5, name: 'Rahul Dravid', role: 'Middle Blocker', captain: false, viceCaptain: false },
        { number: 6, name: 'Ishan Kishan', role: 'Libero', captain: false, viceCaptain: false }
      ]
    },
    {
      name: 'Bose',
      players: [
        { number: 1, name: 'Chetan Kumar', role: 'Setter', captain: true, viceCaptain: false },
        { number: 2, name: 'Tarun Malhotra', role: 'Outside Hitter', captain: false, viceCaptain: true },
        { number: 3, name: 'Abhinav Bindra', role: 'Opposite Hitter', captain: false, viceCaptain: false },
        { number: 4, name: 'Neeraj Chopra', role: 'Middle Blocker', captain: false, viceCaptain: false },
        { number: 5, name: 'Sunil Chhetri', role: 'Middle Blocker', captain: false, viceCaptain: false },
        { number: 6, name: 'Gurpreet Singh', role: 'Libero', captain: false, viceCaptain: false }
      ]
    }
  ],

  basketball: [
    {
      name: 'Gandhi',
      players: [
        { number: 4, name: 'Rohan Mehta', role: 'Point Guard', captain: true, viceCaptain: false },
        { number: 5, name: 'Varun Bose', role: 'Shooting Guard', captain: false, viceCaptain: true },
        { number: 7, name: 'Dev Gupta', role: 'Small Forward', captain: false, viceCaptain: false },
        { number: 9, name: 'Amit Roy', role: 'Power Forward', captain: false, viceCaptain: false },
        { number: 11, name: 'Rohit Menon', role: 'Center', captain: false, viceCaptain: false }
      ]
    },
    {
      name: 'Nehru',
      players: [
        { number: 4, name: 'Kabir Saxena', role: 'Point Guard', captain: true, viceCaptain: false },
        { number: 5, name: 'Kunal Verma', role: 'Shooting Guard', captain: false, viceCaptain: true },
        { number: 7, name: 'Sanjay Patel', role: 'Small Forward', captain: false, viceCaptain: false },
        { number: 9, name: 'Deepak Nair', role: 'Power Forward', captain: false, viceCaptain: false },
        { number: 11, name: 'Piyush Pal', role: 'Center', captain: false, viceCaptain: false }
      ]
    },
    {
      name: 'Tagore',
      players: [
        { number: 4, name: 'Yash Vardhan', role: 'Point Guard', captain: true, viceCaptain: false },
        { number: 5, name: 'Sameer Khan', role: 'Shooting Guard', captain: false, viceCaptain: true },
        { number: 7, name: 'Aditya Varma', role: 'Small Forward', captain: false, viceCaptain: false },
        { number: 9, name: 'Harsh Chhabra', role: 'Power Forward', captain: false, viceCaptain: false },
        { number: 11, name: 'Rahul Dravid', role: 'Center', captain: false, viceCaptain: false }
      ]
    },
    {
      name: 'Bose',
      players: [
        { number: 4, name: 'Chetan Kumar', role: 'Point Guard', captain: true, viceCaptain: false },
        { number: 5, name: 'Tarun Malhotra', role: 'Shooting Guard', captain: false, viceCaptain: true },
        { number: 7, name: 'Abhinav Bindra', role: 'Small Forward', captain: false, viceCaptain: false },
        { number: 9, name: 'Neeraj Chopra', role: 'Power Forward', captain: false, viceCaptain: false },
        { number: 11, name: 'Sunil Chhetri', role: 'Center', captain: false, viceCaptain: false }
      ]
    }
  ],

  badminton: [
    {
      name: 'Gandhi',
      category: 'Singles',
      players: [
        { number: 1, name: 'Rohan Mehta', role: 'Singles Player', captain: true, viceCaptain: false }
      ]
    },
    {
      name: 'Nehru',
      category: 'Singles',
      players: [
        { number: 1, name: 'Kabir Saxena', role: 'Singles Player', captain: true, viceCaptain: false }
      ]
    },
    {
      name: 'Tagore',
      category: 'Singles',
      players: [
        { number: 1, name: 'Yash Vardhan', role: 'Singles Player', captain: true, viceCaptain: false }
      ]
    },
    {
      name: 'Bose',
      category: 'Singles',
      players: [
        { number: 1, name: 'Chetan Kumar', role: 'Singles Player', captain: true, viceCaptain: false }
      ]
    }
  ],

  athletics: [
    {
      name: 'Gandhi',
      house: 'Gandhi',
      events: ['100m', '200m', '400m'],
      players: [
        { number: 1, name: 'Rohan Mehta', role: '100m Sprint', captain: true, viceCaptain: false },
        { number: 2, name: 'Varun Bose', role: '200m Sprint', captain: false, viceCaptain: true }
      ]
    },
    {
      name: 'Nehru',
      house: 'Nehru',
      events: ['100m', '200m', '400m'],
      players: [
        { number: 1, name: 'Kabir Saxena', role: '100m Sprint', captain: true, viceCaptain: false },
        { number: 2, name: 'Kunal Verma', role: '200m Sprint', captain: false, viceCaptain: true }
      ]
    },
    {
      name: 'Tagore',
      house: 'Tagore',
      events: ['100m', '200m', '400m'],
      players: [
        { number: 1, name: 'Yash Vardhan', role: '100m Sprint', captain: true, viceCaptain: false },
        { number: 2, name: 'Sameer Khan', role: '200m Sprint', captain: false, viceCaptain: true }
      ]
    },
    {
      name: 'Bose',
      house: 'Bose',
      events: ['100m', '200m', '400m'],
      players: [
        { number: 1, name: 'Chetan Kumar', role: '100m Sprint', captain: true, viceCaptain: false },
        { number: 2, name: 'Tarun Malhotra', role: '200m Sprint', captain: false, viceCaptain: true }
      ]
    }
  ]
};

async function seedDefaultTeams() {
  try {
    for (const [sport, teams] of Object.entries(DEFAULT_TEAMS)) {
      for (const t of teams) {
        const exists = await Team.findOne({ sport, name: t.name });
        if (!exists) {
          await Team.create({ ...t, sport });
          console.log(`🌱 Seeded team "${t.name}" for ${sport}`);
        }
      }
    }
  } catch (err) {
    console.error('Error seeding default teams:', err.message);
  }
}

module.exports = seedDefaultTeams;
