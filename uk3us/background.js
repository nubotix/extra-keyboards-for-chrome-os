// Examples The following code creates an IME that converts typed letters to upper case.
var context_id = -1;

chrome.input.ime.onFocus.addListener(function(context) {
  context_id = context.contextID;
});

chrome.input.ime.onKeyEvent.addListener(
  function(engineID, keyData) {
    if (keyData.type == "keydown" && keyData.key.match(/^[aeiouwy]$/)) {
      chrome.input.ime.commitText({"contextID": context_id,
                                   "text": keyData.key.toUpperCase()});
      return true;
    } else {
      return false;
    }
  });

