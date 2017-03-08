import React, {Component} from 'react';
import {Row, Col, Collapsible, CollapsibleItem, Icon, Table, thead, tr, th, tbody, td} from "react-materialize";
import Body from '../obj.json';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: [],
      user: '',
      painItems: []
    }
  }

  componentDidMount() {

    fetch('http://localhost:4000/profile', {
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
          user: localStorage.getItem('uid')
        })
      }).then((response) => {
        return response.json();
      }).then((body) => {
        console.log(body);
        this.setState({
          profile: body.data
        })
      })

    fetch('http://localhost:4000/dashboard', {
      method: 'post',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        user: localStorage.getItem('uid')
      })
    }).then((response) => {
      return response.json();
    }).then((body) => {
      console.log(body);
      this.setState({
        user: body.data[0].name,
        painItems: body.data
      })
    })
  }

formatDate = (date) => {
  return (date.slice(0, 10));
}



  render() {
    return (
      <div>
        <br></br><br></br><br></br><br></br><br></br><br></br>
        <Row>
          <Col m={10} offset="m1" className="red lighten-2 z-depth-1">
              <h5 className="white-text"><Icon left className='white-text'>assignment_ind</Icon>User Profile</h5>
          </Col>
        </Row>
        <Row>
          <Col m={8} offset="m2">
            {this.state.profile.map((obj, index ) => {
              return (
                <Collapsible popout>
                  <CollapsibleItem header="Full Name" className="grey lighten-5 z-depth-1" icon='perm_identity'>
                    {obj.name}
                    <Icon right className='orange-text'>mode_edit</Icon><Icon right className='red-text'>delete</Icon>
                  </CollapsibleItem>
                  <CollapsibleItem header="Email" className="grey lighten-5 z-depth-1" icon='email'>
                    {obj.email}
                    <Icon right className='orange-text'>mode_edit</Icon><Icon right className='red-text'>delete</Icon>
                  </CollapsibleItem>
                  <CollapsibleItem header="Age" className="grey lighten-5 z-depth-1" icon='query_builder'>
                    {obj.age}
                    <Icon right className='orange-text'>mode_edit</Icon><Icon right className='red-text'>delete</Icon>
                  </CollapsibleItem>
                  <CollapsibleItem header="Gender" className="grey lighten-5 z-depth-1" icon='label_outline'>
                    {obj.gender}
                    <Icon right className='orange-text'>mode_edit</Icon><Icon right className='red-text'>delete</Icon>
                  </CollapsibleItem>
                  <CollapsibleItem header="Weight" className="grey lighten-5 z-depth-1" icon='label'>
                    {obj.weight}
                    <Icon right className='orange-text'>mode_edit</Icon><Icon right className='red-text'>delete</Icon>
                  </CollapsibleItem>
                  <CollapsibleItem header="Height" className="grey lighten-5 z-depth-1" icon='swap_vert'>
                    {obj.height_feet} ft, {obj.height_inches} inches
                    <Icon right className='orange-text'>mode_edit</Icon><Icon right className='red-text'>delete</Icon>
                  </CollapsibleItem>
                  <CollapsibleItem header="Allergies" className="grey lighten-5 z-depth-1" icon='swap_vert'>
                    {obj.allergies}
                    <Icon right className='orange-text'>mode_edit</Icon><Icon right className='red-text'>delete</Icon>
                  </CollapsibleItem>
                  <CollapsibleItem header="Prescriptions" className="grey lighten-5 z-depth-1" icon='swap_vert'>
                    {obj.medication}
                    <Icon right className='orange-text'>mode_edit</Icon><Icon right className='red-text'>delete</Icon>
                  </CollapsibleItem>
                  <CollapsibleItem header="Medical Conditions" className="grey lighten-5 z-depth-1" icon='swap_vert'>
                    {obj.conditions}
                    <Icon right className='orange-text'>mode_edit</Icon><Icon right className='red-text'>delete</Icon>
                  </CollapsibleItem>
                </Collapsible>

              )
            })}
          </Col>
        </Row>
          {this.state.painItems.map((obj, index) => {
            return (
              <Row>
                <Col m={8} offset="m2">
                  <Table>
                    <thead>
                      <tr>
                        <th data-field="inputs"> Pain Point </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Title:</td>
                        <td>{obj.title}</td>
                      </tr>
                      <tr>
                        <td>Body Part:</td>
                        <td>{
                              Object.keys(Body['body']).filter((region, i) => {
                                const regId = obj.body_part_id.slice(0, 1);
                                const partId = obj.body_part_id;
                                if (Body['body'][region]['id'] === regId) {
                                  Object.keys(Body['body'][region]['parts']).filter((part, i) =>{
                                    if (Body['body'][region]['parts'][part]['id'] === partId) {
                                      this.BodyPart = part
                                    }
                                      return null;
                                  })
                                }
                                return null;
                              })
                           }
                           {this.BodyPart}</td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td>{obj.description}</td>
                      </tr>
                      <tr>
                        <td>Pain Rating:</td>
                        <td>{obj.pain_rating}</td>
                      </tr>
                      <tr>
                        <td>Date Logged</td>
                        <td>{this.formatDate(obj.date_created)}</td>
                      </tr>
                    </tbody>
                  </Table>

                </Col>
              </Row>
            )
          })}
      </div>
    )
  }
}

export default Profile;



                // <span key={index}>
                //   <span>Title: {obj.title}<br /></span>
                //   <span>Body Part: {
                //                       Object.keys(Body['body']).map((region, i) => {
                //                         const regId = obj.body_part_id.slice(0, 1);
                //                         const partId = obj.body_part_id;
                //                         if (Body['body'][region]['id'] === regId) {
                //                           Object.keys(Body['body'][region]['parts']).map((part, i) =>{
                //                             if (Body['body'][region]['parts'][part]['id'] === partId) {
                //                               this.BodyPart = part
                //                             }
                //                               return null;
                //                           })
                //                         }
                //                         return null;
                //                       })
                //                    }
                //                    {this.BodyPart}<br /></span>
                //   <span>Description: {obj.description}<br /></span>
                //   <span>Pain Rating: {obj.pain_rating}<br /></span>
                //   <span>Date Logged: {this.formatDate(obj.date_created)}<br /></span>
                //   <br/>
                // </span>