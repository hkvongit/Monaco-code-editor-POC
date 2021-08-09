import { useState } from "react";
import TreeMenu from "react-simple-tree-menu";
import { ListGroupItem, Input, ListGroup } from "reactstrap";
import CodeEditor from "./code-editor/CodeEditor";
import sampleSJSONData from "./sample-files/sampleJSON.json";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const IndividualFile = (props) => {
  return <CodeEditor initialData={props.initialData} />;
};

// as an array
const treeData = [
  {
    key: "first-level-node-1",
    label: "Node 1 at the first level",
    nodes: [
      {
        key: "second-level-node-1",
        label: "Node 1 at the second level",
        nodes: [
          {
            key: "third-level-node-1",
            label: "Last node of the branch",
            nodes: [
              {
                key: "fourth-level-node-1",
                label: "Node 1 at the forth level",
                nodes: [
                  {
                    key: "third-level-node-1",
                    label: "Last node of the branch",
                    nodes: [] // you can remove the nodes property or leave it as an empty array
                  }
                ]
              }
            ] // you can remove the nodes property or leave it as an empty array
          }
        ]
      }
    ]
  },
  {
    key: "first-level-node-2",
    label: "Node 2 at the first level"
  }
];

const TreeViewComp = () => {
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
                <ListGroupItem {...props}> {props.label} </ListGroupItem>
                // <ListItem {...props} />
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
  return (
    <div className="App">
      <h1>Code Editor</h1>
      <IndividualFile initialData={JSON.stringify(sampleSJSONData)} />
      {/* <CodeEditor /> */}
      <TreeViewComp />
    </div>
  );
}
