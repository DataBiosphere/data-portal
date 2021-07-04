/*
 * Human Cell Atlas
 * https://www.humancellatlas.org/
 *
 * Hook for handling drag and drop functionality, app-specific wrapper around react-dropzone.
 */

// Core dependencies
import React from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const Dropzone = ({
  disabled = false,
  onDragOver,
  onDrop,
  onDragLeave,
  style = {},
  activeStyle = {},
  children,
  ...props
}) => {
  // dropzone's built-in dragging status doesn't seem to work if there's anything rendered over the root div
  const [dragging, setDragging] = useState(false);

  const { getRootProps, getInputProps, open: openUploader } = useDropzone({
    // Disable native files selection dialog - we'll handle this manually
    noClick: true,
    // Disable space/enter to open native files selection dialog
    noKeyboard: true,
    disabled,
    onDragOver: (...args) => {
      setDragging(true);
      onDragOver && onDragOver(...args);
    },
    onDrop: (...args) => {
      setDragging(false);
      onDrop && onDrop(...args);
    },
    onDragLeave: (...args) => {
      setDragging(false);
      onDragLeave && onDragLeave(...args);
    },
    ...props
  });

  return (
    <div {...getRootProps()} style={dragging ? activeStyle : {}}>
      <input {...getInputProps()} />
      {children({ dragging, openUploader })}
    </div>
  );
};

export default Dropzone;
