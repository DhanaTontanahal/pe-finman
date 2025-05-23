import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TreeNode from "./TreeNode";
import { getDatabase, ref, set } from "firebase/database";

const Tree = ({ initialStructure }) => {
  const [structure, setStructure] = useState(initialStructure);

  const moveNode = (sourceId, targetId) => {
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

    if (sourceNode && targetNode) {
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
      <TreeNode
        node={structure}
        moveNode={moveNode}
        editNode={editNode}
        addNode={addNode}
        deleteNode={deleteNode}
      />
    </DndProvider>
  );
};

export default Tree;
