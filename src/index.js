export default function ({ types: t }) {
  return {
    visitor: {
      ExpressionStatement(path) {
        const { node } = path
        if (
          t.isTaggedTemplateExpression(node.expression) &&
          t.isIdentifier(path.node.expression.tag, { name: 'log' })
        ) {
          const {
            quasi: { expressions, quasis },
          } = node.expression
          path.replaceWith(
            t.expressionStatement(
              t.callExpression(
                t.memberExpression(
                  t.identifier('console'),
                  t.identifier('log')
                ),
                [
                  // t.stringLiteral(
                  //   `${node.loc.start.line}:${node.loc.start.column}  `
                  // ),
                  t.templateLiteral(quasis, expressions),
                ]
              )
            )
          )
        }
      },
    },
  }
}
