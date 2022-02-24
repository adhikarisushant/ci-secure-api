import React from 'react';
import ReactDOM from 'react-dom';

const Root = () => <h1>Hello World from React</h1>;

let container = document.getElementById('app');
let component = <Root/>;

ReactDOM.render(component, container);
