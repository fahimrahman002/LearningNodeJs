const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
var courseData = require("./dummyData.js");
//GraphQL Schema
var schema = buildSchema(`
        type Query{
        course(id:Int!):Course
        courses(topic:String):[Course]
        }
        type Mutation{
            updateCourseTopic(id:Int!,topic:String!):Course
        }
        type Course{
            id:Int
            title:String
            author:String
            description:String
            topic:String
            url:String
        }
    `);

var getSingleCourse = function (args) {
  var id = args.id;
  return courseData.filter((course) => {
    return course.id == id;
  })[0];
};
var getCourses = function (args) {
  if (args.topic) {
    var topic = args.topic;
    return courseData.filter((course) => {
      return course.topic === topic;
    });
  } else {
    return courseData;
  }
};
var updateCourseTopic = function ({ id, topic }) {
  courseData.map((course) => {
    if (course.id === id) {
      course.topic = topic;
      return course;
    }
  });
  return courseData.filter((course) => {
    return course.id == id;
  })[0];
};

var root = {
  course: getSingleCourse,
  courses: getCourses,
  updateCourseTopic: updateCourseTopic,
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(8000, () => {
  console.log("Listening port 8000");
});
