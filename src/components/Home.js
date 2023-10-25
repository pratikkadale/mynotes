import React from 'react';
import { Notes } from './Notes';
export const Home = (props) => {
  const showAlert=props.showAlert;
  return (
  <>
    
    <div className='container my-3'>
    <Notes showAlert={showAlert}/>
    </div>
    </>
  )
}
