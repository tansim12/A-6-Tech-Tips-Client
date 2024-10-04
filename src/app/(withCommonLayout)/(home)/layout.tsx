import React, { ReactNode } from 'react';

const HomeLayout = ({children}:{children:ReactNode}) => {
    return (
        <div>
           home sidebar
            {children}
        </div>
    );
};

export default HomeLayout;