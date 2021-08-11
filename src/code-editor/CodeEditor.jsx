import React from "react";
import hash from 'object-hash'
import Editor from "@monaco-editor/react";

function CodeEditor(props) {
  const initialStates = {
    codeText: props.initialData
  };
  const [currentHash, setCurrentHash] = React.useState(hash(props.initialData))
  console.log("initialHash value",props.initialHash)
  const [state, setState] = React.useState(initialStates.codeText);
  const settingState = (key, value) => {
    setState((currentState) => {
      let newState = currentState;
      newState[key] = value;
      return newState;
    });
  };
  const handleEditorChange = (value, event) => {
    // settingState("codeText", value);
    // value = value.replace(/\n/g, '')
    setState(value);
    setCurrentHash(hash(JSON.parse(value)))
    console.log("value", value)
  };

  return (
    <div style={{width:"100%"}}>
      {/* {state} */}
      <p>Initial Hash: {props.initialHash}</p>
      <p>Current Hash: {currentHash}</p>
      <Editor
        height="80vh"
        defaultLanguage="json"
        defaultValue={state}
        onChange={handleEditorChange}
        options={{
          cursorStyle: "line",
          formatOnPaste: true,
          formatOnType: true,
          wordWrap: true
          // autoIndent: "full"
        }}
        onMount={(editor, monaco) => {
          setTimeout(function () {
            editor.getAction("editor.action.formatDocument").run();
          }, 300);
        }}
      />
    </div>
  );
}

export default CodeEditor;
