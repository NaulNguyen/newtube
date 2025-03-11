import { SearchIcon } from "lucide-react";

export const SearchInput = () => {
    return (
        <form className="flex w-full max-width-[600px]">
            <div className="relative w-full">
                <input
                    type="text"
                    className="w-full pr-12 pl-4 py-2 rounded-l-full border focus:outline-none focus:border-blue-500"
                    placeholder="Search"
                />
            </div>
            <button
                type="submit"
                className="px-5 py-2.5 bg-gray-100 border border-l-0 rounded-r-full hover:bg-gray-200 disabled:opacity-50 disable:cursor-not-allowed">
                <SearchIcon className="size-5" />
            </button>
        </form>
    );
};
