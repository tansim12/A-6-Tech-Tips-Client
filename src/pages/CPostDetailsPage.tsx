import React from 'react';

const CPostDetailsPage = ({params}:{params:any}) => {
    return (
        <div>
            CPostDetailsPage {params?.postId}
        </div>
    );
};

export default CPostDetailsPage;