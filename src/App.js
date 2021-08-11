import { useState } from "react";
import TreeMenu from "react-simple-tree-menu";
import { ListGroupItem, Input, ListGroup } from "reactstrap";
import CodeEditor from "./code-editor/CodeEditor";
import sampleSJSONData from "./sample-files/sampleJSON.json";
import hash from 'object-hash'
// import "bootstrap/dist/css/bootstrap.min.css";
// import '../node_modules/react-simple-tree-menu/dist/main.css';
import "./styles.css";

const IndividualFile = (props) => {
  return <CodeEditor {...props} />;
};

// as an array
const treeData = [
  {
    key: "first-level-node-1",
    label: "Dev-folder",
    nodes: [
      {
        key: "third-level-node-1",
        label: "Sample.json",
        nodes: [] // you can remove the nodes property or leave it as an empty array
      }
    ]
  },
  {
    key: "script-node-1",
    label: "scripts-folder",
    nodes: [
      {
        key: "script-file-1",
        label: "script.sh",
        nodes: [] // you can remove the nodes property or leave it as an empty array
      }
    ]
  }
];

const DEFAULT_PADDING = 8;
const ICON_SIZE = 8;
const LEVEL_SPACE = 8;

const ToggleIcon = ({ on }) => <span style={{ marginRight: 8 }}>{on ? '-' : '+'}</span>;

const TreeViewComp = () => {
  const ListItem = ({
    level = 0,
    hasNodes,
    isOpen,
    label,
    searchTerm,
    openNodes,
    toggleNode,
    matchSearch,
    focused,
    ...props
  }) => (
    <ListGroupItem
      {...props}
      style={{
        paddingLeft: DEFAULT_PADDING + ICON_SIZE + level * LEVEL_SPACE,
        cursor: 'pointer',
        boxShadow: focused ? '0px 0px 5px 0px #222' : 'none',
        zIndex: focused ? 999 : 'unset',
        position: 'relative',
      }}
    >
      {hasNodes && (
        <div
          style={{ display: 'inline-block' }}
          onClick={e => {
            hasNodes && toggleNode && toggleNode();
            e.stopPropagation();
          }}
        >
          <ToggleIcon on={isOpen} />
        </div>
      )}
      {label}
    </ListGroupItem>
  );



  return (
    <TreeMenu
      data={treeData}
      onClickItem={({ key, label, ...props }) => {
        console.log(props); // user defined prop
      }}
      initialActiveKey="first-level-node-1/second-level-node-1" // the path to the active node
      debounceTime={125}
    >
      {({ search, items }) => {
        console.log(items);
        return (
          <>
            <Input
              onChange={(e) => search(e.target.value)}
              placeholder="Type and search"
            />
            <ListGroup>
              {items.map((props) => (
                // You might need to wrap the third-party component to consume the props
                // check the story as an example
                // https://github.com/iannbing/react-simple-tree-menu/blob/master/stories/index.stories.js
                // <ListGroupItem {...props}> {props.label} </ListGroupItem>
                <ListItem {...props} />
              ))}
            </ListGroup>
          </>
        );
      }}
    </TreeMenu>
  );
};

export default function App() {
  const [tree, setTree] = useState([
    { title: "src/", children: [{ title: "index.js" }] }
  ]);
  const initialHash = hash(sampleSJSONData)

  return (
    <div className="App">
      <h1>Code Editor</h1>
      <div className="app-view">

        <TreeViewComp />
        <IndividualFile initialData={JSON.stringify(sampleSJSONData)} initialHash={initialHash}/>
        {/* <CodeEditor /> */}
      </div>
    </div>
  );
}
