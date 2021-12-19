import React from 'react';
import Moment from 'moment';
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';




function RenderDish({dish}){
    return(
          <Card>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
      
    );
}
function RenderComments({comments}){
  const comment = comments.map((comm) => {
        return(        
          <div key={comm.id} style={{width:'100%'}}>
            <ul className="list-unstyled">
              <li>{comm.comment}</li>
              <br></br>
              <li>
                <div>
                  <ul className="list-inline" >
                    <li className="list-inline-item">--{comm.author},</li>
                    <li className="list-inline-item">
                      {Moment(comm.date).format('MMM DD, YYYY')}
                      </li>
                  </ul>
                </div>
              </li>
            </ul>      
          </div>
        );
  }); 
 
  return (
    <div className="container">
      <div className="header">
          <h4>Comments</h4>
        </div>
      <div className="row">
          {comment}
      </div>
    </div>
  );
}
const Dishdetail = (props) =>{
    if(props.dish != null){
      return (
        <div className="container">
          <div className="row">
              <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
              </Breadcrumb>
              <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
              </div>                
          </div>
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              <RenderDish dish={props.dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
              <RenderComments comments={props.comments} />
            </div> 
          </div>
        </div>
      );
    }else{
      return(
        <div/>
      )
    }
  };
        


export default Dishdetail;