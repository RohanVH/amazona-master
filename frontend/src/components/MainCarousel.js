import React, { Component } from 'react'  
     
export class MainCarousel extends Component {  
        render() {  
    
                return (  
                    
                    <div className="carousel" >
                        <div className="carousel-inner">
                            <input className="carousel-open" type="radio" id="carousel-a" name="carousel1" aria-hidden="true" hidden="true" checked="checked">
                            </input>
                            <div className="carousel-item">
                                <img src="images/E.webp"></img>
                            </div>
                            
                            <input className="carousel-open" type="radio" id="carousel-b" name="carousel1" aria-hidden="true" hidden="true">
                            </input>
                            <div className="carousel-item">
                                <img src="images/C.webp"></img>
                            </div>
                            
                            
                            
                            <label for="carousel-c" className="carousel-control prev control-1">‹</label>
                            <label for="carousel-b" className="carousel-control next control-1">›</label>
                            <label for="carousel-a" className="carousel-control prev control-2">‹</label>
                            <label for="carousel-c" className="carousel-control next control-2">›</label>
                            <label for="carousel-b" className="carousel-control prev control-3">‹</label>
                            <label for="carousel-a" className="carousel-control next control-3">›</label>
                            <ol className="carousel-indicators">
                                <li>
                                    <label for="carousel-a" className="carousel-bullet">•</label>
                                </li>
                                <li>
                                    <label for="carousel-b" className="carousel-bullet">•</label>
                                </li>
                               
                            </ol>
                            </div>
                        </div>
                    
                )  
        }  
}  
    
export default MainCarousel 