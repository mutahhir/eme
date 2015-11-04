import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css!';
import CodeMirror from 'codemirror';

import '../css/styles.css!';

import events from '../../common/events';

// This is ugly, but we need to bypass JSPM to get to Node only packages
const IPC = System._nodeRequire('ipc');



const codeMirror =
  CodeMirror.fromTextArea(document.querySelector('#editor'), {
    mode: 'markdown',
    lineWrapping: true
  });

IPC.on(events.openfile, function (fileContents) {
  codeMirror.setValue(fileContents);
});
