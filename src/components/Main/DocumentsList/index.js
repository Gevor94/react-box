import React from 'react';
import {ListGroup, Glyphicon, ControlLabel} from 'react-bootstrap';
import FileUploader from './Upload'
import RequestManager from '../../../ApiManager/RequestManager';
import './styles.css'


class DocumentsList extends React.Component {
    constructor() {
        super();
        this.handleItemClick = this.handleItemClick.bind(this);
    }

    handleItemClick(props, doc) {
        switch(props.target.id) {
            case 'doc-name':
                window.open('http://localhost:9000/' + doc.path);
                break;
            case 'remove-doc':
                RequestManager.deleteFile(doc, this.props.deletedFileCallback);
                break;
            case 'bookmark-doc':
                //TODO add bookmark
                break;
            case 'doc-filtered-content':
                if(doc.filteredContentIsVisible) {
                    doc.filteredContentIsVisible = false;
                } else {
                    doc.filteredContentIsVisible = true;
                }
                this.forceUpdate();
                break;
            default:
                break;
        }
    }
    render() {
        let documentsListItem = this.props.documents.map((doc, i) => {
            return <div key={i} className="doc-item">
                       <a href="#" id="doc-name" onClick={(props) => this.handleItemClick(props, doc)}> {doc.name} </a>
                       <Glyphicon id="remove-doc" className="remove" glyph="remove-circle" onClick={(props) => {this.handleItemClick(props,doc)}} />
                       <Glyphicon id="bookmark-doc" className="bookmark" glyph="star-empty" onClick= {(props) => {this.handleItemClick(props,doc)}}/>
                       <span className="owner">created by {doc.owner}</span>
                       <span onClick={(props) => this.handleItemClick(props,doc)} id="doc-filtered-content" className="doc-content"
                                     style={{ visibility: this.props.searchedFiles ? 'initial' : 'hidden'}} >
                           <Glyphicon id="doc-content" className="doc-glyph" glyph="list-alt" /> {doc.filteredContentIsVisible ? 'Close content' : 'Show content'}
                       </span>
                       <ControlLabel className="doc-filtered-content">{doc.filteredContentIsVisible ? doc.filteredContent : null}</ControlLabel>
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

