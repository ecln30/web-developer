import React,{useState, useEffect} from 'react';


function Main() {
     const [index, setIndex] = useState(0)
     const [digit, setDigit] = useState(0)

     const imgs = [
          "https://thedigitalteacher.com/img/framework/img.thumbail-learning-tips-the-digital-world-576x288.jpg",
          "image/img1.jpg",
          "image/img2.jpg",
          "image/img3.jpg",
          "image/img4.jpg"
     ]

     const Imgs = [
          "http://www.wur.nl/upload/8f266318-b2ce-4592-9682-d48838f0479a_shutterstock_1395265925.jpg",
          "image/img5.jpg",
          "image/img6.jpg",
          "image/img7.jpg",
          "image/img9.jpg"
     ] 
  
   useEffect( () => {
       setTimeout(() => {setIndex(Index => 
         index >= imgs.length - 1 ? Index = 0 : Index + 1
        )}, 3000)
   }, [index])

   useEffect( () => {
       setTimeout(() => {setDigit(Index => 
         digit >= Imgs.length - 1 ? Index = 0 : Index + 1
        )}, 4000)
   }, [digit])
       
     
    return ( 
            <div className="middle">
                 <div className="image">
                   <img className="img people" src={imgs[index]} alt="" />
                   <img className="img digit" src={Imgs[digit]} alt="" />
                 </div>
            </div>
     );
}

export default Main;
















































































































