angular.module('starter', ['ionic','ngCordova', 'starter.services', 'starter.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
  
    // cada estado de controle pode ser encontrado em controllers.js
    //cria uma lista com as informações
    
    $stateProvider
  
  	.state('ListExample', {
  	  url: '/list',
  	  templateUrl: 'list-template.html',
  	  controller: 'listExampleCtrl'
  	    });
  
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/list');
  
  })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
 
//comandos da camera

.controller('MainCtrl', function($scope, $cordovaCamera) {
    $scope.takeImage = function() {
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 700,
            targetHeight: 700,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true
        };
         
       //comando para tirar \a foto
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // error
        });
    }
});