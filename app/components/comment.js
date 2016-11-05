import React from 'react';
import {unixTimeToString} from '../util';
import {Link} from 'react-router';
import {likeCommentItem} from '../server';
import {unlikeCommentItem} from '../server';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  handleLikeClick(clickEvent) {
    clickEvent.preventDefault();
    if (clickEvent.button === 0) {
      var callbackFunction = (updatedLikeCounter) => {
        this.setState({likeCounter: updatedLikeCounter});
     };

     if (this.didUserLike()) {
       unlikeCommentItem(this.props.feedItemId, 4, this.props.commentIndex, callbackFunction);
     } else {
       likeCommentItem(this.props.feedItemId, 4, this.props.commentIndex, callbackFunction);
     }
   }
 }

 didUserLike() {
   var likeCounter = this.state.likeCounter;
   var liked = false;
   // Look for a likeCounter entry with userId 4 -- which is the
   // current user.
   for (var i = 0; i < likeCounter.length; i++) {
     if (likeCounter[i]._id === 4) {
       liked = true;
       break;
     }
   }
   return liked;
 }

  render() {
    var likeButtonText = "Like";
    var data = this.state;

    if (this.didUserLike()) {
     likeButtonText = "Unlike";
    }

    return (
      <div>
        <div className="media-left media-top">
          PIC
        </div>
        <div className="media-body">
          <Link to={"/profile/" + data.author._id}>
            {data.author.fullName}
          </Link> {this.props.children}
          <br /><a href="#" onClick={(e) => this.handleLikeClick(e)}>{likeButtonText}</a>  {data.likeCounter.length} · <a href="#">Reply</a> ·
            {unixTimeToString(data.postDate)}
        </div>
      </div>
    )
  }
}
