const assert = require("assert");
const { pathToRegex, parseQuery } = require("../src/core/router");

describe("pathToRegex", () => {
  it("Convertir rutas correctas a expresiones regulares", () => {
    const { regex, keys } = pathToRegex("/user/:id");
    assert.deepStrictEqual(keys, ["id"]);
    assert.ok(regex.test("/user/123_12"));
  });

  it("Convertir rutas incorrectas a expresiones degulares y fallar", () => {
    const {regex, keys} = pathToRegex("/user//:id");
    assert.deepStrictEqual(keys, ["id"]);
    assert.ok(!regex.test("/user/123_12/extra"));
  })
});


describe("parseQuery", () => {
  it("Extraer parámetros de una cadena de consulta", () => {
    const query = "?foo=bar&baz=qux&baz=quux";
    const result = parseQuery(query);
    console.log(result);
    assert.deepStrictEqual(result, { foo: "bar", baz: ["qux", "quux"] });
  });
})


