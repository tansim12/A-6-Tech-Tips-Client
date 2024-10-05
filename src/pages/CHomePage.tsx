import React from 'react';
import { newsFeedPosts } from '../Service/Posts';

const CHomePage =async () => {
    const res = await newsFeedPosts()
    console.log({res});
    
    return (
        <div>
            CHomePage
        </div>
    );
};

export default CHomePage;