import React from 'react';
import ReactDOM from 'react-dom'
import {ListGroup, ListGroupItem, Glyphicon, ControlLabel} from 'react-bootstrap';
import './styles.css'


class DocumentsList extends React.Component {
    constructor() {
        super();
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(props) {
        switch(props.target.className) {
            case 'doc-item':
                //TODO open in another tab
                break;
            case 'remove':
                //TODO remove group item
                break;
            case 'bookmark':
                //TODO add bookmark
                break;
        }
    }
    render() {
        let documentsListItem = this.props.documents.map((doc) =>{
            return <div id={doc.id} className="doc-item" onClick={this.handleItemClick}>
                           <ControlLabel> {doc} </ControlLabel>
                           <Glyphicon id={doc} className="remove" glyph="remove" onClick={this.handleItemClick} />
                           <Glyphicon id={doc} className="bookmark" glyph="star" onClick={this.handleItemClick} />
                   </div>
        });
        return (
                <ListGroup id="documents-group">
                    {documentsListItem}
                </ListGroup>
               );
    }
}

export default DocumentsList;

