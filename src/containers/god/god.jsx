import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'
import UserList from "../../components/user-list/user-list";

class God extends Component {
    componentDidMount() {
        this.props.getUserList('god')
    }

    render() {
        return (
            <div> <div><UserList userlist={this.props.userlist}/></div></div>
        )
    }
}
export default connect(
    state=>({userlist:state.userlist}),
    {getUserList}
)(God)
