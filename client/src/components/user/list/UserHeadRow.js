import { Svg } from "../../shared/Svg";

export const UserHeadRow = (props) => {
    if (props.unsortable) {
        return <th>{props.text}</th>;
    }

    const [sortBy, setSortBy] = props.sortBy;
    const [sortType, setSortType] = props.sortType;

    let svgClass = 'icon Table_icon__+HHgn active-icon';
    const isSorted = sortBy === props.fieldName && sortType !== 0;
    const isDescending = sortType === 2;

    isSorted && isDescending
        ? svgClass += ' fa-arrow-down'
        : svgClass += ' fa-arrow-up'

    const onClickHandler = (e) => {
        const isSortingOtherField = sortType !== 0 && sortBy !== props.fieldName; 
        if (isSortingOtherField) {
            setSortType(1)
            setSortBy(e.currentTarget.getAttribute('fieldname'))
        } else if (sortType < 2) {
            setSortType(prevSortType => prevSortType + 1)
            setSortBy(e.currentTarget.getAttribute('fieldname'))
        } else {
            setSortType(0);
            setSortBy('')
        }
    }
    
    return (
        <th onClick={onClickHandler} fieldname={props.fieldName}>
            {props.text}
            {isSorted &&
                <Svg
                    icon={isDescending ? 'arrow-down' : 'arrow-up'}
                    className={`${svgClass} ${isDescending ? 'fa-arrow-down' : 'fa-arrow-up'}`}
                    viewBox="0 0 384 512"
                    d={
                        isDescending 
                            ? 'M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z'
                            : 'M374.6 246.6C368.4 252.9 360.2 256 352 256s-16.38-3.125-22.62-9.375L224 141.3V448c0 17.69-14.33 31.1-31.1 31.1S160 465.7 160 448V141.3L54.63 246.6c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160C387.1 213.9 387.1 234.1 374.6 246.6z'
                    }
                />
            }
        </th>
    );
}