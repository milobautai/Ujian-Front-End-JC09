import React from 'react'
import {Table , TableBody,TableRow,TableCell,TableHead,Paper,Container} from '@material-ui/core'
import Axios from 'axios';

class transactionhist extends React.Component{
    //state
    state = { 
              data : [] ,
            }

    componentDidMount(){
        Axios.get('http://localhost:2000/users?transaction')
        .then((res) => {
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    Renderhistory = () => {
        var historytrx = this.state.data.map((val , index) => {
            return(
                <TableRow>
                    <TableCell className='hist'><var>{new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getYear()}</var></TableCell>
                    <TableCell className='hist'>{val.title}</TableCell>
                    <TableCell className='hist'>{val.qty}</TableCell>
                    <TableCell className='hist'>{val.total}</TableCell>
                </TableRow>
            )      
       })
        return historytrx
    }


    render(){
        return(
            <Container fixed>
                <h1 className='mmpage'> Manage Movie Page </h1>
                <Paper>
                    <Table className='mmtable'>
                        <TableHead>
                            <TableCell className='mmcell'>Tanggal</TableCell>
                            <TableCell className='mmcell'>Title</TableCell>
                            <TableCell className='mmcell'>Qty</TableCell>
                            <TableCell className='mmcell'>Total Harga</TableCell>
                        </TableHead>
                        <TableBody>
                            {this.Renderhistory()}
                        </TableBody>

                    </Table>
                </Paper>
            </Container>
        )
    }
}
    export default transactionhist
                