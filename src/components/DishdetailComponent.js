import React, { Component } from 'react';
import {Card, CardBody, CardImg, CardText, CardImgOverlay, 
    CardTitle, Breadcrumb, BreadcrumbItem, Button,
    Modal, ModalHeader, ModalBody, Row, Label, Col} from 'reactstrap';
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors} from 'react-redux-form'

    function RenderDish({dish}){
        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle heading>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

    function RenderComments({comments}){

        if(comments != null){

            const commentsList = comments.map((comment) =>{
                return(
                    <li key={comment.id}>   
                        <div>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </div>
                    </li>
                );
            });

            return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {commentsList}
                </ul>
            </div>
            )
        }
        else{
            return (
                <div></div>
            )
        }

    }

    const DishDetail = (props) => {

        if(props.dish != null){
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/menu'>
                                    Menu
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                {props.dish.name}
                            </BreadcrumbItem>
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
                            {console.log(props.comments)}
                            <RenderComments comments={props.comments} />
                            <CommentForm/>
                        </div>
                    </div>
                </div>
            ) 
        }
        else{
            return(
                <div></div>
            )
        }

    }

    const required = (val) => (val) && (val.length);
    const maxLength = (len) => (val) => !(val) || (val.length) <= len;
    const minLength = (len) => (val) => (val) && (val.length) >= len;


    class CommentForm extends Component {

        constructor(props) {
            super(props);
            this.state = {
                isModalCommentOpen: false
            }
            this.toggleModalComment = this.toggleModalComment.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModalComment(){
            this.setState({
                isModalCommentOpen: !this.state.isModalCommentOpen
            });
        }

        handleSubmit(values){
            console.log("Current State is:" + JSON.stringify(values));
            alert("Current State is:" + JSON.stringify(values));
        } 

        render(){
            return(
                <React.Fragment>
                    <Button outline onClick={this.toggleModalComment}>
                        <span className="fa fa-pencil fa-lg"> Submit Comment</span>
                    </Button>
                    <Modal isOpen={this.state.isModalCommentOpen} toggle={this.toggleModalComment}>
                        <ModalHeader toggle={this.toggleModalComment}>
                            Submit Comment
                        </ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Label htmlFor="rating">
                                    Rating
                                </Label>
                                <Control.select model=".rating" name="rating" id="rating"
                                    placeholder="Rating" className="form-control"
                                    validators={{
                                        required
                                    }}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                    <option>7</option>
                                    <option>8</option>
                                    <option>9</option>
                                    <option>10</option>
                                </Control.select>
                                <Errors
                                    className="text-danger"
                                    model=".rating"
                                    show="touched"
                                    messages={{
                                        required: ' Required'
                                    }}
                                />
                                <Label htmlFor="name">
                                    Your Name
                                </Label>
                                <Control.text model=".name" name="name" id="name"
                                    placeholder="Name" className="form-control"
                                    validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                    }}>
                                </Control.text>
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: ' Required',
                                        minLength: ' Must be greater than 2 char',
                                        maxLength: ' Must be shorter than 15 char'
                                    }}
                                />
                                <Label htmlFor="comment">
                                    Comment
                                </Label>
                                <Control.textarea model=".comment" name="comment" id="comment"
                                    className="form-control" rows="6">
                                </Control.textarea>
                                <Button 
                                    className="mt-2"
                                    type="submit"
                                    value="submit"
                                    color="primary">
                                    Submit
                                </Button>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </React.Fragment>
            )
        }
    }


export default DishDetail
