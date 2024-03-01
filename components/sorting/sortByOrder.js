import { useState } from "react";
import { useRouter } from "next/router";

function SortByOrder() {
    const { query, pathname, push } = useRouter();
    const backUpValue = query.sort;
    const [orderValue, setOrderValue] = useState(backUpValue);

    function handleSortByOrder(event) {
        const value = event.target.value;
        setOrderValue(value);
        const currentQuery = { ...query };
        currentQuery.sort = value;
        push({ pathname, query: currentQuery });
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '25vh', background: 'white', marginTop: '-30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '20px', borderRadius: '8px', boxShadow: '0 5px 9px rgba(0, 0, 0, 0.9)' }}>
                <label id="sortSection">
                    <p style={{ paddingRight: '10px', margin: '0', color: 'red' }}>
                        <b>Sort By:</b>
                    </p>
                </label>
                <select
                    placeholder={'Choose Sort'}
                    value={orderValue}
                    onChange={handleSortByOrder}
                    style={{ marginTop: '8px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '220px', outline: 'none' }}
                >
                    <option value={'undefined'}>Default</option>
                    <option value={'prep_1'}>Preptime: Ascending</option>
                    <option value={'prep_-1'}>Preptime: Descending</option>
                    <option value={'cook_1'}>Cooktime: Ascending</option>
                    <option value={'cook_-1'}>Cooktime: Descending</option>
                    <option value={'instructions_1'}>Steps: Ascending</option>
                    <option value={'instructions_-1'}>Steps: Descending</option>
                    <option value={'published_1'}>Date: Ascending</option>
                    <option value={'published_-1'}>Date: Descending</option>
                </select>
            </div>
        </div>
    );
}

export default SortByOrder;
