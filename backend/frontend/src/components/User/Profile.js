import React from 'react'
import user_logo from '../../media/user_logo.jpg'
import './Profile.css'
import { useLocation } from 'react-router-dom'

function Profile() {
    const location = useLocation();
    const data=location.state.data;
  return (
    <div className="profile_display">
            <div className="head_div">
                <div className='profile_wrapper'></div>
                <div className='profile_top_heading'>
                    <img src={user_logo} />
                    <div className='profile_text'>
                        <ul type='none'>
                            <li style={{'marginLeft':'6px'}}>Profile</li>
                            <li className='profile_txt_head'>{data['first_name']} {data['last_name']}</li>
                            <br />
                        </ul>
                    </div>
                </div>
            </div>
                <div className="profile_bottom_area">
                    <div className="profile_info">
                        <h3>Profile</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{'color':'white','fontWeight':'bold', 'width':'25px'}}>Full Name </td>
                                    <td>: {data['first_name']} {data['last_name']}</td>
                                </tr>
                                <tr>
                                    <td style={{'color':'white','fontWeight':'bold', 'width':'25px'}}>D.O.B </td>
                                    <td>: {data['dob']}</td>
                                </tr>
                                <tr>
                                    <td style={{'color':'white','fontWeight':'bold', 'width':'25px'}}>Address </td>
                                    <td>: {data['address']}</td>
                                </tr>
                                <tr>
                                    <td style={{'color':'white','fontWeight':'bold', 'width':'25px'}}>Mobile No </td>
                                    <td>: {data['number']}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
  )
}

export default Profile
