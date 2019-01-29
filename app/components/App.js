var React = require("react");
// var Badge = require("./Badge");
var Popular = require("./Popular");

// var USER_DATA = {
//   name: "Denys Rebenok",
//   username: "DenisRebenok",
//   img: "https://avatars2.githubusercontent.com/u/8539872?s=460&v=4"
// };

class App extends React.Component {
  render() {
    return (
      <div id="app" className="container">
        <Popular />
      </div>
    );
  }
}

module.exports = App;
