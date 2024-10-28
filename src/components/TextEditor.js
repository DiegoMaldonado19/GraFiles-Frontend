
import React, { useState, useEffect } from "react";

function TextEditor({ content, fileId, onContentChange, onClose }) {
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  useEffect(() => {
    onContentChange(editedContent);
  }, [editedContent, onContentChange]);

  return (
    <div className="w-[60%]">
      {editedContent !== "" || fileId !== null ? (
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full h-[1000px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 "
          placeholder="Escribe aquí..."
        />
      ) : (
        <textarea
        value={editedContent}
        onChange={(e) => setEditedContent(e.target.value)}
        className="w-full h-[1000px] px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500 "
        placeholder="Escribe aquí..."
      />
      )}
    </div>
  );
}

export default TextEditor;
