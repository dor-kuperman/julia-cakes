import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { createCake } from '../actions/cakeActions'
import './tableStyle.css'

class CakeCreate extends Component {
    constructor(props) {
        super(props);
        this.onImgUpload = this.onImgUpload.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            // recipe: {
            //     cubes: {


            //     },
            //     steps: {

            //     }
            // },
            duration: 0,
            imgURL: ''
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    async onImgUpload(e) {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'Julia Cakes')
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dwgurovdg/image/upload',
            {
                method: 'POST',
                body: data
            })
        const file = await res.json()
        this.setState({ imgURL: file.url })
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.imgURL);
        const cake = {
            username: this.state.username,
            // description: this.state.description,
            duration: parseInt(this.state.duration),
            imgURL: this.state.imgURL
        }

        this.props.createCake(cake)
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
                    <input type="file" name="img" accept="image/*"
                        // value={this.state.img}
                        onChange={this.onImgUpload}
                        className="form-control">
                    </input>
                    <div className="form-group">
                        <input type="submit" value="Create Cake Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

CakeCreate.propTypes = {
    createCake: PropTypes.func.isRequired
}

export default connect(null, { createCake })(CakeCreate);   