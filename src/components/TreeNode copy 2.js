import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import NodeModal from "./NodeModal";
import "./TreeNode.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faTrash,
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const TreeNode = ({ node, moveNode, editNode, addNode, deleteNode, level }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const [{ isDragging }, drag] = useDrag({
    type: "TREE_NODE",
    item: { id: node.id, level },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "TREE_NODE",
    drop: (item) => moveNode(item.id, node.id, level),
    canDrop: (item) => item.level === level,
  });

  const getColorByRole = (role) => {
    switch (role) {
      case "CEO":
        return "#FFCC00";
      case "Chief Operating Officer":
        return "#FF9900";
      case "Group Director":
        return "#FF6600";
      case "Vice President":
        return "#FF3300";
      case "Manager":
        return "#FF0000";
      case "Employee":
        return "#CC0000";
      default:
        return "#CC0000";
    }
  };

  return (
    <div
      className="tree-node-container"
      ref={(ref) => drag(drop(ref))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: getColorByRole(node.role),
      }}
    >
      <div className="tree-node">
        <button
          className="expand-collapse-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FontAwesomeIcon icon={isExpanded ? faChevronDown : faChevronRight} />
        </button>
        <span className="node-content">
          {node.name} - {node.role}
        </span>
        <div className="node-actions">
          <button onClick={() => setIsOpen(true)} className="action-button">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button onClick={() => addNode(node.id)} className="action-button">
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button onClick={() => deleteNode(node.id)} className="action-button">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      {isExpanded && node.children && node.children.length > 0 && (
        <div className="tree-children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              moveNode={moveNode}
              editNode={editNode}
              addNode={addNode}
              deleteNode={deleteNode}
              level={level + 1}
            />
          ))}
        </div>
      )}
      {isOpen && (
        <NodeModal
          node={node}
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          editNode={editNode}
        />
      )}
    </div>
  );
};

export default TreeNode;
