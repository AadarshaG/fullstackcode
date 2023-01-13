import {useState} from 'react';
import { Header } from '../common/header/header.component';



import {connect} from 'react-redux';


// export function  Home(){
//     let [counter, setCounter] = useState(0);
//     return(
//         <>
//         <Header></Header>
//        <div className="container">
//             <div className="row">
//                 <div className="col-12">
//                     <p>You Clicked for: {counter} </p>
//                     <button onClick={()=>{
//                         setCounter(counter++);
//                     }} className="btn btn-sm btn-success">Click Me</button>
//                 </div>
//             </div>
//        </div>
//        </> 
//     );
// } 


 function  HomeComponent(props){
    let [counter, setCounter] = useState(0);
    return(
        <>
        <Header></Header>
       <div className="container">
            <div className="row">
                <div className="col-12">
                    <p>You Clicked for: {counter} </p>
                    <button onClick={()=>{
                        setCounter(counter++);
                    }} className="btn btn-sm btn-success">Click Me</button>
                </div>
            </div>
       </div>
       </> 
    );
}

const mapStatesToProps = (rootStore) => ({
    counter: rootStore.counter
});

const mapDispatchToProps = {}

export const Home = connect(mapStatesToProps,mapDispatchToProps)(HomeComponent);