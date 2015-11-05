import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css!';
import CodeMirror from 'codemirror';

import events from '../../common/events';

// This is ugly, but we need to bypass JSPM to get to Node only packages
const IPC = System._nodeRequire('ipc');

// IPC.on(events.openfile, function (fileContents) {
//   console.log('hit!');
//   codeMirror.setValue(fileContents);
// });

const codeMirror =
  CodeMirror.fromTextArea(document.querySelector('#editor'), {
    mode: 'markdown',
    lineWrapping: true,
    showCursorWhenSelecting: true,
    autofocus: true
  });


let content = IPC.sendSync(events.getFileContents);

if (content) {
  codeMirror.setValue(content);
}

codeMirror.focus();

document.body.addEventListener('click', () => {
  setTimeout(() => {
    if (!codeMirror.hasFocus())
      codeMirror.focus();
  });
});
