import React from 'react';
import { Input } from 'antd';


function Searchbox({placeholder,loading}) {
    const { Search } = Input;
    return (
        <Search placeholder={placeholder} loading={loading}  />
    )
}

export default Searchbox
