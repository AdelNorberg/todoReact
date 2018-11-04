import React, {Component} from 'react';

import AppHeader from '../AppHeader/AppHeader';
import SearchPanel from '../SearchPanel/SearchPanel';
import TodoList from '../TodoList/TodoList';
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter';
import AddItem from '../AddItem/AddItem';

import './App.css'

export default class App extends Component  {
    
    maxId = 100;

    state = {
        todoData: [],
        term: '',
        filter: 'active'
    };

    render() {
        
        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);

        const doneCount = todoData.filter((item) => item.done).length;

        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter}
                                      onFilterChange={this.onFilterChange}/>
                </div>
        
                <TodoList todos={visibleItems}
                          onDeleted={this.onDeleteItem}
                          onToggleImportant={this.onToggleImportant}
                          onToggleDone={this.onToggleDone}/>
                <AddItem onAddItem={this.onAddItem} />
            </div>
        );
    };

    search (items, term ) {
        if (term.length === 0) {
            return items
        }

        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase) > -1;
        })
    };

    onSearchChange = (term) => {
        this.setState({term})
    };

    onFilterChange = (filter) => {
        this.setState({filter})
    };

    filter (items, filter) {
        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done)
            case 'done':
                return items.filter((item) => item.done)
            default:
                return items;
        }
    };

    createTodoItem (label) {
        return {
            label,
            important: false,
            done: false,
            key: this.maxId++
        };
    };    

    onAddItem = (label) => {
        const newItem = this.createTodoItem(label);

        this.setState(({todoData}) => {
            return {
                todoData: [...todoData, newItem]
            }
        });
    };

    onDeleteItem = (key) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.key === key);

            const newArray = [
                ...todoData.slice(0, idx), 
                ...todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            }; 
        })
    };

    onToggleDone = (key) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.onToggleProperty(todoData, key, 'done')
            }
        })
    };

    onToggleImportant = (key) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.onToggleProperty(todoData, key, 'important')
            }
        })
    };

    onToggleProperty = (arr, key, propName) => {
        const idx = arr.findIndex((item) => item.key === key);

        const oldItem = arr[idx];
        const newItem = {
            ...oldItem, 
            [propName]: !oldItem[propName]
        };

        return [
            ...arr.slice(0, idx),
            newItem, 
            ...arr.slice(idx + 1)
        ]
    };
};