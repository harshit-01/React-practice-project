import React ,{Component} from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';
    

const DishDetail = (props) =>{
            return (
                <Card>
                     <CardImg top src={props.image} alt={props.name} />
                     <Card body>
                         <CardTitle>{props.name}</CardTitle>  
                         <CardText>{props.description}</CardText> 
                     </Card>
                 </Card>
                 );
}


export default DishDetail;