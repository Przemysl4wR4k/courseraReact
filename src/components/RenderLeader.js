import React from 'react';
import { Media } from 'reactstrap';

function RenderLeader(props){
    return(
        <Media tag="li">
            <Media left middle>
                <Media object src={props.leader.image} alt={props.leader.name} />
            </Media>
            <Media body className="ml-5">
                <Media heading>{props.leader.name}</Media>
                <p>{props.leader.designation}</p>
                <p>{props.leader.description}</p>
            </Media>
        </Media>);
}

export default RenderLeader;