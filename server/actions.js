import fs from "fs"; // imports fs module for filesystem interaction.

const path = user => `./db/users/${user}.json` // returns the path of file specific to user

const template = data => {
    return {
        "profile": {
            "username": data.username,
            "password": data.password,
            "preferences": {}
        },
        // "userID": "u1",
        "topicIDs": [],
        "yayPeople": [],
        "maybePeople": [],
        "nayPeople": []
    }
}

let userDataExport = compiledData => {
    return{
        "username": "",
        "constituency": "",
        "yayPeople": [],
        "maybePeople": [],
        "nayPeople": [],
        "topicIDs": []
    }
}


let action = { // object with CRUD actions for export
    authUser: function (username, password, resolve, reject) {
        if (fs.readdirSync('./db/users').includes(`${username}.json`)) { // checks filenames in database folder
            fs.readFile(path(username), 'utf8', function (err, data) { // reads file for given user
                if (err) {
                    reject(err); // promise rejected, error returned
                } else {
                    resolve(JSON.parse(data.toString('utf8')).profile.password === password) // checks password match and returns boolean authentication status
                }
            });
        } else { // if username not found in database directory
            console.log("Directory does not include user")
            reject("errNotFound")
        }
    },
    createUser: function (username, password, resolve, reject) { // takes username and password as parameters
        if (fs.readdirSync('./db/users').includes(`${username}.json`)) { // checks if user exists already
            reject("errUserExists")
        } else {
            fs.appendFile(`./db/users/${username}.json`, JSON.stringify(template({username: username, password: password})), function (err) { // creates a file using the dynamic template
                if (err) {
                    reject(err); // promise rejected, error returned
                } else {
                    resolve(username); // returns successfully added data as confirmation
                }
            });
        }
    },
    getUserData: function (username, resolve, reject) { // takes username and category as parameters
        fs.readFile(path(username), 'utf8', function (err, data) { // reads the user's file for data
            if (err) {
                reject(err); // promise rejected, error returned
            } else {
                let match = JSON.parse(data.toString('utf8') )// parses data from JSON format and returns only category field given
                if (match) {
                    console.log(match)

                    const LIST = JSON.parse(fs.readFileSync('./db/politicians.json','utf8'))

                    let compiledData = {
                        "username": match.profile.username,
                        "constituency": match.constituency,
                        // "yayPeopleIDs": match.yayPeople,
                        // "maybePeopleIDs": match.maybePeople,
                        // "nayPeopleIDs": match.nayPeople,
                        // "topicIDs": match.topicIDs,
                        "yayPeople": LIST.filter(p => match.yayPeople.includes(p.politicianID)),
                        "maybePeople": LIST.filter(p => match.maybePeople.includes(p.politicianID)),
                        "nayPeople": LIST.filter(p => match.nayPeople.includes(p.politicianID)),
                        "topics": LIST.map(p => ({
                            ...p,
                            logs: p.logs.filter(log => log.topicIDs.some(t => match.topicIDs.includes(t)))
                        }))
                            .filter(p => p.logs.length)
                    }
                    resolve(compiledData);
                } else {
                    reject("No User Data Found")
                }
                 // promise resolved, the matching category is returned
            }
        })
    },
    // get: function (username, category, resolve, reject) { // takes username and category as parameters
    //     fs.readFile(path(username), function (err, data) { // reads the user's file for data
    //         if (err) {
    //             reject(err); // promise rejected, error returned
    //         } else {
    //             let match = JSON.parse(data)[category] // parses data from JSON format and returns only category field given
    //             resolve(match); // promise resolved, the matching category is returned
    //         }
    //     })
    // },
//     post: function (user, category, newData, resolve, reject) { // takes user, category and newData as parameters
//         fs.readFile(path(user), function (err, data) { // reads the user's file for data
//             if (err) {
//                 reject(err);
//             } else {
//                 newData.id = new Date().getTime(); // appends id value once data received
//                 let userData = JSON.parse(data); // parses data from JSON format
//                 userData[category].push(newData); // appends the new data to the given category
//                 fs.writeFile(path(user), JSON.stringify(userData), function (err) { // rewrites the file with the updated data
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(newData); // returns posted data as confirmation
//                     }
//                 });
//             }
//         });
//     },
//     update: function (username, subjectList, resolve, reject) { // takes username, subjectList as parameters
//         fs.readFile(path(user), function (err, data) { // reads user's file
//             if (err) {
//                 reject(err);
//             } else {
//                 let userData = JSON.parse(data); // parses data from JSON format
//                 userData.subjects = subjectList // reassigns subject data
//                 fs.writeFile(path(username), JSON.stringify(userData), function (err) { // rewrites the file with the updated data
//                     if (err) {
//                         reject(err);
//                     } else {
//                         resolve(subjectList); // returns updated subjects  as confirmation
//                     }
//                 });
//             }
//         });
//     },
//     edit: function (username, category, id, newData, resolve, reject) { // takes username, subjectList as parameters
//         fs.readFile(path(username), function (err, data) { // reads user's file
//             if (err) {
//                 reject(err);
//             } else {
//                 let userData = JSON.parse(data); // parses data from JSON format
//                 let item = userData[category].find(x => x.id == id); // finds item with given id
//                 if (item) { // only continues if a match exists
//                     Object.assign(item, newData); // replaces old data with new data
//                     fs.writeFile(path(user), JSON.stringify(userData), function (err) { // rewrites the file with the updated data
//                         if (err) {
//                             reject(err);
//                         } else {
//                             resolve(newData); // returns updated data as confirmation
//                         }
//                     });
//                 }
//             }
//         });
//     },
//     delete: function (username, category, id, resolve, reject) { // takes username category and id as parameters
//         fs.readFile(path(username), function (err, data) { // reads user's file
//             if (err) {
//                 reject(err);
//             } else {
//                 let userData = JSON.parse(data); // parses data from JSON format
//                 let index = userData[category].findIndex(x => x.id == id); // finds item with given id
//                 if (index != -1) { // checks if matching item found, -1 returned if no matching item found
//                     let deletion = userData[category].splice(index, 1); // removes the specified item
//                     fs.writeFile(path(username), JSON.stringify(userData), function (err) { // rewrites the file with the updated data
//                         if (err) {
//                             reject(err);
//                         } else {
//                             resolve(deletion); // returns deleted data as confirmation
//                         }
//                     });
//                 }
//             }
//         });
//     }
}

export default action; // exports crud object for access in server.js