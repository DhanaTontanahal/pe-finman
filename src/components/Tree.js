import React, { useState, useEffect } from "react";
import TreeNode from "./TreeNode";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./Tree.css";

const Tree = ({ initialStructure }) => {
  const [structure, setStructure] = useState(null);
  const [layout, setLayout] = useState("vertical"); // State to track the layout mode

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, "organization"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setStructure(snapshot.val());
        } else {
          setStructure(initialStructure);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from Firebase:", error);
      });
  }, [initialStructure]);

  const toggleLayout = () => {
    setLayout(layout === "vertical" ? "horizontal" : "vertical");
  };

  const moveNode = (sourceId, targetId, level) => {
    const newStructure = JSON.parse(JSON.stringify(structure));

    const findNode = (node, id) => {
      if (node.id === id) return node;
      for (let child of node.children || []) {
        const found = findNode(child, id);
        if (found) return found;
      }
      return null;
    };

    const removeNode = (node, id) => {
      node.children = node.children.filter((child) => child.id !== id);
      for (let child of node.children || []) {
        removeNode(child, id);
      }
    };

    const sourceNode = findNode(newStructure, sourceId);
    const targetNode = findNode(newStructure, targetId);

    if (sourceNode && targetNode && level === targetNode.level) {
      removeNode(newStructure, sourceId);
      targetNode.children.push(sourceNode);
      setStructure(newStructure);
      saveToFirebase(newStructure);
    }
  };

  const editNode = (id, updatedData) => {
    const newStructure = JSON.parse(JSON.stringify(structure));

    const findAndEditNode = (node, id) => {
      if (node.id === id) {
        Object.assign(node, updatedData);
      } else if (node.children) {
        node.children.forEach((child) => findAndEditNode(child, id));
      }
    };

    findAndEditNode(newStructure, id);
    setStructure(newStructure);
    saveToFirebase(newStructure);
  };

  const addNode = (parentId) => {
    const newStructure = JSON.parse(JSON.stringify(structure));
    const newNode = {
      id: `new-${Date.now()}`,
      name: "New Node",
      role: "New Role",
      children: [],
    };

    const findAndAddNode = (node, parentId) => {
      if (node.id === parentId) {
        newNode.level = node.level + 1; // Assign the level to the new node
        node.children.push(newNode);
      } else if (node.children) {
        node.children.forEach((child) => findAndAddNode(child, parentId));
      }
    };

    findAndAddNode(newStructure, parentId);
    setStructure(newStructure);
    saveToFirebase(newStructure);
  };

  const deleteNode = (id) => {
    const newStructure = JSON.parse(JSON.stringify(structure));

    const findAndDeleteNode = (node, id) => {
      node.children = node.children.filter((child) => child.id !== id);
      node.children.forEach((child) => findAndDeleteNode(child, id));
    };

    findAndDeleteNode(newStructure, id);
    setStructure(newStructure);
    saveToFirebase(newStructure);
  };

  const saveToFirebase = (structure) => {
    const db = getDatabase();
    set(ref(db, "organization"), structure).then(() => {
      console.log("Structure saved to Firebase");
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`tree-container ${layout}`}>
        <button className="toggle-layout" onClick={toggleLayout}>
          Toggle to {layout === "vertical" ? "Horizontal" : "Vertical"} View
        </button>
        {structure && (
          <div className={`tree-levels ${layout}`}>
            <TreeNode
              node={structure}
              moveNode={moveNode}
              editNode={editNode}
              addNode={addNode}
              deleteNode={deleteNode}
              level={0} // Start from the root level
              layout={layout}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Tree;
