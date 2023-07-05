import React,{useState,useEffect} from 'react'
import "./style.css"

// get the local storage data
const getLocalDate= () =>{
    const lists=localStorage.getItem("MyTodoList")

    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
};

const Todo = () => {
    const [inputData,setInputData]=useState("");
    const [items,setItems]=useState(getLocalDate());
    const [isEditItem,setIsEditItem]= useState("");
    const [toggleButton,setToggleButton]=useState(false);

    const deleteItem=((id)=>{
        const updatedItem=items.filter((curr)=>{
            return curr.id!=id;
        });
        setItems(updatedItem);

    });

    const editItem=((id)=>{
        // const item_todo_edited
        const updatedItem=items.find((curr)=>{
            return curr.id===id;
        });
        setInputData(updatedItem.name);
        setIsEditItem(id);
        setToggleButton(true);

    })
    const addItem=(()=>{
        if(!inputData)
            alert('PLZ fill the data')
        else if(inputData && toggleButton){
            setItems(
                items.map((current)=>{
                    if(current.id === isEditItem){
                        return {...current,name:inputData};
                    }
                    return current;
                })
            );
        setInputData("");
        setIsEditItem();
        setToggleButton(false);
        }
        else{
            const myInputData={
                id: new Date().getTime().toString(),
                name: inputData,
            }
        setItems([...items,myInputData])
        setInputData("");

        }
    })

    // adding local storage

    useEffect(()=>{
        localStorage.setItem("MyTodoList",JSON.stringify(items));
    },[items])

  return (
    <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src='./images/todo.svg' alt='Todo logo'/>
                    <figcaption>
                        Add YOUR LIST Here
                    </figcaption>
                </figure>
                <div className='addItems' >
                    <input type="text" placeholder='✍️ add Items' className='form-control'
                        value={inputData}
                        onChange={(event)=>setInputData(event.target.value)}
                    />
                    {!toggleButton ? (<i className='fa fa-plus add-btn' onClick={addItem}>
                                </i>):(<i className='far fa-edit add-btn' onClick={addItem}></i>)
                    }
                    
                </div>

                {/* Show our Items */}
                <div className='showItems'>
                    
                     {items.map((curr)=>{
                    return( <div className='eachItem' key={curr.id}>
                    <h3>{curr.name}</h3>
                    <div className='todo-btn'>
                    
                    <i className='far fa-edit add-btn' onClick={()=>editItem(curr.id)}></i>
                    <i className='far fa-trash-alt add-btn' onClick={()=>deleteItem(curr.id)}></i>
                    </div>
                    </div>
                    ) ;})};
                    
                 

                    
                </div>
                <div className='showItems'>
                
                    <button className='btn effect04' data-sm-link-text="Remove All" onClick={()=>setItems([])}>
                        <span>Check List</span>
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo