import express from "express"; // import backend JS framework
const app = express();
const router = express.Router();
app.use(express.json()); // initialise server for use with JSON

import action from "./actions.js"; // imports actions defined in action.js file

app.use(function (req, res, next) {
  // sets http headers to allow front-end to send and receive content from server
  res.header("Access-Control-Allow-Origin", "*"); // sets access IP addresses
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

// REJECT WITH 401 UNAUTHORIZED

router.get("/auth/:username/:password", function (req, res) { // GET HTTP request with 'authUser' route
                                                                  // takes username and password as parameters
  console.log("GET request to authenticate user: " + req.params.username)
  action.authUser(req.params.username, req.params.password, function (verification) { // authUser action called from action.js
    res.status(200).json({ // response if username found
      "status": 200,
      "statusText": "OK",
      "message": `The user: ${req.params.username} was found. Verification returned ${verification}`,
      "username": req.params.username,
      "userMatch": true, // true if username was found
      "passwordMatch": verification // password match status is returned from authUser action
    });
  }, function (err) {
    if (err === "errNotFound") { // if error type is known
      res.status(404).json({ // response if username not found
        "status": 404,
        "statusText": "NOT FOUND",
        "message": `The user: ${req.params.username} could not be found.`,
        "username": req.params.username,
        "userMatch": false, // false if username not found
        "passwordMatch": false // false as username not found
      });
    } else { // if error type unexpected
      console.log(err)
    }
  })
})

router.post("/auth/:username/:password", function (req, res) { // POST HTTP request with 'createUser' route
  console.log(`POST request to create new user: ${req.params.username}`)
  action.createUser(req.params.username, req.params.password, function (newUsername) { // createUser action called from action.js
    res.status(201).json({ // response if successful
      "status": 201,
      "statusText": "CREATED",
      "message": `New user added: ${newUsername}`,
      "username": newUsername,
      "userMatch": true,
      "passwordMatch": true // authenticates newly created user
    });
  }, function (err) {
    if (err === "errUserExists") { // if error type expected
      res.status(406).json({ // response if request invalid because username already exists
        "status": 406,
        "statusText": "NOT ACCEPTABLE",
        "message": `The user: ${req.params.username} already exists`,
        "username": req.params.username,
        "userMatch": false,
        "passwordMatch": false,
        "exists": true
      });
    } else { // if error type not expected
      console.log(err)
    }
  });
});

// router.get("/:username/:category", function (req, res) { // GET HTTP request with parameters
//   console.log(`GET request for category: ${req.params.category} from user:  ${req.params.username}`)
//   action.get(req.params.username, req.params.category, function (data) { // get action called from action.js
//     if (data) {
//       res.status(200).json({ // response if any data found
//         "status": 200,
//         "statusText": "OK",
//         "message": `Category:${req.params.category} retrieved from: ${req.params.username}`,
//         "data": data // data from category is returned in response
//       });
//     } else {
//       res.status(404).json({ // response if not data found
//         "status": 404,
//         "statusText": "NOT FOUND",
//         "message": `The category: ${req.params.category} could not be found in: ${req.params.username}`
//       });
//     }
//   }, function (err) {
//     console.error(err);
//     res.status(404).json({ // response if user not found
//       "status": 404,
//       "statusText": "NOT FOUND",
//       "message": `The user: ${req.params.username} could not be found.`
//     });
//   });
// });
//
// router.post("/:username/:category/", function (req, res) { // POST HTTP request with parameters
//   console.log(`POST request to category: ${req.params.category} of user: ${req.params.username}`)
//   action.post(req.params.username, req.params.category, req.body, function (data) { // post action called from action.js
//     res.status(205).json({
//       "status": 205,
//       "statusText": "RESET CONTENT",
//       "message": `New data added to: ${req.params.category} of user: ${req.params.username}`,
//       "data": data // newly appended data is returned as confirmation
//     });
//   }, function (err) {
//     console.error(err);
//   });
// });
//
// router.put("/:username/subjects", function (req, res) { // PUT HTTP request with parameters
//   console.log(`PUT request to update subjects of user: ${req.params.username}`);
//   action.update(req.params.username, req.body, function (subjectList) { // update action called from action.js
//     res.status(205).json({ // response if successfully updated
//       "status": 205,
//       "statusText": "RESET CONTENT",
//       "message": `Subjects of user: ${req.params.username} successfully updated`,
//       "data": subjectList // updated subject list returned as confirmation
//     });
//   }, function (err) { // response if error
//     console.error(err);
//   });
// });
//
// router.patch("/:username/:category/:id", function (req, res) { // PUT HTTP request with parameters
//   console.log(`PATCH request to update lesson with id: ${req.params.id} in category: ${req.params.category} of user: ${req.params.username}`);
//   action.edit(req.params.username, req.params.category, req.params.id, req.body, function (data) { // edit action called from action.js
//     res.status(205).json({ // response if successfully updated
//       "status": 205,
//       "statusText": "RESET CONTENT",
//       "message": `Lesson with id: ${req.params.id} in category: ${req.params.category} of user: ${req.params.username} successfully updated`,
//       "data": data // updated lesson returned as confirmation
//     });
//   }, function (err) { // response if error
//     console.error(err);
//   });
// });
//
// router.delete("/:username/:category/:id", function (req, res) { //DELETE HTTP request with parameters
//   action.delete(req.params.username, req.params.category, req.params.id, function (deletedData) { // delete action called from action.js
//     res.status(205).json({ // response if successfully deleted
//       "status": 205,
//       "statusText": "RESET CONTENT",
//       "message": `Item with id:${req.params.id} deleted in category: ${req.params.category} from user: ${req.params.username}`,
//       "data": deletedData
//     });
//   }, function (err) {
//     console.error(err);
//   });
// });

app.use("/hack25", router) // specifies extended routing from PORT

const PORT = 3000; // assigns port address
const server = app.listen(PORT, function () { // launches on port given
  console.log("Server is running on http://localhost:" + PORT); // prints the url and port for development access
});
