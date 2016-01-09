import React from 'react';
import ReactDOM from 'react-dom';
import JSM from 'javascript-state-machine';
const { PropTypes } = React;

export default class StateMachine extends React.Component {
  static defaultProps = {
    onCreate: function() {},
    initial: 'init',
    internal: false,
    jsm: null
  };

  static propTypes = {
    callback: PropTypes.func,
    initial: PropTypes.string.isRequired,
    internal: PropTypes.bool,
    jsm: PropTypes.object,
    onCreate: PropTypes.func,
    onEnterState: PropTypes.func,
    onLeaveState: PropTypes.func,
    onBeforeEvent: PropTypes.func,
    onAfterEvent: PropTypes.func
  };

  static childContextTypes = {
    events: PropTypes.array,
    callbacks: PropTypes.object,
    container: PropTypes.object
  };

  getChildContext() { return this.context }

  constructor(props) {
    super(props);
    this.state = {};
    this.container = document.createElement('div');
  }

  componentWillMount() {
    this.context = { events: [], callbacks: {}, container: this.container }
  }

  componentDidMount() {
    const { props, context } = this;
    const { events, callbacks } = context;
    if(props.internal) {
      ['onEnterState', 'onLeaveState', 'onBeforeEvent', 'onAfterEvent'].forEach((c) => {
        if(props[c]) { callbacks[c.toLowerCase()] = props[c] }
      });
      this.jsm = JSM.create({initial:props.initial, events, callbacks});
      this.props.onCreate(this.jsm);
    }
    else {
      ReactDOM.render(<StateMachine {...props} internal={true} jsm={this}>{this.props.children}</StateMachine>, this.container);
    }
  }

  render() {
    const { props } = this;
    if(props.internal) {
      return <script style={{display:'none'}}>{props.children}</script>
    }
    return <script data-name='state-machine' style={{display:'none'}} />;
  }
}
