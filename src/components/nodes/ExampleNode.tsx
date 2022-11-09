import React, { useContext, useEffect } from "react";
import { NumberHandle } from "../../classes/nodes/definition/io/handles/types/base/NumberHandle";

import { ObjectHandle } from "../../classes/nodes/definition/io/handles/types/base/ObjectHandle";
import { StringHandle } from "../../classes/nodes/definition/io/handles/types/base/StringHandle";
import { CustomNodeDefinition } from "../../classes/nodes/definition/NodeDefinition";
import { FlowNameContext } from "../../react/contexts/FlowNameContext";
import { NodeIdContext } from "../../react/contexts/NodeIdContext";
import { useInputs } from "../../react/hooks/state/useInputs";
import { useNodeDefinition } from "../../react/hooks/state/useNodeDefinition";
import { useNodeHandleType } from "../../react/hooks/state/useNodeHandleType";
import { useOutput } from "../../react/hooks/state/useOutput";
import { useOutputs } from "../../react/hooks/state/useOutputs";

export const ExampleNodeComponent = () => {
  const flowName = useContext(FlowNameContext);
  const id = useContext(NodeIdContext);
  console.log("Rendering " + id + " in flow named", flowName);

  const setNodeDefinition = useNodeDefinition(id, flowName)[1];
  useEffect(() => {
    setNodeDefinition(ExampleNode);
  }, []);

  const inputs = useInputs(id, flowName);
  const [outputs] = useOutputs(id, flowName);
  const setOutput = useOutput("output1", id, flowName)[1];
  const setInput2HandleType = useNodeHandleType(
    true,
    "input2",
    id,
    flowName
  )[1];
  const setOutput2HandleType = useNodeHandleType(
    false,
    "output2",
    id,
    flowName
  )[1];

  console.log("CustomNodeComponent", id, inputs, outputs);

  const onClickButton = () => {
    console.log("onClickButton", outputs);
    const newOutput = (outputs.output1 ?? "") + "!";
    setOutput(newOutput);
  };

  const changeOutputType = () => {
    setInput2HandleType(NumberHandle);
    setOutput2HandleType(NumberHandle);
  };

  return (
    <div>
      <h3>MyCustomNode</h3>
      <div>Input: {inputs?.input1 ?? "empty"}</div>
      <div>Output: {outputs?.output1 ?? "empty"}</div>
      <button onClick={onClickButton}>Increment</button>
      <button onClick={changeOutputType}>Change output type</button>
    </div>
  );
};

export const ExampleNode: CustomNodeDefinition = {
  io: {
    inputs: {
      input1: {
        name: "Input 1",
        type: StringHandle,
      },
      input2: {
        name: "Input 2",
        type: ObjectHandle,
      },
    },
    outputs: {
      output1: {
        name: "Output 1",
        type: StringHandle,
      },
      output2: {
        name: "Output 2",
        type: ObjectHandle,
      },
    },
  },
};