import React, { Component, NavItem } from 'react'
import Numeral from 'numeral'
import PageNotFound from './../pages/PageNotFound'
import Axios from 'axios';
import { ApiUrl } from '../supports/ApiURl';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Cart from './cart'

class SeatRes extends Component {
    state ={
        chosen : [] ,
        booked : [] ,
        cart:[]
    }
    componentDidMount(){

        Axios.get(ApiUrl + '/movies/' + this.props.location.state.id)
        .then((res) => {
            this.setState({booked : res.data.booked})
        })
        .catch((err) => {
            console.log(err)
        })
        
    }
    
    onSeatClick = (arr) => {
        var chosen = this.state.chosen
        chosen.push(arr)
        this.setState({chosen :chosen })
    }
    onCancelSeatClick =(arr) => {
        var chosen = this.state.chosen
        // var index = chosen.indexOf(arr)
        // chosen.splice(index , 1)
        // this.setState({chosen : chosen})
        // console.log(chosen)
        var hasil = chosen.filter((val)=>{
           return val.join('') !== arr.join('')
        })
        this.setState({chosen: hasil})
    }

    renderSeat = () => {
        var {seats, booked} = this.props.location.state
        var arr = []
        // console.log(arr)

        for(var i = 0 ; i< seats/20 ; i++){
            arr.push([])
            for(var j = 0 ; j < seats/ (seats/20); j++){
                arr[i].push(1)
            }
        }
        
        for(var i = 0 ; i<this.state.booked.length; i++){
            arr[this.state.booked[i][0]][this.state.booked[i][1]] = 2
        }
        for(var i = 0 ; i< this.state.chosen.length; i++){
            arr[this.state.chosen[i][0]][this.state.chosen[i][1]] = 3
        }
        var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
        var jsx = arr.map((val,index) => {
            return(
                <tr>
                    {
                        val.map((val1,i) => {
                            if(val1 === 2){
                                return(
                                    <input 
                                    type='button' 
                                    style={{width:'40px' , height:'40px' , color : 'white',textAlign:'center'}} 
                                    disabled 
                                    value={i+1 + alpha[index]} 
                                    className='mr-2 mt-2 bg-danger'  />
                                ) 
                            }
                            if(val1 === 3){
                                return(
                                    <input 
                                    type='button' 
                                    style={{width:'40px' , height:'40px' , color : 'white',textAlign:'center'}}  
                                    value={i+1 + alpha[index]} 
                                    className='mr-2 mt-2 bg-success'
                                    onClick={()=> this.onCancelSeatClick([index,i])}  />
                                )
                            }
                            return(
                                <input 
                                type='button' 
                                style={{width:'40px' , height:'40px',textAlign:'center'}} 
                                value={i+1 + alpha[index]} 
                                className='mr-2 mt-2'
                                onClick={()=>this.onSeatClick([index,i])}
                                />
                            )
                        })
                    }
                </tr>
            )
        })
        return jsx

    }
    onBuyClick = () => {
        var Cart = this.props.Cart
        // post ke movie
        if(this.state.chosen.length !== 0){
            var booked = this.props.location.state.booked
            var arr = [...booked , ...this.state.chosen]
            Axios.patch(ApiUrl + '/movies/' + this.props.location.state.id,{
                booked : arr
            })
            .then((res) => {
                console.log(res.data)
                var obj = {
                    title : this.props.location.state.title,
                    qty : this.state.chosen.length,
                    total : this.state.chosen.length * 35000
                }
                Cart.push(obj)
                Axios.patch(ApiUrl + '/users/' + this.props.id,{
                    Cart : Cart
                } ).then((res) => {
                    alert('masuk')
                    
                    this.setState({Cart : [...this.state.booked , ...this.state.chosen],
                                    chosen : []
                    })
                })
            })
            .catch((err) => {
                console.log(err)
            })
        }
        // lalu post ke users
    }
    render() {
        console.log(this.props.location.state)
        if(this.props.location.state === undefined){
            return(
                <PageNotFound />
            )
        }
        return (
            <div className='container mt-5 mb-5'>
                <h1>{this.props.location.state.title}</h1>
                <div className='row justify-content-center'>
                    <table>
                    {this.renderSeat()}
                    </table>  
                    <div className='mt-5' style={{backgroundColor:'white'
                                 , width:'100%' 
                                 , height:'30px'
                                 , border:'0.5px solid grey'
                                 ,textAlign:'center',
                                 fontWeight:'bolder'}}>
                        LAYAR BIOSKOP
                    </div>  
                </div>
                {
                    this.state.chosen.length ===0 
                    ?
                    null
                    :
                    <div className='mt-5'>
                    Total Rp. {Numeral(this.state.chosen.length * 35000).format(0,0) }
                    </div>
                }
                <div className='mt-3'>
                    <Link to='/cart'>
                        <input type="button" onClick={this.onBuyClick} className='btn btn-primary' value='Add To Cart'/>
                    </Link>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        id : state.user.id,
        Cart : state.user.Cart
    }
}

export default connect(mapStateToProps)(SeatRes)

