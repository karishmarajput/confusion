import React, { Component } from 'react';
import Moment from 'moment';
import { Card, CardImg, CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem,
   Button, Modal, ModalHeader, ModalBody,Row,Col, Label} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

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
function RenderComments({comments, addComment, dishId}){
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
          <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    </div>
  );
}
const Dishdetail = (props) =>{
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
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
              
              <RenderComments comments={props.comments}
                addComment={props.addComment}
                dishId={props.dish.id}
              />
             
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
class CommentForm extends Component{
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleLogin = this.handleSubmit.bind(this);
    this.state = {
        isModalOpen: false
    };
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit(values) {
    this.toggleModal();
    
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  
  }

  render(){
    return(
      <div>
          <Button id="commentBtn" outline onClick={this.toggleModal} ><span className="fa fa-pencil fa-lg"></span>  Submit Comment</Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Label htmlFor="rating"> Rating</Label>
                        <Row className="form-group">                         
                            <Col >
                              <Control.select model=".rating" name="rating" className="form-control">
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                              </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                                <Label htmlFor="author" > Your Name</Label>
                                <Col>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                             minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            
                                            minLength: ' Must be greater than 2 characters',
                                            maxLength: ' Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" >Comment</Label>
                                <Col >
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                      </LocalForm>
                    </ModalBody>
                </Modal>
      </div>
      
      
    )
  }
}    


export default Dishdetail;