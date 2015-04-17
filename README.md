# ngRaptorize
Angular representation of the jQuery Raptorize plugin - http://zurb.com/playground/jquery-raptorize

## Install

```sh
bower install ngRaptorize
```
*No dependencies (besides Angular) are required.*

## Use
<img src="https://raw.githubusercontent.com/WyattNielsen/ngRaptorize/master/src/raptor.png" align="right" height="350">

The directive can be an attribute or an element and as with the original there are three methods to invoke the Raptor.

* click

 ```html
 <a ng-raptorize enter-on='click'>click</a>
 ```
* konami-code

 ```html
 <div ng-raptorize enter-on='konami-code'></div>
 ```
 
* timer - *this is the default if nothing is set and will activate after two seconds*

 ```html
 <ng-raptorize enter-on='timer' delay-time='5000'></ng-raptorize>
 <div ng-raptorize></div> <!-- Timer set at two seconds -->
 ```

## Config

By default the image and audio files are set to:

* ngRaptorize/raptor.png
* ngRaptorize/raptor-sound.mp3
* ngRaptorize/raptor-sound.ogg

All of these settings can be changed using the ngRaptorizeProvider as shown below

```javascript
    angular.module ('ngRaptorSample', ['ngRaptorize'])
    .config(['ngRaptorizeProvider', function(ngRaptorizeProvider) {
        ngRaptorizeProvider.setImageFile('ngRaptorize/raptor.png');
        ngRaptorizeProvider.setGenericAudioFile('ngRaptorize/raptor-sound');
        ngRaptorizeProvider.setMp3AudioFile('ngRaptorize/raptor-sound.mp3');
        ngRaptorizeProvider.setMp3AudioFile('ngRaptorize/raptor-sound.ogg');
    }]);
```
