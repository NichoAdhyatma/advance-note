import { CiCircleRemove, CiSearch } from "react-icons/ci";
import { Button, TextInput } from "flowbite-react";

export default function SearchField({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex items-center gap-4 h-fit">
        <TextInput
          placeholder="Search Note Here..."
          name="search"
          onChange={handleChange}
          value={search}
          rightIcon={CiSearch}
          shadow
          maxLength={255}
        />

        {search.trim().length > 0 ? (
          <Button onClick={() => setSearch("")}>
            <CiCircleRemove size={20} />
          </Button>
        ) : null}
      </div>

      <div>
        {search.trim().length > 0 ? `Search Result for : ${search}` : null}
      </div>
    </div>
  );
}
