import React, { useState, useEffect } from 'react';
import "./Garden.css";


const Garden = () => {
  const [menuModal,setMenuModal] = useState(true);
  const [plantModal,setPlantModal] = useState(false);
  const [treeName,setTreeName] = useState("");
  const [treeType,setTreeType] = useState(1);
  const [trees,setTrees] = useState([]);
  const currentUserId = 1;
  
  
  const toggleMenuModal = () => {
    setMenuModal(!menuModal);
  };
  
  const togglePlantModal = () => {
    setPlantModal(!plantModal);
    toggleMenuModal();
  };
  
  useEffect(() => {
    getTrees();
  }, []);
  const fetchTree = async (e) => {
    e.preventDefault();

    let tree = {
      name: treeName,
      ownerid:1,
      type:treeType,
      progress:0
    };

    let response = await fetch('https://localhost:7270/tree', {
      method: 'POST',
      body: JSON.stringify(tree),
      headers: { 'Content-Type': 'application/json' }
    })
    let result = await response.text();
    console.log(result);
  };
  
  const getTrees = async () => {
    let response = await fetch(`https://localhost:7270/tree/user${currentUserId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    let result = await response.text();
    let treesObject = JSON.parse(result);
    
    treesObject.$values.forEach(tree => {
      trees.push(tree);
      console.log(trees)
    });
    
  };
  
  function TreeCard(props) {
    return (
      <div className='tree-card'>
        <h1>{props.name}</h1>
        <h2>{props.type}</h2>
        <h2>{props.progress}</h2>
      </div>
    )
  };
  
  const treeCards = trees.map((tree,index) => (
    <TreeCard key={index} name={tree.name} type={tree.type} progress={tree.progress}/>
    ));

    if (!Array.isArray(trees)) {
      return <div>Loading data...</div>;
    }
    
  
    
  return (
    <div className='garden-container'>
      {menuModal && (
        <>
          <h3 className="ratingHeader">Take care of your trees!</h3>
          <div className='plant-card-container'>
            <div onClick={togglePlantModal} className='plant-card'>+</div>
            {treeCards}
          </div>
        </>
      )}
      {plantModal && (
        <form onSubmit={(e) => {fetchTree(e)}} className='plant-tree-modal'>
          <label htmlFor="">Tree name:</label>
          <input onChange={(e) => setTreeName(e.target.value)} type="text" value={treeName} />
          <label htmlFor="">Tree type:</label>
          <select onChange={(e) => setTreeType(Number(e.target.value))} id="tree-type">
            <option value="1">Oak</option>
            <option value="2">Spruce</option>
            <option value="3">Birch</option>
          </select>
          <button type='submit'>Plant!</button>
          <button className='back-btn' onClick={togglePlantModal}>Back</button>
        </form>
      )}
    </div>
  )
}

export default Garden