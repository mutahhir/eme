import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css!';
import CodeMirror from 'codemirror';


CodeMirror.fromTextArea(document.querySelector('#editor'), {
  mode: 'markdown',
  lineWrapping: true
});
