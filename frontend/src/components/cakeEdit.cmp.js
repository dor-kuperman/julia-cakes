import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { editCake } from '../actions/cakeActions'
import './tableStyle.css'

class CakeEdit extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: this.props.cakeToEdit.username,
            // description: this.props.cakeToEdit.description,
            duration: this.props.cakeToEdit.duration,
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const cake = {
            _id: this.props.cakeToEdit._id,
            username: this.state.username,
            // description: this.state.description,
            duration: parseInt(this.state.duration),
        }

        this.props.editCake(cake)
        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create New Cake Log</h3>
                <form className="table-style" onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Cake Title: </label>
                        <input type="text"
                            required
                            name='username'
                            value={this.state.username}
                            onChange={this.onChange}
                            className="form-control"
                        />
                    </div>
                    {/* <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            name='description'
                            value={this.state.description}
                            onChange={this.onChange}
                            className="form-control"
                        />
                    </div> */}
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            name='duration'
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Cake Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state.cakes.cakes);
    return {
        cakeToEdit: state.cakes.cakes.find(cake => cake._id === ownProps.match.params.id)
    }
}

export default connect(mapStateToProps, { editCake })(CakeEdit);   