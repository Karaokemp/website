"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@testing-library/react");
var App_1 = require("./App");
test('page shows greetings', function () {
    var getByText = react_2.render(<App_1["default"] />).getByText;
    var title = getByText(/Welcome to The Karaokemp!/i);
    expect(title).toBeInTheDocument();
});
