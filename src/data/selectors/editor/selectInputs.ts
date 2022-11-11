import { CustomNodeData } from "src/classes/nodes/CustomNodeData";
import { Inputs } from "../../../classes/nodes/outputs/Inputs";

import { Node } from "reactflow";

export const selectInputs = (
  node: Node<CustomNodeData>
): Inputs | undefined => {
  return node?.data?.inputs;
};
