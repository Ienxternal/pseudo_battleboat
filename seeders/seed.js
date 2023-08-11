const { graphql } = require('graphql');
const db = require('../config/connection');
const { Thought } = require('../models');
const thoughtSeeds = require('./thoughtSeeds.json');

db.once('open', async () => {
  await Thought.deleteMany({});
  await Thought.create(thoughtSeeds);

  console.log('all done!');
  process.exit(0);
});


// Use to create query on graphql
// mutation {
//   addThought(thoughtText: "New Thought Text", thoughtAuthor: "New Thought Author") {
//     _id
//     thoughtText
//     thoughtAuthor
//     createdAt
//     comments {
//       _id
//       commentText
//       createdAt
//     }
//   }
// }
