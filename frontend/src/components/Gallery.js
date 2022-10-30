
import React from 'react';

var listOfImages =[];

class Gallery extends React.Component{
    importAll(r) {
        return r.keys().map(r);
    }
    componentWillMount() {
        listOfImages = this.importAll(require.context('C:/Users/Madhu/Desktop/Dword/amazona-master/uploads/', false, /\.(png|jpe?g|svg)$/));
        
    }
    render(){
        return(
          <div>
              {
                    listOfImages.map(
                      (image, index) =>    <img key={index} src={image} alt="info"></img>
                    )
              }
          </div>
        )
    }
}

export default Gallery;