import React from "react";
import Editor from "@monaco-editor/react";

function CodeEditor(props) {
  const initialStates = {
    codeText: props.initialData
  };
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
    setState(value);
  };

  return (
    <div>
      {/* {state} */}
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
