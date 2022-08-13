import { useState, useEffect } from "react";

import { UsersTableHead } from "./UsersTableHead";
import { UserRow } from "./UserRow";
import { Spinner } from "../../Spinner";
import { getAllUsers } from "../../../api/api";
import { Search } from "./Search";
import { AddButton } from "../create/AddButton";
import { Pagination } from "./Pagination";
import { Error } from "../../Error";

const sortTypes = {
    0: '',
    1: 'asc',
    2: 'desc'
}

export const UsersList = (props) => {
    const [users, setUsers] = useState();
    const [error, setError] = useState();
    const [reloadUsers, setReloadUsers] = props.reloadUsers;

    const [search, setSearch] = useState('');
    const [criteria, setCriteria] = useState('');

    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [pagesCount, setPagesCount] = useState();

    const [sortBy, setSortBy] = useState('');
    const [sortType, setSortType] = useState(0);

    useEffect(() => {
        if (reloadUsers) {
            setReloadUsers(false);
        }
        getAllUsers(search, criteria, page, limit, sortBy, sortTypes[sortType])
            .then(res => {
                setUsers(res.users);
                setPagesCount(Math.ceil(res.count / limit));
            })
    }, [search, criteria, page, limit, sortBy, sortType, reloadUsers]);

    useEffect(() => {
        let noUsers = users?.length === 0;
        if (noUsers && search !== '') {
            setError('Sorry, we couldn\'t find what you\'re looking for')
        } else if (noUsers) {
            setError('There is no users yet.')
        } else {
            setError(undefined)
        }
    }, [users]);

    const showSpinner = !users && !error;
    return (
        <div>
            <Search
                setSearch={setSearch}
                setCriteria={setCriteria}
            />

            <div className="table-wrapper">
                {showSpinner || error ?
                    <div className="loading-shade">
                        {showSpinner && <Spinner />}
                        {error && <Error message={error} />}
                    </div>
                    : null
                }

                <table className="table">
                    <thead>
                        <UsersTableHead
                            sortBy={[sortBy, setSortBy]}
                            sortType={[sortType, setSortType]}
                        />
                    </thead>
                    <tbody>
                        {users?.map(user => 
                            <UserRow
                                {...user}
                                key={user._id}
                                setAddIsShown={props.setAddIsShown}
                                setDetailsIsShown={props.setDetailsIsShown}
                                setDeleteIsShown={props.setDeleteIsShown}
                                setModifiedId={props.setModifiedId} 
                            />
                        )}
                    </tbody>
                </table>
            </div>

            <AddButton onClick={() => {
                props.setAddIsShown(true)
                props.setModifiedId(undefined);
            }} />
            <Pagination
                page={[page, setPage]}
                setLimit={setLimit}
                pagesCount={pagesCount}
            />
        </div>
    );
};

