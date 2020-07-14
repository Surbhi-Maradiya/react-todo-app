import React, { Component } from 'react';
import './index.css';

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentValue: '',
            item: [],
            displayItem: [],
            currentFilter: "All"
        }
    }

    setCurrentValue = (e) => {
        this.setState({ currentValue: e.target.value });
    }

    addItem = () => {
        if (this.state.currentValue.length > 0) {
            let newItem = this.state.item;
            let obj = {
                value: this.state.currentValue,
                index: newItem.length,
                completed: false
            }
            newItem.push(obj);
            this.setState({ item: newItem, currentValue: '' });
            this.filter(this.state.currentFilter);
        }
    }

    deleteItem = (e) => {
        let newItem = this.state.item;
        let filteredItem = newItem.map((obj) => {
            if (obj.index == e) {
                obj.completed = !obj.completed;
            }
            return obj;
        }
        );
        this.setState({ item: filteredItem });
        this.filter(this.state.currentFilter);
    }

    createTasks = (item) => {
        return <li onClick={() => this.deleteItem(item.index)} key={item.index} style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>{item.value}</li>
    }

    filter = (e) => {
        let newItem = this.state.item;
        switch (e) {
            case "all":
                newItem = newItem;
                break;
            case "active":
                newItem = newItem.filter((obj => !obj.completed));
                break;
            case "completed":
                newItem = newItem.filter((obj => obj.completed));
                break;
            default:
                newItem = newItem;
                break;
        }
        this.setState({ displayItem: newItem, currentFilter: e });
    }

    render() {
        var listItems = this.state.displayItem.map(this.createTasks);
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h2>Todo App</h2>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6 text-center">
                            <div className="row">
                                <div className="col-md-9 form-group">
                                    <input className="form-control" type="string" placeholder="enter task" value={this.state.currentValue} onChange={this.setCurrentValue} />
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-primary btn-block" onClick={this.addItem}>Add</button>
                                </div>
                            </div>
                            <br />
                            <div className="row">
                                <div className="col-md-4">
                                    <button className="btn btn-success btn-block" onClick={() => this.filter("all")}>All</button>
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-warning btn-block" onClick={() => this.filter("active")}>Active</button>
                                </div>
                                <div className="col-md-4">
                                    <button className="btn btn-secondary btn-block" onClick={() => this.filter("completed")}>Completed</button>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="row">
                                <div className="col-md-12">
                                    <ul className="theList">{listItems}</ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        )
    }
}
