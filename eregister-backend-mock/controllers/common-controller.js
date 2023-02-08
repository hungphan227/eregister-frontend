const METHOD_TYPE = require("./method-type")

const commonController = []

function addMethod(methodType, uri, handler) {
  commonController.push({
    methodType: methodType,
    uri: uri,
    handler: handler
  })
}

addMethod(METHOD_TYPE.GET, "/eregister-service/get-client-session-id", async (req, res) => {
  const result = {}
  res.status(200).send(result)
})

addMethod(METHOD_TYPE.POST, "/user/login", async (req,res) => {
  const result = {
    token: "abc"
  }
  res.status(200).send(result)
})

addMethod(METHOD_TYPE.GET, "/user/check-authentication", async (req, res) => {
  const result = {}
  res.status(200).send(result)
})

addMethod(METHOD_TYPE.GET, "/eregister-service/courses", async (req, res) => {
  const result = [
    {
      id: 1,
      courseNumber: "DSA",
      courseName: "Data Structure and Algorithms",
      limit: 1,
      remainingSlots: 1,
      teacher: "Edsger Dijkstra",
      description: "asdsa asdoasd fdjdjf",
      image: "data-structure-and-algorithm.png"
    },
    {
      id: 2,
      courseNumber: "OOP",
      courseName: "Object Oriented Programming",
      limit: 4,
      remainingSlots: 1,
      teacher: "James Gosling",
      description: "asdsa asdoasd fdjdjf",
      image: "object-oriented-programming.png"
    }
  ]
  res.status(200).send(result)
})

addMethod(METHOD_TYPE.GET, "/eregister-service/course/get-courses-of-student", async (req, res) => {
  const result = [
    {
      id: 1,
      courseNumber: "DSA",
      courseName: "Data Structure and Algorithms",
      limit: 1,
      teacher: "Edsger Dijkstra",
      description: "asdsa asdoasd fdjdjf",
      image: "data-structure-and-algorithm.png"
    }
  ]
  res.status(200).send(result)
})

addMethod(METHOD_TYPE.GET, "/eregister-service/course/:courseId", async (req, res) => {
  const result = {
    id: 1,
    courseNumber: "DSA",
    courseName: "Data Structure and Algorithms",
    limit: 1,
    remainingSlots: 1,
    teacher: "Edsger Dijkstra",
    description: "asdsa asdoasd fdjdjf"
  }
  res.status(200).send(result)
})

module.exports = commonController
