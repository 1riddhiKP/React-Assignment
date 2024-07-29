import React from 'react';
import '../styles/style.css';
function List({ photos, setPhotos }) {
    return (
        <ol className="photo_list">
            {photos && photos.length > 0 ? (
                photos.map((item, index) => (
                    <Item key={index} item={item} setPhotos={setPhotos} />
                ))
            ) : (
                <p>No Photos Added</p>
            )}
        </ol>
    );
};

function Item({ item, setPhotos }) {
    const [editing, setEditing] = React.useState(false);
    const [editData, setEditData] = React.useState({
        description: item.description,
        photo: item.photo,
    });
    const inputRef = React.useRef(null);

    const handleEdit = () => {
        setEditing(true);
    };

    const handleInputBlur = () => {
        setEditing(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setEditing(false);
    };

    React.useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(
                inputRef.current.value.length,
                inputRef.current.value.length
            );
        }
    }, [editing]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
        setPhotos((prevPhotos) =>
            prevPhotos.map((photo) =>
                photo.id === item.id ? { ...photo, [name]: files ? files[0] : value } : photo
            )
        );
    };

    const handleDelete = () => {
        setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== item.id));
    };

    return (
        <li className="photo_item" id={item?.id}>
            {editing ? (
                <form className="edit-form" onSubmit={handleSubmit}>
                    <label htmlFor="edit-description">
                        Description:
                        <input
                            ref={inputRef}
                            name="description"
                            id="edit-description"
                            defaultValue={editData.description}
                            onBlur={handleInputBlur}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label htmlFor="edit-photo">
                        Photo:
                        <input
                            type="file"
                            name="photo"
                            id="edit-photo"
                            onBlur={handleInputBlur}
                            onChange={handleInputChange}
                        />
                    </label>
                </form>
            ) : (
                <div className='arrangeList'>
                    <div className='List'>
                        <img src={URL.createObjectURL(item.photo)} alt={item.description} width="100" />
                        <p>{item.description}</p>
                        <div className='buttons'>
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </li>
    );
}

export default List;
