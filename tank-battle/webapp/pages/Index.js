/*
  页面的主入口
  ludl3
**/
import React from 'react';
import '../styles/css/index.css'
class Index extends React.Component {
  render() {
  	var marginLeftValue =(document.body.clientWidth-400)/2 ;
  	return(
      <div className="index-page" style={{marginLeft:marginLeftValue}}>
      </div>
  	);
  }
}
module.exports = Index;
