'use strict';

/**
 * @ngdoc function
 * @name otaniemi3dApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the otaniemi3dApp
 */
angular.module('otaniemi3dApp')
  .controller('threedview', function ($scope, Rooms) {
    $scope.panoramabox = 'images/panoramabox.svg';
    $scope.selected = undefined;
    $scope.webglSupport = Modernizr.webgl; //Use this boolean to check for webgl support
    $scope.pano = false;
    $scope.changeView = function(viewpoint){
      if(viewpoint === undefined) {
        var textField = document.getElementById('searchContent');
        viewpoint = textField.value;
      }
        
      var elem = document.getElementById(viewpoint);
        
      if(elem !== null) {
        elem.setAttribute('set_bind','true'); 

        var x3dElem = document.getElementById('x3dElement');
        x3dElem.runtime.resetView();
      }
    };
    $scope.text = undefined;  
    $scope.items = ['Entrance','Cafeteria','Corridor Entrance Side',
      'Corridor Cafeteria Side','2nd Floor Sundeck','2nd Floor Corridor Start',
      '2nd Floor Corridor Middle','2nd Floor Corridor End','223','224','225',
      '226','227','228','229','232a','232c','232d', '235','236b','236b2','236a',
      '237d','237c','238b','238d','239','333','334','335','336','337','338','341a',
      '341b','341c', '348'];
    
    $scope.onSelect = function($item) {
      $scope.changeView($item);
    };
    

    $scope.panoramaViewer = function(room) {
    $scope.pano = true;
    var roomInfos = Rooms.findRoom(room);
    var infos = {room: room};
          embedpano({xml:'panorama/Room_' + room +'.xml', id:'pano_obj', target:'pano', html5:'only', passQueryParameters:true, vars:infos});
    };
    $scope.stopPanorama = function(){
      $scope.pano = false;
      var element = document.getElementById("pano_obj");
      element.parentNode.removeChild(element); 
    };
  }
);
