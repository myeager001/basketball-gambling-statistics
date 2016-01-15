
exports.seed = function(knex, Promise) {
  return Promise.all([
    // Deletes ALL existing entries
    knex('stats').del(),

    // Inserts seed entries
    knex('stats').insert({id: 1, name: 'boxScore', catagory: 'catagory1'}),
    knex('stats').insert({id: 2, name: 'compareEff', catagory: 'catagory1'}),
    knex('stats').insert({id: 3, name: 'pointsOverTime', catagory: 'catagory1'}),
    knex('stats').insert({id: 4, name: 'shotCharts', catagory: 'catagory1'}),
    knex('stats').insert({id: 5, name: 'sportsVu', catagory: 'catagory2'}),
    knex('stats').insert({id: 6, name: 'teamFourFactor', catagory: 'catagory2'}),
    knex('stats').insert({id: 7, name: 'teamMisc', catagory: 'catagory2'}),
    knex('stats').insert({id: 8, name: 'stat8', catagory: 'catagory2'}),
    knex('stats').insert({id: 9, name: 'stat9', catagory: 'catagory3'}),
    knex('stats').insert({id: 10, name: 'stat10', catagory: 'catagory3'}),
  ]);
};
