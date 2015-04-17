angular.module("ngRaptorize", [])
.provider('ngRaptorize', function() {
    this.config = {
        imageFile: 'ngRaptorize/raptor.png',
        audioFile: 'ngRaptorize/raptor-sound'
    };
    
    this.$get = function () {
        return {
            
            config: this.config,
    
            getImageFile: function () {
                return this.config.imageFile;
            },
    
            getMp3AudioFile: function () {
                if (this.config.mp3File)
                    return this.config.mp3File;
                else
                    return this.config.audioFile + '.mp3';
            },
            
            getOggAudioFile: function () {
                if (this.config.oggFile)
                    return this.config.oggFile;
                else
                    return this.config.audioFile + '.ogg';
            }
        };
    };
    
    this.setImageFile = function (imageFile) {
        this.config.imageFile = imageFile;
    }
    
    this.setGenericAudioFile = function (path) {
        this.config.audioFile = path;
    }
    
    this.setMp3AudioFile = function (path) {
        this.config.mp3File = path;
    }
    
    this.setOggAudioFile = function (path) {
        this.config.oggFile = path;
    }
})
.directive('ngRaptorize', ['$window', '$timeout', 'ngRaptorize', function ($window, $timeout, ngRaptorize) {
     function link(scope, element, attrs) {
     
        var raptorImageMarkup = '<img class="elRaptor" style="display: none" src="' + ngRaptorize.getImageFile() + '" />';
        var raptorAudioMarkup = '<audio class="elRaptorShriek" preload="auto"><source src="' + ngRaptorize.getMp3AudioFile() + '" /><source src="' + ngRaptorize.getOggAudioFile() + '" /></audio>';
        
        scope.audioSupported = true;
        	
        scope.locked = false;
     
        var parent = element.parent();
        scope.element = element;
        scope.raptor = angular.element(raptorImageMarkup);
        scope.soundElement = scope.audioSupported ? angular.element(raptorAudioMarkup) : '';
        
        parent.append(scope.raptor).append(scope.soundElement);
        
        scope.run = function () {
            if ( scope.locked === true ) return;
            scope.locked = true;
            var offset = scope.raptor[0].offsetLeft;
            playSound();
            
            scope.raptor.css({
                "height": "600px",
				"bottom": "-130px",
                "right": offset + 'px'
			});
            
            // reposition the raptor after the animation has finished
            $timeout(positionRaptor, 3000);
        }
            
        var playSound = function () {
            if(scope.audioSupported)
                scope.soundElement[0].play();
        };

        var setTimer = function (time) {
            $timeout(scope.run, time);
        };
        
        var setClick = function () {
            scope.element.bind('click', function(e) {
                e.preventDefault();
                scope.run();
            });
        };
    
        setKonami = function () {
            var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
            angular.element($window).on('keydown', function(e) {
                kkeys.push( e.keyCode );
                if ( kkeys.toString().indexOf( konami ) >= 0 ) {
                    scope.run();
                    kkeys = [];
                }
            });
        }
        
        var positionRaptor = function () {
            scope.raptor.css({
				"height": "0px",
				"position":"fixed",
				"bottom": "0px",
				"right" : "0",
				"display" : "block"
			});
            
            // don't allow the animation to run until the raptor gets back into position
            $timeout(function() { scope.locked = false; }, 2500);
        };
        
        var initEvent = function (enterOn, delayTime) {
            positionRaptor();
            
            if(enterOn == 'timer') {
                setTimer(delayTime);
            } else if(enterOn == 'click') {
                setClick();
            } else if(enterOn == 'konami-code'){
                setKonami();
            } else {    // default
                setTimer(2000);
            }
        };
        
        initEvent(scope.enterOn, scope.delayTime);
     
     };
     

    return {
        restrict: 'AE',
        scope: {
            enterOn: '@', //timer, konami-code, click
            delayTime: '@' //time before raptor attacks on timer mode
        },
        link: link
    };
}]);

