import React, { Component } from 'react'
import {Paper} from '@material-ui/core'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import Axios from 'axios'
import {OnRegisterSuccess} from './../redux/actions'
import {Redirect} from 'react-router-dom'
import { ApiUrl } from '../supports/ApiURl';


class Profile extends Component {
    state = {
        error : ''
    }
    onBtnPassChangeClick = () => {
        var username = this.refs.username.value
        var password = this.refs.password.value
        var newpass= this.refs.newpass.value
        var confirmnewpass= this.refs.confirm.value
        if(password ===''||newpass ===''||confirmnewpass===''){
            this.setState({error : 'Please do not leave any blanks'})
        }else{
            Axios.get(ApiUrl + '/users?username=' + username + '&password=' + password)
            .then((res) => {
                if(res.data.length === 0){
                    this.setState({error : 'Username or Password invalid'})
                }else{

                    var obj = {password : confirmnewpass}
                    password.push(obj)
                    Axios.patch(ApiUrl + '/users/' + this.props.id)

                    .then((res) => {
                        console.log(res.data)
                        this.props.OnRegisterSuccess(res.data)
                        localStorage.setItem('terserah' ,res.data.username)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    

    render(){
        return (
            <div className='container'>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-6'>
                    <Paper className='p-5'>
                    <h1 className='ChangePassword'> Change Password </h1>
                    <p className='username'>username : {this.props.username}</p>
                    <input ref='Current Password' className='form-control mt-3' type='text' placeholder='current password' />
                    <input ref='New Password' className='form-control mt-3' type='text' placeholder='new password' />
                    <input ref='Confirm New Password' className='form-control mt-3' type='text' placeholder='confirm new password' />
                    {
                        this.state.error === '' 
                        ?
                        null 
                        :
                        <div className='alert alert-danger mt-3'>
                            {this.state.error} 
                            <span onClick={() =>this.setState({error : ''})} style={{fontWeight:"bolder" , cursor : 'pointer',float : 'right'}}> x </span> 
                        </div>
                    }
                    <input onClick={this.onBtnPassChangeClick} type='button' className='btn btn-secondary mt-5' value='Change Password'/>
                    
                    </Paper>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        username : state.user.username
    }
}

export default connect(mapStateToProps , {OnRegisterSuccess})(Profile)
