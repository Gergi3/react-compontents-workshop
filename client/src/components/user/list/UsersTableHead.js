import { useState } from "react";
import { UserHeadRow } from "./UserHeadRow";

export const UsersTableHead = (props) => {
    const [sortBy, setSortBy] = props.sortBy;
    const [sortType, setSortType] = props.sortType;
    const [rowsData] = useState([
        { text: 'Image', unsortable: true },
        { text: 'First Name', fieldName: 'firstName' },
        { text: 'Last name', fieldName: 'lastName' },
        { text: 'Email', fieldName: 'email' },
        { text: 'Phone', fieldName: 'phoneNumber' },
        { text: 'Created', fieldName: 'createdAt' },
        { text: 'Actions', unsortable: true }
    ])

    return (
        <tr>
            {rowsData.map(row => 
                <UserHeadRow
                    key={row.text + row.fieldName}
                    text={row.text}
                    unsortable={row.unsortable}
                    fieldName={row.fieldName}
                    sortType={[sortType, setSortType]}
                    sortBy={[sortBy, setSortBy]}
                />
            )}
        </tr>
    );
};
