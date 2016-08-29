var Ui = (function() {

  function appendElement(parent, ele) {
    parent.append(ele);
  }

  function toggleErrorMsg(state, ele) {
    state ? ele.hide() : ele.show();
  }

  return {
    appendElement: appendElement,
    toggleErrorMsg: toggleErrorMsg
  };

})(); 