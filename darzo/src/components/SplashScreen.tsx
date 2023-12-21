import React from 'react';
import { IonSpinner } from '@ionic/react';

const SplashScreen: React.FC = () =>{
    return(
        <div className='splash'>
            <IonSpinner name='lines'/>
        </div>
    );
};

export default SplashScreen;