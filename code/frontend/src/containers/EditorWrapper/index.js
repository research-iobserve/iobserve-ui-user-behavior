// @flow

/**
 * EditorWrapper
 *
 * A wrapper around all editor components
 */
import React from "react";

type Props = {
  children?: React.Element<*>
};

function EditorWrapper(props: Props) {
  return (
    <div>
      {React.Children.toArray(props.children)}
    </div>
  );
}

export default EditorWrapper;
