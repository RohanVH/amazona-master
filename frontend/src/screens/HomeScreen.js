import React, { useEffect,useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';
import { listProductCategories } from '../actions/productActions';
import BootstrapCarousel from '../components/BootstrapCarousel';
import MainCarousel from '../components/MainCarousel';
import Alert from '../components/Alert';
import { Image } from 'cloudinary-react';

import Axios from 'axios';
import { updateImage } from '../actions/imageActions';

var listOfImages =[];

export default function HomeScreen() {
 
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  let audio = new Audio("/audio1.mp3")
  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const importAll =(r)=>{
    // console.log(r.keys().map(r));
    // return r.keys().map(r);
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  useEffect(() => {
    // listOfImages = importAll(require.context('C:/Users/Madhu/Desktop/Dword/amazona-master/uploads/', false, /\.(png|jpe?g|svg)$/));
    // console.log(listOfImages)
    loadImages();
    dispatch(listProducts({}));
    dispatch(listTopSellers());
    dispatch(listProductCategories());
  }, [dispatch]);

  const Styles={
    backgroundColor : "#ffff"
  }
  
  const submitHandler = (e) => {
    alert("Your file is uploaded")
    e.preventDefault();
    // TODO: dispatch update product
    dispatch(
      updateImage({
        image,
        
      })
    );
  };

  const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage }),
                headers: { 'Content-Type': 'application/json' },
            });
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };

    const [imageIds, setImageIds] = useState();
    const loadImages = async () => {
        try {
            // alert("loading");
            const res = await fetch('/api/images');
            console.log(res.json)
            const data = await res.json();
            setImageIds(data);
        } catch (err) {
            console.error(err);
        }
    };


 

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   const bodyFormData = new FormData();
  //   bodyFormData.append('image', file);
  //   setLoadingUpload(true);
  //   try {
  //     const { data } = await Axios.post('/api/uploads', bodyFormData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer ${userInfo.token}`,
  //       },
  //     });
  //     setImage(data);
  //     setLoadingUpload(false);
  //   } catch (error) {
  //     setErrorUpload(error.message);
  //     setLoadingUpload(false);
  //   }
  // };


  return (
    <>
    
    <MainCarousel></MainCarousel>
    <div style={{backgroundColor:"#E0FFFF"}}>
      
      
      {/* <BootstrapCarousel></BootstrapCarousel> */}
    {/* <section className="section main-banner" id="top">
    <video className='videoTag' id="bg-video" autoPlay loop muted style={{height:"200px",width:"200px"}}>
          <source src={videoBg} type='video/mp4' />
      </video>
      <div className="video-overlay header-text">
          <div className="caption">
              <h6>SRINATH ACHARYA</h6>
              <h4><em>Welcome to our world </em></h4>
              <div className="main-button">
                <div style={{display:"flex",flexWrap: "nowrap",justifyContent: "center"}}>
                  <div className="scroll-to-section"><a href="https://forms.gle/5HGpKHdDzkRXgLF86">BOOK A SLOT</a></div>&nbsp;&nbsp;
                  <div className="scroll-to-section"><a href="#section2">SHOP WITH US</a></div>
                </div>
              </div>
          </div>
      </div>
      </section> */}
    <div >
      {/* <video src={videoBg} autoplay loop muted/> */}
      
    
      
      <h1 style={{align:"center",paddingTop:"20px",paddingLeft:"43%",fontSize:"25px",fontWeight:"700"}}>&nbsp;&nbsp;CATEGORIES</h1>

      {/* {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
             <>
            
             <div className="main-button" style={{width:"20%",float:"left"}}>
             
                  <div className="scroll-to-section" style={{display:"flex",flexWrap: "nowrap",flexDirection:"column",paddingTop:"30px"}}>
                    <div style={{backgroundColor : "#E0FFFF",padding:"10px"}}>
                    <a href="https://forms.gle/5HGpKHdDzkRXgLF86" target="_blank"                  
                        >
                           Pooja services
                        
                  
                        </a>
                    </div>
                    {categories.map((c) => (
                      <div key={c} style={{backgroundColor : "#E0FFFF",padding:"10px"}}>
                        <Link
                          to={`/search/category/${c}`}                   
                        >
                          {c}
                        {/* <img src></img> 
                  
                        </Link>
                        
                      </div>
                    ))}
                  </div>&nbsp;&nbsp;                
                  
              </div>
             
              </>
            )} */}


           
            <div  >
            <table align="center" cellspacing="40">
            <tr>
              <td>
              <div class="container">
                  <Link
                          to={`/search/category/PoojaItem`} >
                  <img  onClick={() => audio.play()} src="images/p12.jpg" height="280px" width="280px"></img>
                  </Link>
                    <div  style={{backgroundColor:"#000000",height:"40px",borderRadius:"1px",display:"flex",justifyContent:"center",alignContent:"center"}}>
                     <Link
                          to={`/search/category/PoojaItem`}   
                          style={{color:"#ffff",fontSize:"18px",fontWeight:"bold",paddingTop:"8px"}}                
                        >
                          Pooja Item
                  
                        </Link>
                    </div>
                    <div class="overlay1">
                          <div class="text1">Pooja Item</div>
                    </div>
                </div>
              </td>
              <td>
              <div class="container">
                  <Link
                          to={`/search/category/Statue`} >
                  <img  onClick={() => audio.play()} src="images/p15.jpg" height="280px" width="280px"></img>
                  </Link>
                    <div  style={{backgroundColor:"#000000",height:"40px",borderRadius:"1px",display:"flex",justifyContent:"center",alignContent:"center"}}>
                     <Link
                          to={`/search/category/Statue`}   
                          style={{color:"#ffff",fontSize:"18px",fontWeight:"bold",paddingTop:"8px"}}                
                        >
                          Statue
                  
                        </Link>
                    </div>
                    <div class="overlay1">
                          <div class="text1">Statue</div>
                    </div>
                </div>
              </td>
              <td>
              <Link to={`/search/category/Sticker`}>
              <div class="container">
                  <Link
                          to={`/search/category/Sticker`} >
                  <img  onClick={() => audio.play()} src="images/p11.jpg" height="280px" width="280px"></img>
                  </Link>
                    <div  style={{backgroundColor:"#000000",height:"40px",borderRadius:"1px",display:"flex",justifyContent:"center",alignContent:"center"}}>
                     <Link
                          to={`/search/category/Sticker`}   
                          style={{color:"#ffff",fontSize:"18px",fontWeight:"bold",paddingTop:"8px"}}                
                        >
                          Sticker
                  
                        </Link>
                    </div>
                    <div class="overlay1">
                          <div class="text1">Sticker</div>
                    </div>
                </div>
                </Link>
              </td>
            </tr>
            <tr>
              <td>
              <div class="container">
                  <Link
                          to={`/search/category/PoojaItem`} >
                  <img  onClick={() => audio.play()} src="images/p13.jpg" height="280px" width="280px"></img>
                  </Link>
                    <div  style={{backgroundColor:"#000000",height:"40px",borderRadius:"1px",display:"flex",justifyContent:"center",alignContent:"center"}}>
                     <Link
                          to={`/search/category/PoojaItem`}   
                          style={{color:"#ffff",fontSize:"18px",fontWeight:"bold",paddingTop:"8px"}}                
                        >
                          Pooja Item
                  
                        </Link>
                    </div>
                    <div class="overlay1">
                          <div class="text1">Pooja Item</div>
                    </div>
                </div>
              </td>
              <td>
            
              <div class="container">
                  <Link
                          to={`/search/category/Statue`} >
                  <img onClick={() => audio.play()}  src="images/p15.jpg" height="280px" width="280px"></img>
                  </Link>
                    <div  style={{backgroundColor:"#000000",height:"40px",borderRadius:"1px",display:"flex",justifyContent:"center",alignContent:"center"}}>
                     <Link
                          to={`/search/category/Statue`}   
                          style={{color:"#ffff",fontSize:"18px",fontWeight:"bold",paddingTop:"8px"}}                
                        >
                          Statue
                  
                        </Link>
                    </div>
                    <div class="overlay1">
                          <div class="text1">Statue</div>
                    </div>
                </div>
                
              </td>
              <td>
              <div class="container">
                  <Link
                          to={`/search/category/Sticker`} >
                  <img onClick={() => audio.play()} src="images/p16.jpg" height="280px" width="280px"></img>
                  </Link>
                    <div  style={{backgroundColor:"#000000",height:"40px",borderRadius:"1px",display:"flex",justifyContent:"center",alignContent:"center"}}>
                     <Link
                          to={`/search/category/Sticker`}   
                          style={{color:"#ffff",fontSize:"18px",fontWeight:"bold",paddingTop:"8px"}}                
                        >
                          Sticker
                  
                        </Link>
                    </div>
                    <div class="overlay1">
                          <div class="text1">Sticker</div>
                    </div>
                </div>
              </td>
              
            </tr>
           
            </table>
            </div>
    </div>
    <br></br>
    <br></br>
    <BootstrapCarousel></BootstrapCarousel>
   
    </div>

    <h1 style={{align:"center",paddingTop:"20px",paddingLeft:"40%",fontSize:"25px",fontWeight:"700"}}>&nbsp;&nbsp;IMAGE GALLERY</h1>
    
    
    {/* {userInfo && userInfo.isAdmin && ( */}
      
    
    <div>
            {/* <h1 className="title">Cloudinary Gallery</h1> */}
            {/* <div className="gallery">
                {imageIds &&
                    imageIds.map((imageId, index) => (
                    
                    <div>
                        <Image
                            key={index}
                            cloudName='du2sobhoh'
                            publicId={imageId}
                            width="300"
                            crop="scale"

                        />
                      
                      </div>
                    ))}
            </div> */}
            <div>
            <h1 className="title">Upload an Image</h1>
            <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" />
            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
        </div>
        </div>
    
 



          {/* <div>
              {
                    listOfImages.map(
                      (image, index) =>    <img key={index} src={image} alt="info"></img>
                    )
              }
          </div> */}





            <div  >
            <table align="center" cellspacing="40">
            <tr>
              <td>
              
                <div class="container">
                  <img src="https://drive.google.com/uc?export=view&id=1zQ5N86GpXNyTT4_wJS5r1BH9rT8w-D3z" height="280px" width="280px"></img>                    
                </div>
               
              </td>
              <td>
              <div class="container">
                  <img src="https://drive.google.com/uc?export=view&id=1dbwvkm6bcZtpZLJ776TBvflk87c6gnMX" height="280px" width="280px"></img>                    
                </div>
              </td>
              <td>
              <div class="container">
                  <img src="https://drive.google.com/uc?export=view&id=151OGNE0D4RHOmiAgwXn4xIN4UVkCoSYY" height="280px" width="280px"></img>                    
                </div>
              </td>
            </tr>
            <tr>
              <td>
              <div class="container">
                  <img src="https://drive.google.com/uc?export=view&id=1GVkcTWdEhsFAr_7BwlrMgvf7002j0hta" height="280px" width="280px"></img>                    
                </div>
              </td>
              <td>
              <div class="container">
                  <img src="https://drive.google.com/uc?export=view&id=1F0T6ElKRsXYACI9oeEEdC5Ki2mJg1oRz" height="280px" width="280px"></img>                    
                </div>
              </td>
              <td>
              <div class="container">
                  <img src="https://drive.google.com/uc?export=view&id=1aRX79FxFdzeui0_Ws-isbHm3egttE0Qo" height="280px" width="280px"></img>                    
                </div>
              </td>
              
            </tr>
           
            </table>
            </div>




    </>
  );
}
