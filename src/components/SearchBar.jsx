import React from "react";

const SearchBar = (props) => {
    return(
        <div>
            <input
                type="search"
                name={props.field_name}
            />
        </div>
    )
}