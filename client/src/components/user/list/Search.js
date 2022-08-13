import { useEffect, useState } from "react";

export const Search = (props) => {
    const [search, setSearch] = useState('');
    const [shouldClear, setShouldClear] = useState(false);
    const [showClear, setShowClear] = useState(false);

    useEffect(() => {
        search !== '' ? setShowClear(true) : setShowClear(false);
    }, [search]);

    const onSearchChangeHandler = (e) => setSearch(e.currentTarget.value);

    const clearHandler = () => setShouldClear(true);

    const onSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget)
        let formSearch = formData.get('search')
        let formCriteria = formData.get('criteria')
        
        if (shouldClear) {
            setShouldClear(false);
            setSearch('');
            formSearch = '';
        }

        props.setSearch(formSearch);
        props.setCriteria(formCriteria);
    }

    return (
        <form className="search-form" onSubmit={onSubmit}>
            <h2><span>Users</span></h2>
            <div className="search-input-container">
                <input type="text" placeholder="Please, select the search criteria" name="search"
                    onChange={onSearchChangeHandler} value={search} />
                
                <button className="btn" title="Please, select the search criteria">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>

                {showClear &&
                    <button className="btn close-btn" onClick={clearHandler}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                }
            </div>

            <div className="filter">
                <span>Search Criteria:</span>
                <select name="criteria" className="criteria" defaultValue="">
                    <option value="">Not selected</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="email">Email</option>
                    <option value="phoneNumber">Phone</option>
                </select>
            </div>
        </form>
    );
}