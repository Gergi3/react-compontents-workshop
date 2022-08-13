import { useState } from "react";

import { CreateUser } from "./create/CreateUser";
import { DeleteUser } from "./delete/DeleteUser";
import { UserDetails } from "./show/UserDetails";
import { UsersList } from "./list/UsersList";

export const Users = () => {
    const [addIsShown, setAddIsShown] = useState(false);
    const [detailsIsShown, setDetailsIsShown] = useState(false);
    const [deleteIsShown, setDeleteIsShown] = useState(false);
    const [modifiedId, setModifiedId] = useState();
    const [reloadUsers, setReloadUsers] = useState(false)

    return (
        <section className="card users-container">
            
            <UsersList
                setAddIsShown={setAddIsShown}
                setDetailsIsShown={setDetailsIsShown}
                setDeleteIsShown={setDeleteIsShown}
                setModifiedId={setModifiedId}
                reloadUsers={[reloadUsers, setReloadUsers]}
            />

            {addIsShown &&
                <CreateUser
                    _id={modifiedId}
                    setAddIsShown={setAddIsShown}
                    setReloadUsers={setReloadUsers}
                />
            }

            {detailsIsShown &&
                <UserDetails
                    _id={modifiedId}
                    setDetailsIsShown={setDetailsIsShown}
                />
            }
            
            {deleteIsShown &&
                <DeleteUser
                    _id={modifiedId}
                    setDeleteIsShown={setDeleteIsShown}
                    setReloadUsers={setReloadUsers}
                />
            }
        </section>
    );
};
