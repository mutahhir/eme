import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css!';
import CodeMirror from 'codemirror';

import '../css/styles.css!';

const IPC = System._nodeRequire('ipc');
import events from '../../events';

const codeMirror =
  CodeMirror.fromTextArea(document.querySelector('#editor'), {
    mode: 'markdown',
    lineWrapping: true
  });

IPC.on(events.openfile, function (fileContents) {
  codeMirror.setValue(fileContents);
});
