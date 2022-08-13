import { EditButton } from "../create/EditButton";
import { DeleteButton } from "../delete/DeleteButton";
import { InfoButton } from "../show/DetailsButton";
import { getDate } from '../../../utils/utils';

export const UserRow = (props) => {
    const buttonHandler = (e) => {
        props.setModifiedId(e.currentTarget.getAttribute('_id'))
    }

    return (
        <tr>
            <td>
                <img
                    src={props.imageUrl}
                    alt={`${props.firstName}'s pic`}
                    className="image"
                />
            </td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.email}</td>
            <td>{props.phoneNumber}</td>
            <td>{getDate(props.createdAt)}</td>
        
            <td className="actions">
                <EditButton _id={props._id} onClick={buttonHandler} setAddIsShown={props.setAddIsShown} />
                <DeleteButton _id={props._id} onClick={buttonHandler} setDeleteIsShown={props.setDeleteIsShown} />
                <InfoButton _id={props._id} onClick={buttonHandler} setDetailsIsShown={props.setDetailsIsShown} />
            </td>
        </tr>
    );
};


