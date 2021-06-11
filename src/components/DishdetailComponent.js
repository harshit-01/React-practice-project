import React from 'react';
import { Card, CardImg, CardText,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform} from 'react-animation-components';

    

const DishDetail = (props) =>{
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.name}</BreadcrumbItem>
                    </Breadcrumb>
                <FadeTransform in transformProps ={{
                exitTransform : 'scale(0.5) translateY(-50%)'
      }}>
                <Card>
                     <CardImg top src={baseUrl + props.image} alt={props.name} />
                     <Card body>
                         <CardTitle>{props.name}</CardTitle>  
                         <CardText>{props.description}</CardText> 
                     </Card>
                 </Card>
                 </FadeTransform>
                 </div>
                 </div>
                 );
}


export default DishDetail;