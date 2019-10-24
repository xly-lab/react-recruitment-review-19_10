import React, {Component} from 'react'

import logoImg from '../../assets/images/hire1.png'
export default class Logo extends Component {
    render() {
        return (
            <div className="logo-container">
                <img src={logoImg} alt="logo" className='logo-img'/>
            </div>
        )
    }
}
