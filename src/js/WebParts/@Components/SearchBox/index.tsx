import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";

const SearchBox = ({ placeholder, onChange, className }) => {
    const __onKeyDown = ({ currentTarget: { value: searchTerm } }) => window.setTimeout(() => {
        onChange(searchTerm);
    }, 100);

    return (<TextField
        className={className}
        placeholder={placeholder}
        onKeyDown={__onKeyDown} />);
};

export default SearchBox;
