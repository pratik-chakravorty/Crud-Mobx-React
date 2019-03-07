import React, { Component } from "react";
import { inject, observer } from "mobx-react";

//passes your store as a prop to the component
@inject("BirdStore")
@observer //watches the store to re-render the component when state changes.
class App extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const bird = this.bird.value;
    if (this.props.BirdStore.edit) {
      this.props.BirdStore.updateBird(bird);
      this.props.BirdStore.toggleEdit();
    } else {
      this.props.BirdStore.addBird(bird);
    }
    this.bird.value = "";
  };

  editBird = (bird, i) => {
    this.bird.value = bird;
    this.props.BirdStore.updateIndex(i);
    this.props.BirdStore.toggleEdit();
    // this.props.BirdStore.updateBird(bird, index);
    // this.bird.value = "";
  };
  render() {
    const { BirdStore } = this.props;
    return (
      <div className="App">
        <h2>You have: {BirdStore.birdCount} birds.</h2>

        {BirdStore.edit ? (
          <form onSubmit={e => this.handleSubmit(e)}>
            <input
              type="text"
              placeholder="Edit Bird"
              ref={input => (this.bird = input)}
            />
            <button>Update Bird</button>
          </form>
        ) : (
          <form onSubmit={e => this.handleSubmit(e)}>
            <input
              type="text"
              placeholder="Enter Bird"
              ref={input => (this.bird = input)}
            />
            <button>Add Bird</button>
          </form>
        )}
        <ul>
          {this.props.BirdStore.birds.map((bird, i) => {
            return (
              <li key={i}>
                {bird}
                <button onClick={() => BirdStore.removeBird(i)}>Remove</button>
                <button onClick={() => this.editBird(bird, i)}>Edit</button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
