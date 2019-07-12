import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class MovieList extends React.Component{
    state = {data : []}
    
    componentDidMount(){
        this.getDataMovies()
    }

    getDataMovies = () => {
        Axios.get('http://localhost:2000/movies')
        .then((res) => {
            this.setState({data : res.data})
        })
        .catch((err) => {
            alert('masuk')
        })

    }

    // Dari Movie List kirim Id Ke Movie Detail
    // Di Movie Detail kita get movie berdasarkan ID
    // Dapet Data, kemudian taruh di state
    // Lalu State di render
    
    renderMovieJsx = () => {
        var jsx = this.state.data.map((val) => {
            return(
                <div className='col-md-3 m-2 mycard' >
                    <Link to={'/movie-detail?id=' + val.id} >
                        <img src={val.image} alt="movie" width='100%' />
                    </Link>
                    <Link to={'/movie-detail?id='+val.id}>
                    <div className='title ml-3 mt-2'>{val.title} </div>
                    </Link>
                    <div className='lang ml-3 mt-2'> {val.sutradara}</div>
                    <div className='genre ml-3 mb-3 mt-2'> {val.genre} </div>
                </div>
            )
        })

        return jsx
    }

    render(){
        console.log(this.state.data)
        return(
            <div className='container mt-5'>
                { this.props.username !== ""?
                <div className='alert alert-success'>
                    Hello , Welocome Back, {this.props.username}
                </div>: null
                }   
                <div className='row justify-content-left'>

                {this.renderMovieJsx()}

                

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

export default connect(mapStateToProps)(MovieList);