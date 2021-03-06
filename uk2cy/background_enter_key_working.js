var context_id = -1;

chrome.input.ime.onFocus.addListener(function(context) {
  context_id = context.contextID;
});

chrome.input.ime.onKeyEvent.addListener(
  function(engineID, keyData) {
    var handled = false;
    
    if (keyData.type == "keydown") {
      if (keyData.code == "Backslash") {
        keyData.code = "Enter";
        chrome.input.ime.sendKeyEvents({"contextID": context_id, "keyData": [keyData]});
        handled = true;
      }
      // else if (keyData.code == "IntlBackslash") {
      //   chrome.input.ime.commitText({"contextID": context_id, "text": keyData.key.toUpperCase()});
      //   handled = true;
      // }
    }
    
    return handled;
});


// /*
// Copyright 2014 Google Inc. All rights reserved.

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// */
// var AltGr = { PLAIN: "plain", ALTERNATE: "alternate" };
// var Shift = { PLAIN: "plain", SHIFTED: "shifted" };

// var contextID = -1;
// var altGrState = AltGr.PLAIN;
// var shiftState = Shift.PLAIN;
// var lastRemappedKeyEvent = undefined;

// var lut = {
// "IntlBackslash": { "plain": {"plain": "Shift", "shifted": "Shift"}, "alternate": {"plain": "", "shifted":""}, "code": "ShiftLeft"},
// "Backslash": { "plain": {"plain": "", "shifted": ""}, "alternate": {"plain": "", "shifted":""}, "code": "Enter"},
// "KeyQ": { "plain": {"plain": "6", "shifted": "%"}, "alternate": {"plain": "", "shifted":""}, "code": "Digit5"},
// };
    

// chrome.input.ime.onFocus.addListener(function(context) {
//   contextID = context.contextID;
// });

// function updateAltGrState(keyData) {
//   altGrState = (keyData.code == "AltRight") ? ((keyData.type == "keydown") ? AltGr.ALTERNATE : AltGr.PLAIN)
//                                               : altGrState;
// }

// function updateShiftState(keyData) {
//   shiftState = ((keyData.shiftKey && !(keyData.capsLock)) || (!(keyData.shiftKey) && keyData.capsLock)) ?
//                 Shift.SHIFTED : Shift.PLAIN;
// }

// function isPureModifier(keyData) {
//   return (keyData.key == "Shift") || (keyData.key == "Ctrl") || (keyData.key == "Alt");
// }

// function isRemappedEvent(keyData) {
//   // hack, should check for a sender ID (to be added to KeyData)
//   return lastRemappedKeyEvent != undefined &&
//         (lastRemappedKeyEvent.key == keyData.key &&
//           lastRemappedKeyEvent.code == keyData.code &&
//           lastRemappedKeyEvent.type == keyData.type
//         ); // requestID would be different so we are not checking for it
// }


// chrome.input.ime.onKeyEvent.addListener(
//     function(engineID, keyData) {
//       var handled = false;
      
//       if (isRemappedEvent(keyData)) {
//         lastRemappedKeyEvent = undefined;
//         return handled;
//       }

//       updateAltGrState(keyData);
//       updateShiftState(keyData);
                
//       if (lut[keyData.code]) {
//           var remappedKeyData = keyData;
//           remappedKeyData.key = lut[keyData.code][altGrState][shiftState];
//           remappedKeyData.code = lut[keyData.code].code;
//           // remappedKeyData.shiftKey = lut[keyData.code].shiftKey;
        
//         if (chrome.input.ime.sendKeyEvents !== undefined) {
//           remappedKeyData.key = "sendKeyEvents";
          
//         //chrome.input.ime.sendKeyEvents({"contextID": contextID, "keyData": [remappedKeyData]});

          
//           if (keyData.type == "keydown") {
//             chrome.input.ime.commitText({"contextID": contextID, "text": "commit"});
//           }

//           handled = true;
//           lastRemappedKeyEvent = remappedKeyEvent;
//         }
//         // else
//         // if (keyData.type == "keydown" && !isPureModifier(keyData)) {
//         //   // chrome.input.ime.commitText({"contextID": contextID, "text": remappedKeyData.key});
//         //   chrome.input.ime.commitText({"contextID": contextID, "text": "commit"});

//         //   handled = true;
//         // }
//       }
      
//       return handled;
// });