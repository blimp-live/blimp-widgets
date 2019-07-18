import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SlackComponent extends Component {
  render() {
    return (
			<div className="container">
			 <div className="col-xs-12">
			 <h1>My Todos</h1>
			 {this.state.todos.map((todo) => (
				 <div className="card">
					 <div className="card-body">
						 <h5 className="card-title">{todo.title}</h5>
						 <h6 className="card-subtitle mb-2 text-muted">
						 { todo.completed &&
							 <span>
							 Completed
							 </span>
						 }
						 { !todo.completed &&
							 <span>
								 Pending
							 </span>
						 }
						 </h6>
					 </div>
				 </div>
			 ))}
			 </div>
			</div>
		)
  }
};
