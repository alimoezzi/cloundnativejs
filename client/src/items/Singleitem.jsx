import React from 'react';

const Singleitem = ({type, i, b, m}) => (
    <li key={i + b} className="item-cover-title">
        <div className="item">
            <div className="item-top">
                <div className="item-cover" style={{width: 128, height: 193}}></div>
                <div className="item-shelf-changer">
                    <select onChange={event => {confirm(`Move ${b} from ${type} to ${event.target.value} ?!`)&& m(type,b,event.target.value)}} value={type}>
                        <option value="doing" disabled={"doing" === type}>doing</option>
                        <option value="todo" disabled={"todo" === type}>todo</option>
                        <option value="done" disabled={"done" === type}>done</option>
                    </select>
                </div>
            </div>
            <div className="item-title">{b}</div>
        </div>
    </li>
);


export default Singleitem;
