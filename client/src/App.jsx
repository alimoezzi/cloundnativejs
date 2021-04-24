import React from 'react'
import { Route } from 'react-router-dom'
// import * as itemsAPI from './itemsAPI'
import './app.css'
import Items  from './items/items.jsx'
import Additem from './items/Additem.jsx'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.readitem = React.createRef();
        this.currentitem = React.createRef();
        this.wantitem = React.createRef();
        this.modal = React.createRef()
    }

    state = {};


    triggerMove = async (item, to) => {
        switch (to) {
            case "done":
                await this.readitem.current.addItem(item);
                break;
            case "doing":
                await this.currentitem.current.addItem(item);
                break;
            case "todo":
                await this.wantitem.current.addItem(item);
                break;
            default:
                alert("Unexpected error happened");
                break;

        }
    };


    shelfCategories(done, doing, todo) {
        return <div className="list-items-content">
            <div>
                <div className="itemshelf">
                    <Items
                        ref={ this.readitem }
                        type="done"
                        items={ done }
                        triggerMove={ this.triggerMove }
                    />
                    <Items
                        ref={ this.currentitem }
                        type="doing"
                        items={ doing }
                        triggerMove={ this.triggerMove }
                    />
                    <Items
                        ref={ this.wantitem }
                        type="todo"
                        items={ todo }
                        triggerMove={ this.triggerMove }
                    />
                </div>
            </div>
        </div>;
    }

    render() {
        const { done, doing, todo } = this.state;
        return (
            <div className="list-items">
                <div className="list-items-title">
                    <h1 style={ { textShadow: "-10px -4px 9px black" } }>MyTodo</h1>
                </div>
                <Route
                    exact
                    path="/todo"
                    render={ history => this.shelfCategories(done, doing, todo) }
                />
                <Route
                    exact
                    path="/todo/additem"
                    render={ history => (<Additem triggerMove={ this.triggerMove } history={ history } types={ [
                        { key: 'done', text: 'done', value: 'done', },
                        { key: 'doing', text: 'doing', value: 'doing', },
                        { key: 'todo', text: 'todo', value: 'todo', }
                    ] }/>) }
                />
            </div>
        );
    }
}


export default App;