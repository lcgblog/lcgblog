import * as React from "react";

export interface DetailProps {
    id: string;
}

class Detail extends React.Component<DetailProps, {}>{
    render() {
        const { id } = this.props;
        return (
            <div>
                <h3>详情页</h3>
                <p>{id}</p>
            </div>
            
        )
    }
}

export default Detail;
