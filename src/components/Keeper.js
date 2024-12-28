import React from 'react'
import './Styles/Keeper.css'    
import { MdOutlineExpandMore } from "react-icons/md";
import { MdOutlineExpandLess } from "react-icons/md";
function Keeper() {
    const [Data,setData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [expand,setExpand] = React.useState(true);
    const [expandUntil,setExpandUntil] = React.useState(30);
    const [selectedItems,setselectedItems] = React.useState([]);

    const getDataFromJson = () => { 
        fetch('./data.json',{
            headers : {  
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            }
        }).then((response) => { 
            if(!response.ok) { 
                throw new Error("Network response wasnt ok");
            }
            return response.json();
        }).then((response) => { 
            console.log(response)
            setData(response);
            console.log(response);
            setIsLoading(false);
        }).catch((err) => { 
            setIsLoading(false);
            console.log("Some Error");
        });
    }
    React.useEffect(() => getDataFromJson(),[])    


    const clickToExpand = () => {  
        setExpand(!expand);
    }

    const handleChange = (e) => {
        setExpandUntil(e.target.value); 
    };


    const selectItem = (element) => { 
            selectedItems.push(element);
    }
      
    const handleItemClick = (id) => {
        setselectedItems((prevClickedItemIds) => {
        if (prevClickedItemIds.includes(id)) {
            return prevClickedItemIds.filter((itemId) => itemId !== id);
        } else {
            return [...prevClickedItemIds, id];
        }
        });

        console.log(selectedItems);
  };

    const renderData = () => { 
        if (isLoading) {
          return <div>Loading...</div>; 
        }
        return(
            <div>
                {
                    expand  ? (
                        <div className='pTaker'>
                            <p>{Data[0].id}</p>
                            <p>{Data[0].first_name}</p>
                            <p>{Data[0].last_name}</p>
                            <p>{Data[0].email}</p>
                            <p>{Data[0].gender}</p>
                            <p>{Data[0].ip_address}</p>
                            <p className="IconExpand">
                                <MdOutlineExpandMore className='IconExpand' onClick = {() => clickToExpand()}/>
                            </p>
                        </div> 
                    ) : (
                        <div>
                            {Data.slice(0,expandUntil).map(element => (
                                <div className={`pTaker ${selectedItems.includes(element.id) ? 'clicked' : ''}`}   onClick={() => handleItemClick(element.id)}>
                                    <p>{element.id}</p>
                                    <p>{element.first_name}</p>
                                    <p>{element.last_name}</p>
                                    <p>{element.email}</p>
                                    <p>{element.gender}</p>
                                    <p>{element.ip_address}</p>
                                    <p className="IconExpand">
                                        {element.id == 1 ? (
                                         <MdOutlineExpandLess className='IconExpand' onClick = {() => clickToExpand()}/>

                                        ) : <div></div> }
                                    </p>
                               </div> 
                            ))}
                        </div>
                    )
                }
            </div> 
        )
    }


  return (
    <div> 
    <div className='FirstDiv'>
        <div className='Container'>
            <div className='ShowMain'>
                <div>
                    {renderData()}
                </div>
            </div>
        </div> 
         <div>
            <div className='ExpanButton' style={{ display: expand ? 'block' : 'none' }}>
                <p>Expand to : </p>
                <input 
                    id="numberInput"
                    type="number" 
                    min="2" 
                    max="30" 
                    step="2" 
                    value={expandUntil} 
                    onChange={handleChange} 
                />
            </div> 
        </div>
    </div>
    <button>Add Selected Items</button>
    </div>
  )
}

export default Keeper
