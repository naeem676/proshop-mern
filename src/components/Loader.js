import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        
            <Spinner animated='border' variant="primary" role='status' 
            className='w-100 h-100 mx-auto'>

                 <span className=''>Loading...</span>

            </Spinner>
        
    )
}

export default Loader
