import React from 'react';
import ReactDOM from 'react-dom';
import text from './text.json'


function OutputBox(props) {
  return (
    <div className="Box mt-3 mb-6 ml-6 mr-6 pl-2 pb-1">
      {props.output}
    </div>
  );
}

function SelectButton(props) {
  return (
    <div 
    className="btn btn-block" type="button"
      key={props.nextIndex}
      onClick={props.onClick}
    >
      {props.selects[props.nextIndex]}
    </div>
  )
}

class SelectBox extends React.Component {
  renderButton(nextIndex) {
    return (
      <SelectButton 
        nextIndex={nextIndex}
        selects={this.props.selects}
        onClick={() => this.props.onClick(nextIndex)}
      />
    )
  }

  render() {
    const nextIndexes = this.props.nextIndexes;
    const selectItems = nextIndexes.map((nextIndex) =>
      this.renderButton(nextIndex)
    );

    return(
      <div className="mt-6 mb-3 ml-6 mr-6">{selectItems}</div>
    );
  }
}

function RemakeBox(props) {
  return (
    <div className="mt-6 mb-3 ml-6 mr-6">
      <div className="btn btn-block" type="button" onClick={props.onClick}>
        Remake
      </div>
    </div>
  )
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: '0',
      nextIndexes: text['next']['0'].split(','),
      isEnd: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(nextIndex) {
    if (text['next'][nextIndex].split(',')[0] === '-1') {
      this.setState({
        isEnd: true,
        currentIndex: nextIndex,
      });
    }
    else {
      this.setState({
        currentIndex: nextIndex,
        nextIndexes: text['next'][nextIndex].split(','),
      });
    }
  }

  handleClickRemake() {
    this.setState({
      currentIndex: '0',
      nextIndexes: text['next']['0'].split(','),
      isEnd: false,
    });
  }

  render() {
    return (
      <div className="container-md mt-6 mb-3 pb-6">
        <OutputBox output={text['output'][this.state.currentIndex]}/>
        {
          this.state.isEnd
          ? <RemakeBox
            onClick={() => this.handleClickRemake()}
            />
          : <SelectBox
              selects={text['select']}
              nextIndexes={this.state.nextIndexes}
              onClick={(nextIndex) => this.handleClick(nextIndex)}
            />
        }
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);