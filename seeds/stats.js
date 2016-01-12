
exports.seed = function(knex, Promise) {
  return Promise.all([
    // Deletes ALL existing entries
    knex('stats').del(),

    // Inserts seed entries
    knex('stats').insert({id: 1, name: 'stat1', catagory: 'catagory1'}),
    knex('stats').insert({id: 2, name: 'stat2', catagory: 'catagory1'}),
    knex('stats').insert({id: 3, name: 'stat3', catagory: 'catagory1'}),
    knex('stats').insert({id: 4, name: 'stat4', catagory: 'catagory1'}),
    knex('stats').insert({id: 5, name: 'stat5', catagory: 'catagory2'}),
    knex('stats').insert({id: 6, name: 'stat6', catagory: 'catagory2'}),
    knex('stats').insert({id: 7, name: 'stat7', catagory: 'catagory2'}),
    knex('stats').insert({id: 8, name: 'stat8', catagory: 'catagory2'}),
    knex('stats').insert({id: 9, name: 'stat9', catagory: 'catagory3'}),
    knex('stats').insert({id: 10, name: 'stat10', catagory: 'catagory3'}),
    knex('stats').insert({id: 11, name: 'stat11', catagory: 'catagory3'}),
    knex('stats').insert({id: 12, name: 'stat12', catagory: 'catagory3'}),
    knex('stats').insert({id: 13, name: 'stat13', catagory: 'catagory4'}),
    knex('stats').insert({id: 14, name: 'stat14', catagory: 'catagory4'}),
    knex('stats').insert({id: 15, name: 'stat15', catagory: 'catagory4'}),
    knex('stats').insert({id: 16, name: 'stat16', catagory: 'catagory4'}),
  ]);
};
