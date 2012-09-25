////////// Shared code (client and server) //////////

Games = new Meteor.Collection('games');
// { word: ['Refrigerator'], players: [player_id],
// winner: player_id, state: 'pending'}
// state is one of: 'pending', 'playing', 'completed'

Players = new Meteor.Collection('players');
// {name: 'matt', state: 'lobby', idle: false, keepalive: 010203003302}
// state is one of: 'lobby', 'waiting', 'playing', 'completed'

SecretWord = new Meteor.Collection('secretword');
// {player_id: 10, game_id: 123, word: '', state: 'good'}

Guesses = new Meteor.Collection('guesses');
// {player_id: 10, game_id: 123}




// { 
//
//}
//
