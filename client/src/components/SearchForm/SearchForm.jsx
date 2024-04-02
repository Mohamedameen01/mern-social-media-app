import { useState } from "react";
import { TiDelete } from "react-icons/ti";

function SearchForm() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [validationError, setValidationError] = useState("");

  const iconStyle = { color: "blue" };

  const handlePressEnter = (e) => {
    if (e.key === "Enter") e.preventDefault();

    if (e.key !== "Enter" || !text) return;

    if (chips.includes(text)) {
      return setValidationError("Cannot add the same input more than once.");
    }

    setTagss((prevState) => [...prevState, e.target.value]);
    setText("");
    setValidationError("");
  };

  const removeTag = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  const handleSearchEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      searchPost();
    }
  };

  return (
    <div className="m-2 border border-gray-400 rounded-md p-3">
      <form
        autoComplete="off"
        autoCorrect="off"
        noValidate
        className="grid gap-4"
      >
        <input
          className="mx-4 p-1 rounded-md outline outline-2 outline-offset-2 outline-gray-400"
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search memory"
          onKeyDown={handleSearchEnter}
        />
        <div className="mx-4 flex items-center flex-wrap row-gap-[1rem] p-1 rounded-md outline outline-2 outline-offset-2 outline-gray-400">
          <ul className="list-none flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <li className="flex items-center bg-[#cfe1ff] rounded-lg p-1">
                <span className="text-blue-400">{tag}</span>
                <TiDelete
                  style={iconStyle}
                  onClick={() => removeTag(tag)}
                  tabIndex="0"
                />
              </li>
            ))}
          </ul>
          <input
            className="mx-1 bg-transparent border-none outline-none"
            type="text"
            name="tags"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handlePressEnter}
            placeholder="search tags"
          />
          {validationError && <p className="text-red-600">{validationError}</p>}
        </div>
        <button
          type="submit"
          className="mx-4 bg-blue-600 p-1 text-white font-medium rounded-md"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
