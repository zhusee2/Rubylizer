function selectElement(target) {
  if (!target) return false;
  
  var range = document.createRange(),
      selection = window.getSelection();
  
  selection.removeAllRanges();
  range.selectNode(target);
  selection.addRange(range);
  
  target.focus();
  
  return true;
}

$('div').live('mouseup', function(e) {
  var selection = window.getSelection();
  
  e.stopPropagation();
  if (selection.type == "Range") {
    console.log(selection, e.target);
    
    var r = selection.getRangeAt(0), r2 = document.createRange();

    r2 = r.cloneRange();
    r.collapse(false);
    r.insertNode($('<rt>').text('test')[0]);
    r2.setEnd(r.endContainer, r.endOffset);
    
    r = r2.cloneRange(); r2.detach();
    r.surroundContents($('<ruby>')[0]);
    
    var n = r.startContainer.childNodes[r.startOffset].lastElementChild;
    
    r.selectNodeContents(n);
    $('#content').removeAttr('contenteditable').blur();
    n.setAttribute('contenteditable', true);
    n.focus();
    
    selection.removeAllRanges();
    selection.addRange(r);
    
    r.detach();
  }
});