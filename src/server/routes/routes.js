module.exports = function (app, io) {
  // APIs

  let authenticationController = require('../controllers/authentication-controller')(io);
  let profileController = require('../controllers/profile-controller')(io);
  let wasteController = require('../controllers/waste-controller')(io);
  let usersController = require('../controllers/users-controller')(io);
  const cors = require('cors');
  let corsOptions = {
    origin: ["http://127.0.0.1:3000", "http://127.0.0.1:4200", "http://localhost:3000"],
    optionsSuccessStatus: 200
  };

//Route
//Authentication
  app.post('/verif', authenticationController.emailVerif);
  app.post('/api/user/signup', authenticationController.signup);
  app.post('/api/user/login', authenticationController.login);
  app.post('/api/user/refreshUserData', authenticationController.refreshUserData);
  app.put('/api/user/logout/:id', usersController.deconnection);

//Profile profileController.updatePhoto
  app.options('api/upload', cors(corsOptions)); // enable pre-flight request for request

  app.post('/api/upload', profileController.updatePhoto);
  app.post('/api/profile/updateChamp', profileController.updateChamp);
  app.post('/api/profile/updatePassword', profileController.updatePassword);
  app.delete('/api/profile/deleteAccount/:id', profileController.deleteAccount);
//Waste
  app.post('/api/waste/getPost', wasteController.getPost);
  app.post('/api/waste/listOfFriend', wasteController.listOfFriends);
  app.post('/api/waste/sendPost', wasteController.sendPost);

//User

  app.get('/api/users/uploadPicture/:id', usersController.uploadPicture);
  app.delete('/api/users/deleteAllPicture/:id', usersController.deleteAllPictures);
  app.get('/api/users/get', usersController.getUsers);
  app.post('/api/users/follow', usersController.followUser);
  app.post('/api/users/followOk', usersController.followUserOk);
  app.post('/api/users/unfollow', usersController.unfollowUser);
  app.post('/api/users/getThisUsers', usersController.getThisUser);

};

