import { executeCartesianProduct } from "./operators/execute-cartesian-product";
import { executeDifference } from "./operators/execute-difference";
import { executeIntersection } from "./operators/execute-intersection";
import { executeJunction } from "./operators/execute-junction";
import { executeProjection } from "./operators/execute-projection";
import { executeSelection } from "./operators/execute-selection";
import { executeUnion } from "./operators/execute-union";

const actionByOperator = {
  σ: executeSelection,
  π: executeProjection,
  "∪": executeUnion,
  "∩": executeIntersection,
  "-": executeDifference,
  "⨝": executeJunction,
  "X": executeCartesianProduct
};

export function execute(expression) {
  const action = actionByOperator[expression.operator];

  if (!action) {
    throw new Error("Operador inválido");
  }

  const result = action(expression);

  if (expression?.variable) {
    result.name = expression.variable.toUpperCase();
    result.variable = true;
  }

  return result;
}
