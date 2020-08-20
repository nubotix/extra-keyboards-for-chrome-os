// An IME that converts typed Welsh vowels to upper case.
var previousCharIsMagic = false;
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

function isPureModifier(keyData) {
  return (keyData.key == "Shift") || (keyData.key == "Ctrl") || (keyData.key == "Alt");
  //return (keyData.key == "AltGraph")|| (keyData.key == "AltRight");
}

chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      
      if (previousCharIsMagic && keyData.type == "keydown" && !isPureModifier(keyData)) {
        previousCharIsMagic = false;
        if (circumflexed[keyData.key]) {
          chrome.input.ime.commitText({"contextID": contextID,
                                   "text": circumflexed[keyData.key]});
          handled = true;
        } 
       // else {
       //   chrome.input.ime.commitText({"contextID": contextID,
       //                           "text": "`"});
       //}
      }
      
      if (!handled && keyData.type == "keydown" && keyData.code == "AltRight" /*&& keyData.key ==""*/) {
        previousCharIsMagic = true;
        handled = true;
      }
      
      return handled;
});
