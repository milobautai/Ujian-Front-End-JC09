import React, { Component } from 'react'
import {Paper} from '@material-ui/core'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import Axios from 'axios'
import {OnRegisterSuccess} from './../redux/actions'
import {Redirect} from 'react-router-dom'
import { ApiUrl } from '../supports/ApiURl';

class Login extends Component {
    state = {
        error : ''
    }
    onBtnLoginClick = () => {
        var name = this.refs.username.value
        var pass = this.refs.password.value
        if(name === '' || pass ===''){
            this.setState({error : 'Please do not leave any blanks'})
        }else{
            Axios.get(ApiUrl + '/users?username=' + name + '&password=' + pass)
            .then((res) => {
                if(res.data.length === 0){
                    this.setState({error : 'Username or Password invalid'})
                }else{
                    this.props.OnRegisterSuccess(res.data[0])
                    localStorage.setItem('terserah' , name)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    render() {
        if(this.props.username !== ""){
            return(
                <Redirect to='/' />
            )
        }
        return (
            <div className='container'>
            <div className='row justify-content-center mt-5'>
                <div className='col-md-6'>
                    <Paper className='p-5'>
                    <h1 className='logintext'> Sign In </h1>
                    <input ref='username' className='form-control mt-3' type='text' placeholder='username' />
                    <input ref='password' className='form-control mt-3' type='text' placeholder='password' />
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
                    <input onClick={this.onBtnLoginClick} type='button' className='btn btn-secondary mt-5' value='Login'/>
                    
                    </Paper>
                    <p className='register mt-3' style={{fontStyle:'italic'}}>
                        Belum Punya Akun?   
                        <Link to='/register'>
                        <span style={{marginLeft:'10px', color:'#42a5f5 blue',fontWeight :"bolder" , textDecoration:'underline',cursor:'pointer'}}> 
                             Sign Up Now 
                        </span>
                        </Link>
                    </p>
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

export default connect(mapStateToProps , {OnRegisterSuccess})(Login)
