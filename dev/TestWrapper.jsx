import React from 'react';
import { State, StateMachine } from '../src/main';

export default class TestWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rightDisabled: true,
      leftDisabled: true,
      inDisabled: true,
      outDisabled: true
    };
  }

  render() {
    const { jsm, state } = this;
    const { stateName, outDisabled, inDisabled, rightDisabled, leftDisabled } = state;
    return(
      <div style={{position: 'relative'}}>
        {this.renderStateMachine()}
        <div>
          {[6, 5, 4, 3, 2, 1].map((i, r) => {
            r = r*60*Math.PI/180;
            let x = Math.cos(r), y = Math.sin(r);
            return(
              <div
                style={{
                  position: 'absolute',
                  top: 200 + x*200,
                  left: 200 + y*200,
                  width: 40,
                  height: 40,
                  background: stateName === `o${i}` ? 'red'
                            : stateName === `i${i}` && !outDisabled ? 'lightcoral'
                            : 'pink',
                  borderRadius: 40,
                  fontSize: 16,
                  fontFamily: 'Arial',
                  fontWeight: 'bold',
                  lineHeight: '2.5em',
                  textAlign: 'center',
                  color: stateName === `o${i}` ? 'white'
                       : stateName === `i${i}` && !outDisabled ? 'black'
                       : 'black',
                }}
                data-x={x} data-y={y} key={`point-${r}`}>{`O${i}`}</div>
            );
          })}
        </div>
        <div>
          {[6, 5, 4, 3, 2, 1].map((i, r) => {
            r = r*60*Math.PI/180;
            let x = Math.cos(r), y = Math.sin(r);
            return(
              <div
                style={{
                  position: 'absolute',
                  top: 200 + x*130,
                  left: 200 + y*130,
                  width: 40,
                  height: 40,
                  background: stateName === `i${i}` ? 'blue'
                            : stateName === `o${i}` && !inDisabled ? 'lightskyblue'
                            : 'lightblue',
                  borderRadius: 40,
                  fontSize: 16,
                  fontFamily: 'Arial',
                  fontWeight: 'bold',
                  lineHeight: '2.5em',
                  textAlign: 'center',
                  color: stateName === `i${i}` ? 'white'
                       : stateName === `o${i}` && !inDisabled ? 'black'
                       : 'black',
                }}
                data-x={x} data-y={y} key={`point-${r}`}>{`I${i}`}</div>
            );
          })}
        </div>
        <div>
          {[6, 5, 4, 3, 2, 1].map((i, r) => {
            r = r*60*Math.PI/180;
            let x = Math.cos(r), y = Math.sin(r);
            return(
              <div
                style={{
                  position: 'absolute',
                  top: 200 + x*130,
                  left: 200 + y*130,
                  width: 40,
                  height: 40,
                  background: stateName === `i${i}` ? 'blue'
                            : stateName === `o${i}` && !inDisabled ? 'lightskyblue'
                            : 'lightblue',
                  borderRadius: 40,
                  fontSize: 16,
                  fontFamily: 'Arial',
                  fontWeight: 'bold',
                  lineHeight: '2.5em',
                  textAlign: 'center',
                  color: stateName === `i${i}` ? 'white'
                       : stateName === `o${i}` && !inDisabled ? 'black'
                       : 'black',
                }}
                data-x={x} data-y={y} key={`point-${r}`}>{`I${i}`}</div>
            );
          })}
        </div>
        <div style={{
          position: 'absolute',
          fontFamily: 'Arial',
          fontWeight: 'bold',
          top: 160,
          left: 160,
          width: 120,
          height: 120,
          borderRadius: 120,
          fontSize: 60,
          lineHeight: '2em',
          textAlign: 'center',
          color: 'white',
          backgroundColor: stateName && stateName.match(/^o\d/) ? 'red'
                         : stateName && stateName.match(/^i\d/) ? 'blue'
                         : 'black'
        }}>{stateName && stateName.toUpperCase()}</div>
        <div style={{padding:5}}>
          <button disabled={leftDisabled} onClick={() => jsm.left()}>LEFT</button>
          <button disabled={rightDisabled} onClick={() => jsm.right()}>RIGHT</button>
          <button disabled={inDisabled} onClick={() => jsm.in()}>IN</button>
          <button disabled={outDisabled} onClick={() => jsm.out()}>OUT</button>
        </div>
      </div>
    );
  }

  renderStateMachine() {
    return(
      <StateMachine
        initial='init'
        onCreate={(jsm) => {
          this.jsm = jsm;
          jsm.o1();
          this.forceUpdate();
        }}
        onEnterState={() => {
          const { jsm } = this;
          if(jsm) {
            this.setState({
              rightDisabled: !jsm.can('right'),
              leftDisabled: !jsm.can('left'),
              inDisabled: !jsm.can('in'),
              outDisabled: !jsm.can('out'),
              stateName: jsm.current
            })
          }
          else {
            this.forceUpdate()
          }
        }}
      >
        <State name='init'>
          <State
            name={['o1', 'o2', 'o3', 'o4', 'o5', 'o6']}
            event={['o1', 'o2', 'o3', 'o4', 'o5', 'o6']}
          />

          <State
            name={['i1', 'i2', 'i3', 'i4', 'i5', 'i6']}
            event={['i1', 'i2', 'i3', 'i4', 'i5', 'i6']}
          />

          <State name={['o1', 'o2', 'o3', 'o4', 'o5', 'o6']}>
            <State name={['o2', 'o3', 'o4', 'o5', 'o6', 'o1']} event='right' />
          </State>

          <State name={['o1', 'o2', 'o3', 'o4', 'o5', 'o6']}>
            <State name={['o6', 'o1', 'o2', 'o3', 'o4', 'o5']} event='left' />
          </State>

          <State name={['i1', 'i2', 'i3', 'i4', 'i5', 'i6']}>
            <State name={['i2', 'i3', 'i4', 'i5', 'i6', 'i1']} event='right' />
          </State>

          <State name={['i1', 'i2', 'i3', 'i4', 'i5', 'i6']}>
            <State name={['i6', 'i1', 'i2', 'i3', 'i4', 'i5']} event='left' />
          </State>

          <State name={['o1', 'o3', 'o5']}>
            <State name={['i1', 'i3', 'i5']} event='in' />
          </State>

          <State name={['i1', 'i3', 'i5']}>
            <State name={['o1', 'o3', 'o5']} event='out' />
          </State>

        </State>
      </StateMachine>
    );
  }
}
