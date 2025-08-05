// BooksHeader.tsx
import { useDispatch, useSelector,shallowEqual } from "react-redux";
import { IRootState } from "../../ReduxStore/store";
import { changeNavLinkSelected, changeOptionSelected, fetchBooksCollection } from "../../ReduxStore/bookSlice";
import { IoMdArrowDropdown } from "react-icons/io";
import {AppDispatch} from "../../ReduxStore/store";

interface SelectOptions {
    name: string;
    identifier: string;
}

const selectOptions: SelectOptions[] = [
    { identifier: "discover", name: "Discover" },
    { identifier: "genres", name: "Genres" }
];

type OptionList = {
    name: string;
    id: number;
}

const collection: { [key: string]: OptionList[] } = {
    genres : [
        { name: "Self-help", id: 5 },
        { name: "Religion", id: 6 },
        { name: "Fiction", id: 7 },
        { name: "Romance", id: 8 },
        { name: "Poetry", id: 9 },
    ],
    discover: [
        { name: "Best Seller", id: 1 },
        { name: "Trending", id: 2 },
        { name: "New Release", id: 3 },
        { name: "Popular", id: 4 },
    ]
};

export default function BooksHeader() {
    const dispatch = useDispatch<AppDispatch>();
    
    const { selectedOption, selectedNav}= useSelector((state: IRootState) => ({
        selectedOption: state.bookSlicer.typeSelected,
        selectedNav: state.bookSlicer.specificType
    }), shallowEqual)

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.value;
        dispatch( changeOptionSelected(selectedOption));
        const specificType = collection[e.target.value][0].name
        dispatch(changeNavLinkSelected(specificType));
        dispatch(fetchBooksCollection({category: selectedOption, specificType}))
    };


    return (
        <div className="pb-8">
            <nav className="flex flex-wrap md:flex-nowrap justify-between items-center font-inter gap-6">
                <div className="flex w-full md:w-auto relative">
                    <select
                        className="w-full md:w-[160px] h-[50px] outline-none border-0 appearance-none text-xl md:text-2xl text-white bg-purple-700 rounded-lg pr-7 pl-4"
                        onChange={handleSelectChange}
                        value={selectedOption}
                    >
                        {selectOptions.map((head) => {
                            const { name, identifier } = head;
                            return (
                                <option
                                    className="bg-white text-purple-950 hover:bg-gray-600"
                                    key={identifier}
                                    value={identifier}
                                >
                                    {name}
                                </option>
                            );
                        })}
                    </select>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-900 pointer-events-none">
                        <IoMdArrowDropdown size={30} />
                    </div>
                </div>

                <ul className="flex flex-wrap md:flex-nowrap gap-6 relative">
                    {collection[selectedOption].map((item) => {
                        const { name, id } = item;
                        return (
                            <li key={id}>
                                <button
                                    className={`${selectedNav === name ? "isActiveBtn": ""} outline-none border-0 font-Kumbh hover:text-purple-600 transition`}
                                    onClick={() => {
                                        dispatch(changeNavLinkSelected(name));
                                        dispatch(fetchBooksCollection({ category: selectedOption, specificType: name }));
                                    }}
                                >
                                    {name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="mt-2 border-b-2 border-gray-500 w-full" />
        </div>
    )
}

