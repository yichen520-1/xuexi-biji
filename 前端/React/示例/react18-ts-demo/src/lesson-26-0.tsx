export {};
import { Component } from 'react';
type Props = { step: number };
type State = { count: number };
export class ClassCounter extends Component<Props, State> {
  override state: State = { count: 0 };
  increment = () => this.setState((current, props) => ({ count: current.count + props.step }));
  override render() {
    return <button onClick={this.increment}>{this.state.count}</button>;
  }
}
