import React from 'react';
const { PropTypes } = React;

export default class State extends React.Component {
  static propTypes = {
    name: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    event: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    onBefore: PropTypes.func,
    onEnter: PropTypes.func,
    onLeave: PropTypes.func,
    onAfter: PropTypes.func,
    onEvent: PropTypes.func,
    onState: PropTypes.func
  };

  static contextTypes = {
    initial: PropTypes.string,
    events: PropTypes.array,
    callbacks: PropTypes.object,
    from: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string)
    ])
  };

  static childContextTypes = {
    initial: PropTypes.string,
    events: PropTypes.array,
    callbacks: PropTypes.object,
    from: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.arrayOf(React.PropTypes.string)
    ])
  };

  getChildContext() {
    const { initial, events, callbacks } = this.context;
    return { initial, events, callbacks, from:this.props.name };
  }

  addCallbacks(name, event, { onBefore, onEnter, onLeave, onAfter, onEvent, onState}) {
    const { callbacks } = this.context;
    if(name) {
      if(onEnter) { callbacks[`onenter${name}`] = onEnter }
      if(onLeave) { callbacks[`onleave${name}`] = onLeave }
      if(onEvent) { callbacks[`onevent${name}`] = onEvent }
      if(onState) { callbacks[`onstate${name}`] = onState }
    }
    if(event) {
      if(onBefore) { callbacks[`onbefore${event}`] = onBefore }
      if(onAfter) { callbacks[`onafter${event}`] = onAfter }
    }
    return this;
  }

  componentWillMount() {
    const
      { props, context } = this,
      { events } = context,
      event = props.event,
      fromState = context.from,
      toState = props.name;

    /* Bind state callbacks */
    (typeof toState === 'string' ? [ toState ] : toState).forEach((s) => {
      this.addCallbacks(s, null, props);
    });

    if(typeof toState === 'string') {
      if(typeof fromState === 'string') {
        if(typeof event === 'string') {
          /* to is string, from is string, event is string */
          events.push({name:event, from:fromState, to:toState});
          this.addCallbacks(null, event, props);
        }
        else if(event instanceof Array) {
          /* to is string, from is string, event is array */
          event.forEach((e) => {
            events.push({name:e, from:fromState, to:toState})
            this.addCallbacks(null, e, props);
          })
        }
      }
      else if(fromState instanceof Array) {
        if(typeof event === 'string') {
          /* to is string, from is array, event is string */
          events.push({name:event, from:fromState, to:toState});
          this.addCallbacks(null, event, props);
        }
        else if(event instanceof Array) {
          /* to is string, from is array, event is array */
          event.forEach((e) => {
            events.push({name:e, from:fromState, to:toState});
            this.addCallbacks(null, e, props);
          });
        }
      }
    }

    else if(toState instanceof Array) {
      if(typeof fromState === 'string') {
        if(typeof event === 'string') {
          /* to is array, from is string, event is string */
          /* Illegal Combination */
        }
        else if(event instanceof Array) {
          /* to is array, from is string, event is array */
          let i = 0;
          while(true) {
            let e = event[i], t = toState[i];
            if(!e || !t) { break }
            i++;
            events.push({name:e, from:fromState, to:t});
            this.addCallbacks(null, e, props);
          }
        }
      }
      else if(fromState instanceof Array) {
        if(typeof event === 'string') {
          /* to is array, from is array, event is string */
          let i = 0;
          while(true) {
            let f = fromState[i], t = toState[i];
            if(!f || !t) { break };
            i++;
            events.push({name:event, from:f, to:t});
          }
          this.addCallbacks(null, event, props);
        }
        else if(event instanceof Array) {
          /* to is array, from is array, event is array */
          let i = 0;
          while(true) {
            let e = event[i], t = toState[i];
            if(!e || !t) { break }
            i++;
            events.push({name:e, from:fromState, to:t});
            this.addCallbacks(null, e, props);
          }
        }
      }
    }
  }

  componentDidMount() {

  }

  render() {
    const { props } = this;
    return <state data-name={props.name} data-event={props.event}>{props.children}</state>;
  }
}
