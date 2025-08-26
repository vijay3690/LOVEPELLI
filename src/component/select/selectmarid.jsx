import { Component } from "react";


class SelectMarid extends Component {
    render() { 
        const {select} = this.props;
        return (
            <select defaultValue={select}>
                <option value="Married">Married</option>
                <option value="Un-Married">Un-Married</option>
                <option value="Divorced">Divorced</option>
            </select>
        );
    }
}
 
export default SelectMarid;