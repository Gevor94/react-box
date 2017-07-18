import React from 'react';
import {ListGroup, Glyphicon, ControlLabel} from 'react-bootstrap';
import FileUploader from './Upload'
import './styles.css'


class DocumentsList extends React.Component {
    constructor() {
        super();
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(props, doc) {
        switch(props.target.className) {
            case 'doc-name':
                window.open('http://localhost:9000/' + doc.path);
                break;
            case 'remove':
                //TODO remove group item
                break;
            case 'bookmark':
                //TODO add bookmark
                break;
            default:
                break;
        }
    }
    render() {
        let documentsListItem = this.props.documents.map((doc, i) => {
            return <div key={i} className="doc-item">
                          <a href="#" className="doc-name" onClick={(props) => this.handleItemClick(props, doc)}> {doc.name} </a>
                       <Glyphicon className="remove" glyph="remove" onClick={this.handleItemClick} />
                       <Glyphicon className="bookmark" glyph="star" onClick={this.handleItemClick} />
                       <span className="owner">Owner: {doc.owner}</span>
            </div>
        });
        return (
            <div>
                <FileUploader uploadFileCallback={this.props.uploadFileCallback}/>
                <ListGroup id="documents-group">
                    {documentsListItem}
                </ListGroup>
            </div>
               );
    }
}

export default DocumentsList;

