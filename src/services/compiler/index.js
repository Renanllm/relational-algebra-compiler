import { addEntityField } from "./add-entity-fields";
import { cleanGroups } from "./clean-groups";
import { execute } from "./execute";
import { identifyAndValidateRelationalAlgebraExpression } from "./identify-and-validate-relational-algebra-expression";

export const compile = (expression, entities) => {
  const groups = identifyAndValidateRelationalAlgebraExpression(expression);
  const cleannedGroups = cleanGroups(groups);

  const expressionWithFields = addEntityField(cleannedGroups, entities);
  return execute(expressionWithFields);
};
