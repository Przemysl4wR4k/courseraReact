import React, { Component } from 'react';
import {Card, CardBody, CardImg, CardText, CardImgOverlay, CardTitle} from 'reactstrap';

class DishDetail extends Component{
    constructor (props){
        super(props);
    }

    renderDish(dish){
        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={this.props.selectedDish.name} />
                <CardBody>
                    <CardTitle heading>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

    renderComments(comments){

        if(comments != null){

            const commentsList = comments.map((comment) =>{
                return(
                    <li key={comment.id}>   
                        <div>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author}, {comment.date}</p>
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

    render(){

        if(this.props.selectedDish != null){
            return(
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {console.log(this.props.selectedDish.comments)}
                        {this.renderComments(this.props.selectedDish.comments)}
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
}


export default DishDetail
