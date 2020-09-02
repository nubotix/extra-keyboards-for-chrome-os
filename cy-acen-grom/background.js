/* Copyright 2020 Egin Cyfyngedig

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

*/
var modifierActive = false;
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
};

chrome.input.ime.onFocus.addListener(function(context) {
  contextID = context.contextID;
});

function isRegularModifier(keyData) {
 return (keyData.key == "Shift") || (keyData.key == "Ctrl") || (keyData.key == "Alt");
}

chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      
      if (modifierActive && keyData.type == "keydown" && !isRegularModifier(keyData)) {
        modifierActive = false;
        if (circumflexed[keyData.key]) {
          chrome.input.ime.commitText({"contextID": contextID,
                                   "text": circumflexed[keyData.key]});
          handled = true;
        } 
      }
      
      if (!handled && keyData.type == "keydown" && keyData.code == "AltRight" ) {
        modifierActive = true;
        handled = true;
      }
      
      return handled;
});
