/*
Copyright 2014 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
//var AltGr = { PLAIN: "plain", ALTERNATE: "alternate" };
var AltGr = false
//var previousCharIsMagic = false;

var contextID = -1;

const circumflexed = {
  "a": "\u00e2", 
  "A": "\u00c2", 
  "e": "\u00ea", 
  "E": "\u00ca", 
  "i": "\u00ee", 
  "I": "\u00ce", 
  "o": "\u00f4", 
  "O": "\u00d4", 
  "u": "\u00fb", 
  "U": "\u00db", 
  "w": "\u0175", 
  "W": "\u0174", 
  "y": "\u0177", 
  "Y": "\u0176", 
  /*"`": "\u2018"*/
};

chrome.input.ime.onFocus.addListener(function(context) {
  contextID = context.contextID;
});

function updateAltGrState(keyData) {
  if (keyData.code == "AltRight")
  {
    switch (keyData.type)
    {
      case "keydown":AltGr = true;
        break
      case "keyup":AltGr = false;
        break
    }
  }
  
 /* if (keyData.type == "keydown" && keyData.code == "AltRight" ) {
    AltGr = true;
    handled = true;
  }
  */

 /* function updateAltGrState(keyData) {
    if (keyData.type == "keydown" && keyData.code == "AltRight" ) {
      AltGr = true;
      handled = true;
    }*/

  } 
  /* else {
    AltGr = false;
    handled = true;
  } */
/*if (keyData.type == "keydown" && keyData.code == "AltRight" ) {
  AltGr = true;
  handled = true;
} */


function isPureModifier(keyData) {
  return (keyData.key == "Shift") || (keyData.key == "Ctrl") || (keyData.key == "Alt");
  //return (keyData.key == "AltGraph")|| (keyData.key == "AltRight");
}

chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      //AltGr = false;

      /*if (keyData.type == "keydown" && keyData.code == "AltRight" && keyData.key =="") {
        //previousCharIsMagic = true;
        isAltGr = true;
      }*/

      updateAltGrState(keyData);

      if (AltGr && keyData.type == "keydown" )/*&& !isPureModifier(keyData)*/
        if (circumflexed[keyData.key]) {
          chrome.input.ime.commitText({"contextID": contextID,
                                   "text": circumflexed[keyData.key]});
          handled = true;
          //AltGr = false;
        } 
        return handled;    
});
chrome.input.ime.onKeyEvent.addListener(
  function(engineID, keyData) {
    var handled = false;

    updateAltGrState(keyData);

    if (AltGr && keyData.type == "up" )/*&& !isPureModifier(keyData)*/
      
        AltGr = false;
        return handled;
}


);


